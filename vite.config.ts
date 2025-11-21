import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { reactRouter } from "@react-router/dev/vite";

export default defineConfig({
  plugins: [tailwindcss(), tsconfigPaths(), reactRouter()],
  server: {
    hmr: {
      clientPort: 8000,
      host: "localhost",
      protocol: "ws",
    },
  },
});
