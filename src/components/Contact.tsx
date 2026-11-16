import { useState, FormEvent } from "react";
import { Mail, Linkedin, Send, CheckCircle2, Copy, ExternalLink } from "lucide-react";

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const DIRECT_CONTACTS = [
  {
    name: "Amjad Ali",
    role: "Co-founder",
    email: "itsamajdali.67@gmail.com",
    linkedin: "https://www.linkedin.com/in/amjad-ali-ai/",
  },
  {
    name: "Faizan Haider",
    role: "CEO & Co-founder | AI Engineer",
    email: "faizanhaider998@gmail.com",
    linkedin: "https://www.linkedin.com/in/faizan-haider998/",
  },
  {
    name: "Zia Ur Rehman",
    role: "Co-founder",
    linkedin: "https://www.linkedin.com/in/zia-ur-rehman-854381354/",
  },
];

export function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState("AI Solutions & Automation");
  const [recipient, setRecipient] = useState("itsamajdali.67@gmail.com");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [prepared, setPrepared] = useState<{
    mailtoUrl: string;
    copyText: string;
    toEmail: string;
  } | null>(null);
  const [copied, setCopied] = useState(false);

  const validate = (): FormErrors => {
    const next: FormErrors = {};
    if (name.trim().length < 2) next.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      next.email = "Please enter a valid email address.";
    }
    if (message.trim().length < 10) {
      next.message = "Please include at least 10 characters describing your idea or inquiry.";
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

    const subject = `[TRIQON AI] ${topic} — ${name.trim()}`;
    const body = `Name: ${name.trim()}\nReply Email: ${email.trim()}\nTopic: ${topic}\n\n${message.trim()}`;
    const mailtoUrl = `mailto:${recipient}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    setPrepared({
      toEmail: recipient,
      mailtoUrl,
      copyText: `To: ${recipient}\nSubject: ${subject}\n\n${body}`,
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

  return (
    <section
      id="contact"
      className="py-20 sm:py-24 border-b border-ivory-border bg-ivory-light/60"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5 space-y-6">
            <p className="text-xs font-mono uppercase tracking-[0.16em] text-terracotta font-medium">
              Contact TRIQON AI
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-ink leading-tight">
              Have an Idea? Let&apos;s Build Something Intelligent.
            </h2>
            <p className="text-base text-ink-secondary leading-relaxed">
              Reach out directly to our founding team via email or LinkedIn, or prepare
              an inquiry using the form.
            </p>

            <div className="space-y-3 pt-2">
              {DIRECT_CONTACTS.map((person) => (
                <div
                  key={person.name}
                  className="p-4 rounded-xl border border-ivory-border bg-ivory flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div>
                    <h3 className="font-display text-sm font-bold text-ink">
                      {person.name}
                    </h3>
                    <p className="text-xs text-ink-muted">{person.role}</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    {person.email && (
                      <a
                        href={`mailto:${person.email}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-ivory-border bg-ivory-light text-xs font-medium text-ink hover:border-forest hover:text-forest transition-colors"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        {person.email}
                      </a>
                    )}
                    <a
                      href={person.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${person.name} LinkedIn`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-ivory-border bg-ivory-light text-xs font-medium text-ink hover:border-forest hover:text-forest transition-colors"
                    >
                      <Linkedin className="w-3.5 h-3.5" />
                      LinkedIn
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              noValidate
              className="rounded-xl border border-ivory-border bg-ivory p-6 sm:p-8 space-y-5"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label
                    htmlFor="contact-name"
                    className="block text-xs font-mono uppercase tracking-wider text-ink-secondary"
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
                    htmlFor="contact-email"
                    className="block text-xs font-mono uppercase tracking-wider text-ink-secondary"
                  >
                    Email Address
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-ivory-border bg-ivory-light text-sm text-ink placeholder:text-ink-muted focus:outline-none focus:border-forest"
                  />
                  {errors.email && (
                    <p className="text-xs text-terracotta-dark">{errors.email}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label
                    htmlFor="contact-topic"
                    className="block text-xs font-mono uppercase tracking-wider text-ink-secondary"
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
                    <option>Partnership / General Inquiry</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="contact-recipient"
                    className="block text-xs font-mono uppercase tracking-wider text-ink-secondary"
                  >
                    Direct To
                  </label>
                  <select
                    id="contact-recipient"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-ivory-border bg-ivory-light text-sm text-ink focus:outline-none focus:border-forest"
                  >
                    <option value="itsamajdali.67@gmail.com">
                      Amjad Ali (Co-founder)
                    </option>
                    <option value="faizanhaider998@gmail.com">
                      Faizan Haider (CEO &amp; Co-founder | AI Engineer)
                    </option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="contact-message"
                  className="block text-xs font-mono uppercase tracking-wider text-ink-secondary"
                >
                  Project or Inquiry Details
                </label>
                <textarea
                  id="contact-message"
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us about the problem you are looking to solve..."
                  className="w-full px-3.5 py-2.5 rounded-lg border border-ivory-border bg-ivory-light text-sm text-ink placeholder:text-ink-muted focus:outline-none focus:border-forest resize-y"
                />
                {errors.message && (
                  <p className="text-xs text-terracotta-dark">{errors.message}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-forest text-ivory text-sm font-semibold hover:bg-forest-dark transition-colors"
              >
                <Send className="w-4 h-4" />
                Prepare Inquiry
              </button>

              {prepared && (
                <div
                  role="status"
                  className="p-4 rounded-lg border border-forest/30 bg-sage-tint/70 text-sm space-y-3"
                >
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-forest shrink-0 mt-0.5" />
                    <p className="leading-relaxed text-ink">
                      Your inquiry is validated and ready to send to{" "}
                      <strong>{prepared.toEmail}</strong>.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2.5 pl-6">
                    <a
                      href={prepared.mailtoUrl}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md bg-forest text-ivory text-xs font-semibold hover:bg-forest-dark transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      Open Email Client
                    </a>
                    <button
                      type="button"
                      onClick={() => handleCopy(prepared.copyText)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md border border-ivory-border bg-ivory text-xs font-medium text-ink hover:border-forest transition-colors"
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
