import type {ReactNode} from "react";
import useBaseUrl from "@docusaurus/useBaseUrl";
import {headshotPath, splashTagline} from "@site/src/site";

/** Session: Unlock Scalable Patient Engagement with ER Discharge Signals. */
const connections2026SessionUrl =
  "https://www.salesforce.com/plus/experience/connections_2026/series/elevate_your_marketers_with_agency_of_agents_at_connections_2026/episode/episode-s1e9";

export function ProfileMast({title}: {title: string}): ReactNode {
  const headshotSrc = useBaseUrl(headshotPath);

  return (
    <div className="profile-mast">
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
        <h1>{title}</h1>
        <p className="site-tagline">{splashTagline}</p>
      </div>
    </div>
  );
}

export function ProfileStory(): ReactNode {
  return (
    <div className="profile-story">
      <p className="site-lede">
        {`Hi, I'm Kevin, a marketing technology leader in Orlando, Florida. For 13+ years I've worked where data, CRM, and customer experience meet, figuring out how a real moment becomes the right next message.`}
      </p>
      <ul className="profile-facts">
        <li>
          <strong>13+ years</strong>
          <span>Where data, CRM, and customer experience meet</span>
        </li>
        <li>
          <strong>Seven certifications</strong>
          <span>Marketing Cloud, Data 360, and the core platform</span>
        </li>
        <li>
          <strong>Orlando, Florida</strong>
          <span>Home, and the Salesforce Marketer Group I co-lead</span>
        </li>
      </ul>
      <section>
        <h2>Now</h2>
        <p>
          {`Today I lead CRM, email, and personalization at AdventHealth, where my team's work has earned industry awards. I hold seven Salesforce certifications across Marketing Cloud, Data 360, and the core platform.`}
        </p>
        <p>
          {`Healthcare is where I've proven this work, but the idea applies anywhere. Your systems already know when something happened. The hard part is acting on it at the right time, on data you can trust.`}
        </p>
      </section>
      <section>
        <h2>Before marketing</h2>
        <p>
          {`I didn't start in marketing. From 2006 to 2011 I was an aviation electrician in the U.S. Navy on the USS Theodore Roosevelt. I traced faults down to the component level and kept mission-critical systems running. That's still how I approach martech. Find where the signal breaks, fix the wiring, and build it so it doesn't break again.`}
        </p>
        <p>
          {`After the Navy I taught myself web development and worked my way through marketing and Salesforce administration.`}
        </p>
      </section>
      <section>
        <h2>Off the clock</h2>
        <p>
          {`Outside work I'm a husband and a dad of three. I'm usually tinkering with AI agents, 3D printing, or some electronics project on the bench. I co-lead the Salesforce Marketer Group in Orlando, and I write here about martech strategy, Salesforce Marketing Cloud, and what's actually working.`}
        </p>
      </section>
      <section>
        <h2>Speaking</h2>
        <ul className="speaking-list">
          <li>
            <a href={connections2026SessionUrl}>
              Unlock Scalable Patient Engagement with ER Discharge Signals
            </a>
            <span>Salesforce Connections 2026</span>
          </li>
          <li>
            <span className="speaking-list__title">Yachtforce</span>
          </li>
        </ul>
        <p className="speaking-note">
          I've also co-presented at other Salesforce events.
        </p>
      </section>
    </div>
  );
}

export function ContactIntro(): ReactNode {
  return (
    <div className="contact-intro">
      <h2>Get in Touch</h2>
      <p>
        Want to talk marketing technology, Salesforce, or how AI fits into CRM
        and personalization? Send a note about strategy, a build, or speaking.
      </p>
    </div>
  );
}
