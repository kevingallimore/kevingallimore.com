import {
  createHighlighter,
  type BundledHighlighterOptions,
  type Highlighter,
} from "shiki";
import type { Options as PrettyCodeOptions } from "rehype-pretty-code";
import { ampscript } from "@/lib/languages/ampscript";

/**
 * rehype-pretty-code asks Shiki to load each fence language by name.
 * AMPscript is not a bundled language, so it is registered up front.
 * A later loadLanguage("ampscript") would throw, because that call only
 * knows bundled ids. Skip names that are already loaded.
 *
 * SSJS is JavaScript plus Marketing Cloud's Platform library, so the
 * `ssjs` fence uses the JavaScript grammar. The block label stays `ssjs`.
 */
async function getHighlighter(
  options: BundledHighlighterOptions<string, string>,
): Promise<Highlighter> {
  const highlighter = await createHighlighter({
    ...options,
    langAlias: {
      ssjs: "javascript",
    },
    langs: [
      ...options.langs,
      "javascript",
      "typescript",
      "sql",
      "json",
      "html",
      "css",
      "bash",
      ampscript,
    ],
  });

  const loadLanguage = highlighter.loadLanguage.bind(highlighter);
  highlighter.loadLanguage = async (...langs) => {
    const pending = langs.filter((lang) => {
      if (typeof lang !== "string") return true;
      try {
        highlighter.getLanguage(lang);
        return false;
      } catch {
        return true;
      }
    });

    if (pending.length > 0) {
      await loadLanguage(...pending);
    }
  };

  return highlighter;
}

export const prettyCodeOptions = {
  theme: {
    light: "github-light",
    dark: "github-dark",
  },
  // The site CSS owns the block background so light and dark match the page.
  keepBackground: false,
  defaultLang: {
    block: "plaintext",
    inline: "",
  },
  getHighlighter,
} satisfies PrettyCodeOptions;
