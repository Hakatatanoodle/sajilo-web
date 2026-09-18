import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { PageHeader } from "@/components/PageHeader";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "How Sajilo Web handles information on this website. We don't run analytics, ads, or a contact backend.",
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <Container className="py-16 sm:py-20">
      <PageHeader
        eyebrow="Privacy"
        title="What this site does — and doesn't — collect."
        lead="This is a static brochure site. There is no account system, no analytics pixel, and no server that stores form submissions."
      />

      <div className="mt-10 max-w-2xl space-y-8 text-sm leading-relaxed text-fg-muted">
        <section>
          <h2 className="font-display text-lg font-bold text-fg">
            What we receive
          </h2>
          <p className="mt-2">
            The inquiry form opens a draft in your own email app or WhatsApp.
            Nothing is sent to us until you press send there. If you email or
            message us, we keep that conversation so we can reply — the same
            way any small business would.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-bold text-fg">
            What stays in your browser
          </h2>
          <p className="mt-2">
            Concept demos under <code className="text-fg">/demos/</code> may
            keep a cart in your browser&apos;s local storage so the demo feels
            real if you refresh. That data never leaves your device, and the
            demos are sandboxed from the rest of this site. Checkout fields on
            those pages are not submitted anywhere.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-bold text-fg">
            Hosting and fonts
          </h2>
          <p className="mt-2">
            The site is hosted on Vercel. The main pages self-host their fonts.
            A few demo pages still load Google Fonts and Unsplash images, which
            means those companies may see a request from your browser while a
            demo is open.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-bold text-fg">Contact</h2>
          <p className="mt-2">
            Questions about this:{" "}
            <a
              href={`mailto:${site.contact.email}`}
              className="font-semibold text-fg underline decoration-brand decoration-2 underline-offset-2"
            >
              {site.contact.email}
            </a>
            .
          </p>
        </section>
      </div>
    </Container>
  );
}
