import type { ComponentProps } from "react";

type ExternalLinkProps = ComponentProps<"a"> & {
  href: string;
  /** Marks a personal profile so crawlers can connect it to this site. */
  me?: boolean;
};

export function ExternalLink({
  href,
  me = false,
  children,
  ...props
}: ExternalLinkProps) {
  return (
    <a
      {...props}
      href={href}
      target="_blank"
      rel={me ? "me noopener noreferrer" : "noopener noreferrer"}
    >
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
