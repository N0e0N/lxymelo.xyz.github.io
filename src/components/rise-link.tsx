"use client";

import { useEffect } from "react";
import type { MouseEvent, ReactNode } from "react";

export default function RiseLink({
  href,
  panel,
  className,
  children,
  ariaLabel,
}: {
  href: string;
  panel: "work" | "about";
  className?: string;
  children: ReactNode;
  ariaLabel?: string;
}) {
  useEffect(() => {
    const clearStaleTransitions = () => {
      document.querySelectorAll(".route-rise-panel, .page-transition-cover").forEach((element) => element.remove());
    };
    clearStaleTransitions();
    window.addEventListener("pageshow", clearStaleTransitions);
    return () => window.removeEventListener("pageshow", clearStaleTransitions);
  }, []);

  const onClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    event.preventDefault();

    const transition = document.createElement("div");
    transition.className = `route-rise-panel route-rise-${panel}`;
    document.body.appendChild(transition);
    transition.getBoundingClientRect();
    transition.classList.add("is-active");
    window.setTimeout(() => window.location.assign(href), 760);
  };

  return <a href={href} className={className} aria-label={ariaLabel} onClick={onClick}>{children}</a>;
}
