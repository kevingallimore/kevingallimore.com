import type {ReactNode} from "react";
import Layout from "@theme/Layout";
import ContactForm from "@site/src/components/ContactForm";
import {
  ContactIntro,
  ProfileMast,
  ProfileStory,
} from "@site/src/components/Profile";
import {aboutDescription, site, splashDocumentTitle} from "@site/src/site";

/**
 * Public homepage while the full site is still off.
 * The canonical URL is added by Docusaurus from site.url. Do not add a second
 * canonical link here.
 */
export default function Splash(): ReactNode {
  return (
    <Layout title={splashDocumentTitle} description={aboutDescription}>
      <main className="site-intro">
        <ProfileMast title={site.name} />
        <ProfileStory />
        <ContactIntro />
        <ContactForm />
      </main>
    </Layout>
  );
}
