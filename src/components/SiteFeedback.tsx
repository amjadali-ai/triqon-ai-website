import { useState, type FormEvent } from "react";
import {
  MessageSquarePlus,
  CheckCircle2,
  AlertCircle,
  Mail,
  Copy,
  Loader2,
  ShieldCheck,
} from "lucide-react";
import { useSiteContent } from "@/lib/contentLoader";
import { submitFeedbackToFirestore } from "@/lib/firebase";

type FeedbackType = "Suggestion" | "Report an Issue" | "Content Correction";

interface FeedbackErrors {
  details?: string;
  email?: string;
}

type SubmitState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "submitted"; submissionId: string }
  | { status: "error"; message: string; mailtoUrl: string; copyText: string };

export function SiteFeedback() {
  const { company } = useSiteContent();
  const feedbackEndpoint = import.meta.env.VITE_FEEDBACK_ENDPOINT?.trim() || "";

  const [feedbackType, setFeedbackType] = useState<FeedbackType>("Suggestion");
  const [pageArea, setPageArea] = useState("General Website");
  const [details, setDetails] = useState("");
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors] = useState<FeedbackErrors>({});
  const [submitState, setSubmitState] = useState<SubmitState>({ status: "idle" });
  const [copied, setCopied] = useState(false);

  const buildFallbackPayload = (pageUrl: string) => {
    const cleanDetails = details.trim();
    const cleanEmail = email.trim();
    const subject = `[TRIQON AI Site Feedback] ${feedbackType} — ${pageArea}`;
    const body = [
      `Feedback Type: ${feedbackType}`,
      `Page Section: ${pageArea}`,
      `Page URL: ${pageUrl}`,
      `Reply Email: ${cleanEmail || "Not provided"}`,
      "",
      "Feedback:",
      cleanDetails,
    ].join("\n");

    return {
      mailtoUrl: `mailto:${company.email}?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`,
      copyText: `To: ${company.email}\nSubject: ${subject}\n\n${body}`,
    };
  };

  const validate = (): FeedbackErrors => {
    const next: FeedbackErrors = {};
    const trimmedDetails = details.trim();
    if (trimmedDetails.length < 8) {
      next.details =
        "Please share at least 8 characters describing your suggestion or issue.";
    } else if (trimmedDetails.length > 2000) {
      next.details = "Please keep feedback under 2000 characters.";
    }

    const trimmedEmail = email.trim();
    if (
      trimmedEmail &&
      (trimmedEmail.length > 254 ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail))
    ) {
      next.email = "Please enter a valid email address, or leave it blank.";
    }
    return next;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (honeypot) return;

    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    const pageUrl =
      typeof window !== "undefined" ? window.location.href : company.websiteUrl;
    const fallback = buildFallbackPayload(pageUrl);
    const payload = {
      feedbackType,
      pageSection: pageArea,
      message: details.trim(),
      email: email.trim(),
      pageUrl,
    };

    setSubmitState({ status: "submitting" });

    try {
      let submissionId = "";

      if (feedbackEndpoint) {
        const response = await fetch(feedbackEndpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            ...payload,
            honeypot,
          }),
        });

        const result = (await response.json().catch(() => null)) as {
          ok?: boolean;
          id?: string;
        } | null;

        if (!response.ok || result?.ok !== true) {
          throw new Error("Feedback API rejected submission.");
        }
        submissionId = result.id || "recorded";
      } else {
        submissionId = await submitFeedbackToFirestore(payload);
      }

      setSubmitState({ status: "submitted", submissionId });
      setDetails("");
      setEmail("");
      setPageArea("General Website");
    } catch {
      setSubmitState({
        status: "error",
        message:
          "We could not save your feedback online right now. Please try again, or send it directly by email below.",
        mailtoUrl: fallback.mailtoUrl,
        copyText: fallback.copyText,
      });
    }
  };

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="feedback"
      aria-labelledby="feedback-heading"
      className="py-14 sm:py-16 lg:py-20 border-b border-ivory-border bg-ivory scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="rounded-xl border border-ivory-border bg-ivory-light p-5 sm:p-8 lg:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-5 space-y-4 min-w-0">
              <div className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.14em] text-terracotta-dark font-medium">
                <MessageSquarePlus className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                <span>Website Feedback</span>
              </div>

              <h2
                id="feedback-heading"
                className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-ink text-balance"
              >
                Help us improve this website.
              </h2>

              <p className="text-sm sm:text-base text-ink-secondary leading-relaxed">
                Spot a typo, broken link, mobile layout issue, or have a suggestion
                for the site? Share it here. For new projects or services, use the{" "}
                <a
                  href="#contact"
                  className="text-forest font-medium hover:text-terracotta-dark underline underline-offset-4 transition-colors"
                >
                  Project Inquiry section above
                </a>
                .
              </p>

              <div className="pt-3 border-t border-ivory-border space-y-2 text-xs text-ink-muted leading-relaxed">
                <div className="flex items-center gap-1.5 font-mono text-ink-secondary font-medium">
                  <ShieldCheck className="w-3.5 h-3.5 text-forest shrink-0" aria-hidden="true" />
                  <span>What information is collected</span>
                </div>
                <p>
                  We collect only your selected feedback category, page section,
                  feedback message, the current page URL (to help locate issues),
                  and your email if you optionally choose to share it for a follow-up.
                  Submissions are stored securely for site review and never added to
                  marketing lists.
                </p>
              </div>
            </div>

            <div className="lg:col-span-7 min-w-0">
              <form onSubmit={handleSubmit} noValidate className="space-y-4 sm:space-y-5">
                {/* Spam honeypot field — hidden from humans */}
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="feedback-company-field">Leave blank</label>
                  <input
                    id="feedback-company-field"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                  />
                </div>

                <fieldset className="space-y-2">
                  <legend className="text-xs font-mono tracking-wider text-ink-secondary">
                    Feedback Type <span className="text-terracotta-dark">*</span>
                  </legend>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {(
                      [
                        "Suggestion",
                        "Report an Issue",
                        "Content Correction",
                      ] as const
                    ).map((option) => {
                      const active = feedbackType === option;
                      return (
                        <button
                          key={option}
                          type="button"
                          aria-pressed={active}
                          onClick={() => setFeedbackType(option)}
                          className={`min-h-[44px] px-3 py-2 rounded-lg border text-xs font-semibold transition-colors text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-forest ${
                            active
                              ? "border-forest bg-forest text-ivory"
                              : "border-ivory-border bg-ivory text-ink-secondary hover:border-forest hover:text-ink"
                          }`}
                        >
                          {option}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label
                      htmlFor="feedback-area"
                      className="block text-xs font-mono tracking-wider text-ink-secondary"
                    >
                      Related Section (optional)
                    </label>
                    <select
                      id="feedback-area"
                      value={pageArea}
                      onChange={(e) => setPageArea(e.target.value)}
                      className="w-full min-h-[44px] px-3.5 py-2.5 rounded-lg border border-ivory-border bg-ivory text-base sm:text-sm text-ink focus:outline-none focus:border-forest focus:ring-1 focus:ring-forest"
                    >
                      <option>General Website</option>
                      <option>Navigation &amp; Mobile Menu</option>
                      <option>Services</option>
                      <option>Projects</option>
                      <option>Founders &amp; Contact Links</option>
                      <option>Accessibility or Performance</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="feedback-email"
                      className="block text-xs font-mono tracking-wider text-ink-secondary"
                    >
                      Your Email (optional, for a reply)
                    </label>
                    <input
                      id="feedback-email"
                      type="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={
                        errors.email ? "feedback-email-error" : undefined
                      }
                      placeholder="you@example.com"
                      className="w-full min-h-[44px] px-3.5 py-2.5 rounded-lg border border-ivory-border bg-ivory text-base sm:text-sm text-ink placeholder:text-ink-muted focus:outline-none focus:border-forest focus:ring-1 focus:ring-forest"
                    />
                    {errors.email && (
                      <p
                        id="feedback-email-error"
                        role="alert"
                        className="text-xs text-terracotta-dark"
                      >
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="feedback-details"
                    className="block text-xs font-mono tracking-wider text-ink-secondary"
                  >
                    Your Feedback <span className="text-terracotta-dark">*</span>
                  </label>
                  <textarea
                    id="feedback-details"
                    rows={4}
                    maxLength={2000}
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    aria-invalid={Boolean(errors.details)}
                    aria-describedby={
                      errors.details ? "feedback-details-error" : undefined
                    }
                    placeholder="Describe your suggestion or the issue you noticed..."
                    className="w-full px-3.5 py-2.5 rounded-lg border border-ivory-border bg-ivory text-base sm:text-sm text-ink placeholder:text-ink-muted focus:outline-none focus:border-forest focus:ring-1 focus:ring-forest resize-y"
                  />
                  {errors.details && (
                    <p
                      id="feedback-details-error"
                      role="alert"
                      className="text-xs text-terracotta-dark"
                    >
                      {errors.details}
                    </p>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                  <button
                    type="submit"
                    disabled={submitState.status === "submitting"}
                    className="w-full sm:w-auto min-h-[46px] inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-forest text-ivory text-sm font-semibold hover:bg-forest-dark disabled:opacity-60 transition-colors whitespace-nowrap shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-forest focus-visible:ring-offset-2 focus-visible:ring-offset-ivory-light"
                  >
                    {submitState.status === "submitting" ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                        Submitting...
                      </>
                    ) : (
                      "Submit Feedback"
                    )}
                  </button>

                  <span className="text-xs text-ink-muted">
                    Prefer email? Write to{" "}
                    <a
                      href={`mailto:${company.email}?subject=${encodeURIComponent(
                        "[TRIQON AI] Website Feedback"
                      )}`}
                      className="font-mono text-forest hover:text-terracotta-dark underline underline-offset-4"
                    >
                      {company.email}
                    </a>
                    .
                  </span>
                </div>

                {submitState.status === "submitted" && (
                  <div
                    role="status"
                    aria-live="polite"
                    className="p-4 rounded-lg border border-forest/35 bg-sage-tint/75 flex items-start gap-2.5 text-sm text-ink"
                  >
                    <CheckCircle2
                      className="w-4 h-4 text-forest shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <p>
                      <strong>Feedback received.</strong> Thank you for helping us
                      improve TRIQON AI.
                    </p>
                  </div>
                )}

                {submitState.status === "error" && (
                  <div
                    role="alert"
                    className="p-4 rounded-lg border border-terracotta/40 bg-terracotta-tint/70 text-sm space-y-3"
                  >
                    <div className="flex items-start gap-2.5 text-ink">
                      <AlertCircle
                        className="w-4 h-4 text-terracotta-dark shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      <p className="leading-relaxed">{submitState.message}</p>
                    </div>
                    <div className="flex flex-wrap gap-2.5 sm:pl-6">
                      <a
                        href={submitState.mailtoUrl}
                        className="min-h-[44px] sm:min-h-[38px] inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-forest text-ivory text-xs font-semibold hover:bg-forest-dark transition-colors"
                      >
                        <Mail className="w-3.5 h-3.5" aria-hidden="true" />
                        Email {company.email}
                      </a>
                      <button
                        type="button"
                        onClick={() => handleCopy(submitState.copyText)}
                        className="min-h-[44px] sm:min-h-[38px] inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md border border-ivory-border bg-ivory text-xs font-medium text-ink hover:border-forest transition-colors"
                      >
                        <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                        {copied ? "Copied!" : "Copy Feedback"}
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
