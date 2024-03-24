import { defineConfig } from "@pandacss/dev";

export default defineConfig({
  presets: ["@shadow-panda/preset"],
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: [
    "./components/**/*.{ts,tsx,js,jsx}",
    "./components/ui/**/*.{ts,tsx,js,jsx}",
    "./pages/**/*.{ts,tsx,js,jsx}",
  ],
  // Use React
  jsxFramework: "react",

  // Files to exclude
  exclude: [],

  // The output directory for your css system
  // syntax: "template-literal",
  emitPackage: true,
  outdir: "@shadow-panda/styled-system",
  theme: {
    extend: {
      tokens: {
        colors: {
          brand: { value: "#0091d2" },
        },
      },
    },
  },
});
