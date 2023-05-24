import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
import resolvePaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react(), resolvePaths()],
  build: {
    outDir: "lib",
  },
});
