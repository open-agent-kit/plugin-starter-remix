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
      // legacy identifier — must remain "remoteOAKPlugin" (the SAALT shell looks
      // up federated remotes by this exact name; renaming breaks discovery)
      name: "remoteOAKPlugin",
      exposes: {
        // "./myComponent": "./app/components/tools/myComponent.tsx",
      },
      shared: ["react", "react-dom"],
    }),
  ],
  build: {
    target: "chrome89",
    outDir: "public",
    rollupOptions: {
      input: {},
    },
  },
});
