import { PageFooter, PageHeader } from "../components/mpa-chrome";
import { withBase } from "../lib/base";

const paragraphs = [
  "我是 LXY.MELO，一名工作在 AI 与设计交叉地带的 Builder。白天做 AI 产品与工作流，晚上琢磨交互细节，偶尔办创客松、做播客、写设计教育内容。",
  "我相信两件事：一是 AI 真正的价值在于把专业能力交到更多人手里，所以做课程台、科研智能体、设计启蒙内容；二是好的设计要经得起真实使用，所以做折叠屏交互、车载 HMI 这类有约束、有场景的硬问题。",
  "业余时间是 Player：听歌、做歌、用 AI 给每首歌建一个精神空间。预测未来最好的方式，是动手创建未来。",
];

const roles = ["AI Builder", "Designer", "Player"];

const AboutPage = () => {
  return (
    <>
      <PageHeader />
      <main className="mpa-main" id="main-content" tabIndex={-1}>
        <article className="mpa-about">
          <figure className="mpa-about-figure">
            <img src={withBase("/about/about-me.jpg")} alt="Melo 在海边" />
            <figcaption>Melo 在海边</figcaption>
          </figure>
          <div className="mpa-about-body">
            <p className="mpa-kicker">ABOUT ME</p>
            <h1 className="mpa-title">关于我</h1>
            {paragraphs.map((text) => (
              <p key={text.slice(0, 10)} className="mpa-prose">
                {text}
              </p>
            ))}
            <ul className="mpa-roles">
              {roles.map((role) => (
                <li key={role}>{role}</li>
              ))}
            </ul>
            <section className="about-section" aria-labelledby="directions-title">
              <p className="mpa-kicker">EXPLORING</p>
              <h2 id="directions-title">关注方向</h2>
              <ul className="about-directions">
                <li><strong>AI 与专业能力</strong><span>课程制作、科研工作流与设计教育，让工具进入真实的学习和创作过程。</span></li>
                <li><strong>有场景的交互设计</strong><span>折叠屏交互与车载 HMI，在具体约束中探索更清晰的使用体验。</span></li>
                <li><strong>音乐与创作实验</strong><span>听歌、做歌，用 AI 探索音乐、空间与叙事之间的连接。</span></li>
              </ul>
            </section>
            <section className="about-section" id="contact" aria-labelledby="contact-title">
              <p className="mpa-kicker">FIND ME</p>
              <h2 id="contact-title">找到我</h2>
              <p className="mpa-prose">在 GitHub 关注我的公开项目与代码。</p>
              <a className="mpa-button" href="https://github.com/N0e0N" target="_blank" rel="noreferrer">
                GitHub <span aria-hidden="true">↗</span>
              </a>
            </section>
          </div>
        </article>
      </main>
      <PageFooter />
    </>
  );
};

export default AboutPage;
