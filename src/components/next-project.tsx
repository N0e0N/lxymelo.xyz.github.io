import type { Ref } from "react";
import { withBase } from "../lib/base";

type NextProjectProps = {
  project?: { slug: string; title: string; cover: string };
  linkRef?: Ref<HTMLAnchorElement>;
  titleRef?: Ref<HTMLHeadingElement>;
  imageRef?: Ref<HTMLImageElement>;
};

export default function NextProject({ project, linkRef, titleRef, imageRef }: NextProjectProps) {
  return (
    <a className="mpa-next" ref={linkRef} href={withBase(`/projects/${project?.slug ?? "moocer"}/`)}>
      <div className="mpa-next-copy">
        <p className="mpa-kicker">接着看看 / NEXT PROJECT</p>
        <h2 className="mpa-next-title" ref={titleRef}>{project?.title}</h2>
        <span className="mpa-next-cta">探索下一个项目</span>
      </div>
      <div className="mpa-next-art"><img ref={imageRef} src={project?.cover} alt={project?.title ?? "下一项目封面"} loading="lazy" /></div>
      <span className="mpa-next-arrow" aria-hidden="true">↗</span>
    </a>
  );
}
