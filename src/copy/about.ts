// The About page. Each block holds the English and the 中文 copy side by side;
// a key that exists in only one language fails the type check.

export const aboutPage = {
  en: {
    title: 'About Eisoptric — A small, independent AI research project',
    description:
      'Eisoptric is a small AI research project run by Rick Weng. Who we are, what we work towards, why we build and release tools, and how to reach us.',
    eyebrow: 'About',
    heading: 'An independent project to understand how models learn.',
    lede: 'Eisoptric is an independent research project founded by Rick Weng in Taiwan. We want to understand how AI systems acquire what they know and what they compute when they use it, because that understanding is what makes more capable systems safe to build and to rely on.',
    missionTitle: 'Why we exist.',
    mission: [
      'Models are becoming more capable faster than we are learning what happens inside them. Our mission is to close that gap: to begin with Shoggoth, small models we train and take apart ourselves, and to work towards what we call an understandable Yog-Sothoth, a system far more capable than today’s whose computation can still be read.',
      'So we study both ends: how a capability forms while a model is trained, and what the trained network does when it uses it. And because models increasingly act on their own, we also study how to keep those actions under human oversight.',
    ],
    nameTitle: 'Looking into.',
    name: [
      'Eisoptric comes from the Greek eisoptron, a mirror: eis, into, and opt-, to see. Looking into. A model can be watched from outside, by what it says and does, or looked into, by reading what it computes. We do the second.',
      'Our mark is a capital E facing its own reflection across a gilt mirror line: the model, and the model seen from inside. Our own models are called Shoggoth, for the reason told on their page.',
    ],
    teamTitle: 'Who runs Eisoptric.',
    team: [
      [
        'Rick Weng',
        'Founder of Eisoptric, and for now its only researcher: the experiments, the models, the tools and this site.',
      ],
      ['Independent', 'Based in Taiwan. Eisoptric is not part of a company or university.'],
      [
        'Small on purpose',
        'A few questions, studied in depth. The tools the work needs are written in-house rather than waited for.',
      ],
      [
        'Our own models',
        'We train small models of our own, the Shoggoth series, because studying how a model learns means seeing every step of its training.',
      ],
    ],
    toolsTitle: 'Why we build tools.',
    toolsDesc:
      'Research is only as good as the instruments behind it. We build what we need, use it every day, and release it when it is useful to others.',
    tools: [
      [
        'Eisoptric Workbench',
        'Where we run experiments and interpretability in: questions, code, every sample and the model’s insides, kept together. Open source under Apache 2.0.',
      ],
      [
        'Eisoptric MCP',
        'The gateway we needed before letting agents act on their own: every tool call under policy, approval and audit. Free for everyone.',
      ],
    ],
    contactTitle: 'Get in touch.',
    contact: [
      ['General and collaboration', 'hello@eisoptric.com'],
      ['Security reports', 'security@eisoptric.com'],
    ],
    github: 'Eisoptric on GitHub',
    donate: 'Support the project',
  },
  zh: {
    title: '關於 Eisoptric — 獨立 AI 研究計畫',
    description:
      'Eisoptric 是由 Rick Weng 主持的獨立 AI 研究計畫。本頁說明我們是誰、研究目的、為何開發並釋出工具，以及聯絡方式。',
    eyebrow: '關於',
    heading: '致力於理解模型如何學習的獨立研究計畫。',
    lede: 'Eisoptric 是 Rick Weng 於台灣創立的獨立研究計畫。我們希望理解 AI 系統如何習得其所具備的知識，以及運用這些知識時進行何種計算，因為唯有這樣的理解，才能使更強大的系統得以安全地建構與信賴。',
    missionTitle: '研究使命。',
    mission: [
      '模型能力提升的速度，超過了我們理解其內部運作的速度。我們的使命是縮小這個差距：從 Shoggoth 開始，也就是我們親手訓練、深入剖析的小型模型，逐步邁向我們所稱「可被理解的 Yog-Sothoth（猶格索托斯）」，即能力遠超今日、內部計算仍可解讀的系統。',
      '因此我們從兩端著手：能力如何在訓練過程中形成，以及訓練完成的網路在運用這些能力時進行了何種計算。此外，由於模型愈來愈常自主行動，我們也研究如何使這些行動維持在人的監督之下。',
    ],
    nameTitle: '向內看。',
    name: [
      'Eisoptric 源自希臘文 eisoptron，意為鏡子：eis 是「向內」，opt- 是「看」，合起來即「向內看」。觀察模型有兩種方式：從外部觀察它說了什麼、做了什麼，或向內解讀它進行了何種計算。我們做的是後者。',
      '我們的標誌是一個大寫 E，隔著一道金色鏡軸面對自己的倒影：模型，以及從內部看見的模型。我們自行訓練的模型名為 Shoggoth，緣由說明於其頁面。',
    ],
    teamTitle: '主持者與組織。',
    team: [
      ['Rick Weng', 'Eisoptric 創立者，目前也是唯一的研究者，負責實驗、模型、工具與本網站。'],
      ['獨立運作', '位於台灣。Eisoptric 不隸屬於任何公司或大學。'],
      ['刻意保持精簡', '只選擇少數問題深入研究；研究所需的工具自行開發，而非等待他人提供。'],
      ['自行訓練的模型', '我們自行訓練小型模型，即 Shoggoth 系列，因為研究模型如何學習，必須看見訓練的每一步。'],
    ],
    toolsTitle: '為何開發工具。',
    toolsDesc: '研究的品質取決於所用的儀器。我們開發自己需要的工具，每日使用，並在它對他人也有用處時公開釋出。',
    tools: [
      [
        'Eisoptric Workbench',
        '我們進行實驗與可解釋性分析的工作台：研究問題、程式碼、每一個樣本與模型內部集中於一處。以 Apache 2.0 授權開源。',
      ],
      ['Eisoptric MCP', '讓代理自主行動之前所需的閘道：每一次工具呼叫皆經過政策、核准與稽核。所有人皆可免費使用。'],
    ],
    contactTitle: '聯絡方式。',
    contact: [
      ['一般事務與合作', 'hello@eisoptric.com'],
      ['安全性通報', 'security@eisoptric.com'],
    ],
    github: 'Eisoptric 的 GitHub',
    donate: '支持本研究',
  },
} as const
