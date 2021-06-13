import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],
  // build: {
  //   rollupOptions: {
  //     output: {
  //       format: "umd",
  //       manualChunks: {
  //         "@react-three/drei": ["@react-three/drei"],
  //         three: ["three"],
  //       },
  //     },
  //   },
  // },
});
