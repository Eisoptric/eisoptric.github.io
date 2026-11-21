// The home page. Each block holds the English and the 中文 copy side by side;
// a key that exists in only one language fails the type check.

export const hero = {
  en: {
    eyebrow: 'Eisoptric · An independent AI research project',
    title: 'How do models learn, and what do they compute?',
    desc: 'Eisoptric is an independent research project. We study how capabilities form while a model is pretrained, and what the trained network actually computes inside. We build the tools that work needs, and release them for anyone to use.',
    primary: 'Our research',
    secondary: 'About Eisoptric',
    note: 'Our first research notes are in progress.',
    questionsLabel: 'Questions we are working on',
    questions: [
      'When during pretraining does a capability appear, and what changes inside the network when it does?',
      'Which internal features and circuits carry a behaviour, and do they survive a causal test against a random control?',
      'How can a model that acts on its own be kept inside rules people set, with a record of what it did?',
    ],
  },
  zh: {
    eyebrow: 'Eisoptric · 獨立 AI 研究計畫',
    title: '模型如何習得知識？其內部又進行了何種計算？',
    desc: 'Eisoptric 是一個獨立研究計畫，研究能力如何在預訓練過程中形成，以及訓練完成的網路內部實際進行了何種計算。研究所需的工具由我們自行開發，並公開釋出。',
    primary: '我們的研究',
    secondary: '關於 Eisoptric',
    note: '第一批研究筆記撰寫中。',
    questionsLabel: '目前的研究問題',
    questions: [
      '一項能力在預訓練的哪個階段出現？出現時，網路內部發生了哪些變化？',
      '哪些內部特徵與電路承載了特定行為？這些結果能否通過與隨機對照組比較的因果檢驗？',
      '當模型能自主行動時，如何使其行為受明確規則約束，並留下完整的行為紀錄？',
    ],
  },
} as const

export const areas = {
  en: {
    title: 'What we study.',
    desc: 'Three lines of research, from how a network is formed to how it behaves once it acts.',
    items: [
      [
        'Pretraining dynamics',
        'How capabilities emerge across checkpoints: when they appear, what data drives them, and what changes in the weights and activations as they do.',
      ],
      [
        'Interpretability',
        'What a trained network computes: features, circuits and the causal evidence for them, always read against a control.',
      ],
      [
        'Agent oversight',
        'Models that act through tools: how to keep their actions inside explicit rules, with a person where it matters and an audit trail behind it.',
      ],
    ],
  },
  zh: {
    title: '研究範疇。',
    desc: '三條研究主線，從網路如何形成，到網路開始行動後的表現。',
    items: [
      ['預訓練動態', '能力如何在各檢查點之間浮現：何時出現、由哪些資料驅動，以及出現時權重與活化值的變化。'],
      ['可解釋性', '訓練完成的網路進行何種計算：特徵、電路與支持它們的因果證據，且一律與對照組比較。'],
      ['代理監督', '透過工具行動的模型：如何使其行為受明確規則約束，必要時交由人審核，並保留完整的稽核紀錄。'],
    ],
  },
} as const

export const notes = {
  en: {
    title: 'Research notes.',
    desc: 'Each note will state its question, method, code and data, the evidence for its conclusion, and what did not work.',
    badge: 'In progress',
    placeholderTitle: 'Our first notes are being written.',
    placeholderBody:
      'Nothing is published yet. When it is, it will appear here and on the research page, with the code to reproduce it.',
    link: 'See the research agenda',
  },
  zh: {
    title: '研究筆記。',
    desc: '每篇筆記皆載明研究問題、方法、程式碼與資料、支持結論的證據，以及未能成立的部分。',
    badge: '撰寫中',
    placeholderTitle: '第一批筆記撰寫中。',
    placeholderBody: '目前尚未發表任何筆記。發表後將列於此處與研究頁，並附上可重現結果的程式碼。',
    link: '研究方向',
  },
} as const

export const tools = {
  en: {
    eyebrow: 'Tools',
    title: 'Tools from our work.',
    desc: 'We build tools because the research needs them. When one is useful beyond our own work, we release it. Both are free.',
    mcpKind: 'Gateway for agent tool calls',
    mcp: 'Letting agents run experiments meant deciding what they may touch. Eisoptric MCP puts every tool call under policy, approval and audit.',
    appKind: 'Open-source research workbench',
    app: 'One place for a question, its code, every sample and the model’s insides. The workbench we use, under Apache 2.0.',
  },
  zh: {
    eyebrow: '工具',
    title: '研究過程中開發的工具。',
    desc: '我們因研究需要而開發工具；當工具在我們的研究之外也有用處時，便公開釋出。兩者皆可免費使用。',
    mcpKind: '代理工具呼叫的閘道',
    mcp: '讓代理自主執行實驗之前，必須先界定它能存取什麼。Eisoptric MCP 使每一次工具呼叫都經過政策、核准與稽核。',
    appKind: '開源研究工作台',
    app: '研究問題、程式碼、每一個樣本與模型內部，集中於同一處。這是我們自己使用的工作台，以 Apache 2.0 授權開源。',
  },
} as const

export const principles = {
  en: {
    title: 'How we work.',
    items: [
      [
        'Open',
        'Our tools are open or free, research records are plain files, and every note will ship with the code behind it.',
      ],
      [
        'Careful about evidence',
        'We compare only runs measured the same way, read every causal result against a random control, and keep the samples behind every number.',
      ],
      [
        'Honest about limits',
        'We say what we did not find and what our tools cannot enforce, and correct a note in public when it is wrong.',
      ],
    ],
  },
  zh: {
    title: '研究原則。',
    items: [
      ['公開', '工具開源或免費提供，研究紀錄以一般檔案保存，每篇筆記皆附上所用的程式碼。'],
      ['以證據為本', '只比較以相同方式量測的執行結果，每項因果結論皆與隨機對照組比較，並保留每個數字背後的樣本。'],
      ['如實說明限制', '我們會說明未能找到的結果，以及工具無法強制的範圍；筆記若有錯誤，將公開更正。'],
    ],
  },
} as const

export const homeShoggoth = {
  en: {
    eyebrow: 'Models',
    title: 'Shoggoth.',
    desc: 'Small language models we train from scratch and release with every checkpoint, the data order and the code. The first step towards far more capable systems that can still be read from the inside.',
    badge: 'In preparation',
    link: 'About Shoggoth',
  },
  zh: {
    eyebrow: '模型',
    title: 'Shoggoth。',
    desc: '我們從頭訓練的小型語言模型，將連同每一個檢查點、資料順序與程式碼一併釋出。這是邁向「能力遠超今日、內部仍可解讀」之系統的第一步。',
    badge: '籌備中',
    link: '認識 Shoggoth',
  },
} as const

export const homeFaq = {
  en: {
    title: 'Questions about Eisoptric',
    items: [
      [
        'What is Eisoptric?',
        'Eisoptric is a small, independent AI research project founded and run by Rick Weng in Taiwan. It studies how capabilities form during pretraining and what trained models compute inside, and how to keep models that act through tools under human oversight.',
      ],
      [
        'Who runs Eisoptric?',
        'Rick Weng, who founded it in Taiwan and is for now its only researcher. Eisoptric is not part of a company or university.',
      ],
      [
        'Why does a research project ship software?',
        'Because the research needs it. Eisoptric Workbench is what we use for experiments and interpretability, and Eisoptric MCP is the gateway we needed before letting agents act on their own. We release them because they are useful beyond our own work.',
      ],
      [
        'Are the tools free?',
        'Yes. Eisoptric Workbench and Eisoptric MCP are both free, with every feature on every account. Eisoptric Workbench is open source under the Apache License 2.0.',
      ],
      [
        'Where are the research results?',
        'Our first notes are in progress. They will be published on the research page, each with its question, method, code and data.',
      ],
      ['Can I collaborate or ask a question?', 'Yes. Write to hello@eisoptric.com, or open an issue on GitHub.'],
    ],
  },
  zh: {
    title: '關於 Eisoptric',
    items: [
      [
        'Eisoptric 是什麼？',
        'Eisoptric 是由 Rick Weng 創立並主持的獨立 AI 研究計畫，研究能力如何在預訓練過程中形成、訓練完成的模型內部進行何種計算，以及如何使透過工具行動的模型維持在人的監督之下。',
      ],
      ['誰主持 Eisoptric？', 'Rick Weng。他於台灣創立本計畫，目前也是唯一的研究者。Eisoptric 不隸屬於任何公司或大學。'],
      [
        '研究計畫為何發行軟體？',
        '因為研究需要。Eisoptric Workbench 是我們進行實驗與可解釋性分析的工作台；Eisoptric MCP 則是讓代理自主行動之前所需的閘道。兩者在我們的研究之外也有用處，因此公開釋出。',
      ],
      [
        '工具是否免費？',
        '是。Eisoptric Workbench 與 Eisoptric MCP 皆免費，每個帳號都能使用全部功能。Eisoptric Workbench 以 Apache License 2.0 授權開源。',
      ],
      ['研究成果發表在哪裡？', '第一批筆記撰寫中。發表後將收錄於研究頁，每篇皆附上研究問題、方法、程式碼與資料。'],
      ['可以合作或提問嗎？', '可以。請來信 hello@eisoptric.com，或在 GitHub 上提出 issue。'],
    ],
  },
} as const
