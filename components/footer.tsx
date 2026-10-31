import { ExternalLink } from "@/components/external-link";
import { isSplashMode } from "@/lib/site-mode";
import { profileLinks, site } from "@/lib/site";

export function Footer() {
  const splash = isSplashMode();

  return (
    <footer className="mt-16 border-t border-line">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-4 px-6 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          {site.name}
          <span aria-hidden="true"> · </span>
          {site.jobTitle}
        </p>
        <ul className="flex flex-wrap gap-x-4 gap-y-2">
          {profileLinks.map((link) => (
            <li key={link.href}>
              <ExternalLink href={link.href} me className="hover:text-ink">
                {link.label}
              </ExternalLink>
            </li>
          ))}
          {splash ? null : (
            <li>
              <a href="/rss.xml" className="hover:text-ink">
                RSS
              </a>
            </li>
          )}
        </ul>
      </div>
    </footer>
  );
}
