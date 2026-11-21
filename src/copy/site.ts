// The copy every page shares: the head defaults, navigation, footer, the closing call to action, the epigraph and the 404 page. Each block holds the English and the 中文 copy side by side;
// a key that exists in only one language fails the type check.

export const meta = {
  en: {
    title: 'Eisoptric — Research on how AI models learn, and what they compute',
    description:
      'Eisoptric is a small, independent AI research project founded by Rick Weng in Taiwan. We study how capabilities form during pretraining and what trained models compute inside, and we release the tools we build along the way: Eisoptric Workbench and Eisoptric MCP.',
  },
  zh: {
    title: 'Eisoptric — 研究 AI 模型如何學習，以及其內部的計算',
    description:
      'Eisoptric 是由 Rick Weng 於台灣創立的獨立 AI 研究計畫，研究能力如何在預訓練過程中形成、訓練完成的模型內部進行何種計算，並公開釋出研究過程中開發的工具：Eisoptric Workbench 與 Eisoptric MCP。',
  },
} as const

export const nav = {
  en: {
    home: 'Eisoptric home',
    research: 'Research',
    researchNotes: 'Research notes',
    posts: 'Posts',
    researchMenuNotes: {
      research: 'Our research agenda and published notes.',
      posts: 'Progress, working notes and announcements.',
    },
    shoggoth: 'Shoggoth',
    about: 'About',
    tools: 'Tools',
    mcp: 'MCP Gateway',
    app: 'Workbench',
    trust: 'Trust',
    support: 'Support',
    brand: 'Brand',
    start: 'Get started',
    cta: 'GitHub',
    menuOpen: 'Open menu',
    menuClose: 'Close menu',
    menuLabel: 'Menu',
    releases: 'Releases',
    releasesNotes: {
      shoggoth: 'Small models trained in the open. In preparation.',
      app: 'The open-source desktop workbench for AI research.',
      mcp: 'Policy, approval and audit for every agent tool call.',
    },
  },
  zh: {
    home: 'Eisoptric 首頁',
    research: '研究',
    researchNotes: '研究筆記',
    posts: '文章',
    researchMenuNotes: {
      research: '研究方向，以及陸續發表的研究筆記。',
      posts: '研究進度、工作紀錄與公告。',
    },
    shoggoth: 'Shoggoth',
    about: '關於',
    tools: '工具',
    mcp: 'MCP 閘道',
    app: '研究工作台',
    trust: '信任與安全',
    support: '支持研究',
    brand: '品牌識別',
    start: '開始使用',
    cta: 'GitHub',
    menuOpen: '開啟選單',
    menuClose: '關閉選單',
    menuLabel: '選單',
    releases: '釋出',
    releasesNotes: {
      shoggoth: '公開訓練的小型模型，籌備中。',
      app: '開源的 AI 研究桌面工作台。',
      mcp: '為代理的每一次工具呼叫加上政策、核准與稽核。',
    },
  },
} as const

export const footer = {
  en: {
    tagline: 'An independent research project on how AI models learn, and what they compute.',
    research: 'Research',
    tools: 'Tools',
    legal: 'Legal',
    mcp: 'MCP Gateway',
    app: 'Workbench',
    trust: 'Trust',
    support: 'Support',
    brand: 'Brand',
    terms: 'Terms of Service',
    privacy: 'Privacy Policy',
    project: 'Eisoptric',
    rights: 'All rights reserved.',
  },
  zh: {
    tagline: '研究 AI 模型如何學習、以及其內部進行何種計算的獨立研究計畫。',
    research: '研究',
    tools: '工具',
    legal: '法律',
    mcp: 'MCP 閘道',
    app: '研究工作台',
    trust: '信任與安全',
    support: '支持研究',
    brand: '品牌識別',
    terms: '服務條款',
    privacy: '隱私權政策',
    project: 'Eisoptric',
    rights: '版權所有',
  },
} as const

export const cta = {
  en: {
    title: 'Follow the work.',
    body: 'Research notes and tool releases are announced on GitHub. For questions or collaboration, write to us.',
    primary: 'Eisoptric on GitHub',
    secondary: 'Contact us',
  },
  zh: {
    title: '追蹤研究進展。',
    body: '研究筆記與工具的新版本皆於 GitHub 公告。如有問題或合作提議，歡迎來信。',
    primary: 'Eisoptric 的 GitHub',
    secondary: '聯絡我們',
  },
} as const

export const epigraph = {
  en: {
    delphi: 'Know thyself. Inscribed in the forecourt of the temple of Apollo at Delphi.',
  },
  zh: {
    delphi: '認識你自己。銘刻於德爾斐阿波羅神廟的前庭。',
  },
} as const

export const notFound = {
  en: {
    title: 'Page not found — Eisoptric',
    description: 'This page does not exist on eisoptric.com.',
    eyebrow: '404 · Page not found',
    heading: 'This page doesn’t exist.',
    lede: 'The link may be out of date, or the address may have a typo. These pages are good places to start.',
    home: 'Back to home',
    links: {
      research: 'What we study, and the research notes as they are published.',
      about: 'Who we are, why we build tools, and how to reach us.',
      app: 'The open-source workbench we use to study what models do.',
      mcp: 'The gateway that puts every agent tool call under policy, approval and audit.',
    },
  },
  zh: {
    title: '找不到頁面 — Eisoptric',
    description: 'eisoptric.com 上沒有這個頁面。',
    eyebrow: '404 · 找不到頁面',
    heading: '這個頁面不存在。',
    lede: '連結可能已失效，或網址有誤。可以從以下頁面開始。',
    home: '回到首頁',
    links: {
      research: '我們的研究方向，以及陸續發表的研究筆記。',
      about: '我們是誰、為何開發工具，以及聯絡方式。',
      app: '我們用來研究模型行為的開源工作台。',
      mcp: '讓代理的每一次工具呼叫都經過政策、核准與稽核的閘道。',
    },
  },
} as const
