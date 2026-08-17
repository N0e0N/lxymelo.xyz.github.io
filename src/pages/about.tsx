"use client";

import RiseLink from "../components/rise-link";
import { withBase } from "../lib/base";

export default function AboutPage() {
  return (
    <main className="about-page">
      <img className="about-backdrop" src={withBase("/about/about-me.jpg")} alt="Melo sitting by the sea" />
      <h1 className="about-title" aria-label="About me">
        <span className="about-title-line about-title-about"><img src={withBase("/about/About.png")} alt="" /></span>
        <span className="about-title-line about-title-me"><img src={withBase("/about/ME.png")} alt="" /></span>
      </h1>
      <header className="about-nav">
        <RiseLink className="about-logo" href={withBase("/")} panel="work" ariaLabel="Back to work">LXY.MELO</RiseLink>
        <nav aria-label="Primary navigation">
          <RiseLink href={withBase("/")} panel="work">WORK</RiseLink>
          <span>ABOUT ME</span>
        </nav>
      </header>
    </main>
  );
}
