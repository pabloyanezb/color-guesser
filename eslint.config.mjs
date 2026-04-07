import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import tseslint from "typescript-eslint";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
  ...tseslint.configs.recommended,
  {
    rules: {
      // Line length
      "max-len": [
        "error",
        {
          "code": 100,
          "ignoreStrings": true,
          "ignoreTemplateLiterals": true,
          "ignoreUrls": true,
        },
      ],

      // Formatting
      "comma-dangle": ["error", "always-multiline"],
      "no-trailing-spaces": "error",
      "eol-last": ["error", "always"],
      "no-multiple-empty-lines": ["error", { "max": 1 }],
      "indent": ["error", 2, { "SwitchCase": 1 }],
      "react/jsx-indent-props": ["error", 2],

      // JSX - closing bracket alignment
      "react/jsx-closing-bracket-location": ["error", "line-aligned"],
      "react/jsx-tag-spacing": [
        "error",
        {
          "closingSlash": "never",
          "beforeSelfClosing": "always",
        },
      ],

      // JSX - multiple props must be on separate lines
      "react/jsx-first-prop-new-line": ["error", "multiline"],
      "react/jsx-max-props-per-line": [
        "error",
        { "maximum": { "single": 2, "multi": 1 } },
      ],

      // React hooks
      "react-hooks/exhaustive-deps": "warn",

      // TypeScript
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          "argsIgnorePattern": "^_",
          "varsIgnorePattern": "^_",
        },
      ],
      "@typescript-eslint/consistent-type-imports": "error",
    },
  },
]);

export default eslintConfig;
