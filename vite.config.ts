import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";

const projectSlugs = [
  "negative-space",
  "special-vehicle-hmi",
  "moocer",
  "research-agent",
  "design-ai-playbook",
  "ai-education-symposium",
  "creatorthon",
  "echo-of",
];

// 多页应用（MPA）入口：每个页面一个独立 HTML
const projectInputs = projectSlugs.reduce<Record<string, string>>((acc, slug) => {
  acc[`project-${slug}`] = resolve(import.meta.dirname, `projects/${slug}/index.html`);
  return acc;
}, {});

export default defineConfig({
  plugins: [react()],
  // 自定义域名 www.lxymelo.xyz 根路径访问
  base: "/",
  server: {
    port: 3000,
    host: true,
  },
  build: {
    rollupOptions: {
      input: {
        home: resolve(import.meta.dirname, "index.html"),
        about: resolve(import.meta.dirname, "about/index.html"),
        ...projectInputs,
      },
    },
  },
});
