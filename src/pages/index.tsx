import type {ReactNode} from "react";
import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";
import RecentPosts from "@site/src/components/RecentPosts";
import Splash from "@site/src/components/Splash";
import {site} from "@site/src/site";
import {useSiteMode} from "@site/src/siteMode";

function LiveHome(): ReactNode {
  return (
    <Layout description={site.description}>
      <main className="site-intro">
        <p className="site-kicker">{site.jobTitle}</p>
        <h1>{site.name}</h1>
        <p className="site-tagline">{site.tagline}</p>
        <p className="site-lede">
          I publish reference notes and practical patterns for CRM, email,
          personalization, and customer data platforms, focused on Salesforce
          Marketing Cloud and Data 360.
        </p>
        <RecentPosts />
        <p>
          <Link to="/blog">All posts</Link>
        </p>
      </main>
    </Layout>
  );
}

export default function Home(): ReactNode {
  const mode = useSiteMode();
  if (mode !== "live") return <Splash />;
  return <LiveHome />;
}
