import type {ReactNode} from "react";
import Layout from "@theme/Layout";
import AboutCopy from "@site/src/components/AboutCopy";
import ContactForm from "@site/src/components/ContactForm";
import {aboutDescription, site, splashDocumentTitle, splashTagline} from "@site/src/site";

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
        <div className="contact-intro">
          <h2>Get in Touch</h2>
          <p>
            Want to talk marketing technology, Salesforce, or how AI fits into
            CRM and personalization? Send a note about strategy, a build, or
            speaking.
          </p>
        </div>
        <ContactForm />
      </main>
    </Layout>
  );
}
