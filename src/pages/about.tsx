import type {ReactNode} from "react";
import useBaseUrl from "@docusaurus/useBaseUrl";
import Layout from "@theme/Layout";
import ContactForm from "@site/src/components/ContactForm";
import Splash from "@site/src/components/Splash";
import {aboutDescription, headshotPath} from "@site/src/site";
import {useSiteMode} from "@site/src/siteMode";

/** Session: Unlock Scalable Patient Engagement with ER Discharge Signals. */
const connections2026SessionUrl =
  "https://www.salesforce.com/plus/experience/connections_2026/series/elevate_your_marketers_with_agency_of_agents_at_connections_2026/episode/episode-s1e9";

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
            <p>
              {`Hi, I'm Kevin, a marketing technology leader in Orlando, Florida. For 13+ years I've worked where data, CRM, and customer experience meet, figuring out how a real moment becomes the right next message.`}
            </p>
            <p>
              {`I didn't start in marketing. From 2006 to 2011 I was an aviation electrician in the U.S. Navy on the USS Theodore Roosevelt. I traced faults down to the component level and kept mission-critical systems running. That's still how I approach martech. Find where the signal breaks, fix the wiring, and build it so it doesn't break again.`}
            </p>
            <p>
              {`After the Navy I taught myself web development and worked my way through marketing and Salesforce administration. Today I lead CRM, email, and personalization at AdventHealth, where my team's work has earned industry awards. I hold seven Salesforce certifications across Marketing Cloud, Data 360, and the core platform. I've also co-presented at `}
              <a href={connections2026SessionUrl}>Salesforce Connections 2026</a>
              {`, Yachtforce, and other Salesforce events.`}
            </p>
            <p>
              {`Healthcare is where I've proven this work, but the idea applies anywhere. Your systems already know when something happened. The hard part is acting on it at the right time, on data you can trust.`}
            </p>
            <p>
              {`Outside work I'm a husband and a dad of three. I'm usually tinkering with AI agents, 3D printing, or some electronics project on the bench. I co-lead the Salesforce Marketer Group in Orlando, and I write here about martech strategy, Salesforce Marketing Cloud, and what's actually working.`}
            </p>
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
