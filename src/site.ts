/**
 * Name, title, and profile links live here so the homepage, splash,
 * footer, and JSON-LD cannot drift apart.
 */
export const site = {
  name: "Kevin Gallimore",
  jobTitle: "Senior CRM Manager",
  tagline:
    "CRM, Email, Personalization & CDP | Salesforce Marketing Cloud & Data 360",
  description:
    "Kevin Gallimore is a Senior CRM Manager writing about CRM, email, personalization, and customer data platforms on Salesforce Marketing Cloud and Data 360.",
  url: "https://kevingallimore.com",
  // The hyphenated LinkedIn path is Kevin's profile.
  // linkedin.com/in/kevingallimore (no hyphen) belongs to someone else.
  sameAs: [
    "https://www.linkedin.com/in/kevin-gallimore",
    "https://github.com/kevingallimore",
    "https://www.salesforce.com/trailblazer/kevin-gallimore",
  ],
} as const;

export const profileLinks = [
  {label: "LinkedIn", href: site.sameAs[0]},
  {label: "GitHub", href: site.sameAs[1]},
  {label: "Trailblazer", href: site.sameAs[2]},
] as const;
