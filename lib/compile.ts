import "server-only";

import { cacheLife } from "next/cache";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";
import { mdxComponents } from "@/components/mdx";
import { prettyCodeOptions } from "@/lib/highlight";

/**
 * Shiki's tokenizer reads `Date.now()` to cap how long a grammar can run.
 * That call is not allowed in a fully static page unless the result is cached.
 * The source string is the cache key, so each post is highlighted once per deploy.
 */
export async function compilePost(source: string) {
  "use cache";
  cacheLife("max");

  const { content } = await compileMDX({
    source,
    components: mdxComponents,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [[rehypePrettyCode, prettyCodeOptions]],
      },
    },
  });

  return content;
}
