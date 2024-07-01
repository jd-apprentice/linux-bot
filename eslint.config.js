import globals from "globals";
import pluginJs from "@eslint/js";
import sonarjs from "eslint-plugin-sonarjs";
import eslintConfigPrettier from "eslint-config-prettier"
import jsdoc from '@jsdoc/eslint-config';

export default [
  {
    languageOptions: { globals: globals.node },
  },
  {
    "plugins": {
      sonarjs,
      pluginJs,
      eslintConfigPrettier,
      jsdoc
    }
  }
];