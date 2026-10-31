import siteConfig from "@generated/docusaurus.config";

/**
 * Docusaurus only auto-loads languages named in `additionalLanguages`.
 * AMPscript and the SSJS alias are registered here instead.
 */
export default function prismIncludeLanguages(PrismObject) {
  const {
    themeConfig: {prism},
  } = siteConfig;
  const {additionalLanguages} = prism;
  const PrismBefore = globalThis.Prism;

  globalThis.Prism = PrismObject;
  additionalLanguages.forEach((lang) => {
    require(`prismjs/components/prism-${lang}`);
  });
  require("./prism-ampscript");

  delete globalThis.Prism;
  if (typeof PrismBefore !== "undefined") {
    globalThis.Prism = PrismBefore;
  }
}
