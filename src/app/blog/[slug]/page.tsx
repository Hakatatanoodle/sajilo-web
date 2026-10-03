import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AuroraBackdrop } from "@/components/AuroraBackdrop";
import { ArrowLeft } from "@/components/icons";
import { Container } from "@/components/Container";
import { JsonLd } from "@/components/JsonLd";
import { Reveal } from "@/components/Reveal";
import { getPost, getPosts } from "@/content/blog";
import { site } from "@/content/site";
import ReactMarkdown from "react-markdown";

export async function generateStaticParams() {
  // Slugs are resolved at build time — no on-the-fly rendering.
  const posts = await getPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

/** Unknown slugs 404 — never render a post on the fly. */
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${slug}` },
  };
}

/**
 * Blog post. Markdown is rendered to HTML at build time, so the post text is
 * in the DOM for crawlers — and the source file is a plain `.md` anyone can
 * edit. Breadcrumbs give crawlers the Home > Blog > {title} trail.
 */
export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const publishedDate = new Date(post.date).toISOString().split("T")[0];

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${site.url}/blog` },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `${site.url}/blog/${post.slug}`,
      },
    ],
  };

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: site.name,
      url: site.url,
    },
    datePublished: publishedDate,
    mainEntityOfPage: `${site.url}/blog/${post.slug}`,
  };

  return (
    <article>
      <JsonLd data={breadcrumbLd} />
      <JsonLd data={articleLd} />

      <div className="relative isolate overflow-hidden">
        <AuroraBackdrop variant="page" />
        <Container className="py-14 sm:py-16">
          <Reveal>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-semibold text-fg-muted transition-colors hover:text-fg"
            >
              <ArrowLeft className="size-4" />
              All posts
            </Link>
          </Reveal>

          <Reveal delay={60}>
            <div className="mt-5 flex flex-wrap items-center gap-2.5 text-xs text-fg-faint">
              <time dateTime={publishedDate}>
                {new Date(post.date).toLocaleDateString("en-IN", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </time>
              <span aria-hidden>·</span>
              <span>By {post.author}</span>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <h1 className="mt-4 max-w-3xl font-display text-4xl font-extrabold tracking-tight text-fg sm:text-6xl">
              {post.title}
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-fg-muted">
              {post.description}
            </p>
          </Reveal>
        </Container>
      </div>

      <Container className="py-8 sm:py-10">
        {/* `.prose` is hand-rolled in globals.css (no @tailwindcss/typography),
            so element styles live there rather than in prose-* variants. */}
        <div className="prose max-w-3xl">
          <ReactMarkdown>{post.body}</ReactMarkdown>
        </div>
      </Container>

      <Container className="pb-12">
        <Reveal>
          <div className="rounded-2xl border border-line bg-surface p-7 sm:p-9">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-fg-faint">
              Written by {post.author}
            </p>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-fg-muted">
              Part of Sajilo Web — the studio that builds the sites we write
              about. If a post raised a question your business has,{" "}
              <Link href="/contact" className="font-semibold text-accent">
                talk to us
              </Link>
              .
            </p>
          </div>
        </Reveal>
      </Container>
    </article>
  );
}