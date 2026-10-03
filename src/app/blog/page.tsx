import type { Metadata } from "next";
import Link from "next/link";
import { AuroraBackdrop } from "@/components/AuroraBackdrop";
import { Container } from "@/components/Container";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { getPosts } from "@/content/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Notes from Sajilo Web: what we build, how we think about it, and what a small business actually needs online — written by the people who build it.",
  alternates: { canonical: "/blog" },
};

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className="relative isolate overflow-hidden">
      <AuroraBackdrop variant="page" />
      <Container className="py-16 sm:py-20">
        <PageHeader
          eyebrow="From the studio"
          title="Notes on building things online."
          lead={
            posts.length > 0
              ? `${posts.length} post${posts.length === 1 ? "" : "s"}, written by the people who build your site. Honest thinking about what a small business actually needs online — no hype.`
              : "We are writing the first post soon."
          }
        />

        {posts.length > 0 ? (
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {posts.map((post, index) => (
              <Reveal key={post.slug} delay={index * 90} className="h-full">
                <Link
                  href={`/blog/${post.slug}`}
                  aria-label={post.title}
                  className="group block h-full rounded-2xl"
                >
                  <article className="flex h-full flex-col rounded-2xl border border-line bg-surface p-7 transition-colors hover:border-line-strong hover:bg-surface-2 sm:p-8">
                    <div className="flex items-center gap-2.5 text-xs text-fg-faint">
                      <time dateTime={post.date}>
                        {new Date(post.date).toLocaleDateString("en-IN", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </time>
                      <span aria-hidden>·</span>
                      <span>{post.author}</span>
                    </div>
                    <h2 className="mt-3 font-display text-xl font-bold tracking-tight text-fg">
                      {post.title}
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                      {post.description}
                    </p>
                    <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold text-accent">
                      Read post
                      <svg
                        className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        aria-hidden
                      >
                        <path d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </span>
                  </article>
                </Link>
              </Reveal>
            ))}
          </div>
        ) : (
          <p className="mt-12 max-w-xl text-fg-muted">
            We are writing the first post right now. Check back soon — or{" "}
            <Link href="/contact" className="font-semibold text-accent">
              get in touch
            </Link>{" "}
            if there is a topic you would like us to cover.
          </p>
        )}
      </Container>
    </div>
  );
}