import react from "eslint-plugin-react";
import globals from "globals";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [{
    ignores: ["**/node_modules/", "**/dist/", "**/out/"],
}, ...compat.extends("standard-with-typescript", "plugin:react/recommended", "prettier"), {
    plugins: {
        react,
    },

    languageOptions: {
        globals: {
            ...globals.browser,
        },

        ecmaVersion: "latest",
        sourceType: "module",
    },

    rules: {
        "@typescript-eslint/no-unused-vars": "warn",
        "@typescript-eslint/return-await": "off",
        "@typescript-eslint/no-extraneous-class": "off",
        "@typescript-eslint/no-floating-promises": "off",
        "@typescript-eslint/consistent-type-imports": "off",
        "@typescript-eslint/strict-boolean-expressions": "off",
        "@typescript-eslint/consistent-type-definitions": "off",
        "@typescript-eslint/no-confusing-void-expression": "off",
        "no-useless-return": "off",
        "no-extra-boolean-cast": "off",
    },
}, {
    files: ["**/.eslintrc.{js,cjs}"],

    languageOptions: {
        globals: {
            ...globals.node,
        },

        ecmaVersion: 5,
        sourceType: "commonjs",
    },
}];