import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  plugins: [
    tailwindcss(),
    tsconfigPaths(),
    federation({
      filename: "remoteEntry.js",
      name: "remoteOAKPlugin",
      exposes: {
        "./translatorTool": "./app/components/tools/translatorTool.tsx",
      },
      shared: ["react", "react-dom"],
    }),
  ],
  build: {
    target: "chrome89",
    outDir: "public",
    rollupOptions: {
      external: ["react", "react-dom"],
      input: {},
    },
  },
});
