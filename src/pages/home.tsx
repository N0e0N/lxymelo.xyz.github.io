import { useRef, useState } from "react";
import Carousel from "../carousel/Carousel";
import ProjectIndex from "../components/project-index";
import { PageHeader } from "../components/mpa-chrome";

type RingView = "overview" | "focused" | "detail";

export default function Home() {
  const [view, setView] = useState<RingView>("overview");
  const [available, setAvailable] = useState(true);
  const [indexOpen, setIndexOpen] = useState(false);
  const controls = useRef<{ overview: () => void } | null>(null);
  return (
    <>
      <PageHeader />
      <main id="main-content" tabIndex={-1}>
        <h1 className="sr-only">LXY · AI 与设计作品</h1>
        <div hidden={!available}>
          <Carousel paused={indexOpen} controlsRef={controls} onViewChange={setView} onAvailabilityChange={setAvailable} />
        </div>
        {available ? <>
          <div className="home-help" hidden={view === "detail"}>
            {view === "focused" ?
              <button className="site-control home-back" aria-label="返回圆环" onClick={() => controls.current?.overview()}><span aria-hidden="true">←</span> back</button> :
              <p className="home-touch-hint">拖动圆环 · 轻点作品查看</p>}
            <button className="site-control" onClick={() => setIndexOpen(true)}>作品列表 ↗</button>
          </div>
          <ProjectIndex open={indexOpen} onClose={() => setIndexOpen(false)} />
        </> : <ProjectIndex open={false} onClose={() => {}} fallback />}
      </main>
    </>
  );
}
