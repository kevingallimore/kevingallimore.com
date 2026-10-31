import type { ComponentProps } from "react";
import Link from "next/link";
import type { MDXComponents } from "mdx/types";
import { ExternalLink } from "@/components/external-link";

function MdxLink({ href = "", children, ...props }: ComponentProps<"a">) {
  if (href.startsWith("/")) {
    return (
      <Link href={href} {...props}>
        {children}
      </Link>
    );
  }

  if (href.startsWith("http://") || href.startsWith("https://")) {
    return (
      <ExternalLink href={href} {...props}>
        {children}
      </ExternalLink>
    );
  }

  return (
    <a href={href} {...props}>
      {children}
    </a>
  );
}

export const mdxComponents = {
  a: MdxLink,
} satisfies MDXComponents;

export const proseClassName = [
  "prose prose-neutral max-w-none dark:prose-invert",
  "prose-headings:font-serif prose-headings:font-medium prose-headings:tracking-tight",
  "prose-a:text-accent prose-a:decoration-accent/40 prose-a:underline-offset-4",
  "prose-code:font-mono prose-code:font-normal prose-code:before:content-none prose-code:after:content-none",
  "font-serif text-lg leading-8 text-ink",
].join(" ");
