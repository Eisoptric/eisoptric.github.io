// The Research page. Each block holds the English and the 中文 copy side by side;
// a key that exists in only one language fails the type check.

export const researchPage = {
  en: {
    title: 'Eisoptric Research — Pretraining dynamics, interpretability and agent oversight',
    description:
      'Eisoptric’s research agenda: how capabilities form during pretraining, what trained models compute inside, and how to keep models that act through tools under human oversight. Research notes are published here.',
    eyebrow: 'Research',
    heading: 'What we study, and what we publish.',
    lede: 'Eisoptric’s research asks how a model comes to know what it knows, and what it computes when it uses that knowledge. Below are the questions we are working on, and the notes we publish as answers become defensible.',
    modelsTitle: 'Our own models.',
    models:
      'To watch a capability form, every step of training has to be in front of us. So we train small models of our own, the Shoggoth series, and will release every checkpoint, the data order and the code with each.',
    modelsLink: 'About Shoggoth',
    agendaTitle: 'Research agenda.',
    agendaDesc: 'The questions each line of research is organized around. They will change as we learn.',
    areas: [
      {
        num: '01',
        title: 'Pretraining dynamics',
        body: 'A capability does not exist at step 0 and does at the end of training. We want to know what happens in between.',
        questions: [
          'At which checkpoints does a capability appear, and is the transition gradual or abrupt?',
          'Which parts of the network change when it appears, and which data are responsible?',
          'Do the same mechanisms form at different model sizes and seeds?',
        ],
      },
      {
        num: '02',
        title: 'Interpretability',
        body: 'A score says that a model can do something. It does not say how. We look inside.',
        questions: [
          'Which features and circuits carry a behaviour, measured with activation patching and sparse autoencoders?',
          'Does each finding survive a causal test against a random control?',
          'How much of a behaviour does an explanation account for, and what does it leave out?',
        ],
      },
      {
        num: '03',
        title: 'Agent oversight',
        body: 'Once a model acts through tools, what it is allowed to do matters as much as what it can do.',
        questions: [
          'Which rules on tool calls stop harmful actions without stopping useful work?',
          'Where should a person approve an action, and with what context?',
          'What record of an agent’s actions is enough to reconstruct and judge them afterwards?',
        ],
      },
    ],
    notesTitle: 'Research notes.',
    notesDesc: 'Published notes appear here, newest first.',
    placeholder: {
      badge: 'In progress',
      title: 'No notes are published yet.',
      body: 'Our first notes are being written. This list will show each note’s date, title and a one-sentence summary.',
    },
    postsNote:
      'Earlier, shorter writing that is not yet a note (progress, working notes, announcements) goes to Posts.',
    postsLink: 'Read the posts',
    standardTitle: 'What every note includes.',
    standard: [
      ['The question', 'What we set out to find, and the hypotheses we held before we looked.'],
      ['The method', 'Models, checkpoints, data, and the exact code, so the result can be reproduced.'],
      ['The evidence', 'The numbers, the samples behind them, and the controls they were read against.'],
      ['The limits', 'What did not work, what the result does not show, and corrections when we get something wrong.'],
    ],
    ctaTitle: 'Want to be told when a note is published?',
    ctaBody: 'Follow Eisoptric on GitHub, or write to us.',
  },
  zh: {
    title: 'Eisoptric 研究 — 預訓練動態、可解釋性與代理監督',
    description:
      'Eisoptric 的研究方向：能力如何在預訓練過程中形成、訓練完成的模型內部進行何種計算，以及如何使透過工具行動的模型維持在人的監督之下。研究筆記將發表於此。',
    eyebrow: '研究',
    heading: '研究方向與發表。',
    lede: 'Eisoptric 的研究探討兩個問題：模型如何習得它所具備的知識，以及運用這些知識時，其內部進行了何種計算。以下是目前的研究問題，以及結論經得起檢驗後發表的筆記。',
    modelsTitle: '自行訓練的模型。',
    models:
      '要觀察一項能力如何形成，訓練的每一步都必須完整可見。因此我們自行訓練小型模型，即 Shoggoth 系列，並將隨每個模型釋出所有檢查點、資料順序與程式碼。',
    modelsLink: '認識 Shoggoth',
    agendaTitle: '研究方向。',
    agendaDesc: '各研究主線所圍繞的問題。隨著研究推進，這些問題也將隨之修正。',
    areas: [
      {
        num: '01',
        title: '預訓練動態',
        body: '一項能力在第 0 步並不存在，在訓練結束時卻已具備。我們想知道其間發生了什麼。',
        questions: [
          '能力出現在哪些檢查點？轉變是漸進的，還是突然的？',
          '能力出現時，網路的哪些部分發生變化？由哪些資料所造成？',
          '在不同模型規模與隨機種子下，是否形成相同的機制？',
        ],
      },
      {
        num: '02',
        title: '可解釋性',
        body: '分數只能說明模型做得到某件事，無法說明它如何做到。因此我們深入其內部。',
        questions: [
          '哪些特徵與電路承載了特定行為？以活化修補（activation patching）與稀疏自編碼器量測。',
          '每一項發現是否都能通過與隨機對照組比較的因果檢驗？',
          '一項解釋能涵蓋多少行為？又遺漏了什麼？',
        ],
      },
      {
        num: '03',
        title: '代理監督',
        body: '模型一旦透過工具行動，它被允許做什麼，與它能做什麼同樣重要。',
        questions: [
          '哪些工具呼叫規則能阻擋有害操作，又不妨礙有用的工作？',
          '哪些操作應交由人核准？核准時需要哪些脈絡資訊？',
          '代理的行為應留下何種紀錄，才足以在事後重建並判斷？',
        ],
      },
    ],
    notesTitle: '研究筆記。',
    notesDesc: '已發表的筆記依時間由新至舊列於此處。',
    placeholder: {
      badge: '撰寫中',
      title: '目前尚未發表任何筆記。',
      body: '第一批筆記撰寫中。屆時此處將列出每篇筆記的日期、標題與一句摘要。',
    },
    postsNote: '尚未達到研究筆記標準的較短篇幅與早期內容（進度、工作紀錄、公告），發表於文章。',
    postsLink: '閱讀文章',
    standardTitle: '每篇筆記的內容。',
    standard: [
      ['研究問題', '我們試圖回答什麼，以及著手之前所持的假說。'],
      ['方法', '模型、檢查點、資料與確切的程式碼，使結果得以重現。'],
      ['證據', '數字、數字背後的樣本，以及作為比較基準的對照組。'],
      ['限制', '未能成立的部分，以及結果所不能證明的事；若有錯誤，將公開更正。'],
    ],
    ctaTitle: '希望在筆記發表時收到通知？',
    ctaBody: '在 GitHub 上追蹤 Eisoptric，或來信聯絡。',
  },
} as const
