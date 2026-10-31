/**
 * Name, title, and profile links live here so the homepage, splash,
 * footer, and JSON-LD cannot drift apart.
 */

/**
 * TODO: Replace static/img/kevin-gallimore-headshot.jpg with Kevin's real photo.
 * The committed file is a neutral placeholder.
 */
export const headshotPath = "/img/kevin-gallimore-headshot.jpg";

/**
 * About-page meta description. Under 160 characters, and it includes the name.
 */
export const aboutDescription =
  "Kevin Gallimore is a marketing technology leader in Orlando, FL, Navy veteran. Expert in Salesforce Marketing Cloud, Data 360, CRM, email, and personalization.";

export const site = {
  name: "Kevin Gallimore",
  jobTitle: "Senior CRM Manager",
  tagline:
    "CRM, Email, Personalization & CDP | Salesforce Marketing Cloud & Data 360",
  description:
    "Kevin Gallimore is a Senior CRM Manager writing about CRM, email, personalization, and customer data platforms on Salesforce Marketing Cloud and Data 360.",
  // Canonical host written into every page. Production currently
  // 308-redirects this apex host to https://www.kevingallimore.com/.
  // Those two hosts do not match. The canonical tag follows this value.
  url: "https://kevingallimore.com",
  // The hyphenated LinkedIn path is Kevin's profile.
  // linkedin.com/in/kevingallimore (no hyphen) belongs to someone else.
  sameAs: [
    "https://www.linkedin.com/in/kevin-gallimore",
    "https://github.com/kevingallimore",
    "https://www.salesforce.com/trailblazer/kevin-gallimore",
  ],
} as const;

/** Browser title for the indexable splash homepage. */
export const splashDocumentTitle =
  "Kevin Gallimore | Marketing Technology Leader in Orlando, FL";

/** Splash tagline: job title, then the site tagline. */
export const splashTagline = `${site.jobTitle} · ${site.tagline}`;

export const profileLinks = [
  {label: "LinkedIn", href: site.sameAs[0]},
  {label: "GitHub", href: site.sameAs[1]},
  {label: "Trailblazer", href: site.sameAs[2]},
] as const;

/**
 * The only Person JSON-LD on the site. docusaurus.config.ts prints it once
 * in the shared head, so /about and every other page describe the same person.
 * Do not add a second Person script on the About page.
 *
 * alumniOf is omitted because no school is on record.
 * memberOf is omitted on purpose: Navy service stays in the bio prose.
 */
export const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  // Pages say "Senior CRM Manager". Search engines get the shorter title.
  jobTitle: "Sr. CRM Manager",
  worksFor: {
    "@type": "Organization",
    name: "AdventHealth",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Orlando",
    addressRegion: "FL",
    addressCountry: "US",
  },
  url: site.url,
  image: `${site.url}${headshotPath}`,
  description: aboutDescription,
  sameAs: [...site.sameAs],
  knowsAbout: [
    "Salesforce Marketing Cloud",
    "Salesforce Data 360",
    "CRM",
    "Email Marketing",
    "Personalization",
    "Customer Data Platforms",
    "Marketing Technology",
  ],
};
