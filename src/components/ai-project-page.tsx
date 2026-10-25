import type { AIProject } from "../data/project-data";
import { projects } from "../data/project-data";
import { PageFooter, PageHeader } from "./mpa-chrome";
import NextProject from "./next-project";
import { withBase } from "../lib/base";

const AIProjectPage = ({ project }: { project: AIProject }) => {
  const next = projects[project.next];

  return (
    <>
      <PageHeader />
      <main className="mpa-main case-study-page" id="main-content" tabIndex={-1}>
        <article className="mpa-project">
          <header className="mpa-project-hero">
            <figure className="mpa-project-cover">
              <img src={project.cover} width={project.coverSize?.width} height={project.coverSize?.height} alt={project.title} fetchPriority="high" decoding="async" style={{ viewTransitionName: "project-cover" }} />
            </figure>
            <div className="mpa-project-intro">
              <p className="mpa-kicker">{project.kicker}</p>
              <h1 className="mpa-title">{project.title}</h1>
              <p className="mpa-project-year">YEAR — {project.year} · INDEX — {String(Object.keys(projects).indexOf(project.slug) + 1).padStart(2, "0")} / {String(Object.keys(projects).length).padStart(2, "0")}</p>
              <ul className="mpa-roles">
                {project.roles.map((role) => (
                  <li key={role}>{role}</li>
                ))}
              </ul>

              <p className="mpa-project-summary">{project.summary}</p>

          {project.external && (
            <div className="mpa-project-links">
              {project.external.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="mpa-button"
                >
                  {link.label}
                  {link.hint && <span className="mpa-button-hint">{link.hint}</span>}
                  <span aria-hidden="true">↗</span>
                </a>
              ))}
            </div>
          )}
            </div>
          </header>

          <div className="case-section-label case-gallery-label"><span>PROCESS & DETAILS</span><h2>设计过程与细节</h2></div>
          <section className="mpa-gallery" aria-label="项目图集">
            {project.media.map((item, index) => {
              const notes = item.notes?.length ? item.notes : [{ title: item.heading ?? item.alt, text: item.description ?? "" }];
              return (
                <figure key={item.src} className="mpa-fig case-media-row">
                  {item.type === "video" ? (
                    // 项目演示视频为无旁白的视觉短片
                    // eslint-disable-next-line jsx-a11y/media-has-caption
                    <video src={item.src} width={item.width} height={item.height} style={{ aspectRatio: item.width && item.height ? `${item.width} / ${item.height}` : undefined }} controls playsInline preload="none" poster={item.poster ?? project.cover} aria-label={item.alt} />
                  ) : (
                    <img src={item.src} width={item.width} height={item.height} alt={item.alt} loading="lazy" decoding="async" />
                  )}
                  <figcaption className="project-media-caption">
                    <span className="case-number">{String(index + 1).padStart(2, "0")} / {item.type === "video" ? "FILM" : "DETAIL"}</span>
                    <div className="case-media-notes">{notes.map(note => <div className="case-reading-note" key={note.title}><h3>{note.title}</h3><p>{note.text}</p></div>)}</div>
                  </figcaption>
                </figure>
              );
            })}
          </section>

          <NextProject project={next} />
        </article>
      </main>
      <a href={withBase("/")} className="project-return"><span className="project-return-content"><span aria-hidden="true">←</span> 返回作品</span></a>
      <PageFooter />
    </>
  );
};

export default AIProjectPage;
