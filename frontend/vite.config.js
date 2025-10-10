import { defineConfig } from "vite";
import fs from "fs";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // optional
    https: {
      key: fs.readFileSync("./certs/localhost+1-key.pem"),
      cert: fs.readFileSync("./certs/localhost+1.pem"),
    },
  },
});
