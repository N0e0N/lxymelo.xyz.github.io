import type { AIProject } from "../data/project-data";
import { projects } from "../data/project-data";
import { PageFooter, PageHeader } from "./mpa-chrome";
import { withBase } from "../lib/base";

const AIProjectPage = ({ project }: { project: AIProject }) => {
  const next = projects[project.next];

  return (
    <>
      <PageHeader />
      <main className="mpa-main" id="main-content" tabIndex={-1}>
        <article className="mpa-project">
          <header className="mpa-project-hero">
            <figure className="mpa-project-cover">
              <img src={project.cover} alt={project.title} />
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

          <section className="mpa-gallery" aria-label="项目图集">
            {project.media.map((item, index) => {
              const wide = index % 5 === 0 || item.type === "video";
              return (
                <figure key={item.src} className={wide ? "mpa-fig mpa-fig-wide" : "mpa-fig mpa-fig-half"}>
                  {item.type === "video" ? (
                    // 项目演示视频为无旁白的视觉短片
                    // eslint-disable-next-line jsx-a11y/media-has-caption
                    <video src={item.src} controls playsInline preload="metadata" aria-label={item.alt} />
                  ) : (
                    <img src={item.src} alt={item.alt} loading={index > 1 ? "lazy" : "eager"} />
                  )}
                </figure>
              );
            })}
          </section>

          <a className="mpa-next" href={withBase(`/projects/${next.slug}/`)}>
            <div>
              <p className="mpa-kicker">NEXT PROJECT</p>
              <h2 className="mpa-next-title">{next.title}</h2>
            </div>
            <img src={next.cover} alt={next.title} loading="lazy" />
            <span className="mpa-next-cta">
              查看 <span aria-hidden="true">↗</span>
            </span>
          </a>
        </article>
      </main>
      <PageFooter />
    </>
  );
};

export default AIProjectPage;
