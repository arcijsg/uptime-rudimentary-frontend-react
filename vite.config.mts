import { defineConfig } from "npm:vite@^5.0.10"
import react from "npm:@vitejs/plugin-react-swc@^3.5.0"

import "npm:react@^18.2.0"
import "npm:react-dom@^18.2.0"
import "npm:zustand@4.5.1"
import "npm:derive-zustand"
import "npm:evergreen-ui@7.1.9"

// https://vitejs.dev/config/
export default defineConfig({
  // ref: https://v2.vitejs.dev/config/#envprefix
  envPrefix: "UPTIME_",
  plugins: [
    react(),
  ]
})
