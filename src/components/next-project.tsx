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
      <div>
        <p className="mpa-kicker">NEXT PROJECT</p>
        <h2 className="mpa-next-title" ref={titleRef}>{project?.title}</h2>
      </div>
      <img ref={imageRef} src={project?.cover} alt={project?.title ?? "下一项目封面"} loading="lazy" />
      <span className="mpa-next-cta">查看 <span aria-hidden="true">↗</span></span>
    </a>
  );
}
