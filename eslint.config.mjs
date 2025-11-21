import nextConfig from "eslint-config-next";

const config = [
  {
    ignores: ["node_modules", ".next", "dist"],
  },
  ...nextConfig,
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      "@typescript-eslint/consistent-type-imports": [
        "warn",
        { prefer: "type-imports", disallowTypeAnnotations: false },
      ],
    },
  },
];

export default config;

