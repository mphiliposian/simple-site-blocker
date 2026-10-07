import globals from "globals";
import reactPlugin from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactHooksPlugin from "eslint-plugin-react-hooks";

export default [
    { ignores: ["dist/", "node_modules/"] },
    {
        files: ["**/*.{js,jsx,ts,tsx}"],
        languageOptions: {
            parserOptions: {
                ecmaFeatures: {
                    jsx: true, // Enable JSX parsing
                },
            },
            globals: {
                ...globals.browser, // Include browser environment globals like window and document
            },
        },
        plugins: {
            react: reactPlugin,
            "react-hooks": reactHooksPlugin,
        },
        rules: {
            ...reactHooks.configs.recommended.rules,
        },

        settings: {
            react: {
                version: "detect", // Automatically detect your React version
            },
        },
    },
];
