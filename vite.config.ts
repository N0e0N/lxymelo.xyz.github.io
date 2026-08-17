import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";

const projectSlugs = [
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
  // 部署在自定义域名根路径下，资源使用绝对路径 /xxx
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
