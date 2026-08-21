import { AIProject, projects } from "../data/project-data";
import RiseLink from "./rise-link";
import { withBase } from "../lib/base";

export default function AIProjectPage({ project }: { project: AIProject }) {
  const next = projects[project.next];
  return (
    <main className="ai-detail">
      <header className="ai-detail-nav">
        <RiseLink className="ai-detail-logo" href={withBase("/")} panel="work" ariaLabel="Back to work">LXY.MELO</RiseLink>
        <nav><RiseLink href={withBase("/")} panel="work">WORK</RiseLink><RiseLink href={withBase("/about/")} panel="about">ABOUT ME</RiseLink></nav>
      </header>

      <section className="ai-detail-hero">
        <div><small>{project.kicker}</small><h1>{project.title}</h1></div>
        <figure><img src={project.cover} alt={project.title} /></figure>
        <p>YEAR — {project.year}</p>
      </section>

      <section className="ai-detail-info">
        <div><small>ROLE</small>{project.roles.map((role) => <span key={role}>{role}</span>)}</div>
        <p><small>(INFO)</small>{project.summary}</p>
      </section>

      {project.external && <div className="ai-detail-links">{project.external.map((link) => <a href={link.href} target="_blank" rel="noreferrer" key={link.href}><b>{link.label}</b>{link.hint && <span>{link.hint}</span>}<i>↗</i></a>)}</div>}

      <section className={`ai-detail-gallery${project.slug === "design-ai-playbook" ? " episode-grid" : ""}`}>
        {project.media.map((item, index) => (
          <figure className={project.slug === "design-ai-playbook" ? "episode" : index % 5 === 0 || item.type === "video" ? "wide" : "half"} key={item.src}>
            {item.type === "video"
              // Project demos are visual reels without spoken narration.
              // eslint-disable-next-line jsx-a11y/media-has-caption
              ? <video src={item.src} controls playsInline preload="metadata" aria-label={item.alt} />
              : <img src={item.src} alt={item.alt} loading={index > 1 ? "lazy" : "eager"} />}
          </figure>
        ))}
      </section>

      <a className="ai-detail-next" href={withBase(`/projects/${next.slug}/`)}>
        <div><small>NEXT PROJECT</small><h2>{next.title}</h2></div>
        <figure><img src={next.cover} alt={next.title} /></figure>
        <span>VIEW ↗</span>
      </a>
    </main>
  );
}
