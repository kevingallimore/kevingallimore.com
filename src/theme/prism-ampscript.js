/**
 * A small Prism grammar for AMPscript fences. Prism has no built-in
 * AMPscript language. SSJS is JavaScript plus Marketing Cloud's Platform
 * library, so that fence reuses the JavaScript grammar and keeps the ssjs label.
 */
const Prism = globalThis.Prism;

Prism.languages.ampscript = {
  comment: {
    pattern: /\/\*[\s\S]*?\*\//,
    greedy: true,
  },
  string: {
    pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
    greedy: true,
  },
  delimiter: {
    pattern: /%%=|%%\[|\]%%|=%%/,
    alias: "important",
  },
  variable: {
    pattern: /@[A-Za-z_]\w*/,
    alias: "variable",
  },
  keyword:
    /\b(?:VAR|SET|IF|THEN|ELSEIF|ELSE|ENDIF|FOR|TO|DOWNTO|DO|NEXT|AND|OR|NOT|TRUE|FALSE|NULL)\b/i,
  function: /\b[A-Za-z_]\w*(?=\s*\()/,
  number: /\b\d+(?:\.\d+)?\b/,
  operator: /==|!=|<=|>=|<|>|=/,
};

require("prismjs/components/prism-javascript");
Prism.languages.ssjs = Prism.languages.javascript;
