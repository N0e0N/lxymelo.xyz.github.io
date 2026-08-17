# LXY.MELO — Personal Portfolio

LXY.MELO 的个人作品集网站：沉浸式的 AI、设计与创意作品展示。

纯静态多页应用（MPA），基于 **Vite + React 19 + TypeScript + Tailwind CSS 4** 构建，无后端依赖，可直接部署到 GitHub Pages 等任意静态托管，支持绑定自己的域名。

## 本地开发

```bash
npm install
npm run dev        # 开发服务器 → http://localhost:3000
npm run build      # 构建静态文件 → dist/
npm run preview    # 本地预览构建产物
```

## 页面结构

| 路径 | 说明 |
| --- | --- |
| `/` | 首页：螺旋式作品展示（Three.js 3D 雕塑 + Canvas 网格 + 视频背景） |
| `/about/` | 关于页 |
| `/projects/research-agent/` | 设计学术科研智能体 |
| `/projects/design-ai-playbook/` | Design & AI Playbook |
| `/projects/ai-education-symposium/` | 设计人工智能教育创新研讨会 |
| `/projects/creatorthon/` | 创客松 2.0 |
| `/projects/echo-of/` | Echo Of |

> 项目数据统一维护在 `src/data/project-data.ts`，新增项目页只需在 `projects/<slug>/` 下加一个 `index.html`。

## 部署到 GitHub Pages + 绑定自定义域名

仓库已内置 GitHub Actions 工作流（`.github/workflows/deploy.yml`），推送到 `main` 分支后自动构建并发布。

### 步骤

1. **推代码到 GitHub**
   ```bash
   git init            # 若尚未初始化
   git add .
   git commit -m "feat: initial portfolio site"
   git branch -M main
   git remote add origin https://github.com/<用户名>/<仓库名>.git
   git push -u origin main
   ```

2. **开启 GitHub Pages**
   - 仓库 Settings → Pages
   - Source 选择 **GitHub Actions**（工作流会自动构建并部署）

3. **绑定自己的域名**
   - 在 **Settings → Pages → Custom domain** 填入你的域名（如 `www.example.com`）
   - GitHub 会提示你在域名服务商处添加一条 CNAME 记录，指向 `<用户名>.github.io`
   - 勾选 **Enforce HTTPS**

### 注意事项

- 站点资源使用根路径（`/xxx`），绑定自定义域名后一切正常；若暂时用 `https://<用户名>.github.io/<仓库名>/` 预览，需要把 `vite.config.ts` 中的 `base` 改为 `/<仓库名>/` 并重新构建。
- 构建产物 `dist/` 已加入 `.gitignore`，不会提交到仓库。
