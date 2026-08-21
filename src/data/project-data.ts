import { withBase } from "../lib/base";

export type ProjectMedia = { src: string; type?: "image" | "video"; alt: string };

export type AIProject = {
  slug: string;
  title: string;
  kicker: string;
  year: string;
  cover: string;
  summary: string;
  roles: string[];
  media: ProjectMedia[];
  external?: { label: string; hint?: string; href: string }[];
  next: string;
};

const images = (folder: string, count: number, label: string): ProjectMedia[] =>
  Array.from({ length: count }, (_, index) => ({ src: `/projects/${folder}/${String(index + 1).padStart(2, "0")}.jpg`, alt: `${label} ${index + 1}` }));

const rawProjects: Record<string, AIProject> = {
  moocer: {
    slug: "moocer",
    title: "MOOCER",
    kicker: "AI BUILDER / COURSE STUDIO",
    year: "2026",
    cover: "/ai-builder/moocer.jpg",
    summary: "面向课程创作者的一站式 AI 慕课制作工作台：从课件与课纲出发，完成课程规划、逐页口播、AI 配音或本人录音、课程预览与 MP4 成片导出。",
    roles: ["AI Product", "Education Workflow", "Multimodal Agent"],
    media: [
      { src: "/projects/moocer/01.png", alt: "MOOCER 课程创建与项目工作台" },
      { src: "/projects/moocer/02.png", alt: "MOOCER 逐页口播与音频制作界面" },
      { src: "/projects/moocer/03.png", alt: "MOOCER 慕课成片预览与下载界面" },
    ],
    next: "research-agent",
  },
  "research-agent": {
    slug: "research-agent",
    title: "设计学术科研智能体",
    kicker: "AI BUILDER / AGENT",
    year: "2025",
    cover: "/ai-builder/research-agent.jpg",
    summary: "面向设计学研究者的科研辅助系统，把文献调研、数据编码、学术图表与申报表格组织进同一条智能工作流。",
    roles: ["AI Agent", "Product Design", "Research Workflow"],
    media: [{ src: "/projects/research-agent/demo.mp4", type: "video", alt: "科研智能体演示视频" }],
    external: [{ label: "VISIT PRODUCT", href: "https://research.tezign.com/" }],
    next: "design-ai-playbook",
  },
  "design-ai-playbook": {
    slug: "design-ai-playbook",
    title: "Design & AI Playbook",
    kicker: "AI BUILDER / EDUCATION",
    year: "2025",
    cover: "/ai-builder/design-ai-playbook.jpg",
    summary: "给所有人的设计人工智能第一课。通过系列播客和视觉章节，把工具、方法与创作想象力转译成可理解、可实践的学习内容。",
    roles: ["AI Education", "Content Design", "Podcast"],
    media: images("design-ai-playbook", 7, "Design & AI Playbook EP").slice(1),
    external: [
      { label: "小宇宙", hint: "跳转小宇宙收听", href: "https://www.xiaoyuzhoufm.com/podcast-topic/68255dde1ced30a23168e6d1" },
      { label: "公众号", hint: "跳转观看", href: "https://mp.weixin.qq.com/s/vccpWFJo3GatGU16fWWlIQ" },
    ],
    next: "ai-education-symposium",
  },
  "ai-education-symposium": {
    slug: "ai-education-symposium",
    title: "设计人工智能教育创新研讨会",
    kicker: "AI BUILDER / SYMPOSIUM",
    year: "2025",
    cover: "/ai-builder/ai-education-symposium.jpg",
    summary: "围绕人工智能的跨学科交叉、教学实验与产教融合展开的教育研讨会，并以“交叉、趋势、实践、建设”形成完整视觉系统。",
    roles: ["Event Identity", "AI Education", "Visual System"],
    media: [
      { src: "/projects/ai-education-symposium/01.jpg", alt: "研讨会现场大合照" },
      { src: "/projects/ai-education-symposium/demo.mp4", type: "video", alt: "设计人工智能教育创新研讨会演示视频" },
      ...images("ai-education-symposium", 7, "研讨会视觉与现场").slice(1),
    ],
    external: [{ label: "VIEW ARTICLE", href: "https://mp.weixin.qq.com/s/cYiusTWXHL_o6ZVURqrOQQ" }],
    next: "creatorthon",
  },
  creatorthon: {
    slug: "creatorthon",
    title: "创客松 2.0",
    kicker: "AI BUILDER / WORKSHOP",
    year: "2025",
    cover: "/ai-builder/creatorthon.jpg",
    summary: "以真实需求与问题场景为起点，将 AI 工具研究、课程体系和创作实践连接起来：预测未来最好的方式，是动手创建未来。",
    roles: ["AI Workshop", "Program Design", "Community"],
    media: images("creatorthon", 6, "创客松活动与课程体系"),
    external: [{ label: "VIEW ARTICLE", href: "https://mp.weixin.qq.com/s/MdguwseYDi3i72BpaqAeDQ" }],
    next: "echo-of",
  },
  "echo-of": {
    slug: "echo-of",
    title: "Echo Of",
    kicker: "AI BUILDER / EXPERIENCE",
    year: "2025",
    cover: "/ai-builder/echo-of.jpg",
    summary: "融合音乐、空间与叙事的 AI 创意工作流：分析歌曲特征，生成场景提示，并驱动 Blender 构建属于每首歌的等距精神空间。",
    roles: ["AI Workflow", "Music Analysis", "3D Experience"],
    media: [{ src: "/projects/echo-of/demo.mp4", type: "video", alt: "Echo Of 演示视频" }],
    next: "negative-space",
  },
  "negative-space": {
    slug: "negative-space",
    title: "负空间",
    kicker: "DESIGN / INTERACTION CONCEPT",
    year: "2023",
    cover: "/designer/negative-space.jpg",
    summary: "基于 OPPO Find N 内外双屏协同的消息处理概念。在大屏沉浸观影或游戏时，通过外屏三指手势完成忽略、回复与标记，并在退出沉浸状态后集中提醒和分屏处理重要消息。",
    roles: ["Product Design", "Interaction Design", "User Research"],
    media: [
      { src: "/projects/negative-space/demo.mp4", type: "video", alt: "负空间折叠屏交互演示" },
      { src: "/projects/negative-space/page-5.jpg", alt: "沉浸大屏消息处理的用户痛点" },
      { src: "/projects/negative-space/page-7.jpg", alt: "负空间内外屏协同设计概念" },
      { src: "/projects/negative-space/page-9.jpg", alt: "外屏手势可用性实验与设计迭代" },
      { src: "/projects/negative-space/page-10.jpg", alt: "负空间交互说明与完整任务流程" },
      { src: "/projects/negative-space/page-11.jpg", alt: "使用外屏手势忽略消息" },
      { src: "/projects/negative-space/page-12.jpg", alt: "使用外屏手势快速回复消息" },
      { src: "/projects/negative-space/page-13.jpg", alt: "使用外屏手势标记消息" },
      { src: "/projects/negative-space/page-14.jpg", alt: "退出沉浸状态后查看标记消息" },
      { src: "/projects/negative-space/page-15.jpg", alt: "通过分屏处理标记消息" },
      { src: "/projects/negative-space/page-16.jpg", alt: "切换和完成标记消息" },
    ],
    next: "special-vehicle-hmi",
  },
  "special-vehicle-hmi": {
    slug: "special-vehicle-hmi",
    title: "特种车避让 HMI",
    kicker: "DESIGN / AUTOMOTIVE HMI",
    year: "2022",
    cover: "/designer/special-vehicle-hmi.jpg",
    summary: "面向特种车辆接近与道路避让场景的车载 HMI 概念。通过仪表盘与中控屏协同呈现来车方向、距离、风险状态与避让引导，帮助驾驶者快速理解路况并安全完成避让。",
    roles: ["HMI Design", "Interaction Design", "Visual System"],
    media: [
      { src: "/projects/special-vehicle-hmi/demo.mp4", type: "video", alt: "特种车避让 HMI 动态演示" },
      { src: "/projects/special-vehicle-hmi/01-use-scenario.jpg", alt: "特种车避让 HMI 的仪表盘与中控屏使用场景" },
      { src: "/projects/special-vehicle-hmi/02-design-definition.jpg", alt: "特种车避让场景与 HMI 设计定义" },
      { src: "/projects/special-vehicle-hmi/03-page-flow.jpg", alt: "特种车识别、提醒与避让引导页面流程" },
      { src: "/projects/special-vehicle-hmi/04-ui-kit.jpg", alt: "特种车避让 HMI 视觉系统与 UI 套件" },
      { src: "/projects/special-vehicle-hmi/05-high-fidelity-overview.jpg", alt: "仪表盘与中控屏高保真设计总览" },
      { src: "/projects/special-vehicle-hmi/06-high-fidelity.jpg", alt: "不同避让状态下的高保真界面" },
      { src: "/projects/special-vehicle-hmi/07-design-style.jpg", alt: "锋利、地平线、科技与突破的设计风格" },
    ],
    next: "moocer",
  },
};

// 统一补上部署子路径（base 为 "/" 时 withBase 原样返回）
export const projects: Record<string, AIProject> = Object.fromEntries(
  Object.entries(rawProjects).map(([key, p]) => [
    key,
    {
      ...p,
      cover: withBase(p.cover),
      media: p.media.map((m) => ({ ...m, src: withBase(m.src) })),
    },
  ]),
);
