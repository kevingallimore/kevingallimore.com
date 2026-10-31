import type {ReactNode} from "react";
import useBaseUrl from "@docusaurus/useBaseUrl";
import Layout from "@theme/Layout";
import AboutCopy from "@site/src/components/AboutCopy";
import ContactForm from "@site/src/components/ContactForm";
import Splash from "@site/src/components/Splash";
import {aboutDescription, headshotPath} from "@site/src/site";
import {useSiteMode} from "@site/src/siteMode";

export default function About(): ReactNode {
  const mode = useSiteMode();
  const headshotSrc = useBaseUrl(headshotPath);
  if (mode !== "live") return <Splash />;

  return (
    <Layout title="About Kevin Gallimore" description={aboutDescription}>
      {/*
        Person JSON-LD is already in the shared head (personJsonLd in
        src/site.ts, printed from docusaurus.config.ts). This page does not
        add a second Person script.
      */}
      <main className="site-intro">
        <h1>About Kevin Gallimore</h1>
        <div className="about-grid">
          <figure>
            {/*
              TODO: Replace static/img/kevin-gallimore-headshot.jpg with
              Kevin's real photo. This file is a neutral placeholder.
            */}
            <img
              className="headshot"
              src={headshotSrc}
              alt="Kevin Gallimore headshot"
              width={800}
              height={800}
            />
          </figure>
          <div>
            <AboutCopy count={5} />
          </div>
        </div>
        <p>
          {`Want to talk martech strategy, Salesforce, or speaking? Reach out.`}
        </p>
        <ContactForm />
      </main>
    </Layout>
  );
}
