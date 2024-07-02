import globals from "globals";
import pluginJs from "@eslint/js";
import sonarjs from "eslint-plugin-sonarjs";
import eslintConfigPrettier from "eslint-config-prettier"

export default [
  {
    languageOptions: { globals: globals.node },
  },
  {
    "plugins": {
      sonarjs,
      pluginJs,
      eslintConfigPrettier
    }
  }
];