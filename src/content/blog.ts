/**
 * Blog — the Sajilo Web blog.
 *
 * Posts live as Markdown files under `src/content/blog/` so a non-developer can
 * write one by hand. Each file starts with a small YAML front matter
 * (title / description / date / author) followed by the post body, which is
 * rendered to HTML at build time by `react-markdown`. The raw text is what
 * search engines crawl, so every post is indexable by construction.
 *
 * Copy is honest: posts are our own writing about what we actually do — we
 * never present invented client results as facts (portfolio_v0.1.md §35).
 */
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

/** A blog post, fully resolved at build time. */
export type BlogPost = {
  slug: string;
  title: string;
  /** One-liner used as the meta description and the card summary. */
  description: string;
  /** ISO date (e.g. "2026-10-02"). */
  date: string;
  /** Author name. */
  author: string;
  /** Raw markdown body — rendered by react-markdown on the post page. */
  body: string;
};

/** Front-matter fields we read from each `.md` file. */
type BlogFrontMatter = {
  title: string;
  description: string;
  date: string;
  author: string;
};

/**
 * Strip one layer of surrounding single or double quotes. Our Markdown files
 * quote front-matter values (`title: "..."`), and those quotes must not leak
 * into rendered titles — or into `new Date(...)`, which would choke on them.
 */
function stripQuotes(value: string): string {
  if (
    value.length >= 2 &&
    ((value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'")))
  ) {
    return value.slice(1, -1);
  }
  return value;
}

/**
 * Split a Markdown file into front matter + body.
 *
 * Supports the small subset of YAML we actually use: `key: value` lines
 * wrapped in `---` fences. We deliberately do NOT pull in a YAML parser —
 * the format is fixed and this keeps the dependency list flat.
 */
function parseFrontMatter(raw: string): {
  frontMatter: BlogFrontMatter;
  body: string;
} {
  const match = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/);
  if (!match) {
    return {
      frontMatter: {
        title: "Untitled",
        description: "",
        date: "1970-01-01",
        author: "Sajilo Web",
      },
      body: raw,
    };
  }

  const frontMatter: BlogFrontMatter = {
    title: "Untitled",
    description: "",
    date: "1970-01-01",
    author: "Sajilo Web",
  };

  for (const line of match[1].split("\n")) {
    const colon = line.indexOf(":");
    if (colon === -1) continue;
    const key = line.slice(0, colon).trim();
    const value = stripQuotes(line.slice(colon + 1).trim());
    if (key === "title") frontMatter.title = value;
    else if (key === "description") frontMatter.description = value;
    else if (key === "date") frontMatter.date = value;
    else if (key === "author") frontMatter.author = value;
  }

  return { frontMatter, body: match[2] };
}

/** Absolute path to the folder holding the Markdown posts. */
function postsDirectory(): string {
  return join(process.cwd(), "src", "content", "blog");
}

/** Turn a Markdown filename into a URL-safe slug (basename without extension). */
function slugFromFileName(fileName: string): string {
  return fileName.replace(/\.md$/, "") ?? "untitled";
}

/** Load every Markdown post at build time. */
export async function getPosts(): Promise<BlogPost[]> {
  const fileNames = readdirSync(postsDirectory()).filter((fileName) =>
    fileName.endsWith(".md"),
  );

  const posts: BlogPost[] = fileNames.map((fileName) => {
    const raw = readFileSync(join(postsDirectory(), fileName), "utf8");
    const { frontMatter, body } = parseFrontMatter(raw);
    return {
      slug: slugFromFileName(fileName),
      title: frontMatter.title,
      description: frontMatter.description,
      date: frontMatter.date,
      author: frontMatter.author,
      body,
    };
  });

  // Newest first — the index shows the freshest post at the top.
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

/** Look up a single post by slug. */
export async function getPost(slug: string): Promise<BlogPost | undefined> {
  const posts = await getPosts();
  return posts.find((post) => post.slug === slug);
}