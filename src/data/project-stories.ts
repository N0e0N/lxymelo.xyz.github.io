// Editorial copy is grounded in the supplied portfolio PDFs, pitch deck,
// resume, and the screenshots shipped with each project. See docs/project-content-sources.md.
export type ProjectInsight = { title: string; text: string };
export type MediaNote = { heading: string; description: string; layout?: "half" };
type ProjectStory = { insights: ProjectInsight[]; mediaNotes: MediaNote[] };

export const projectStories: Record<string, ProjectStory> = {
  moocer: {
    insights: [
      { title: "把制作过程串起来", text: "课程制作需要反复切换课件、口播稿、音频和剪辑工具。MOOCER 以一门课程为单位，把这些材料组织在同一个工作台，让制作进度和内容对应关系更清楚。" },
      { title: "以每一页为编辑单元", text: "课件页面、口播文本与音频并排呈现，方便逐页检查和修改。配音与本人录音提供两种制作路径，让创作者按内容需要选择表达方式。" },
      { title: "从编辑走向交付", text: "制作链路延伸到课程预览和 MP4 导出。创作者可以在成片前核对画面与声音，再将课程输出为可播放、可分发的视频。" },
    ],
    mediaNotes: [
      { heading: "从课件与课纲开始", description: "上传教学材料，建立课程项目。将已有的内容积累作为起点，减少从空白页面开始整理的负担。" },
      { heading: "逐页编排，逐页校对", description: "课件预览、口播稿与音频放在同一视图；下方缩略图帮助快速定位到需要调整的页面。" },
      { heading: "预览与导出", description: "检查整段课程的画面与声音，再下载成片，完成从教学材料到课程视频的制作闭环。" },
    ],
  },
  "research-agent": {
    insights: [
      { title: "围绕四类科研任务", text: "面向青年学者，把文献调研、定性数据编码、学术绘图与申报填表拆成四条任务路径。每个模块对应一项具体工作，帮助研究者快速找到入口。" },
      { title: "让文献检索有据可循", text: "路演方案以设计学科期刊与会议论文库为基础，通过语义向量检索寻找相关文献，再提供多维度分析与引用信息，回应关键词搜不全、AI 文献不真实的问题。" },
      { title: "为后续修改留出空间", text: "文本编码保留人工校对环节，科研绘图通过 DrawIO 输出矢量图表，表单填写则提示缺失信息。AI 承担整理与初稿工作，研究者继续判断、修改和确认。" },
    ],
    mediaNotes: [{ heading: "从任务进入科研工作流", description: "演示展示科研辅助系统的操作方式。四类任务围绕研究过程展开，覆盖资料整理、分析表达与文书填报。" }],
  },
  "design-ai-playbook": {
    insights: [
      { title: "从第一课开始", text: "系列从“设计与 AI 是什么”切入，逐步讨论如何教 AI 设计、AI 可以设计什么，以及职业选择与个人成长，用连续章节建立理解路径。" },
      { title: "用对谈组织知识", text: "基于 Minimax Speech 与 Coze 工作流制作双人对谈，围绕逐字稿与声音效果进行调试，将设计人工智能的话题转成可以随时收听的内容。" },
      { title: "让章节容易辨认", text: "机器人形象、拼贴色块与大字标题形成统一的系列语言。每一集用一个明确的问题和一句核心表达，让抽象议题有一个直观的入口。" },
    ],
    mediaNotes: [
      { heading: "EP0 · 从这里开始", description: "从设计、人工智能到设计人工智能，先建立系列讨论的共同起点。", layout: "half" },
      { heading: "EP1 · 认识设计人工智能", description: "围绕人机共创与动手创建，讨论设计者如何与新工具一起工作。", layout: "half" },
      { heading: "EP2 · 如何教会 AI 设计", description: "以设计的可计算性为线索，理解人机共创背后的基础。", layout: "half" },
      { heading: "EP3 · AI 可以设计什么", description: "从产品、体验到社会议题，打开 AI 参与设计的可能范围。", layout: "half" },
      { heading: "EP4 · AI 时代的职业选择", description: "面对不确定的职业变化，以行动和尝试寻找自己的方向。", layout: "half" },
      { heading: "EP5 · AI 时代的个人成长", description: "把知识、资源与行动连接起来，讨论个人如何持续学习和创作。", layout: "half" },
    ],
  },
  "ai-education-symposium": {
    insights: [
      { title: "借助 AI，把视觉规则变成工具", text: "我们借助 AI 搭建大会视觉生成工具，将字母、数字与图形组织成可调节的矩阵。演示记录了随机动态视觉、图像拼接与素材组合的生成过程，让统一的视觉规则产生更多变化。" },
      { title: "四个议题，一套视觉语言", text: "以“交叉、趋势、实践、建设”为线索，用绿色、红色、紫色与黑白区分四个主题。符号保持统一的构成关系，让不同议题既能被识别，也能组成完整的大会视觉。" },
      { title: "从生成实验到现场应用", text: "将生成的图形与字母纹理应用于舞台屏幕、海报、胸牌、邀请函和手提袋，让屏幕上的动态实验与现场物料保持一致。" },
    ],
    mediaNotes: [
      { heading: "AI 参与的视觉生成过程", description: "约两分钟的操作演示：调节矩阵参数，生成动态视觉，并探索图像拼接与素材组合。" },
      { heading: "让教育议题在现场交汇", description: "2025 年 7 月 25—26 日，200 余人线下参与。来自学界与业界的参与者，共同讨论 AI 与设计教育的结合。" },
      { heading: "一套视觉，多种触点", description: "胸牌、邀请函与手提袋延续大会的色彩、符号和字母纹理，将主视觉带入参与者的实际使用场景。" },
      { heading: "交叉：人工智能的跨文化融合", description: "绿色与相互连接的符号，回应跨文化融合的主题；字母与数字纹理延续大会的统一识别。" },
      { heading: "趋势：人工智能的跨学科交叉", description: "红色上升箭头对应趋势主题，将关于学科边界与交叉机会的讨论转译成清晰的舞台视觉。" },
      { heading: "实践：设计人工智能教学实验", description: "紫色图形对应教学实验，让教育实践的主题在舞台屏幕上拥有独立、鲜明的识别。" },
      { heading: "建设：设计人工智能产教融合", description: "以黑白与横向结构对应建设主题，聚焦设计人工智能的产教融合。" },
      { heading: "让主视觉动起来", description: "保留大会动态视觉展示，查看图形与文字在时间中的组合和变化。" },
      { heading: "共同参与的现场", description: "活动合影记录参与者、空间与主视觉之间的关系。" },
      { heading: "到场前的第一眼", description: "入口处的竖向海报建立活动识别，也把核心议题带入现场。" },
      { heading: "四组符号的组合方式", description: "高对比色块与字母、数字、关键词共同构成可重复组合的视觉系统。" },
      { heading: "从纸面延展到空间", description: "主视觉用于场地入口与展示装置，保持远距离观看时的识别度。" },
      { heading: "舞台上的视觉延续", description: "以横向舞台屏幕承接平面视觉，让内容与现场呈现形成呼应。" },
    ],
  },
  creatorthon: {
    insights: [
      { title: "从工具教学走向解决问题", text: "创客松 2.0 将课程从单一技能拓展到能力培养，以真实需求与场景为起点，串联工具认知、研究方法和综合应用。参与者在动手过程中建立对 AI 的理解。" },
      { title: "面向不同角色组织课程", text: "课程体系覆盖设计学科、教科研、文件效率与工具能力，并通过分享交流连接不同主题，让学生、教师与行政人员找到适合自身任务的学习路径。" },
      { title: "在教学现场持续迭代", text: "课程材料记录了科研绘图、网站制作、模型训练等主题的反馈差异。课程选择因参与度、使用频率和学习难度而调整，让短期工作坊更贴近实际需要。" },
    ],
    mediaNotes: [
      { heading: "先动手，再理解", description: "以创作实践作为学习入口，把“预测未来最好的方式，是动手创建未来”转成课程的共同主张。" },
      { heading: "把工作流带进课堂", description: "围绕具体任务讲解 AI 工具与知识的多模态转化，让方法在演示与操作中被理解。" },
      { heading: "课程、工具与空间", description: "以课程体系为中心，连接前沿工具、学术与企业资源，以及开展实践的实验室空间。" },
      { heading: "课程也是共同实验", description: "在教学与创作现场连接不同参与者，围绕实际任务展开交流与实践。" },
      { heading: "学术研究的支持", description: "以同济大学设计人工智能实验室的研究与教学资源，为课程提供学科背景与方法支撑。" },
      { heading: "来自企业的真实问题", description: "将企业场景与课程实践相连接，讨论工具如何进入实际的创作与工作过程。" },
    ],
  },
  "echo-of": {
    insights: [
      { title: "把音乐体验转成空间", text: "一首歌除了旋律，也承载情绪与记忆。Echo Of 尝试将歌曲特征映射为等距小房间，让音乐成为可以观看和感受的个人精神空间。" },
      { title: "先分析，再生成", text: "工作流从歌曲标签出发，分析心情、年代与流派，再将结果整理为场景提示词和 Blender 指令，连接音乐理解与空间构建。" },
      { title: "把建模拆成可调整的步骤", text: "方案探索 Tripo 生成主体模型，再通过 Blender MCP 逐步添加地面、装饰、动态元素与光照。以分步指令控制场景构成，为持续修改和氛围调整留出空间。" },
    ],
    mediaNotes: [{ heading: "听见，也看见一首歌", description: "原型演示探索从歌曲分析到空间表达的过程，呈现音乐、三维场景与叙事之间的连接。" }],
  },
  "negative-space": {
    insights: [
      { title: "把打断与遗忘一起考虑", text: "在折叠屏大屏观影或游戏时，消息弹窗会破坏沉浸；直接忽略，又容易忘记重要信息。方案将即时处理与稍后提醒放进同一条消息流程。" },
      { title: "外屏操作，内屏反馈", text: "利用外屏完成忽略、回复与标记，避免手指遮挡内屏。可用性测试中发现双指动作牵拉手掌、手势容易混淆，因此迭代为三指操作，并强化内屏反馈。" },
      { title: "从标记走到处理完成", text: "退出沉浸应用后提醒待办消息，再通过小窗与分屏完成回复。消息保留未处理、处理中与已完成状态，让“稍后再回”有明确的后续路径。" },
    ],
    mediaNotes: [
      { heading: "一段完整的消息处理体验", description: "演示从大屏沉浸使用、外屏手势，到标记提醒与分屏处理的交互过程。" },
      { heading: "两个同时存在的困扰", description: "弹窗会打断当前体验，而被忽略的重要消息又可能遗忘。设计需要同时照顾专注与及时回应。" },
      { heading: "让内外双屏各司其职", description: "内屏保留主要内容，外屏承担快速操作；将折叠屏的双屏特性转化为协同处理消息的机会。" },
      { heading: "从双指改为三指", description: "根据测试中的手掌牵拉、手势混淆与误触顾虑，调整操作方式，并补充清楚的内屏状态反馈。" },
      { heading: "先看完整任务链路", description: "将快速处理、标记提醒、小窗移动和分屏回复串联起来，明确每一步的触发方式与状态变化。" },
      { heading: "不重要，就轻轻略过", description: "外屏三指上滑忽略消息，减少在内屏上直接操作带来的遮挡与打断。" },
      { heading: "需要立即回应时", description: "外屏三指下滑打开回复小窗，在保留当前内容的同时完成沟通。" },
      { heading: "重要，但可以稍后处理", description: "通过外屏横向三指手势标记消息，为退出沉浸状态后的集中处理做准备。" },
      { heading: "在离开沉浸状态后提醒", description: "退出当前应用时呈现标记栏，让重要消息在合适的时机重新进入视野。" },
      { heading: "把消息带入分屏", description: "将标记小窗移动到屏幕边缘，再选择分屏区域，减少应用之间的往返切换。" },
      { heading: "处理之后，有明确反馈", description: "支持切换待处理消息，并区分处理中与已完成状态，让整个任务链路有清楚的终点。" },
    ],
  },
  "special-vehicle-hmi": {
    insights: [
      { title: "围绕紧急场景建立顺序", text: "特种车接近时，驾驶者需要依次理解来车位置、风险与可采取的动作。概念方案将流程分成靠近警示、辅助避让建议、方向确认、避让进行与完成接管。" },
      { title: "双屏协同，减少判断负担", text: "仪表盘突出驾驶状态与紧急提示，中控屏展示地图、车距和方向选择。通过信息呼应与颜色变化，帮助用户理解两块屏幕之间的关系。" },
      { title: "让确认操作清楚可控", text: "方向确认区考虑驾驶者的手部可及性，用滑动与点击区分不同操作。测试反馈也提示了语音说明、动效和操作简化的改进空间，后续仍需在更真实的驾驶条件下验证。" },
    ],
    mediaNotes: [
      { heading: "从接近提醒到避让完成", description: "动态演示展示双屏中的提示与状态变化。这是一套车载交互概念，包含辅助避让与完成后的接管提示。" },
      { heading: "放回驾驶座看界面", description: "将仪表盘与中控屏置于使用场景中，考察信息位置、观看关系与操作区域。" },
      { heading: "先定义场景，再定义界面", description: "围绕避让特种车的任务，梳理驾驶情境与设计重点，建立信息和动作的组织顺序。" },
      { heading: "把任务拆成状态", description: "从特种车识别与靠近提醒，到避让方向确认和完成反馈，让驾驶者知道当前进度与下一步动作。" },
      { heading: "用一致的视觉表达状态", description: "将高亮、完成、警示和告警的色彩语义，与字体层级和组件规范组合成 UI 套件。" },
      { heading: "双屏中的信息分工", description: "从总览检查仪表盘与中控屏的界面关系，保持关键信息的呼应。" },
      { heading: "不同状态下的界面细节", description: "通过距离、车道与风险状态的变化，呈现从预警、决策到执行的连续过程。" },
      { heading: "风格服务于驾驶信息", description: "以地平线、锋利线条与科技感建立视觉方向，再通过字阶、对比与留白承载不同层级的信息。" },
    ],
  },
};

// Pair the key decisions with the relevant original visuals, once per project.
const notePositions: Record<string, number[]> = {
  moocer: [0, 1, 2],
  "design-ai-playbook": [0, 2, 4],
  "ai-education-symposium": [0, 3, 2],
  creatorthon: [1, 2, 3],
  "negative-space": [1, 3, 4],
  "special-vehicle-hmi": [2, 5, 6],
};

export function notesForMedia(slug: string, index: number, count: number): ProjectInsight[] {
  const notes = projectStories[slug]?.insights ?? [];
  if (count === 1) return notes;
  return notes.filter((_, noteIndex) => notePositions[slug]?.[noteIndex] === index);
}
