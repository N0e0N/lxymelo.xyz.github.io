// 环序项目数据 —— 从站点内容源 src/data/project-data.ts 派生。
// 参考站的 projects.js 是手写数据；本站以 project-data.ts 为唯一内容源，
// 在此派生为机器需要的形状。增删项目只改 project-data.ts 与本文件顶部的两个表。
import { projects } from "../../data/project-data";
import { withBase } from "../../lib/base";

// 环序：与作品集顺序一致。参考站提示相邻卡片会相互融合，
// 顺序决定同屏色彩节奏，换序时留意封面色调的搭配。
const RING_ORDER = [
  "moocer",
  "research-agent",
  "design-ai-playbook",
  "ai-education-symposium",
  "creatorthon",
  "echo-of",
  "negative-space",
  "special-vehicle-hmi",
];

// 项目类型文案，用于圆环放大后的信息标签。
const TYPES = {
  moocer: "线上慕课录制产品",
  "research-agent": "科研智能体产品",
  "design-ai-playbook": "AI 播客",
  "ai-education-symposium": "AI教育大会",
  creatorthon: "AI工作坊",
  "echo-of": "AIGC创新内容",
  "negative-space": "OPPO折叠屏交互方案",
  "special-vehicle-hmi": "车载 HMI",
};

// 媒体盒型：land 3:2 / port 4:5 / wide 16:9（对应参考站 SHAPES）。
// 按文件实测长宽比归类（≥1.6 → wide，≥1.1 → land，其余 → port）；
// 只列非默认项，未列出的图片按 land，视频一律 wide。
const SHAPE_OVERRIDES = {
  "/projects/moocer/01.png": "wide",
  "/projects/moocer/02.png": "wide",
  "/projects/moocer/03.png": "wide",
  "/projects/design-ai-playbook/02.jpg": "port",
  "/projects/design-ai-playbook/03.jpg": "port",
  "/projects/design-ai-playbook/04.jpg": "port",
  "/projects/design-ai-playbook/05.jpg": "port",
  "/projects/design-ai-playbook/06.jpg": "port",
  "/projects/design-ai-playbook/07.jpg": "port",
  "/projects/ai-education-symposium/02.jpg": "wide",
  "/projects/ai-education-symposium/05.jpg": "wide",
  "/projects/creatorthon/01.jpg": "port",
  "/projects/creatorthon/02.jpg": "wide",
  "/projects/creatorthon/03.jpg": "wide",
  "/projects/creatorthon/04.jpg": "wide",
  "/projects/creatorthon/05.jpg": "wide",
  "/projects/creatorthon/06.jpg": "wide",
  "/projects/negative-space/page-5.jpg": "wide",
  "/projects/negative-space/page-7.jpg": "wide",
  "/projects/negative-space/page-9.jpg": "wide",
  "/projects/negative-space/page-10.jpg": "wide",
  "/projects/negative-space/page-11.jpg": "wide",
  "/projects/negative-space/page-12.jpg": "wide",
  "/projects/negative-space/page-13.jpg": "wide",
  "/projects/negative-space/page-14.jpg": "wide",
  "/projects/negative-space/page-15.jpg": "wide",
  "/projects/negative-space/page-16.jpg": "wide",
  "/projects/special-vehicle-hmi/01-use-scenario.jpg": "wide",
  "/projects/special-vehicle-hmi/02-design-definition.jpg": "wide",
  "/projects/special-vehicle-hmi/03-page-flow.jpg": "wide",
  "/projects/special-vehicle-hmi/05-high-fidelity-overview.jpg": "wide",
};

const ringProjects = RING_ORDER.map((slug) => {
  const p = projects[slug];
  return {
    slug,
    // 卡片与 hero 的美术：项目封面（atlas 按此加载）
    file: p.cover,
    name: p.title,
    type: TYPES[slug] ?? "设计",
    year: p.year,
    blurb: p.summary,
    // 本站适配：原站的 roles 角色标签与外链，补到 open 覆盖层
    roles: p.roles,
    external: p.external ?? [],
    // 本站内容源暂无 insights 字段；机器在数组为空时自动隐藏该行。
    // 后续可在 project-data.ts 增加 insights 后在此映射。
    insights: [],
    media: p.media.map((m) => {
      const isVideo = m.type === "video";
      return {
        // 参考站约定：src 是海报图，video 才是影片文件。
        // 本站视频媒体没有独立海报，用项目封面代替。
        src: isVideo ? p.cover : m.src,
        shape: isVideo ? "wide" : SHAPE_OVERRIDES[m.src] ?? "land",
        caption: m.alt,
        // liveStart 播放时会补 "/" 前缀，这里去掉开头的斜杠
        ...(isVideo ? { video: m.src.replace(/^\//, "") } : {}),
      };
    }),
  };
});

// 本站适配：About 页也作为转盘之一，放在环尾。它是通往 /about/ 的入口
// （点击直接跳转不开覆盖层，见 Carousel.jsx 的 openProject / advanceTo），
// 封面用关于页的海边照片。
const aboutCard = {
  slug: "about",
  file: withBase("/about/about-me.jpg"),
  name: "关于我",
  type: "ABOUT ME",
  year: "2026",
  blurb: "点击进入关于页——我是 LXY.MELO，一名工作在 AI 与设计交叉地带的 Builder。",
  roles: [],
  external: [],
  insights: [],
  media: [],
};

export const PROJECTS = [...ringProjects, aboutCard];

export const IMAGE_FILES = PROJECTS.map((p) => p.file);
