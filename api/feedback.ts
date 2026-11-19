import { existsSync, readFileSync } from "node:fs";
import { randomBytes } from "node:crypto";
import { join } from "node:path";
import type { IncomingMessage, ServerResponse } from "node:http";

interface VercelRequest extends IncomingMessage {
  body?: unknown;
}

interface VercelResponse extends ServerResponse {
  status?: (code: number) => VercelResponse;
  json?: (body: unknown) => void;
}

interface FirebaseAppletConfig {
  projectId: string;
  apiKey: string;
  firestoreDatabaseId: string;
}

const ALLOWED_TYPES = new Set([
  "Suggestion",
  "Report an Issue",
  "Content Correction",
]);

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const URL_PATTERN = /^https?:\/\/.+/;

function loadFirebaseConfig(): FirebaseAppletConfig {
  const cwdPath = join(process.cwd(), "firebase-applet-config.json");
  if (existsSync(cwdPath)) {
    return JSON.parse(readFileSync(cwdPath, "utf8")) as FirebaseAppletConfig;
  }
  const relativeUrl = new URL("../firebase-applet-config.json", import.meta.url);
  return JSON.parse(readFileSync(relativeUrl, "utf8")) as FirebaseAppletConfig;
}

function sendJson(res: VercelResponse, statusCode: number, payload: unknown) {
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Accept");
  res.statusCode = statusCode;
  res.end(JSON.stringify(payload));
}

async function parseJsonBody(req: VercelRequest): Promise<Record<string, unknown> | null> {
  if (req.body && typeof req.body === "object") {
    return req.body as Record<string, unknown>;
  }
  if (typeof req.body === "string") {
    try {
      return JSON.parse(req.body) as Record<string, unknown>;
    } catch {
      return null;
    }
  }

  const chunks: Buffer[] = [];
  for await (const chunk of req) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
    if (Buffer.concat(chunks).length > 16_384) {
      return null;
    }
  }

  if (chunks.length === 0) return null;
  try {
    return JSON.parse(Buffer.concat(chunks).toString("utf8")) as Record<
      string,
      unknown
    >;
  } catch {
    return null;
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Accept");
    res.statusCode = 204;
    res.end();
    return;
  }

  if (req.method !== "POST") {
    sendJson(res, 405, { ok: false, error: "Method not allowed. Use POST." });
    return;
  }

  const body = await parseJsonBody(req);
  if (!body) {
    sendJson(res, 400, { ok: false, error: "Invalid JSON payload." });
    return;
  }

  // Honeypot trap for automated spam bots
  const honeypot =
    typeof body.honeypot === "string"
      ? body.honeypot
      : typeof body._honey === "string"
      ? body._honey
      : "";
  if (honeypot.trim().length > 0) {
    sendJson(res, 400, { ok: false, error: "Submission rejected." });
    return;
  }

  const feedbackType =
    typeof body.feedbackType === "string" ? body.feedbackType.trim() : "";
  const pageSection =
    typeof body.pageSection === "string"
      ? body.pageSection.trim().slice(0, 80)
      : "General Website";
  const message =
    typeof body.message === "string" ? body.message.trim() : "";
  const email =
    typeof body.email === "string" ? body.email.trim().slice(0, 254) : "";
  const pageUrl =
    typeof body.pageUrl === "string" && URL_PATTERN.test(body.pageUrl.trim())
      ? body.pageUrl.trim().slice(0, 500)
      : "https://triqon-ai.vercel.app/";

  if (!ALLOWED_TYPES.has(feedbackType)) {
    sendJson(res, 400, { ok: false, error: "Invalid feedbackType." });
    return;
  }

  if (pageSection.length < 1 || pageSection.length > 80) {
    sendJson(res, 400, { ok: false, error: "Invalid pageSection." });
    return;
  }

  if (message.length < 8 || message.length > 2000) {
    sendJson(res, 400, {
      ok: false,
      error: "Feedback message must be between 8 and 2000 characters.",
    });
    return;
  }

  if (email.length > 0 && !EMAIL_PATTERN.test(email)) {
    sendJson(res, 400, { ok: false, error: "Invalid email address." });
    return;
  }

  try {
    const config = loadFirebaseConfig();
    const feedbackId = `fb_${Date.now()}_${randomBytes(4).toString("hex")}`;
    const docPath = `projects/${config.projectId}/databases/${config.firestoreDatabaseId}/documents/feedback/${feedbackId}`;
    const commitUrl = `https://firestore.googleapis.com/v1/projects/${config.projectId}/databases/${config.firestoreDatabaseId}/documents:commit?key=${encodeURIComponent(
      config.apiKey
    )}`;

    const firestoreResponse = await fetch(commitUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        writes: [
          {
            update: {
              name: docPath,
              fields: {
                feedbackType: { stringValue: feedbackType },
                pageSection: { stringValue: pageSection },
                message: { stringValue: message },
                email: { stringValue: email },
                pageUrl: { stringValue: pageUrl },
                status: { stringValue: "new" },
              },
            },
            currentDocument: { exists: false },
            updateTransforms: [
              {
                fieldPath: "createdAt",
                setToServerValue: "REQUEST_TIME",
              },
            ],
          },
        ],
      }),
    });

    if (!firestoreResponse.ok) {
      sendJson(res, 502, {
        ok: false,
        error: "Unable to persist feedback submission right now.",
      });
      return;
    }

    sendJson(res, 201, {
      ok: true,
      id: feedbackId,
      receivedAt: new Date().toISOString(),
    });
  } catch {
    sendJson(res, 500, {
      ok: false,
      error: "Unexpected error while saving feedback submission.",
    });
  }
}
