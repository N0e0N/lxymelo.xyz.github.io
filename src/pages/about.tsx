"use client";

import RiseLink from "../components/rise-link";

export default function AboutPage() {
  return (
    <main className="about-page">
      <img className="about-backdrop" src="/about/about-me.png" alt="Melo sitting by the sea" />
      <h1 className="about-title" aria-label="About me">
        <span className="about-title-line about-title-about"><img src="/about/About.png" alt="" /></span>
        <span className="about-title-line about-title-me"><img src="/about/ME.png" alt="" /></span>
      </h1>
      <header className="about-nav">
        <RiseLink className="about-logo" href="/" panel="work" ariaLabel="Back to work">LXY.MELO</RiseLink>
        <nav aria-label="Primary navigation">
          <RiseLink href="/" panel="work">WORK</RiseLink>
          <span>ABOUT ME</span>
        </nav>
      </header>
    </main>
  );
}
