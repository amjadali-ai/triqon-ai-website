import { initializeApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  getDocFromServer,
  serverTimestamp,
  type Firestore,
} from "firebase/firestore";

interface FirebaseAppletConfig {
  projectId: string;
  appId: string;
  apiKey: string;
  authDomain?: string;
  firestoreDatabaseId?: string;
  storageBucket?: string;
  messagingSenderId?: string;
  measurementId?: string;
}

const localConfigModules = import.meta.glob<{ default: FirebaseAppletConfig }>(
  "../../firebase-applet-config.json",
  { eager: true }
);

function resolveFirebaseConfig(): FirebaseAppletConfig | null {
  const localModule = Object.values(localConfigModules)[0]?.default;
  if (localModule?.projectId && localModule?.apiKey && localModule?.appId) {
    return localModule;
  }

  const envApiKey = import.meta.env.VITE_FIREBASE_API_KEY?.trim();
  const envProjectId = import.meta.env.VITE_FIREBASE_PROJECT_ID?.trim();
  const envAppId = import.meta.env.VITE_FIREBASE_APP_ID?.trim();
  if (envApiKey && envProjectId && envAppId) {
    return {
      apiKey: envApiKey,
      projectId: envProjectId,
      appId: envAppId,
      authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN?.trim(),
      firestoreDatabaseId: import.meta.env.VITE_FIREBASE_DATABASE_ID?.trim(),
    };
  }

  return null;
}

const resolvedConfig = resolveFirebaseConfig();

const app: FirebaseApp | null = resolvedConfig
  ? initializeApp(resolvedConfig)
  : null;

export const db: Firestore | null =
  app && resolvedConfig
    ? resolvedConfig.firestoreDatabaseId
      ? getFirestore(app, resolvedConfig.firestoreDatabaseId)
      : getFirestore(app)
    : null;

export const auth: Auth | null = app ? getAuth(app) : null;
export const isFirebaseClientConfigured = Boolean(db);

export enum OperationType {
  CREATE = "create",
  UPDATE = "update",
  DELETE = "delete",
  LIST = "list",
  GET = "get",
  WRITE = "write",
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(
  error: unknown,
  operationType: OperationType,
  path: string | null
): never {
  const currentUser = auth?.currentUser;
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: currentUser?.uid,
      email: currentUser?.email,
      emailVerified: currentUser?.emailVerified,
      isAnonymous: currentUser?.isAnonymous,
      tenantId: currentUser?.tenantId,
      providerInfo:
        currentUser?.providerData?.map((provider) => ({
          providerId: provider.providerId,
          email: provider.email,
        })) || [],
    },
    operationType,
    path,
  };
  console.error("Firestore Error: ", JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

async function testConnection() {
  if (!db) return;
  try {
    await getDocFromServer(doc(db, "test", "connection"));
  } catch (error) {
    if (error instanceof Error && error.message.includes("the client is offline")) {
      console.error("Please check your Firebase configuration.");
    }
  }
}

void testConnection();

export interface FeedbackSubmissionInput {
  feedbackType: "Suggestion" | "Report an Issue" | "Content Correction";
  pageSection: string;
  message: string;
  email: string;
  pageUrl: string;
}

const SAFE_ID_CHARS = "abcdefghijklmnopqrstuvwxyz0123456789";

function generateFeedbackId(): string {
  let suffix = "";
  for (let i = 0; i < 8; i += 1) {
    suffix += SAFE_ID_CHARS[Math.floor(Math.random() * SAFE_ID_CHARS.length)];
  }
  return `fb_${Date.now()}_${suffix}`;
}

export async function submitFeedbackToFirestore(
  input: FeedbackSubmissionInput
): Promise<string> {
  if (!db) {
    throw new Error("Firebase client SDK is not configured in this environment.");
  }

  const feedbackId = generateFeedbackId();
  const path = `feedback/${feedbackId}`;
  const safePageUrl = /^https?:\/\/.+/.test(input.pageUrl)
    ? input.pageUrl.slice(0, 500)
    : "https://triqon-ai.vercel.app/";

  try {
    await setDoc(doc(db, "feedback", feedbackId), {
      feedbackType: input.feedbackType,
      pageSection: input.pageSection.trim().slice(0, 80) || "General Website",
      message: input.message.trim().slice(0, 2000),
      email: input.email.trim().slice(0, 254),
      pageUrl: safePageUrl,
      status: "new",
      createdAt: serverTimestamp(),
    });
    return feedbackId;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}
