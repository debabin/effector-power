import { startMockServer } from "mock-config-server";

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { babel } from "@rollup/plugin-babel";

import { mockServerConfig } from "./mock-server.config";

startMockServer(mockServerConfig);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    babel({ extensions: [".ts", ".tsx"], babelHelpers: "bundled" }),
    react({ fastRefresh: false }),
  ],
});
