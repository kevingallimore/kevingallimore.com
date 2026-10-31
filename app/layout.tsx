import type { Metadata } from "next";
import { JetBrains_Mono, Newsreader, Source_Sans_3 } from "next/font/google";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { ThemeProvider } from "@/components/theme-provider";
import { isSplashMode } from "@/lib/site-mode";
import { site } from "@/lib/site";
import "./globals.css";

const splash = isSplashMode();

const newsreader = Newsreader({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-newsreader",
  style: ["normal", "italic"],
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-source-sans",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  // Relative canonical and Open Graph URLs are resolved against this host.
  metadataBase: new URL(site.url),
  title: {
    default: site.name,
    template: `%s · ${site.name}`,
  },
  description: splash
    ? `${site.tagline} This site is coming soon.`
    : site.description,
  // The holding page must not be indexed as the finished site.
  ...(splash ? { robots: { index: false, follow: false } } : {}),
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  keywords: [
    "Kevin Gallimore",
    "Salesforce Marketing Cloud",
    "Data 360",
    "CRM",
    "email",
    "personalization",
    "CDP",
    "AMPscript",
    "SSJS",
  ],
  ...(splash
    ? {}
    : {
        alternates: {
          types: {
            "application/rss+xml": "/rss.xml",
          },
        },
      }),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: site.name,
    title: site.name,
    description: splash
      ? `${site.tagline} This site is coming soon.`
      : site.description,
    url: site.url,
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: splash
      ? `${site.tagline} This site is coming soon.`
      : site.description,
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.jobTitle,
  url: site.url,
  description: site.tagline,
  sameAs: site.sameAs,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${sourceSans.variable} ${jetbrains.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col bg-paper font-sans text-ink">
        <ThemeProvider>
          <a
            href="#content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-paper focus:px-3 focus:py-2"
          >
            Skip to content
          </a>
          <Header />
          <main id="content" tabIndex={-1} className="flex-1 outline-none">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
        <JsonLd data={personJsonLd} />
      </body>
    </html>
  );
}
