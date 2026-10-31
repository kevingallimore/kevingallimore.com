import type {ReactNode} from "react";

/** Session: Unlock Scalable Patient Engagement with ER Discharge Signals. */
const connections2026SessionUrl =
  "https://www.salesforce.com/plus/experience/connections_2026/series/elevate_your_marketers_with_agency_of_agents_at_connections_2026/episode/episode-s1e9";

/**
 * The About page bio, in order. The splash uses the first three paragraphs.
 */
export default function AboutCopy({count}: {count: number}): ReactNode {
  const paragraphs = [
    <p key="1">
      {`Hi, I'm Kevin, a marketing technology leader in Orlando, Florida. For 13+ years I've worked where data, CRM, and customer experience meet, figuring out how a real moment becomes the right next message.`}
    </p>,
    <p key="2">
      {`I didn't start in marketing. From 2006 to 2011 I was an aviation electrician in the U.S. Navy on the USS Theodore Roosevelt. I traced faults down to the component level and kept mission-critical systems running. That's still how I approach martech. Find where the signal breaks, fix the wiring, and build it so it doesn't break again.`}
    </p>,
    <p key="3">
      {`After the Navy I taught myself web development and worked my way through marketing and Salesforce administration. Today I lead CRM, email, and personalization at AdventHealth, where my team's work has earned industry awards. I hold seven Salesforce certifications across Marketing Cloud, Data 360, and the core platform. I've also co-presented at `}
      <a href={connections2026SessionUrl}>Salesforce Connections 2026</a>
      {`, Yachtforce, and other Salesforce events.`}
    </p>,
    <p key="4">
      {`Healthcare is where I've proven this work, but the idea applies anywhere. Your systems already know when something happened. The hard part is acting on it at the right time, on data you can trust.`}
    </p>,
    <p key="5">
      {`Outside work I'm a husband and a dad of three. I'm usually tinkering with AI agents, 3D printing, or some electronics project on the bench. I co-lead the Salesforce Marketer Group in Orlando, and I write here about martech strategy, Salesforce Marketing Cloud, and what's actually working.`}
    </p>,
  ];
  return <>{paragraphs.slice(0, count)}</>;
}
