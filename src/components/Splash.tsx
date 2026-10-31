import type {ReactNode} from "react";
import Layout from "@theme/Layout";
import AboutCopy from "@site/src/components/AboutCopy";
import ContactForm from "@site/src/components/ContactForm";
import {
  aboutDescription,
  profileLinks,
  site,
  splashDocumentTitle,
  splashTagline,
} from "@site/src/site";

const splashLinks = profileLinks.filter(
  (link) => link.label === "LinkedIn" || link.label === "Trailblazer",
);

/**
 * Public homepage while the full site is still off.
 * The canonical URL is added by Docusaurus from site.url. Do not add a second
 * canonical link here.
 */
export default function Splash(): ReactNode {
  return (
    <Layout title={splashDocumentTitle} description={aboutDescription}>
      <main className="site-intro">
        <h1>{site.name}</h1>
        <p className="site-tagline">{splashTagline}</p>
        <AboutCopy count={3} />
        <nav aria-label="Connect">
          <ul className="connect-list">
            {splashLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="me noopener noreferrer"
                >
                  {link.label}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <ContactForm />
      </main>
    </Layout>
  );
}
