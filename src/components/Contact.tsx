import { useState, useEffect, FormEvent } from "react";
import {
  Mail,
  Linkedin,
  Send,
  CheckCircle2,
  Copy,
  ExternalLink,
  Phone,
  MessageCircle,
} from "lucide-react";
import { FOUNDERS } from "@/data/siteData";

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
  selectedFounderId = "amjad-ali",
}: ContactProps) {
  const [name, setName] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [topic, setTopic] = useState(selectedTopic);
  const [recipientId, setRecipientId] = useState(selectedFounderId);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [prepared, setPrepared] = useState<{
    founderName: string;
    whatsappUrl: string;
    mailtoUrl?: string;
    toEmail?: string;
    copyText: string;
  } | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setTopic(selectedTopic);
  }, [selectedTopic]);

  useEffect(() => {
    setRecipientId(selectedFounderId);
  }, [selectedFounderId]);

  const activeFounder =
    FOUNDERS.find((f) => f.id === recipientId) || FOUNDERS[1];

  const validate = (): FormErrors => {
    const next: FormErrors = {};
    if (name.trim().length < 2) {
      next.name = "Please enter your name.";
    }
    const trimmedContact = contactInfo.trim();
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedContact);
    const isPhone = /^[+\d][\d\s-]{7,18}$/.test(trimmedContact);
    if (!isEmail && !isPhone) {
      next.contactInfo = "Please enter a valid email address or phone/WhatsApp number.";
    }
    if (message.trim().length < 10) {
      next.message =
        "Please include at least 10 characters describing your idea or inquiry.";
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

    const formattedText = `Hello ${activeFounder.name} (TRIQON AI),\n\nName: ${cleanName}\nContact: ${cleanContact}\nTopic: ${topic}\n\nMessage:\n${cleanMessage}`;
    const whatsappUrl = `https://wa.me/${activeFounder.whatsapp}?text=${encodeURIComponent(
      formattedText
    )}`;

    const subject = `[TRIQON AI] ${topic} — ${cleanName}`;
    const mailtoUrl = activeFounder.email
      ? `mailto:${activeFounder.email}?subject=${encodeURIComponent(
          subject
        )}&body=${encodeURIComponent(formattedText)}`
      : undefined;

    setPrepared({
      founderName: activeFounder.name,
      whatsappUrl,
      mailtoUrl,
      toEmail: activeFounder.email,
      copyText: formattedText,
    });
  };

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const quickWhatsappText = `Hello ${activeFounder.name}, I would like to discuss ${topic} with TRIQON AI.`;
  const quickWhatsappUrl = `https://wa.me/${activeFounder.whatsapp}?text=${encodeURIComponent(
    quickWhatsappText
  )}`;

  return (
    <section
      id="contact"
      className="py-20 sm:py-24 border-b border-ivory-border bg-ivory-light/60"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 space-y-6">
            <p className="text-xs font-mono tracking-[0.14em] text-terracotta font-medium">
              Contact TRIQON AI
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-ink leading-tight text-balance">
              Have an Idea? Message Us Directly.
            </h2>
            <p className="text-base text-ink-secondary leading-relaxed">
              Reach any of our founders directly on WhatsApp, phone, or email—or send
              your project brief using the direct message form.
            </p>

            <div className="space-y-3 pt-2">
              {FOUNDERS.map((person) => {
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
                      <div>
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
                        className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors whitespace-nowrap shrink-0 ${
                          isSelected
                            ? "bg-forest text-ivory"
                            : "border border-ivory-border bg-ivory-light text-ink-secondary hover:border-forest hover:text-forest"
                        }`}
                      >
                        {isSelected ? "Selected" : "Message in Form"}
                      </button>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <a
                        href={`https://wa.me/${person.whatsapp}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-forest text-ivory text-xs font-semibold hover:bg-forest-dark transition-colors whitespace-nowrap shrink-0"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        WhatsApp
                      </a>
                      <a
                        href={`tel:${person.phone.replace(/\s+/g, "")}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-ivory-border bg-ivory-light text-xs font-medium text-ink hover:border-forest hover:text-forest transition-colors whitespace-nowrap shrink-0"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        Call
                      </a>
                      {person.email && (
                        <a
                          href={`mailto:${person.email}`}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-ivory-border bg-ivory-light text-xs font-medium text-ink hover:border-forest hover:text-forest transition-colors whitespace-nowrap shrink-0"
                        >
                          <Mail className="w-3.5 h-3.5" />
                          Email
                        </a>
                      )}
                      <a
                        href={person.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${person.name} LinkedIn`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-ivory-border bg-ivory-light text-xs font-medium text-ink hover:border-forest hover:text-forest transition-colors whitespace-nowrap shrink-0"
                      >
                        <Linkedin className="w-3.5 h-3.5" />
                        LinkedIn
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              noValidate
              className="rounded-xl border border-ivory-border bg-ivory p-6 sm:p-8 space-y-5"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-ivory-border">
                <div>
                  <h3 className="font-display text-lg font-bold text-ink">
                    Direct Message to {activeFounder.name}
                  </h3>
                  <p className="text-xs text-ink-muted">
                    Send directly via WhatsApp{activeFounder.email ? " or Email" : ""}
                  </p>
                </div>
                <span className="text-xs font-mono text-forest tabular-nums">
                  {activeFounder.phone}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label
                    htmlFor="contact-name"
                    className="block text-xs font-mono tracking-wider text-ink-secondary"
                  >
                    Your Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Sara Ahmed"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-ivory-border bg-ivory-light text-sm text-ink placeholder:text-ink-muted focus:outline-none focus:border-forest"
                  />
                  {errors.name && (
                    <p className="text-xs text-terracotta-dark">{errors.name}</p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="contact-info"
                    className="block text-xs font-mono tracking-wider text-ink-secondary"
                  >
                    Your Email or WhatsApp
                  </label>
                  <input
                    id="contact-info"
                    type="text"
                    value={contactInfo}
                    onChange={(e) => setContactInfo(e.target.value)}
                    placeholder="you@company.com or +92 3XX XXXXXXX"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-ivory-border bg-ivory-light text-sm text-ink placeholder:text-ink-muted focus:outline-none focus:border-forest"
                  />
                  {errors.contactInfo && (
                    <p className="text-xs text-terracotta-dark">{errors.contactInfo}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label
                    htmlFor="contact-topic"
                    className="block text-xs font-mono tracking-wider text-ink-secondary"
                  >
                    Area of Interest
                  </label>
                  <select
                    id="contact-topic"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-ivory-border bg-ivory-light text-sm text-ink focus:outline-none focus:border-forest"
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
                    Direct To
                  </label>
                  <select
                    id="contact-recipient"
                    value={recipientId}
                    onChange={(e) => setRecipientId(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-ivory-border bg-ivory-light text-sm text-ink focus:outline-none focus:border-forest"
                  >
                    {FOUNDERS.map((founder) => (
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
                  Project or Inquiry Details
                </label>
                <textarea
                  id="contact-message"
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us what you want to build, automate, or discuss..."
                  className="w-full px-3.5 py-2.5 rounded-lg border border-ivory-border bg-ivory-light text-sm text-ink placeholder:text-ink-muted focus:outline-none focus:border-forest resize-y"
                />
                {errors.message && (
                  <p className="text-xs text-terracotta-dark">{errors.message}</p>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-forest text-ivory text-sm font-semibold hover:bg-forest-dark transition-colors whitespace-nowrap shrink-0"
                >
                  <Send className="w-4 h-4" />
                  Prepare Direct Message
                </button>

                <a
                  href={quickWhatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg border border-ivory-border bg-ivory-light text-ink text-sm font-semibold hover:border-forest hover:text-forest transition-colors whitespace-nowrap shrink-0"
                >
                  <MessageCircle className="w-4 h-4 text-forest" />
                  Quick WhatsApp Chat
                </a>
              </div>

              {prepared && (
                <div
                  role="status"
                  className="p-4 rounded-lg border border-forest/30 bg-sage-tint/70 text-sm space-y-3"
                >
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-forest shrink-0 mt-0.5" />
                    <p className="leading-relaxed text-ink">
                      Message ready for <strong>{prepared.founderName}</strong>. Choose
                      how you want to send it directly:
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2.5 pl-6">
                    <a
                      href={prepared.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-forest text-ivory text-xs font-semibold hover:bg-forest-dark transition-colors whitespace-nowrap shrink-0"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      Send on WhatsApp
                    </a>
                    {prepared.mailtoUrl && (
                      <a
                        href={prepared.mailtoUrl}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md border border-forest/30 bg-ivory text-xs font-semibold text-ink hover:border-forest transition-colors whitespace-nowrap shrink-0"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        Send via Email
                      </a>
                    )}
                    <button
                      type="button"
                      onClick={() => handleCopy(prepared.copyText)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md border border-ivory-border bg-ivory text-xs font-medium text-ink hover:border-forest transition-colors whitespace-nowrap shrink-0"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      {copied ? "Copied!" : "Copy Message"}
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
