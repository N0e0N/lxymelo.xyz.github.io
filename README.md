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
| `/projects/negative-space/` | 负空间 — OPPO Find N 折叠屏交互概念 |
| `/projects/special-vehicle-hmi/` | 特种车避让 HMI — 车载双屏避让引导概念 |
| `/projects/moocer/` | MOOCER — AI 慕课制作工作台 |
| `/projects/research-agent/` | 设计学术科研智能体 |
| `/projects/design-ai-playbook/` | Design & AI Playbook |
| `/projects/ai-education-symposium/` | 设计人工智能教育创新研讨会 |
| `/projects/creatorthon/` | 创客松 2.0 |
| `/projects/echo-of/` | Echo Of |

> 项目数据统一维护在 `src/data/project-data.ts`，新增项目页只需在 `projects/<slug>/` 下加一个 `index.html`。

## 版本管理与发布

当前版本：**1.1.0**，变更见 [CHANGELOG.md](CHANGELOG.md)。

- 仓库：https://github.com/N0e0N/lxymelo.xyz.github.io
- `main`：线上分支，推送后由 `.github/workflows/deploy.yml` 自动构建部署。
- `release/v1.1.0`：保留本次版本源码；`v1.1.0`：带注释的版本标签。
- 后续发布从最新 `main` 创建 `release/vX.Y.Z`，更新 manifest/lockfile 与变更记录，验证后推送分支，非强制合并到 `main`，再推送版本标签。
- 回滚通过新分支执行 `git revert` 撤销对应发布提交（合并提交需 `-m 1`），重新验证并合并到 `main`；不 reset、不强推，不改写历史。标签用于定位历史版本。

## GitHub Pages 与域名

线上规范地址：https://www.lxymelo.xyz/；https://lxymelo.xyz/ 重定向至规范地址。
`public/CNAME` 会随构建复制到 `dist/CNAME`，值为 `www.lxymelo.xyz`。
Pages 设置应使用 **GitHub Actions** 并启用 HTTPS；域名 DNS 保持现有 GitHub Pages 配置。

构建前执行 `npm ci`，发布验证执行：

```bash
npm run build
npm run lint
npx tsc --noEmit
```

`dist/` 与 `node_modules/` 不提交。站点资源使用根路径，针对上述自定义域名部署。
