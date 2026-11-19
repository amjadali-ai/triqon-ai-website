# TRIQON AI Firestore Security Specification

## 1. Data Invariants
1. **Default-Deny Baseline:** Every unspecified Firestore path is denied (`allow read, write: if false;`).
2. **Public Feedback Intake Only:** Unauthenticated visitors may ONLY `create` documents in `/feedback/{feedbackId}` when every required field matches exact type, enum, regex, length, and server-timestamp (`request.time`) invariants.
3. **Zero PII Leakage:** Feedback documents may contain a visitor's optional `email`. Therefore `get`, `list`, `update`, and `delete` on `/feedback/{feedbackId}` are strictly restricted to verified administrators (`isAdmin()`).
4. **Immutable Creation Metadata:** On `/feedback/{feedbackId}`, `status` MUST be `'new'` on creation, `createdAt` MUST equal `request.time`, and `createdAt`, `message`, `email`, `feedbackType`, `pageSection`, and `pageUrl` cannot be altered after creation.
5. **Terminal State Locking:** Once a feedback item's `status` transitions to `'resolved'`, non-admin updates are impossible and admin status updates are strictly allowlisted via `affectedKeys().hasOnly(['status'])`.
6. **Admin Role Isolation:** `/admins/{adminId}` cannot be modified by clients; only verified admins may read their own record.

## 2. The "Dirty Dozen" Adversarial Payloads
1. **Shadow Field Injection (Create):** Valid feedback payload plus ghost field `isAdmin: true`. Must be rejected by `keys().hasOnly(...)`.
2. **ID Poisoning:** Creating `/feedback/` with an invalid or >128-char ID containing spaces/symbols. Must be rejected by `isValidId(feedbackId)`.
3. **Oversized Message (Denial of Wallet):** `message` exceeding 2000 characters. Must be rejected by `message.size() <= 2000`.
4. **Short/Empty Message:** `message` under 8 characters. Must be rejected by `message.size() >= 8`.
5. **Invalid Feedback Type Enum:** `feedbackType: "Spam"`. Must be rejected by allowlist check.
6. **Invalid Status on Create (State Shortcutting):** Creating feedback with `status: "resolved"`. Must be rejected by `status == 'new'`.
7. **Forged Timestamp (Temporal Integrity):** Creating feedback with a client-supplied past timestamp instead of `request.time`. Must be rejected by `createdAt == request.time`.
8. **Invalid Email Format:** `email: "not-an-email"`. Must be rejected by regex guard.
9. **Invalid Page URL Scheme:** `pageUrl: "javascript:alert(1)"`. Must be rejected by `^https?://.*`.
10. **Unauthenticated PII Read (`get`):** Anonymous or non-admin user reading `/feedback/{id}`. Must return `PERMISSION_DENIED`.
11. **Unauthenticated Collection Scrape (`list`):** Anonymous or non-admin user listing `/feedback`. Must return `PERMISSION_DENIED`.
12. **Unverified Admin Email Spoof:** Authenticated user with `email == 'amjadroghani5065@gmail.com'` and `email_verified == false` attempting to read `/feedback`. Must return `PERMISSION_DENIED`.
