import { createRoot } from "react-dom/client";
import AIProjectPage from "../components/ai-project-page";
import { projects } from "../data/project-data";
import "../styles/globals.css";

// 从 URL /projects/<slug>/ 解析当前项目
const match = window.location.pathname.match(/\/projects\/([^/]+)\/?$/);
const slug = match ? match[1] : "research-agent";
const project = projects[slug] ?? projects["research-agent"];

createRoot(document.getElementById("root")!).render(<AIProjectPage project={project} />);
