"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import RiseLink from "../components/rise-link";
import CenterSculpture from "../components/center-sculpture";
import { withBase } from "../lib/base";

type Track = "all" | "builder" | "designer" | "player";

const builderBase = [
  { title: "MOOCER", type: "AI Course Studio", slug: "moocer", art: "external", image: withBase("/ai-builder/moocer.jpg"), position: "50% 50%", ratio: 0.75, width: 190 },
  { title: "科研智能体", type: "AI Agent", slug: "research-agent", art: "external", image: withBase("/ai-builder/research-agent.jpg"), position: "50% 48%", ratio: 0.75, width: 190 },
  { title: "Design & AI Playbook", type: "AI Education", slug: "design-ai-playbook", art: "external", image: withBase("/ai-builder/design-ai-playbook.jpg"), position: "50% 50%", ratio: 0.75, width: 200 },
  { title: "AI 教育创新研讨会", type: "Symposium", slug: "ai-education-symposium", art: "external", image: withBase("/ai-builder/ai-education-symposium.jpg"), position: "50% 50%", ratio: 0.75, width: 180 },
  { title: "创客松 2.0", type: "AI Workshop", slug: "creatorthon", art: "external", image: withBase("/ai-builder/creatorthon.jpg"), position: "50% 52%", ratio: 0.75, width: 190 },
  { title: "Echo Of", type: "AI Experience", slug: "echo-of", art: "external", image: withBase("/ai-builder/echo-of.jpg"), position: "50% 50%", ratio: 0.75, width: 175 },
];

const designerBase = [
  { title: "负空间", type: "Interaction Design", slug: "negative-space", art: "external", image: withBase("/designer/negative-space.jpg"), position: "50% 50%", ratio: 0.75, width: 190 },
];

const portfolioBase = [
  ...builderBase.map((work) => ({ ...work, category: "builder" as const })),
  ...designerBase.map((work) => ({ ...work, category: "designer" as const })),
];

const allWorks = Array.from({ length: portfolioBase.length * 3 }, (_, index) => {
  const work = portfolioBase[index % portfolioBase.length];
  return {
    ...work,
    id: `${work.category}-${index}`,
    link: withBase(`/projects/${work.slug}/`),
    ratio: 0.75,
    width: work.width * (0.7 + (index % 4) * 0.055),
  };
});

const sliceDepthFactors = Array.from({ length: 9 }, (_, index) => {
  const x = index / 4 - 1;
  return Math.cos(x * Math.PI / 2);
});
const sliceTurnFactors = Array.from({ length: 9 }, (_, index) => {
  const x = index / 4 - 1;
  return -Math.sin(x * Math.PI / 2);
});

export default function Home() {
  const [track, setTrack] = useState<Track>("all");
  const sceneRef = useRef<HTMLDivElement | null>(null);
  const gridRef = useRef<HTMLCanvasElement | null>(null);
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const cursorTitleRef = useRef<HTMLElement | null>(null);
  const cursorTypeRef = useRef<HTMLElement | null>(null);
  const modelSpinRef = useRef(0);
  const workRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const surfaceRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const modeRef = useRef<"rings" | "spiral">("spiral");
  const introStartRef = useRef(0);
  const works = useMemo(() => track === "all" ? allWorks : allWorks.filter((work) => work.category === track), [track]);

  const selectTrack = (nextTrack: Track) => {
    const scene = sceneRef.current;
    scene?.classList.add("intro-video", "intro-grid", "intro-sculpture", "intro-works");
    introStartRef.current = performance.now() - 10000;
    setTrack(nextTrack);
  };

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const stageClasses = ["intro-video", "intro-grid", "intro-sculpture", "intro-works"];
    let timers: number[] = [];

    const clearTransientLayers = () => {
      scene.classList.remove("is-leaving");
      document.querySelectorAll(".page-transition-cover, .route-rise-panel").forEach((element) => element.remove());
    };
    const startIntro = () => {
      timers.forEach((timer) => window.clearTimeout(timer));
      timers = [];
      introStartRef.current = performance.now();
      stageClasses.forEach((className) => scene.classList.remove(className));

      if (reduceMotion) {
        stageClasses.forEach((className) => scene.classList.add(className));
        return;
      }

      scene.classList.add("intro-video");
      timers = [
        window.setTimeout(() => scene.classList.add("intro-grid"), 1250),
        window.setTimeout(() => scene.classList.add("intro-sculpture"), 2500),
        window.setTimeout(() => scene.classList.add("intro-works"), 3800),
      ];
    };
    const onPageShow = (event: PageTransitionEvent) => {
      clearTransientLayers();
      const video = scene.querySelector<HTMLVideoElement>(".cloud-background");
      video?.play().catch(() => undefined);
      if (event.persisted) startIntro();
    };

    portfolioBase.forEach((work) => {
      const image = new Image();
      image.decoding = "async";
      image.src = work.image;
    });
    clearTransientLayers();
    startIntro();
    window.addEventListener("pageshow", onPageShow);

    // 页面切走/后台时暂停背景视频解码，切回再恢复，避免与下一页抢 CPU
    const onVisibility = () => {
      const video = scene.querySelector<HTMLVideoElement>(".cloud-background");
      if (document.hidden) video?.pause();
      else video?.play().catch(() => undefined);
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
      window.removeEventListener("pageshow", onPageShow);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  useEffect(() => {
    workRefs.current.length = works.length;
    surfaceRefs.current.length = works.length;
    let target = 0;
    let current = 0;
    let curve = 0;
    let curveSpeed = 0;
    let touchY = 0;
    let frame = 0;
    let frameSkip = 0;
    let running = true;
    let gridPhase = 0;
    let gridSpeed = 0.000025;
    let previousTime = 0;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!introStartRef.current) introStartRef.current = performance.now();
    let pointerX = -100;
    let pointerY = -100;
    let cursorX = -100;
    let cursorY = -100;

    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      target += event.deltaY * 0.006;
    };
    const onTouchStart = (event: TouchEvent) => { touchY = event.touches[0]?.clientY ?? 0; };
    const onTouchMove = (event: TouchEvent) => {
      const nextY = event.touches[0]?.clientY ?? touchY;
      target += (touchY - nextY) * 0.018;
      touchY = nextY;
      event.preventDefault();
    };
    const onKey = (event: KeyboardEvent) => {
      if (["ArrowDown", "PageDown", " "].includes(event.key)) target += 1.3;
      if (["ArrowUp", "PageUp"].includes(event.key)) target -= 1.3;
    };
    const onPointerMove = (event: PointerEvent) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      cursorRef.current?.classList.add("is-visible");
    };
    const onPointerLeave = () => cursorRef.current?.classList.remove("is-visible");

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onPointerLeave);

    const render = (time: number) => {
      if (!running) return;
      if (document.hidden || frameSkip++ % 2 !== 0) {
        // 页面切走/后台时暂停；可见时降到 30fps（delta 按真实时间累加，速度不变）
        frame = window.requestAnimationFrame(render);
        return;
      }
      const deltaTime = previousTime ? Math.min(32, time - previousTime) : 16;
      previousTime = time;

      // Keep the spiral gently drifting upward while idle. Wheel and touch input
      // still move `target` much faster, then naturally settle back to this pace.
      if (!reduceMotion) target -= deltaTime * 0.000055;
      const cursorEase = 1 - Math.exp(-deltaTime * 0.028);
      cursorX += (pointerX - cursorX) * cursorEase;
      cursorY += (pointerY - cursorY) * cursorEase;
      if (cursorRef.current) cursorRef.current.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%)`;
      current += (target - current) * 0.075;
      const viewportHeight = window.innerHeight;
      const radius = Math.min(window.innerWidth * 0.36, 660);
      const spacing = Math.max(70, viewportHeight * 0.09);
      const count = works.length;
      const velocity = target - current;
      const energy = Math.min(1, Math.abs(velocity) * 0.16);
      const gridTargetSpeed = 0.000025 + velocity * 0.000013;
      gridSpeed += (gridTargetSpeed - gridSpeed) * 0.026;
      gridSpeed *= 0.997;
      gridPhase += gridSpeed * deltaTime;
      const desiredCurve = Math.tanh(velocity * 0.24) * (20 + energy * 56);
      curveSpeed += (desiredCurve - curve) * 0.095;
      curveSpeed *= 0.76;
      curve += curveSpeed;
      let frontIndex = 0;
      let frontScore = -Infinity;

      workRefs.current.forEach((element, index) => {
        if (!element) return;
        let x = 0;
        let y = 0;
        let z = 0;
        let rotationY = 0;

        if (modeRef.current === "spiral") {
          const raw = index + current;
          const wrapped = ((raw + count / 2) % count + count) % count - count / 2;
          const angle = wrapped * 0.69;
          x = Math.sin(angle) * radius + Math.sin(index * 12.73) * 34;
          y = wrapped * spacing + Math.sin(index * 7.17) * 28;
          z = Math.cos(angle) * 360 - 90 + Math.cos(index * 5.31) * 30;
          rotationY = -Math.sin(angle) * 58;
        } else {
          const ringSize = 5;
          const ring = Math.floor(index / ringSize) - 1.5;
          const angle = ((index % ringSize) / ringSize) * Math.PI * 2 + current * 0.22;
          x = Math.sin(angle) * radius * 0.92;
          y = ring * spacing * 2.25;
          z = Math.cos(angle) * 350 - 85;
          rotationY = -Math.sin(angle) * 52;
        }

        const edgeFade = Math.max(0, 1 - Math.abs(y) / (viewportHeight * 0.98));
        const depth = Math.max(0.16, Math.min(1, (z + 540) / 900));
        const opacity = Math.min(1, 0.12 + edgeFade * 0.72 + depth * 0.22);
        const worksAreReady = sceneRef.current?.classList.contains("intro-works") ?? false;
        const revealProgress = reduceMotion
          ? 1
          : worksAreReady
            ? Math.max(0, Math.min(1, (time - introStartRef.current - 3800 - index * 95) / 650))
            : 0;
        const reveal = revealProgress * revealProgress * (3 - 2 * revealProgress);
        element.style.transform = `translate3d(${x}px, ${y}px, ${z}px) translate(-50%, -50%) rotateY(${rotationY}deg)`;
        element.style.opacity = `${opacity * reveal}`;
        element.style.zIndex = `${Math.round(z + 900)}`;
        element.style.pointerEvents = edgeFade > 0.12 ? "auto" : "none";

        const surface = surfaceRefs.current[index];
        if (surface) {
          const wave = time * 0.0022 + index * 1.47 + current * 0.28;
          const cornerA = 1.2 + Math.abs(Math.sin(wave)) * (1.1 + energy * 5.4);
          const cornerB = 1.2 + Math.abs(Math.cos(wave * 0.76)) * (1 + energy * 4.8);
          surface.style.setProperty("--stretch", `${1 + energy * 0.035}`);
          surface.style.setProperty("--corner-a", `${cornerA}%`);
          surface.style.setProperty("--corner-b", `${cornerB}%`);
          surface.style.setProperty("--wave-shift", `${Math.sin(wave * 1.1) * (8 + energy * 25)}px`);
          surface.style.setProperty("--wave-opacity", `${0.16 + energy * 0.32}`);
          surface.style.setProperty("--shadow-x", `${curve * -0.06}px`);
          surface.style.setProperty("--inner-shadow-x", `${curve * -0.035}px`);

          const localFlutter = Math.sin(wave * 0.7) * (1.5 + energy * 1.8);
          const depthAmount = curve + localFlutter;
          const turnAmount = Math.max(-29, Math.min(29, curve * 0.43));
          sliceDepthFactors.forEach((factor, slice) => {
            surface.style.setProperty(`--z${slice}`, `${depthAmount * factor}px`);
            surface.style.setProperty(`--r${slice}`, `${turnAmount * sliceTurnFactors[slice]}deg`);
          });
        }

        const score = z - Math.abs(y) * 1.35;
        if (score > frontScore) { frontScore = score; frontIndex = index; }
      });

      workRefs.current.forEach((element, index) => {
        element?.classList.toggle("is-featured", index === frontIndex);
      });

      modelSpinRef.current = current * 0.18 + (reduceMotion ? 0 : time * 0.00012);
      const grid = gridRef.current;
      if (grid) {
        const dpr = Math.min(2, window.devicePixelRatio || 1);
        const width = window.innerWidth;
        const height = window.innerHeight;
        if (grid.width !== Math.round(width * dpr) || grid.height !== Math.round(height * dpr)) {
          grid.width = Math.round(width * dpr);
          grid.height = Math.round(height * dpr);
          grid.style.width = `${width}px`;
          grid.style.height = `${height}px`;
        }
        const context = grid.getContext("2d");
        if (context) {
          context.setTransform(dpr, 0, 0, dpr, 0, 0);
          context.clearRect(0, 0, width, height);
          context.strokeStyle = "rgba(5, 0, 70, 0.42)";
          context.lineWidth = 1;
          const centerX = width * 0.5;
          const centerY = height * 0.49;
          const rowGap = Math.max(56, height * 0.073);
          const angleGap = Math.PI / 32;
          const angleTravel = ((gridPhase % angleGap) + angleGap) % angleGap;

          for (let column = -20; column <= 20; column += 1) {
            const angle = column * angleGap + angleTravel;
            if (Math.abs(angle) > Math.PI * 0.54) continue;
            const x = centerX + Math.sin(angle) * width * 0.53;
            context.beginPath();
            context.moveTo(x, 0);
            context.lineTo(x, height);
            context.stroke();
          }

          const rowTravel = ((gridPhase * rowGap * 2.2) % rowGap + rowGap) % rowGap;
          for (let baseY = -rowGap * 2 + rowTravel; baseY < height + rowGap * 2; baseY += rowGap) {
            context.beginPath();
            for (let step = 0; step <= 64; step += 1) {
              const x = (step / 64) * width;
              const horizontal = (x - centerX) / Math.max(1, centerX);
              const vertical = (baseY - centerY) / Math.max(1, centerY);
              const cylinderDepth = 34 + Math.abs(vertical) * 5;
              const y = baseY - horizontal * horizontal * cylinderDepth
                + Math.sin(gridPhase * 1.5 + horizontal * 0.8) * 1.8;
              if (step === 0) context.moveTo(x, y);
              else context.lineTo(x, y);
            }
            context.stroke();
          }
        }
      }
      if (sceneRef.current) sceneRef.current.style.setProperty("--scroll-energy", `${energy}`);
      frame = window.requestAnimationFrame(render);
    };
    frame = window.requestAnimationFrame(render);

    return () => {
      running = false;
      window.cancelAnimationFrame(frame);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("mouseleave", onPointerLeave);
    };
  }, [works]);

  return (
    <main className={`spiral-app track-${track}`} ref={sceneRef}>
      <video className="cloud-background" src={withBase("/backgrounds/clouds-glitch.mp4")} autoPlay muted loop playsInline preload="auto" aria-hidden="true" />
      <div className="track-wash" aria-hidden="true" />
      <canvas className="grid-room" ref={gridRef} aria-hidden="true" />

      <header className="k95-header">
        <a className="k95-logo" href={withBase("/")} aria-label="LXY.MELO home">LXY.MELO</a>
        <nav aria-label="Primary navigation">
          <a href="#work">WORK</a>
          <RiseLink href={withBase("/about/")} panel="about">ABOUT ME</RiseLink>
        </nav>
      </header>

      <section className="spiral-viewport" aria-label="Infinite three-dimensional selected works">
        <CenterSculpture spinRef={modelSpinRef} />

        <div className="works-helix">
          {works.map((work, index) => (
            <a
              href={work.link}
              className="helix-work"
              key={`${work.title}-${work.id}`}
              ref={(node) => { workRefs.current[index] = node; }}
              style={{
                "--card-width": `${work.width * 1.3}px`,
                "--card-ratio": `${work.ratio}`,
              } as React.CSSProperties}
              aria-label={`${work.title}, ${work.type}`}
              onMouseEnter={() => {
                if (cursorTitleRef.current) cursorTitleRef.current.textContent = work.title;
                if (cursorTypeRef.current) cursorTypeRef.current.textContent = work.type;
                cursorRef.current?.classList.add("is-hovering");
              }}
              onMouseLeave={() => cursorRef.current?.classList.remove("is-hovering")}
              onClick={(event) => {
                if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
                if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
                event.preventDefault();

                const source = event.currentTarget;
                const rect = source.getBoundingClientRect();
                const mobile = window.innerWidth <= 760;
                const targetWidth = Math.min(window.innerWidth * (mobile ? 0.7 : 0.3), mobile ? 330 : 500);
                const targetHeight = targetWidth / work.ratio;
                const targetCenterY = window.innerHeight / 2 + (mobile ? 35 : 28);
                const cover = document.createElement("div");
                cover.className = "page-transition-cover";
                cover.style.left = `${rect.left}px`;
                cover.style.top = `${rect.top}px`;
                cover.style.width = `${rect.width}px`;
                cover.style.height = `${rect.height}px`;
                cover.style.backgroundImage = `url(${work.image})`;
                cover.style.backgroundPosition = work.position;
                document.body.appendChild(cover);
                sceneRef.current?.classList.add("is-leaving");
                cursorRef.current?.classList.remove("is-visible", "is-hovering");

                window.requestAnimationFrame(() => {
                  cover.getBoundingClientRect();
                  cover.style.left = `${(window.innerWidth - targetWidth) / 2}px`;
                  cover.style.top = `${targetCenterY - targetHeight / 2}px`;
                  cover.style.width = `${targetWidth}px`;
                  cover.style.height = `${targetHeight}px`;
                });

                // 卡片展开动画 0.76s，结束后立即跳转；transitionend 丢失时 1.2s 兜底
                let navigated = false;
                const navigate = () => {
                  if (navigated) return;
                  navigated = true;
                  window.location.assign(work.link);
                };
                cover.addEventListener("transitionend", navigate);
                window.setTimeout(navigate, 1200);
              }}
            >
              <span
                className="work-surface"
                ref={(node) => { surfaceRefs.current[index] = node; }}
              >
                {Array.from({ length: 9 }, (_, slice) => (
                  <span className={`flag-slice flag-slice-${slice}`} key={slice}>
                    <span
                      className={`slice-art art-${work.art}`}
                      style={{
                        left: `${slice * -100}%`,
                        backgroundImage: work.image ? `url(${work.image})` : undefined,
                        backgroundPosition: work.position,
                      }}
                    >
                      <span className="art-content" aria-hidden="true" />
                    </span>
                  </span>
                ))}
              </span>
            </a>
          ))}
        </div>
        {works.length === 0 && <p className="track-empty">COMING SOON</p>}
      </section>

      <div className="view-switch" role="group" aria-label="Creative profile">
        <button className={track === "all" ? "active" : ""} onClick={() => selectTrack("all")} type="button">ALL</button>
        <button className={track === "builder" ? "active" : ""} onClick={() => selectTrack("builder")} type="button">AI BUILDER</button>
        <button className={track === "designer" ? "active" : ""} onClick={() => selectTrack("designer")} type="button">DESIGN</button>
        <button className={track === "player" ? "active" : ""} onClick={() => selectTrack("player")} type="button">ART</button>
      </div>

      <div className="scroll-hint">SCROLL TO TRAVEL <span>↓</span></div>
      <div className="custom-cursor" ref={cursorRef} aria-hidden="true">
        <span className="cursor-orb" />
        <span className="cursor-pill"><i>↗</i><b ref={cursorTitleRef} /><small ref={cursorTypeRef} /></span>
      </div>
    </main>
  );
}
