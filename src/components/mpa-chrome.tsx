import type { ReactNode } from "react";
import { withBase } from "../lib/base";

export const SiteNav = () => (
  <nav className="site-nav" aria-label="站点导航">
    <a href={withBase("/")}>project</a>
    <a href={withBase("/about/")}>aboutme</a>
  </nav>
);

export const PageHeader = () => (
  <>
    <a className="skip-link" href="#main-content">跳至正文</a>
    <header className="mpa-header">
      <a href={withBase("/")} className="mpa-logo" aria-label="LXY.MELO 首页">
        <img className="mpa-logo-portrait" src={withBase("/icons/favicon-64.png")} alt="" aria-hidden="true" width={32} height={38} />
        <span>LXY.MELO</span>
      </a>
      <SiteNav />
    </header>
  </>
);

export const PageFooter = ({ children }: { children?: ReactNode }) => (
  <footer className="mpa-footer">
    <p>
      Copyright © {new Date().getFullYear()} LXY.MELO ·{" "}
      <a href="https://www.lxymelo.xyz" className="mpa-footer-link">
        www.lxymelo.xyz
      </a>
    </p>
    <SiteNav />
    <p style={{ marginTop: "1rem" }}><a className="mpa-footer-link" href="https://github.com/N0e0N" target="_blank" rel="noreferrer">GitHub ↗</a></p>
    {children}
  </footer>
);
