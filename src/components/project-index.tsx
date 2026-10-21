import { useEffect, useId, useRef } from "react";
import { projects } from "../data/project-data";
import { withBase } from "../lib/base";

export default function ProjectIndex({ open, onClose, fallback = false }: {
  open: boolean;
  onClose: () => void;
  fallback?: boolean;
}) {
  const titleId = useId();
  const dialogRef = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || !open) return;
    const previous = document.activeElement as HTMLElement | null;
    dialog.showModal();
    return () => {
      dialog.close();
      previous?.focus({ preventScroll: true });
    };
  }, [open]);

  const content = (
    <>
      <div className="project-index-heading">
        <div><p className="mpa-kicker">SELECTED WORK / {Object.keys(projects).length}</p><h2 id={titleId}>作品列表</h2></div>
        {!fallback && <button className="site-control" onClick={onClose}>关闭 <span aria-hidden="true">×</span></button>}
      </div>
      {fallback && <p className="mpa-prose" role="status">当前浏览器无法显示作品圆环。你仍然可以从这里浏览全部作品。</p>}
      <ol className="project-index-list">
        {Object.values(projects).map((project, index) => (
          <li key={project.slug}>
            <a href={withBase(`/projects/${project.slug}/`)}>
              <span className="project-index-number">{String(index + 1).padStart(2, "0")}</span>
              <span><strong>{project.title}</strong><small>{project.kicker}</small></span>
              <span className="project-index-year">{project.year} ↗</span>
            </a>
          </li>
        ))}
      </ol>
    </>
  );
  if (fallback) return <section className="project-index-fallback" aria-labelledby={titleId}>{content}</section>;
  return <dialog ref={dialogRef} className="project-index-dialog" aria-labelledby={titleId} onCancel={onClose} onClose={onClose}>{content}</dialog>;
}
