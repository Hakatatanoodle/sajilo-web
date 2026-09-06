"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { site } from "@/content/site";
import { Button } from "@/components/Button";
import { ArrowRight, Check, Mail } from "@/components/icons";
import { cn } from "@/lib/cn";

const NEEDS = [
  "Business website",
  "Landing page",
  "Booking or inquiry system",
  "Online store / catalog",
  "Something else",
] as const;

type FieldErrors = Partial<Record<"name" | "contact" | "message", string>>;

const inputStyles =
  "w-full rounded-xl border border-white/10 bg-ink/60 px-4 py-3 text-sm text-fg placeholder:text-fg-faint transition-colors focus:border-accent/60 focus:outline-none";

function FieldError({ id, error }: { id: string; error?: string }) {
  return (
    <p
      id={id}
      role="alert"
      className={cn("mt-1.5 text-xs text-rose-300", !error && "hidden")}
    >
      {error}
    </p>
  );
}

function Label({ htmlFor, children }: { htmlFor: string; children: ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="text-sm font-semibold text-fg">
      {children}
    </label>
  );
}

/**
 * Contact form — honest by design.
 *
 * There is no backend yet (architecture.md: the smallest architecture that
 * works), so this composes a prefilled draft in the visitor's own email app.
 * Nothing is stored and nothing is silently "sent" — the visitor's mail
 * client does the actual sending.
 */
export function InquiryComposer() {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [need, setNeed] = useState<string>(NEEDS[0]);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [draftOpened, setDraftOpened] = useState(false);
  const [copied, setCopied] = useState(false);

  function validate(): FieldErrors {
    const next: FieldErrors = {};
    if (!name.trim()) next.name = "Please tell us your name.";
    if (!contact.trim()) {
      next.contact = "Add an email or phone so we can reply.";
    } else if (contact.trim().length < 5) {
      next.contact = "That contact looks too short.";
    }
    if (message.trim().length < 10) {
      next.message = "A sentence or two helps us reply usefully.";
    }
    return next;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const subject = `Project inquiry — ${need}`;
    const body = [
      `Name: ${name}`,
      `Reply to: ${contact}`,
      `Need: ${need}`,
      "",
      message,
    ].join("\n");

    window.location.href = `mailto:${site.contact.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    setDraftOpened(true);
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(site.contact.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="inq-name">Your name</Label>
          <input
            id="inq-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Sita Gurung"
            className={cn(inputStyles, "mt-2")}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "inq-name-error" : undefined}
          />
          <FieldError id="inq-name-error" error={errors.name} />
        </div>
        <div>
          <Label htmlFor="inq-contact">Email or phone</Label>
          <input
            id="inq-contact"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            placeholder="Where should we reply?"
            className={cn(inputStyles, "mt-2")}
            aria-invalid={Boolean(errors.contact)}
            aria-describedby={errors.contact ? "inq-contact-error" : undefined}
          />
          <FieldError id="inq-contact-error" error={errors.contact} />
        </div>
      </div>

      <div className="mt-5">
        <Label htmlFor="inq-need">What do you need?</Label>
        <select
          id="inq-need"
          value={need}
          onChange={(e) => setNeed(e.target.value)}
          className={cn(inputStyles, "mt-2 appearance-none")}
        >
          {NEEDS.map((option) => (
            <option key={option} value={option} className="bg-ink text-fg">
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-5">
        <Label htmlFor="inq-message">About your business</Label>
        <textarea
          id="inq-message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={5}
          placeholder="What does your business do, and what should the digital side do better?"
          className={cn(inputStyles, "mt-2 resize-y")}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "inq-message-error" : undefined}
        />
        <FieldError id="inq-message-error" error={errors.message} />
      </div>

      <Button type="submit" size="lg" className="mt-6 w-full">
        Open email draft
        <ArrowRight className="size-4" />
      </Button>

      <p className="mt-4 text-xs leading-relaxed text-fg-faint">
        This opens your own email app with the message filled in — nothing is
        sent until you press send there, and nothing is stored on this site.
      </p>
      {draftOpened ? (
        <div className="mt-4 rounded-xl border border-mint/25 bg-mint/[0.07] p-4 text-sm text-fg">
          <p className="flex items-start gap-2 font-semibold">
            <Check className="mt-0.5 size-4 shrink-0 text-mint" />
            Your email draft should be open. If nothing happened, reach us
            directly:
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <a
              href={`mailto:${site.contact.email}`}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-xs font-semibold text-fg transition-colors hover:bg-white/[0.08]"
            >
              <Mail className="size-3.5 text-mint" />
              {site.contact.email}
            </a>
            <button
              type="button"
              onClick={copyEmail}
              className="rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-xs font-semibold text-fg transition-colors hover:bg-white/[0.08]"
            >
              {copied ? "Copied ✓" : "Copy address"}
            </button>
          </div>
        </div>
      ) : null}
    </form>
  );
}
