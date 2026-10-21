import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { PageHeader } from "../components/mpa-chrome";
import { withBase } from "../lib/base";

const chapters = ["你好", "关于", "学习", "实践"];

export default function AboutPage() {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const goTo = useRef<(index: number) => void>(() => {});

  useLayoutEffect(() => {
    const host = root.current!;
    const sections = Array.from(host.querySelectorAll<HTMLElement>(".about-scene"));
    let current = 0;
    let moving = false;
    let lastWheel = 0;
    let wheelTotal = 0;
    let touchStart: { x: number; y: number } | null = null;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let transition: gsap.core.Timeline | undefined;
    const context = gsap.context(() => {
      gsap.set(sections, { autoAlpha: 0 });
      gsap.set(sections[0], { autoAlpha: 1 });
    }, host);

    const navigate = (index: number) => {
      const next = Math.max(0, Math.min(sections.length - 1, index));
      if (moving || next === current) return;
      moving = true;
      const direction = next > current ? 1 : -1;
      const outgoing = sections[current];
      const incoming = sections[next];
      // Preserve keyboard access when leaving a chapter containing a focused link.
      if (outgoing.contains(document.activeElement)) host.querySelector<HTMLElement>("main")?.focus();
      current = next;
      setActive(next);
      transition?.kill();
      context.add(() => {
        if (reducedMotion.matches) {
          gsap.set(sections, { autoAlpha: 0 });
          gsap.set(incoming, { autoAlpha: 1 });
          moving = false;
          return;
        }
        gsap.set(incoming, { autoAlpha: 1 });
        transition = gsap.timeline({ onComplete: () => { moving = false; } })
          .to(outgoing.querySelectorAll(".about-motion"), {
            y: -35 * direction, opacity: 0, filter: "blur(5px)",
            duration: 0.3, stagger: 0.035, ease: "power2.in",
          })
          .set(outgoing, { autoAlpha: 0 })
          .fromTo(incoming.querySelectorAll(".about-motion"), {
            y: 48 * direction, opacity: 0, filter: "blur(7px)",
          }, { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.6,
            stagger: 0.065, ease: "power3.out" }, "-=0.08");
      });
    };
    goTo.current = navigate;
    const canScrollContent = (target: EventTarget | null, delta: number) => {
      const section = target instanceof Element ? target.closest<HTMLElement>(".about-scene") : null;
      return section && (delta > 0
        ? section.scrollTop + section.clientHeight < section.scrollHeight - 2
        : section.scrollTop > 2);
    };
    const onWheel = (event: WheelEvent) => {
      if (event.ctrlKey || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
      if (canScrollContent(event.target, event.deltaY)) return;
      event.preventDefault();
      const now = performance.now();
      const freshGesture = now - lastWheel > 220;
      lastWheel = now;
      if (freshGesture) wheelTotal = 0;
      if (moving) { wheelTotal = Infinity; return; }
      if (wheelTotal === Infinity) return;
      wheelTotal += event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? innerHeight : 1);
      if (Math.abs(wheelTotal) >= 28) {
        navigate(current + Math.sign(wheelTotal));
        // Ignore the rest of this wheel/trackpad gesture, including momentum.
        wheelTotal = Infinity;
      }
    };
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      if (target.closest("input, textarea, select, [contenteditable=true]")) return;
      if (event.code === "Space" && target.closest("a, button")) return;
      let next: number;
      if (["ArrowDown", "PageDown"].includes(event.key) || event.code === "Space" && !event.shiftKey) next = current + 1;
      else if (["ArrowUp", "PageUp"].includes(event.key) || event.code === "Space" && event.shiftKey) next = current - 1;
      else if (event.key === "Home") next = 0;
      else if (event.key === "End") next = sections.length - 1;
      else return;
      if (canScrollContent(event.target, next - current)) return;
      event.preventDefault();
      if (!event.repeat) navigate(next);
    };
    const onTouchStart = (event: TouchEvent) => {
      touchStart = event.touches.length === 1 ? { x: event.touches[0].clientX, y: event.touches[0].clientY } : null;
    };
    const onTouchMove = (event: TouchEvent) => {
      if (!touchStart || event.touches.length !== 1) return;
      const delta = touchStart.y - event.touches[0].clientY;
      if (!canScrollContent(event.target, delta) && Math.abs(delta) > 10) event.preventDefault();
    };
    const onTouchEnd = (event: TouchEvent) => {
      if (!touchStart || !event.changedTouches.length) return;
      const delta = touchStart.y - event.changedTouches[0].clientY;
      const horizontal = touchStart.x - event.changedTouches[0].clientX;
      if (Math.abs(delta) > 45 && Math.abs(delta) > Math.abs(horizontal) && !canScrollContent(event.target, delta)) navigate(current + Math.sign(delta));
      touchStart = null;
    };
    host.addEventListener("wheel", onWheel, { passive: false });
    host.addEventListener("touchstart", onTouchStart, { passive: true });
    host.addEventListener("touchmove", onTouchMove, { passive: false });
    host.addEventListener("touchend", onTouchEnd);
    window.addEventListener("keydown", onKey);
    return () => {
      host.removeEventListener("wheel", onWheel);
      host.removeEventListener("touchstart", onTouchStart);
      host.removeEventListener("touchmove", onTouchMove);
      host.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("keydown", onKey);
      transition?.kill();
      context.revert();
    };
  }, []);

  return (
    <div className="about-experience" ref={root}>
      <div className="about-landscape" aria-hidden="true">
        <img src={withBase("/about/about-me.jpg")} alt="" fetchPriority="high" />
      </div>
      <PageHeader />
      <main id="main-content" tabIndex={-1} className="about-story">
        <section className="about-scene about-intro" id="hello" inert={active !== 0} aria-hidden={active !== 0} aria-labelledby="hello-title">
          <div className="about-copy">
            <p className="about-eyebrow about-motion">01 / A LITTLE ABOUT ME</p>
            <p className="about-prelude about-motion">我是</p>
            <h1 id="hello-title" className="about-name about-motion">罗晓阳<span className="about-alias">也可以叫我 <em>MelO.</em></span></h1>
            <p className="about-caption about-motion">AI 产品 · 交互设计 · 创作实验</p>
          </div>
        </section>
        <section className="about-scene" id="story" inert={active !== 1} aria-hidden={active !== 1} aria-labelledby="story-title">
          <div className="about-copy">
            <p className="about-eyebrow about-motion">02 / BETWEEN DESIGN & AI</p>
            <h2 id="story-title" className="about-heading about-motion">从设计出发，<br />让想法<em>发生。</em></h2>
            <p className="about-description about-motion">在 AI 与设计之间探索，<br />把复杂能力，变成好用的产品。</p>
            <p className="about-description about-motion">做 Agent，也做课程、播客和创作实验。<br />比起只谈未来，我更喜欢动手试试。</p>
            <div className="about-tags about-motion"><span>AI BUILDER</span><span>DESIGNER</span><span>PLAYER</span></div>
          </div>
        </section>
        <section className="about-scene" id="learning" inert={active !== 2} aria-hidden={active !== 2} aria-labelledby="learning-title">
          <div className="about-copy">
            <p className="about-eyebrow about-motion">03 / KEEP LEARNING</p>
            <h2 id="learning-title" className="about-heading about-motion">设计是起点。<br /><em>探索不设限。</em></h2>
            <div className="about-record about-motion"><p className="about-date">2024 — 至今 · 硕士</p><h3>同济大学</h3><p>人工智能与数据设计</p></div>
            <div className="about-record about-motion"><p className="about-date">2020 — 2024 · 本科</p><h3>湖南大学</h3><p>工业设计 / 交互设计<span className="about-note">国家奖学金 · 优秀毕业生</span></p></div>
          </div>
        </section>
        <section className="about-scene" id="practice" inert={active !== 3} aria-hidden={active !== 3} aria-labelledby="practice-title">
          <div className="about-copy">
            <p className="about-eyebrow about-motion">04 / LEARNING BY BUILDING</p>
            <h2 id="practice-title" className="about-heading about-motion">在真实场景里，<br /><em>把产品做好。</em></h2>
            <div className="about-record about-motion"><p className="about-date">2026.03 — 2026.07</p><h3>字节跳动 <span>即创 AI</span></h3><p>广告成片 Agent，让 AI 更懂创作。</p></div>
            <div className="about-record about-motion"><p className="about-date">2025.08 — 2026.02</p><h3>小红书 <span>数据中台</span></h3><p>Data Agent，让数据更容易被使用。</p></div>
            <div className="about-record about-motion"><p className="about-date">2024.12 — 2025.04</p><h3>特赞科技 <span>智慧营销</span></h3><p>鞋款昵称 Agent，10+ 创意落地「618」。</p></div>
            <div className="about-endlinks about-motion"><a href={withBase("/")}>看看我的作品 <span aria-hidden="true">↗</span></a><a href="https://github.com/N0e0N" target="_blank" rel="noreferrer">GitHub ↗</a></div>
          </div>
        </section>
      </main>
      <div className="about-bottom"><span className="about-scroll-note">{active === 3 ? "KEEP EXPLORING ↗" : "SCROLL TO EXPLORE ↓"}</span><nav aria-label="关于我章节" className="about-chapters">{chapters.map((chapter, index) => <button type="button" key={chapter} onClick={() => goTo.current(index)} aria-label={`${index + 1}. ${chapter}`} aria-current={active === index ? "step" : undefined}><span className="about-chapter-line" /><span>{`0${index + 1}`}</span></button>)}</nav><span className="about-coordinate">LXY.MELO / ABOUT</span></div>
    </div>
  );
}
