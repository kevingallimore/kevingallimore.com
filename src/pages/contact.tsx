import type {ReactNode} from "react";
import Layout from "@theme/Layout";
import ContactForm from "@site/src/components/ContactForm";
import Splash from "@site/src/components/Splash";
import {site} from "@site/src/site";
import {useSiteMode} from "@site/src/siteMode";

const description = `Contact ${site.name} about martech strategy, Salesforce, or speaking.`;

export default function Contact(): ReactNode {
  const mode = useSiteMode();
  if (mode !== "live") return <Splash />;

  return (
    <Layout title={`Contact ${site.name}`} description={description}>
      <main className="site-intro">
        <h1>Contact {site.name}</h1>
        <p>Want to talk martech strategy, Salesforce, or speaking? Reach out.</p>
        <ContactForm />
      </main>
    </Layout>
  );
}
