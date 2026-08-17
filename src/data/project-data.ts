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

export const projects: Record<string, AIProject> = {
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
    next: "research-agent",
  },
};
