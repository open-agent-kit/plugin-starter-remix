import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { federation } from "@module-federation/vite";

export default defineConfig({
  base: "./",
  plugins: [
    tailwindcss(),
    tsconfigPaths(),
    federation({
      filename: "remoteEntry.js",
      // the name must remain unchanged and always needs to be "remoteOAKPlugin"
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
