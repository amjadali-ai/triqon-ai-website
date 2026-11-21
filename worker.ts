interface AssetFetcher {
  fetch(request: Request): Promise<Response>;
}

interface Env {
  ASSETS: AssetFetcher;
  FIREBASE_PROJECT_ID?: string;
  FIREBASE_DATABASE_ID?: string;
  FIREBASE_API_KEY?: string;
}

const DEFAULT_PROJECT_ID = "magnetic-element-t61jg";
const DEFAULT_DATABASE_ID =
  "ai-studio-triqonaiwebsite-83585e76-acaa-461b-8180-13390301e20d";

const ALLOWED_TYPES = new Set([
  "Suggestion",
  "Report an Issue",
  "Content Correction",
]);

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const URL_PATTERN = /^https?:\/\/.+/;

const CORS_HEADERS: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Accept",
};

function jsonResponse(status: number, payload: unknown): Response {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      ...CORS_HEADERS,
    },
  });
}

function randomHex(byteLength: number): string {
  const bytes = new Uint8Array(byteLength);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
}

async function handleFeedback(request: Request, env: Env): Promise<Response> {
  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: CORS_HEADERS });
  }

  if (request.method !== "POST") {
    return jsonResponse(405, {
      ok: false,
      error: "Method not allowed. Use POST.",
    });
  }

  let body: Record<string, unknown> | null = null;
  try {
    const raw = await request.text();
    if (raw.length > 16_384) {
      return jsonResponse(413, { ok: false, error: "Payload too large." });
    }
    const parsed: unknown = JSON.parse(raw);
    if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
      body = parsed as Record<string, unknown>;
    }
  } catch {
    body = null;
  }

  if (!body) {
    return jsonResponse(400, { ok: false, error: "Invalid JSON payload." });
  }

  // Honeypot trap for automated spam bots
  const honeypot =
    typeof body.honeypot === "string"
      ? body.honeypot
      : typeof body._honey === "string"
      ? body._honey
      : "";
  if (honeypot.trim().length > 0) {
    return jsonResponse(400, { ok: false, error: "Submission rejected." });
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
    return jsonResponse(400, { ok: false, error: "Invalid feedbackType." });
  }

  if (pageSection.length < 1 || pageSection.length > 80) {
    return jsonResponse(400, { ok: false, error: "Invalid pageSection." });
  }

  if (message.length < 8 || message.length > 2000) {
    return jsonResponse(400, {
      ok: false,
      error: "Feedback message must be between 8 and 2000 characters.",
    });
  }

  if (email.length > 0 && !EMAIL_PATTERN.test(email)) {
    return jsonResponse(400, { ok: false, error: "Invalid email address." });
  }

  try {
    const projectId = env.FIREBASE_PROJECT_ID?.trim() || DEFAULT_PROJECT_ID;
    const databaseId = env.FIREBASE_DATABASE_ID?.trim() || DEFAULT_DATABASE_ID;
    const apiKey = env.FIREBASE_API_KEY?.trim() || "";

    const feedbackId = `fb_${Date.now()}_${randomHex(4)}`;
    const docPath = `projects/${projectId}/databases/${databaseId}/documents/feedback/${feedbackId}`;
    const baseCommitUrl = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/${databaseId}/documents:commit`;
    const commitUrl = apiKey
      ? `${baseCommitUrl}?key=${encodeURIComponent(apiKey)}`
      : baseCommitUrl;

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
      return jsonResponse(502, {
        ok: false,
        error: "Unable to persist feedback submission right now.",
      });
    }

    return jsonResponse(201, {
      ok: true,
      id: feedbackId,
      receivedAt: new Date().toISOString(),
    });
  } catch {
    return jsonResponse(500, {
      ok: false,
      error: "Unexpected error while saving feedback submission.",
    });
  }
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname === "/api/feedback") {
      return handleFeedback(request, env);
    }
    return env.ASSETS.fetch(request);
  },
};
