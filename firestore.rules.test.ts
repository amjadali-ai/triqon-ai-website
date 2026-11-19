/**
 * Firestore Security Rules Specification Tests ("Dirty Dozen" Payloads)
 * Verifies every adversarial payload defined in security_spec.md against firestore.rules.
 */

export interface SecurityTestCase {
  id: number;
  name: string;
  operation: "create" | "get" | "list" | "update" | "delete";
  path: string;
  auth: { uid?: string; email?: string; email_verified?: boolean } | null;
  payload?: Record<string, unknown>;
  expected: "PERMISSION_DENIED" | "ALLOW";
}

export const DIRTY_DOZEN_TESTS: SecurityTestCase[] = [
  {
    id: 1,
    name: "Shadow field injection on feedback create",
    operation: "create",
    path: "/feedback/fb_test_01",
    auth: null,
    payload: {
      feedbackType: "Suggestion",
      pageSection: "General Website",
      message: "Valid feedback message content.",
      email: "",
      pageUrl: "https://triqon-ai.vercel.app/",
      status: "new",
      createdAt: "REQUEST_TIME",
      isAdmin: true,
    },
    expected: "PERMISSION_DENIED",
  },
  {
    id: 2,
    name: "ID poisoning with >128 char or illegal characters",
    operation: "create",
    path: "/feedback/bad id with spaces!",
    auth: null,
    payload: {
      feedbackType: "Suggestion",
      pageSection: "General Website",
      message: "Valid feedback message content.",
      email: "",
      pageUrl: "https://triqon-ai.vercel.app/",
      status: "new",
      createdAt: "REQUEST_TIME",
    },
    expected: "PERMISSION_DENIED",
  },
  {
    id: 3,
    name: "Oversized feedback message (>2000 chars)",
    operation: "create",
    path: "/feedback/fb_test_03",
    auth: null,
    payload: {
      feedbackType: "Suggestion",
      pageSection: "General Website",
      message: "a".repeat(2001),
      email: "",
      pageUrl: "https://triqon-ai.vercel.app/",
      status: "new",
      createdAt: "REQUEST_TIME",
    },
    expected: "PERMISSION_DENIED",
  },
  {
    id: 4,
    name: "Undersized feedback message (<8 chars)",
    operation: "create",
    path: "/feedback/fb_test_04",
    auth: null,
    payload: {
      feedbackType: "Suggestion",
      pageSection: "General Website",
      message: "short",
      email: "",
      pageUrl: "https://triqon-ai.vercel.app/",
      status: "new",
      createdAt: "REQUEST_TIME",
    },
    expected: "PERMISSION_DENIED",
  },
  {
    id: 5,
    name: "Invalid feedbackType enum value",
    operation: "create",
    path: "/feedback/fb_test_05",
    auth: null,
    payload: {
      feedbackType: "Spam",
      pageSection: "General Website",
      message: "Valid feedback message content.",
      email: "",
      pageUrl: "https://triqon-ai.vercel.app/",
      status: "new",
      createdAt: "REQUEST_TIME",
    },
    expected: "PERMISSION_DENIED",
  },
  {
    id: 6,
    name: "State shortcutting status='resolved' on create",
    operation: "create",
    path: "/feedback/fb_test_06",
    auth: null,
    payload: {
      feedbackType: "Suggestion",
      pageSection: "General Website",
      message: "Valid feedback message content.",
      email: "",
      pageUrl: "https://triqon-ai.vercel.app/",
      status: "resolved",
      createdAt: "REQUEST_TIME",
    },
    expected: "PERMISSION_DENIED",
  },
  {
    id: 7,
    name: "Forged client timestamp on create",
    operation: "create",
    path: "/feedback/fb_test_07",
    auth: null,
    payload: {
      feedbackType: "Suggestion",
      pageSection: "General Website",
      message: "Valid feedback message content.",
      email: "",
      pageUrl: "https://triqon-ai.vercel.app/",
      status: "new",
      createdAt: "2020-01-01T00:00:00Z",
    },
    expected: "PERMISSION_DENIED",
  },
  {
    id: 8,
    name: "Malformed email format",
    operation: "create",
    path: "/feedback/fb_test_08",
    auth: null,
    payload: {
      feedbackType: "Report an Issue",
      pageSection: "Services",
      message: "Valid feedback message content.",
      email: "not-an-email",
      pageUrl: "https://triqon-ai.vercel.app/",
      status: "new",
      createdAt: "REQUEST_TIME",
    },
    expected: "PERMISSION_DENIED",
  },
  {
    id: 9,
    name: "Unsafe javascript: pageUrl scheme",
    operation: "create",
    path: "/feedback/fb_test_09",
    auth: null,
    payload: {
      feedbackType: "Report an Issue",
      pageSection: "Services",
      message: "Valid feedback message content.",
      email: "",
      pageUrl: "javascript:alert(1)",
      status: "new",
      createdAt: "REQUEST_TIME",
    },
    expected: "PERMISSION_DENIED",
  },
  {
    id: 10,
    name: "Unauthenticated PII read (get)",
    operation: "get",
    path: "/feedback/fb_existing_01",
    auth: null,
    expected: "PERMISSION_DENIED",
  },
  {
    id: 11,
    name: "Unauthenticated collection scrape (list)",
    operation: "list",
    path: "/feedback",
    auth: null,
    expected: "PERMISSION_DENIED",
  },
  {
    id: 12,
    name: "Unverified admin email spoof",
    operation: "list",
    path: "/feedback",
    auth: {
      uid: "spoof-uid",
      email: "amjadroghani5065@gmail.com",
      email_verified: false,
    },
    expected: "PERMISSION_DENIED",
  },
];
