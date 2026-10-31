import type {ReactNode} from "react";
import Layout from "@theme/Layout";
import {profileLinks, site} from "@site/src/site";

/**
 * Holding page used before launch and any later time the site is offline.
 * Change the sentence below if a maintenance notice should say something else.
 */
export default function Splash(): ReactNode {
  return (
    <Layout description={`${site.tagline} This site is coming soon.`}>
      <main className="site-intro">
        <p className="site-kicker">{site.jobTitle}</p>
        <h1>{site.name}</h1>
        <p className="site-tagline">{site.tagline}</p>
        <p className="site-lede">This site is coming soon.</p>
        <nav aria-label="Connect">
          <ul className="connect-list">
            {profileLinks.map((link) => (
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
      </main>
    </Layout>
  );
}
