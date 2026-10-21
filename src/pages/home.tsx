import { useRef, useState } from "react";
import Carousel from "../carousel/Carousel";
import ProjectIndex from "../components/project-index";
import { PageHeader } from "../components/mpa-chrome";

type RingView = "overview" | "focused" | "detail";

export default function Home() {
  const [view, setView] = useState<RingView>("overview");
  const [available, setAvailable] = useState(true);
  const controls = useRef<{ overview: () => void } | null>(null);
  return (
    <>
      <PageHeader />
      <main id="main-content" tabIndex={-1}>
        <div hidden={!available}>
          <Carousel controlsRef={controls} onViewChange={setView} onAvailabilityChange={setAvailable} />
        </div>
        {available ? <div className="home-help" hidden={view !== "focused"}>
          <button className="site-control" onClick={() => controls.current?.overview()}>← 返回圆环</button>
        </div> : <ProjectIndex open={false} onClose={() => {}} fallback />}
      </main>
    </>
  );
}
