import type {ReactNode} from "react";
import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";
import Splash from "@site/src/components/Splash";
import {useSiteMode} from "@site/src/siteMode";

export default function NotFound(): ReactNode {
  const mode = useSiteMode();
  if (mode !== "live") return <Splash />;

  return (
    <Layout title="Page not found" description="That URL is not on this site.">
      <main className="site-intro">
        <p className="site-kicker">404</p>
        <h1>Page not found</h1>
        <p>That URL is not on this site.</p>
        <p>
          <Link to="/">Back home</Link>
        </p>
      </main>
    </Layout>
  );
}
