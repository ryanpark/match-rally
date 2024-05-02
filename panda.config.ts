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
    "./plugin/**/*.{ts,tsx,js,jsx}",
  ],
  // Use React
  jsxFramework: "react",

  // Files to exclude
  exclude: [],

  // The output directory for your css system
  // this fucked up
  // syntax: "template-literal",
  emitPackage: true,
  outdir: "@shadow-panda/styled-system",
  theme: {
    extend: {
      tokens: {
        colors: {
          brand: { value: "#27AE60" },
          primary: { value: "red" },
          greeny: { value: "#B9E506" },
          white: { value: "#fff" },
          black: { value: "#353535" },
          yellow: { value: "#FFF500" },
          blue: { value: "#45B1FF" },
          darkBlue: { value: "#10588C" },
        },
        fonts: {
          body: { value: "Inter, system-ui, sans-serif" },
        },
      },
    },
  },
});
