import { useState, useEffect, type FormEvent } from "react";
import {
  Mail,
  Linkedin,
  Send,
  CheckCircle2,
  Copy,
  ExternalLink,
  Phone,
  MessageCircle,
  Building2,
} from "lucide-react";
import { useSiteContent } from "@/lib/contentLoader";

interface FormErrors {
  name?: string;
  contactInfo?: string;
  message?: string;
}

interface ContactProps {
  selectedTopic?: string;
  selectedFounderId?: string;
}

export function Contact({
  selectedTopic = "AI Solutions & Automation",
  selectedFounderId = "company",
}: ContactProps) {
  const { company, founders } = useSiteContent();

  const [name, setName] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [topic, setTopic] = useState(selectedTopic);
  const [recipientId, setRecipientId] = useState(selectedFounderId);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [prepared, setPrepared] = useState<{
    recipientName: string;
    whatsappUrl?: string;
    mailtoUrl?: string;
    toEmail?: string;
    copyText: string;
  } | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  useEffect(() => {
    setTopic(selectedTopic);
  }, [selectedTopic]);

  useEffect(() => {
    setRecipientId(selectedFounderId);
  }, [selectedFounderId]);

  const activeFounder =
    recipientId === "company"
      ? null
      : founders.find((f) => f.id === recipientId) || null;

  const copyToClipboard = async (text: string, key: string) => {
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
    setCopiedKey(key);
    setTimeout(() => {
      setCopiedKey((current) => (current === key ? null : current));
    }, 2000);
  };

  const validate = (): FormErrors => {
    const next: FormErrors = {};
    if (name.trim().length < 2) {
      next.name = "Please enter your name.";
    }
    const trimmedContact = contactInfo.trim();
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedContact);
    const isPhone = /^[+\d][\d\s()-]{7,18}$/.test(trimmedContact);
    if (!isEmail && !isPhone) {
      next.contactInfo =
        "Please enter a valid email address or phone/WhatsApp number.";
    }
    if (message.trim().length < 10) {
      next.message =
        "Please include at least 10 characters describing your project or inquiry.";
    }
    return next;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      setPrepared(null);
      return;
    }

    const cleanName = name.trim();
    const cleanContact = contactInfo.trim();
    const cleanMessage = message.trim();

    const recipientLabel = activeFounder
      ? `${activeFounder.name} (${company.name})`
      : `${company.name} Team`;

    const formattedText = `Hello ${recipientLabel},\n\nName: ${cleanName}\nContact: ${cleanContact}\nTopic: ${topic}\n\nProject Inquiry:\n${cleanMessage}`;

    const subject = `[TRIQON AI Inquiry] ${topic} — ${cleanName}`;
    const targetEmail = activeFounder ? activeFounder.email : company.email;
    const mailtoUrl = targetEmail
      ? `mailto:${targetEmail}?subject=${encodeURIComponent(
          subject
        )}&body=${encodeURIComponent(formattedText)}`
      : undefined;

    const whatsappUrl = activeFounder
      ? `https://wa.me/${activeFounder.whatsapp}?text=${encodeURIComponent(
          formattedText
        )}`
      : undefined;

    setPrepared({
      recipientName: activeFounder ? activeFounder.name : `${company.name} (${company.email})`,
      whatsappUrl,
      mailtoUrl,
      toEmail: targetEmail,
      copyText: formattedText,
    });
  };

  const quickWhatsappUrl = activeFounder
    ? `https://wa.me/${activeFounder.whatsapp}?text=${encodeURIComponent(
        `Hello ${activeFounder.name}, I would like to discuss ${topic} with ${company.name}.`
      )}`
    : null;

  return (
    <section
      id="contact"
      className="py-16 sm:py-20 lg:py-24 border-b border-ivory-border bg-ivory-light/60 scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          <div className="lg:col-span-5 space-y-6 min-w-0">
            <div className="space-y-3">
              <p className="text-xs font-mono tracking-[0.14em] text-terracotta-dark font-medium">
                Contact &amp; Project Inquiries
              </p>
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-ink leading-tight text-balance">
                Have a Project in Mind? Let&apos;s Talk.
              </h2>
              <p className="text-sm sm:text-base text-ink-secondary leading-relaxed">
                Email our general company inbox for project inquiries and
                partnerships, or contact one of our founders directly on WhatsApp,
                phone, or email.
              </p>
            </div>

            {/* General Company Contact — Distinct from individual founder channels */}
            <div className="p-5 rounded-xl border border-forest/35 bg-ivory space-y-3.5">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1 min-w-0">
                  <div className="inline-flex items-center gap-1.5 text-xs font-mono text-forest font-medium">
                    <Building2 className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                    <span>General Company Contact</span>
                  </div>
                  <h3 className="font-display text-base font-bold text-ink">
                    {company.name} Official Inbox
                  </h3>
                  <a
                    href={`mailto:${company.email}`}
                    className="block text-sm font-mono text-forest hover:text-terracotta-dark underline underline-offset-4 break-all transition-colors"
                  >
                    {company.email}
                  </a>
                </div>
                <button
                  type="button"
                  onClick={() => setRecipientId("company")}
                  className={`min-h-[36px] px-3 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                    recipientId === "company"
                      ? "bg-forest text-ivory"
                      : "border border-ivory-border bg-ivory-light text-ink-secondary hover:border-forest hover:text-forest"
                  }`}
                >
                  {recipientId === "company" ? "Selected" : "Use in Form"}
                </button>
              </div>

              <div className="flex flex-wrap gap-2 pt-1">
                <a
                  href={`mailto:${company.email}?subject=${encodeURIComponent(
                    `[TRIQON AI] General Project Inquiry`
                  )}`}
                  className="min-h-[44px] sm:min-h-[38px] inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-forest text-ivory text-xs font-semibold hover:bg-forest-dark transition-colors whitespace-nowrap shrink-0"
                >
                  <Mail className="w-3.5 h-3.5" aria-hidden="true" />
                  Email {company.email}
                </a>
                <button
                  type="button"
                  onClick={() => copyToClipboard(company.email, "company-email")}
                  className="min-h-[44px] sm:min-h-[38px] inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-ivory-border bg-ivory-light text-xs font-medium text-ink hover:border-forest hover:text-forest transition-colors whitespace-nowrap shrink-0"
                >
                  <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                  {copiedKey === "company-email" ? "Copied!" : "Copy Email"}
                </button>
              </div>
            </div>

            {/* Direct Founder Contacts */}
            <div className="space-y-3 pt-1">
              <p className="text-xs font-mono tracking-[0.12em] text-ink-muted">
                Direct Founder Contacts
              </p>

              {founders.map((person) => {
                const isSelected = person.id === recipientId;
                return (
                  <div
                    key={person.id}
                    className={`p-4 rounded-xl border transition-colors ${
                      isSelected
                        ? "border-forest bg-ivory"
                        : "border-ivory-border bg-ivory"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="min-w-0">
                        <h3 className="font-display text-sm font-bold text-ink">
                          {person.name}
                        </h3>
                        <p className="text-xs text-ink-muted">{person.role}</p>
                        <p className="text-xs font-mono text-ink-secondary mt-1 tabular-nums">
                          {person.phone}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setRecipientId(person.id)}
                        className={`min-h-[36px] px-2.5 py-1 rounded-md text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                          isSelected
                            ? "bg-forest text-ivory"
                            : "border border-ivory-border bg-ivory-light text-ink-secondary hover:border-forest hover:text-forest"
                        }`}
                      >
                        {isSelected ? "Selected" : "Message"}
                      </button>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <a
                        href={`https://wa.me/${person.whatsapp}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Message ${person.name} on WhatsApp`}
                        className="min-h-[44px] sm:min-h-[36px] inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-forest text-ivory text-xs font-semibold hover:bg-forest-dark transition-colors whitespace-nowrap shrink-0"
                      >
                        <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" />
                        WhatsApp
                      </a>
                      <a
                        href={`tel:${person.phone.replace(/\s+/g, "")}`}
                        aria-label={`Call ${person.name}`}
                        className="min-h-[44px] sm:min-h-[36px] inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-ivory-border bg-ivory-light text-xs font-medium text-ink hover:border-forest hover:text-forest transition-colors whitespace-nowrap shrink-0"
                      >
                        <Phone className="w-3.5 h-3.5" aria-hidden="true" />
                        Call
                      </a>
                      {person.email && (
                        <a
                          href={`mailto:${person.email}`}
                          aria-label={`Email ${person.name} at ${person.email}`}
                          className="min-h-[44px] sm:min-h-[36px] inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-ivory-border bg-ivory-light text-xs font-medium text-ink hover:border-forest hover:text-forest transition-colors whitespace-nowrap shrink-0"
                        >
                          <Mail className="w-3.5 h-3.5" aria-hidden="true" />
                          Email
                        </a>
                      )}
                      <a
                        href={person.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${person.name} on LinkedIn`}
                        className="min-h-[44px] sm:min-h-[36px] inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-ivory-border bg-ivory-light text-xs font-medium text-ink hover:border-forest hover:text-forest transition-colors whitespace-nowrap shrink-0"
                      >
                        <Linkedin className="w-3.5 h-3.5" aria-hidden="true" />
                        LinkedIn
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-7 min-w-0">
            <form
              onSubmit={handleSubmit}
              noValidate
              className="rounded-xl border border-ivory-border bg-ivory p-5 sm:p-8 space-y-5"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-ivory-border">
                <div className="min-w-0">
                  <h3 className="font-display text-lg font-bold text-ink">
                    Project Inquiry{" "}
                    <span className="font-normal text-ink-secondary">
                      · {activeFounder ? activeFounder.name : "General Inbox"}
                    </span>
                  </h3>
                  <p className="text-xs text-ink-muted mt-0.5">
                    {activeFounder
                      ? `Drafts a direct WhatsApp message${
                          activeFounder.email ? " or email" : ""
                        } to ${activeFounder.name}.`
                      : `Drafts a structured email to ${company.email}.`}
                  </p>
                </div>
                <span className="text-xs font-mono text-forest tabular-nums break-all">
                  {activeFounder ? activeFounder.phone : company.email}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                <div className="space-y-1.5">
                  <label
                    htmlFor="contact-name"
                    className="block text-xs font-mono tracking-wider text-ink-secondary"
                  >
                    Your Name <span className="text-terracotta-dark">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "contact-name-error" : undefined}
                    placeholder="e.g. Sara Ahmed"
                    className="w-full min-h-[44px] px-3.5 py-2.5 rounded-lg border border-ivory-border bg-ivory-light text-base sm:text-sm text-ink placeholder:text-ink-muted focus:outline-none focus:border-forest focus:ring-1 focus:ring-forest"
                  />
                  {errors.name && (
                    <p
                      id="contact-name-error"
                      role="alert"
                      className="text-xs text-terracotta-dark"
                    >
                      {errors.name}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="contact-info"
                    className="block text-xs font-mono tracking-wider text-ink-secondary"
                  >
                    Your Email or WhatsApp <span className="text-terracotta-dark">*</span>
                  </label>
                  <input
                    id="contact-info"
                    type="text"
                    autoComplete="email"
                    value={contactInfo}
                    onChange={(e) => setContactInfo(e.target.value)}
                    aria-invalid={Boolean(errors.contactInfo)}
                    aria-describedby={
                      errors.contactInfo ? "contact-info-error" : undefined
                    }
                    placeholder="you@company.com or +92 3XX XXXXXXX"
                    className="w-full min-h-[44px] px-3.5 py-2.5 rounded-lg border border-ivory-border bg-ivory-light text-base sm:text-sm text-ink placeholder:text-ink-muted focus:outline-none focus:border-forest focus:ring-1 focus:ring-forest"
                  />
                  {errors.contactInfo && (
                    <p
                      id="contact-info-error"
                      role="alert"
                      className="text-xs text-terracotta-dark"
                    >
                      {errors.contactInfo}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                <div className="space-y-1.5">
                  <label
                    htmlFor="contact-topic"
                    className="block text-xs font-mono tracking-wider text-ink-secondary"
                  >
                    Service or Topic
                  </label>
                  <select
                    id="contact-topic"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="w-full min-h-[44px] px-3.5 py-2.5 rounded-lg border border-ivory-border bg-ivory-light text-base sm:text-sm text-ink focus:outline-none focus:border-forest focus:ring-1 focus:ring-forest"
                  >
                    <option>AI Solutions &amp; Automation</option>
                    <option>Generative AI &amp; RAG</option>
                    <option>Data Science &amp; ML</option>
                    <option>Digital Marketing &amp; Growth</option>
                    <option>Partnership / General Inquiry</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="contact-recipient"
                    className="block text-xs font-mono tracking-wider text-ink-secondary"
                  >
                    Send Inquiry To
                  </label>
                  <select
                    id="contact-recipient"
                    value={recipientId}
                    onChange={(e) => setRecipientId(e.target.value)}
                    className="w-full min-h-[44px] px-3.5 py-2.5 rounded-lg border border-ivory-border bg-ivory-light text-base sm:text-sm text-ink focus:outline-none focus:border-forest focus:ring-1 focus:ring-forest"
                  >
                    <option value="company">
                      TRIQON AI — General Inquiries ({company.email})
                    </option>
                    {founders.map((founder) => (
                      <option key={founder.id} value={founder.id}>
                        {founder.name} ({founder.role.split("|")[0].trim()})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="contact-message"
                  className="block text-xs font-mono tracking-wider text-ink-secondary"
                >
                  Project or Inquiry Details <span className="text-terracotta-dark">*</span>
                </label>
                <textarea
                  id="contact-message"
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={
                    errors.message ? "contact-message-error" : undefined
                  }
                  placeholder="Tell us what you want to build, automate, or grow..."
                  className="w-full px-3.5 py-2.5 rounded-lg border border-ivory-border bg-ivory-light text-base sm:text-sm text-ink placeholder:text-ink-muted focus:outline-none focus:border-forest focus:ring-1 focus:ring-forest resize-y"
                />
                {errors.message && (
                  <p
                    id="contact-message-error"
                    role="alert"
                    className="text-xs text-terracotta-dark"
                  >
                    {errors.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3 pt-1">
                <button
                  type="submit"
                  className="w-full sm:w-auto min-h-[46px] inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-forest text-ivory text-sm font-semibold hover:bg-forest-dark transition-colors whitespace-nowrap shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-forest focus-visible:ring-offset-2 focus-visible:ring-offset-ivory"
                >
                  <Send className="w-4 h-4 shrink-0" aria-hidden="true" />
                  Prepare Inquiry
                </button>

                {quickWhatsappUrl ? (
                  <a
                    href={quickWhatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto min-h-[46px] inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg border border-ivory-border bg-ivory-light text-ink text-sm font-semibold hover:border-forest hover:text-forest transition-colors whitespace-nowrap shrink-0"
                  >
                    <MessageCircle
                      className="w-4 h-4 text-forest shrink-0"
                      aria-hidden="true"
                    />
                    Quick WhatsApp Chat
                  </a>
                ) : (
                  <a
                    href={`mailto:${company.email}?subject=${encodeURIComponent(
                      `[TRIQON AI] ${topic}`
                    )}`}
                    className="w-full sm:w-auto min-h-[46px] inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg border border-ivory-border bg-ivory-light text-ink text-sm font-semibold hover:border-forest hover:text-forest transition-colors whitespace-nowrap shrink-0"
                  >
                    <Mail className="w-4 h-4 text-forest shrink-0" aria-hidden="true" />
                    Direct Email ({company.email})
                  </a>
                )}
              </div>

              {prepared && (
                <div
                  role="status"
                  aria-live="polite"
                  className="p-4 rounded-lg border border-forest/30 bg-sage-tint/70 text-sm space-y-3"
                >
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2
                      className="w-4 h-4 text-forest shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <p className="leading-relaxed text-ink">
                      Your message draft is ready for{" "}
                      <strong>{prepared.recipientName}</strong>. Choose how to send it
                      now:
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2.5 sm:pl-6">
                    {prepared.whatsappUrl && (
                      <a
                        href={prepared.whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="min-h-[44px] sm:min-h-[38px] inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-forest text-ivory text-xs font-semibold hover:bg-forest-dark transition-colors whitespace-nowrap shrink-0"
                      >
                        <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" />
                        Send on WhatsApp
                      </a>
                    )}
                    {prepared.mailtoUrl && (
                      <a
                        href={prepared.mailtoUrl}
                        className={`min-h-[44px] sm:min-h-[38px] inline-flex items-center gap-1.5 px-4 py-2 rounded-md text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                          prepared.whatsappUrl
                            ? "border border-forest/30 bg-ivory text-ink hover:border-forest"
                            : "bg-forest text-ivory hover:bg-forest-dark"
                        }`}
                      >
                        <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                        Open Email Client
                      </a>
                    )}
                    <button
                      type="button"
                      onClick={() => copyToClipboard(prepared.copyText, "inquiry-draft")}
                      className="min-h-[44px] sm:min-h-[38px] inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md border border-ivory-border bg-ivory text-xs font-medium text-ink hover:border-forest transition-colors whitespace-nowrap shrink-0"
                    >
                      <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                      {copiedKey === "inquiry-draft" ? "Copied!" : "Copy Message"}
                    </button>
                  </div>
                </div>
              )}

              <p className="text-xs text-ink-muted pt-1">
                Want to suggest a website improvement or report a broken link?{" "}
                <a
                  href="#feedback"
                  className="text-forest hover:text-terracotta-dark underline underline-offset-4 transition-colors"
                >
                  Use the Website Feedback form below
                </a>
                .
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
