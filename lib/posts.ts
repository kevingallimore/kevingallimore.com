import "server-only";

import { cacheLife } from "next/cache";
import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { JSON_SCHEMA, load as loadYaml } from "js-yaml";
import { tagSlug } from "@/lib/format";

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  draft: boolean;
};

export type Post = PostMeta & {
  content: string;
};

export type Tag = {
  slug: string;
  name: string;
  count: number;
};

const postsDirectory = path.join(process.cwd(), "content", "posts");

/**
 * Posts are files in the repo, so they change only when a new version deploys.
 * `use cache` plus `max` lets Next prerender the HTML instead of reading the
 * folder on every request. A deploy starts a new build, which starts a new cache.
 */
async function readAllPosts(): Promise<Post[]> {
  "use cache";
  cacheLife("max");

  let files: string[];
  try {
    files = await fs.readdir(postsDirectory);
  } catch (error) {
    if (isNotFound(error)) return [];
    throw error;
  }

  const posts = await Promise.all(
    files
      .filter((file) => file.endsWith(".mdx"))
      .map(async (file) => {
        const raw = await fs.readFile(path.join(postsDirectory, file), "utf8");
        return parsePost(file, raw);
      }),
  );

  return posts.sort((a, b) => {
    if (a.date !== b.date) return a.date < b.date ? 1 : -1;
    return a.title.localeCompare(b.title);
  });
}

function isNotFound(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    error.code === "ENOENT"
  );
}

function parsePost(file: string, raw: string): Post {
  const slug = file.slice(0, -".mdx".length);
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    throw new Error(
      `${file}: rename this file to lowercase kebab-case, for example "lookup-rows.mdx". The filename is the URL.`,
    );
  }

  let parsed: { data: unknown; content: string };
  try {
    parsed = matter(raw, {
      engines: {
        yaml: {
          // JSON_SCHEMA keeps `2026-10-31` as a string. The default schema
          // turns it into a Date, and the calendar day can shift by timezone.
          parse: (input: string) => loadYaml(input, { schema: JSON_SCHEMA }) ?? {},
        },
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Invalid YAML";
    throw new Error(
      `${file}: could not read frontmatter. If a value contains a colon, wrap it in quotes.\n${message}`,
    );
  }

  const data = asRecord(parsed.data, file);
  const tags = requireTags(data.tags, file);

  return {
    slug,
    title: requireString(data.title, file, "title"),
    description: requireString(data.description, file, "description"),
    date: requireDate(data.date, file),
    tags,
    draft: requireBoolean(data.draft, file, "draft"),
    content: parsed.content,
  };
}

function asRecord(value: unknown, file: string): Record<string, unknown> {
  if (value === null || typeof value !== "object" || Array.isArray(value)) {
    throw new Error(`${file}: frontmatter must be a mapping of fields.`);
  }
  return value as Record<string, unknown>;
}

function requireString(value: unknown, file: string, field: string): string {
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(`${file}: "${field}" must be a non-empty string.`);
  }
  return value.trim();
}

function requireBoolean(value: unknown, file: string, field: string): boolean {
  if (typeof value !== "boolean") {
    throw new Error(
      `${file}: "${field}" must be true or false. Use draft: true to hide a post from the production site.`,
    );
  }
  return value;
}

function requireDate(value: unknown, file: string): string {
  if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return value;
  }
  throw new Error(
    `${file}: "date" must be YYYY-MM-DD, for example date: 2026-10-31.`,
  );
}

function requireTags(value: unknown, file: string): string[] {
  if (!Array.isArray(value) || value.length === 0) {
    throw new Error(
      `${file}: "tags" must list at least one tag.\n  tags:\n    - ampscript`,
    );
  }

  const tags: string[] = [];
  for (const tag of value) {
    if (typeof tag !== "string" || tag.trim() === "") {
      throw new Error(`${file}: every tag must be a non-empty string.`);
    }
    const name = tag.trim();
    if (tagSlug(name) === "") {
      throw new Error(`${file}: tag "${name}" does not make a usable URL.`);
    }
    if (!tags.includes(name)) tags.push(name);
  }
  return tags;
}

function isListed(post: Post): boolean {
  // Drafts stay available in `npm run dev`. Production pages, the sitemap,
  // and the RSS feed only include draft: false.
  return process.env.NODE_ENV !== "production" || !post.draft;
}

function toMeta(post: Post): PostMeta {
  return {
    slug: post.slug,
    title: post.title,
    description: post.description,
    date: post.date,
    tags: post.tags,
    draft: post.draft,
  };
}

export async function getPublishedPosts(): Promise<PostMeta[]> {
  const posts = await readAllPosts();
  return posts.filter(isListed).map(toMeta);
}

export async function getPost(slug: string): Promise<Post | null> {
  const posts = await readAllPosts();
  const post = posts.find((entry) => entry.slug === slug);
  if (!post || !isListed(post)) return null;
  return post;
}

export async function getTags(): Promise<Tag[]> {
  const posts = await getPublishedPosts();
  const tags = new Map<string, Tag>();

  for (const post of posts) {
    for (const name of post.tags) {
      const slug = tagSlug(name);
      const existing = tags.get(slug);
      if (existing) {
        existing.count += 1;
      } else {
        tags.set(slug, { slug, name, count: 1 });
      }
    }
  }

  return [...tags.values()].sort((a, b) => a.name.localeCompare(b.name));
}

export async function getTag(slug: string): Promise<Tag | null> {
  const tags = await getTags();
  return tags.find((tag) => tag.slug === slug) ?? null;
}

export async function getPostsByTag(slug: string): Promise<PostMeta[]> {
  const posts = await getPublishedPosts();
  return posts.filter((post) => post.tags.some((tag) => tagSlug(tag) === slug));
}
