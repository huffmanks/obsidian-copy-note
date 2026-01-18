import obsidianmd from "eslint-plugin-obsidianmd";
import globals from "globals";
import path from "node:path";
import { fileURLToPath } from "node:url";
import tseslint from "typescript-eslint";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default tseslint.config(
  {
    ignores: ["node_modules", "dist", "esbuild.config.mjs", "eslint.config.js", "version-bump.mjs", "versions.json", "main.js"],
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        projectService: {
          allowDefaultProject: ["eslint.config.js", "manifest.json"],
        },
        tsconfigRootDir: __dirname,
        extraFileExtensions: [".json"],
      },
    },
  },
  ...(obsidianmd?.configs?.recommended as any),
);
