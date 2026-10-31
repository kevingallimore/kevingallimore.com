import type { LanguageRegistration } from "shiki";

/**
 * Shiki has no built-in AMPscript grammar. This is a small original one
 * for fenced blocks: delimiters, @variables, keywords, calls, strings,
 * and comments. It is not a full language server.
 */
export const ampscript: LanguageRegistration = {
  name: "ampscript",
  scopeName: "source.ampscript",
  patterns: [
    { include: "#comment" },
    { include: "#string" },
    { include: "#delimiter" },
    { include: "#variable" },
    { include: "#keyword" },
    { include: "#function" },
    { include: "#number" },
    { include: "#operator" },
  ],
  repository: {
    comment: {
      name: "comment.block.ampscript",
      begin: "/\\*",
      end: "\\*/",
    },
    string: {
      patterns: [
        {
          name: "string.quoted.double.ampscript",
          begin: '"',
          end: '"',
          patterns: [
            {
              name: "constant.character.escape.ampscript",
              match: "\\\\.",
            },
          ],
        },
        {
          name: "string.quoted.single.ampscript",
          begin: "'",
          end: "'",
          patterns: [
            {
              name: "constant.character.escape.ampscript",
              match: "\\\\.",
            },
          ],
        },
      ],
    },
    delimiter: {
      // entity.name.tag is green in the GitHub themes, so the %% markers stand apart from keywords.
      name: "entity.name.tag.ampscript",
      match: "%%=|%%\\[|\\]%%|=%%",
    },
    variable: {
      // variable.language is colored. variable.other is the same as body text in these themes.
      name: "variable.language.ampscript",
      match: "@[A-Za-z_][A-Za-z0-9_]*",
    },
    keyword: {
      name: "keyword.control.ampscript",
      match:
        "\\b(?i:VAR|SET|IF|THEN|ELSEIF|ELSE|ENDIF|FOR|TO|DOWNTO|DO|NEXT|AND|OR|NOT|TRUE|FALSE|NULL)\\b",
    },
    function: {
      name: "entity.name.function.ampscript",
      match: "\\b(?i:[A-Za-z_][A-Za-z0-9_]*)(?=\\s*\\()",
    },
    number: {
      name: "constant.numeric.ampscript",
      match: "\\b\\d+(?:\\.\\d+)?\\b",
    },
    operator: {
      name: "keyword.operator.ampscript",
      match: "==|!=|<=|>=|<|>|=",
    },
  },
};
