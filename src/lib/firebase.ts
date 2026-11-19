import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  getDocFromServer,
  serverTimestamp,
} from "firebase/firestore";
import firebaseConfig from "../../firebase-applet-config.json";

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);

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
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo:
        auth.currentUser?.providerData?.map((provider) => ({
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
