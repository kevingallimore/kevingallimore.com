import type {ReactNode} from "react";
import Head from "@docusaurus/Head";
import {useSiteMode} from "@site/src/siteMode";

/** noindex is also in the HTML, so the splash stays out of Google even without the Vercel proxy. */
export default function Root({children}: {children: ReactNode}): ReactNode {
  const mode = useSiteMode();
  return (
    <>
      {mode === "splash" ? (
        <Head>
          <meta name="robots" content="noindex, nofollow, noarchive" />
        </Head>
      ) : null}
      {children}
    </>
  );
}
