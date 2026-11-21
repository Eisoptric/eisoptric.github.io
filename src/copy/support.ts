// The Support page. Each block holds the English and the 中文 copy side by side;
// a key that exists in only one language fails the type check.

export const supportPage = {
  en: {
    title: 'Support Eisoptric — Independent research on how AI models learn',
    description:
      'Eisoptric is an independent research project. Support pays for the compute to train Shoggoth, for releasing every checkpoint in the open, and for the research notes and instruments we publish.',
    eyebrow: 'Support',
    heading: 'Support the work.',
    lede: 'Eisoptric is independent: it belongs to no company and no university. It is carried by the people who think this research should exist. If you are one of them, this is what your support makes possible.',
    sponsor: 'Sponsor on GitHub',
    contact: 'Write to us',
    whyTitle: 'Why independent research needs support.',
    why: [
      'To understand how a model learns, we have to train models ourselves and keep every step: each checkpoint, the exact data order, the code. That takes compute and storage, and it takes time that no product roadmap pays for.',
      'Independence lets us choose questions by what we think matters, and publish what we find, including what did not work. Support is what keeps it that way.',
    ],
    fundsTitle: 'What your support pays for.',
    funds: [
      [
        'Training Shoggoth',
        'The compute to train small models from scratch, many times over, changing one thing at a time.',
      ],
      [
        'Open releases',
        'Storage and bandwidth to publish every checkpoint, the exact data order and the code with each model.',
      ],
      ['Research notes', 'Time to measure carefully, write up what holds, and report what did not.'],
      [
        'The instruments',
        'Keeping Eisoptric Workbench and Eisoptric MCP maintained and running for everyone who uses them.',
      ],
    ],
    waysTitle: 'Ways to help.',
    waysDesc: 'Money is one way. Compute, collaboration and careful criticism are others.',
    ways: [
      ['Sponsor', 'Monthly or once, at any amount, through GitHub Sponsors.'],
      [
        'Contribute compute',
        'If you can offer GPU time for training runs, write to us. It goes straight into Shoggoth.',
      ],
      [
        'Collaborate',
        'Researchers working on pretraining dynamics, interpretability or agent oversight are welcome to get in touch.',
      ],
      [
        'Read critically',
        'Use the tools, read the notes, and tell us where we are wrong. GitHub issues and email both reach us.',
      ],
    ],
    principlesTitle: 'What support does not change.',
    principles: [
      'Everything we release stays in the open: the models and their checkpoints, the notes and the tools. Support does not buy early or exclusive access to any of it.',
      'Support does not buy a say in what we study or what we publish. We report what we find.',
    ],
    ctaTitle: 'Back the work from the first checkpoint.',
    ctaBody: 'Sponsorship goes through GitHub Sponsors. For compute, collaboration or anything else, write to us.',
  },
  zh: {
    title: '支持 Eisoptric — 研究 AI 模型如何學習的獨立研究',
    description:
      'Eisoptric 是獨立研究計畫。各界的支持將用於訓練 Shoggoth 所需的算力、公開釋出每一個檢查點，以及我們發表的研究筆記與研究工具。',
    eyebrow: '支持研究',
    heading: '支持這項研究。',
    lede: 'Eisoptric 是獨立的研究計畫，不隸屬於任何公司或大學，由認為這項研究應當存在的人們所支持。若你也是其中之一，以下說明你的支持將促成哪些工作。',
    sponsor: '透過 GitHub 贊助',
    contact: '來信聯絡',
    whyTitle: '獨立研究為何需要支持。',
    why: [
      '要理解模型如何學習，就必須親自訓練模型，並保留每一步：每一個檢查點、確切的資料順序與程式碼。這需要算力與儲存空間，也需要任何產品時程都不會支付的研究時間。',
      '保持獨立，我們才能依研究的重要性選擇問題，並如實發表發現，包括未能成立的結果。各界的支持，使這樣的研究得以延續。',
    ],
    fundsTitle: '支持的用途。',
    funds: [
      ['訓練 Shoggoth', '從頭訓練小型模型所需的算力，每次只改變一項條件，重複訓練多次。'],
      ['公開釋出', '隨每個模型公開所有檢查點、確切的資料順序與程式碼所需的儲存空間與頻寬。'],
      ['研究筆記', '審慎量測、記錄經得起檢驗的結果，並如實報告未能成立之處所需的時間。'],
      ['研究工具', '維護並持續營運 Eisoptric Workbench 與 Eisoptric MCP，供所有使用者使用。'],
    ],
    waysTitle: '支持方式。',
    waysDesc: '資金是其中一種。算力、研究合作與嚴謹的批評，同樣重要。',
    ways: [
      ['贊助', '透過 GitHub Sponsors 每月或單次贊助，金額不限。'],
      ['提供算力', '若能提供訓練所需的 GPU 時數，歡迎來信洽詢。這些算力將直接用於 Shoggoth 的訓練。'],
      ['研究合作', '若你從事預訓練動態、可解釋性或代理監督的研究，歡迎與我們聯絡。'],
      ['嚴謹審閱', '使用這些工具、閱讀研究筆記，並指出我們的錯誤。GitHub issue 與電子郵件皆可。'],
    ],
    principlesTitle: '支持不會改變的原則。',
    principles: [
      '我們釋出的一切都將保持公開：模型及其檢查點、研究筆記與工具。支持不會換取任何提前或獨占的使用權。',
      '支持也不會換取對研究題目或發表內容的決定權。我們觀察到什麼，就報告什麼。',
    ],
    ctaTitle: '從第一個檢查點起支持這項研究。',
    ctaBody: '贊助透過 GitHub Sponsors 進行。算力、研究合作或其他事宜，歡迎來信。',
  },
} as const
