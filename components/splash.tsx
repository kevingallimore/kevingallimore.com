import { ExternalLink } from "@/components/external-link";
import { profileLinks, site } from "@/lib/site";

/**
 * Holding page for splash mode. The same screen is used before launch
 * and any later time the site is taken offline. Edit the sentence below
 * if a maintenance notice should say something more specific.
 */
export function Splash() {
  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-16 sm:py-24">
      <p className="text-sm font-medium tracking-[0.16em] text-accent uppercase">
        {site.jobTitle}
      </p>
      <h1 className="mt-3 font-serif text-5xl font-medium tracking-tight text-balance text-ink sm:text-6xl">
        {site.name}
      </h1>
      <p className="mt-5 max-w-2xl text-xl leading-relaxed text-muted">
        {site.tagline}
      </p>
      <p className="mt-8 text-lg leading-8">This site is coming soon.</p>
      <nav aria-label="Connect" className="mt-10">
        <ul className="flex flex-col gap-1 sm:flex-row sm:gap-8">
          {profileLinks.map((link) => (
            <li key={link.href}>
              <ExternalLink
                href={link.href}
                me
                className="inline-flex min-h-11 items-center text-base text-accent underline decoration-accent/40 underline-offset-4 hover:decoration-current"
              >
                {link.label}
              </ExternalLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
