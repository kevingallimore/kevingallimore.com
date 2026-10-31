import { pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "About",
  description: `About ${site.name}, ${site.jobTitle}. ${site.tagline}`,
  path: "/about",
});

export const ensureStatic = "navigation";

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-16 sm:py-20">
      <h1 className="font-serif text-4xl font-medium tracking-tight sm:text-5xl">
        About
      </h1>

      <div className="mt-10 grid gap-10 sm:grid-cols-[10.5rem_1fr] sm:items-start">
        <figure>
          {/*
            TODO: Replace this placeholder with a headshot.
            Put the file in public/ (for example public/kevin.jpg) and render
            it with next/image. Keep the alt text as your name.
          */}
          <div
            role="img"
            aria-label="Placeholder for a headshot of Kevin Gallimore"
            className="flex aspect-square items-center justify-center border border-line bg-chip font-serif text-4xl text-ink"
          >
            <span aria-hidden="true">KG</span>
          </div>
          <figcaption className="mt-3 text-sm leading-6 text-muted">
            <strong className="font-semibold text-ink">TODO:</strong> Replace
            this placeholder with a headshot.
          </figcaption>
        </figure>

        <div className="space-y-6 text-lg leading-8">
          <div className="border-l-2 border-accent bg-chip px-4 py-3 text-base leading-7">
            <p>
              <strong className="font-semibold">TODO:</strong> Kevin is
              rewriting this bio. The paragraph below is a temporary
              placeholder so the page has something to read. Replace it before
              treating the site as finished.
            </p>
          </div>
          <p>
            I am a {site.jobTitle}. My work covers CRM, email, personalization,
            and customer data platforms, with a focus on Salesforce Marketing
            Cloud and Data 360. This site is the public notebook for that work:
            short references, patterns, and notes I want to be able to find
            again.
          </p>
          <p className="text-base text-muted">{site.tagline}</p>
        </div>
      </div>
    </div>
  );
}
