import { jsxLocPlugin } from "@builder.io/vite-plugin-jsx-loc";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import fs from "node:fs";
import path from "path";
import { defineConfig } from "vite";
import { vitePluginManusRuntime } from "vite-plugin-manus-runtime";

const plugins = [react(), tailwindcss(), jsxLocPlugin(), vitePluginManusRuntime()];

function computeBase() {
  // If explicit override is set, honor it
  if (process.env.VITE_BASE) return process.env.VITE_BASE;

  // In GitHub Actions, derive base from repository name
  const repo = process.env.GITHUB_REPOSITORY;
  if (repo) {
    const name = repo.split("/")[1] ?? "";
    // For user/organization pages (repo ends with .github.io), base must be '/'
    if (name.endsWith(".github.io")) return "/";
    // For project pages, base is '/<repo>/'
    if (name) return `/${name}/`;
  }
  return "/";
}

export default defineConfig({
  plugins,
  base: computeBase(),
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  envDir: path.resolve(import.meta.dirname),
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    port: 3000,
    strictPort: false, // Will find next available port if 3000 is busy
    host: true,
    allowedHosts: [
      ".manuspre.computer",
      ".manus.computer",
      ".manus-asia.computer",
      ".manuscomputer.ai",
      ".manusvm.computer",
      "localhost",
      "127.0.0.1",
    ],
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});
