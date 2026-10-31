import type {ReactNode} from "react";
import Layout from "@theme/Layout";
import Admonition from "@theme/Admonition";
import Splash from "@site/src/components/Splash";
import {site} from "@site/src/site";
import {useSiteMode} from "@site/src/siteMode";

export default function About(): ReactNode {
  const mode = useSiteMode();
  if (mode !== "live") return <Splash />;

  return (
    <Layout
      title="About"
      description={`About ${site.name}, ${site.jobTitle}. ${site.tagline}`}
    >
      <main className="site-intro">
        <h1>About</h1>
        <div className="about-grid">
          <figure>
            {/*
              TODO: Replace this placeholder with a headshot.
              Put the file in static/img/ (for example static/img/kevin.jpg)
              and use an img tag here. Keep the alt text as your name.
            */}
            <div
              className="headshot"
              role="img"
              aria-label="Placeholder for a headshot of Kevin Gallimore"
            >
              <span aria-hidden="true">KG</span>
            </div>
            <figcaption>
              <strong>TODO:</strong> Replace this placeholder with a headshot.
            </figcaption>
          </figure>
          <div>
            <Admonition type="note" title="TODO">
              Kevin is rewriting this bio. The paragraph below is a temporary
              placeholder so the page has something to read. Replace it before
              treating the site as finished.
            </Admonition>
            <p>
              I am a {site.jobTitle}. My work covers CRM, email, personalization,
              and customer data platforms, with a focus on Salesforce Marketing
              Cloud and Data 360. This site is the public notebook for that
              work: short references, patterns, and notes I want to be able to
              find again.
            </p>
            <p className="site-tagline">{site.tagline}</p>
          </div>
        </div>
      </main>
    </Layout>
  );
}
