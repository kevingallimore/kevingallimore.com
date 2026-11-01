import type {ReactNode} from "react";
import Layout from "@theme/Layout";
import ContactForm from "@site/src/components/ContactForm";
import {
  ContactIntro,
  ProfileMast,
  ProfileStory,
} from "@site/src/components/Profile";
import Splash from "@site/src/components/Splash";
import {aboutDescription} from "@site/src/site";
import {useSiteMode} from "@site/src/siteMode";

export default function About(): ReactNode {
  const mode = useSiteMode();
  if (mode !== "live") return <Splash />;

  return (
    <Layout title="About Kevin Gallimore" description={aboutDescription}>
      {/*
        Person JSON-LD is already in the shared head (personJsonLd in
        src/site.ts, printed from docusaurus.config.ts). This page does not
        add a second Person script.
      */}
      <main className="site-intro">
        <ProfileMast title="About Kevin Gallimore" />
        <ProfileStory />
        <ContactIntro />
        <ContactForm />
      </main>
    </Layout>
  );
}
