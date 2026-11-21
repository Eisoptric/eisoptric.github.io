// The Brand page: the Eisoptric identity and its files, for people outside the project (press, partners, anyone
// citing Eisoptric). It summarises the official brand kit (public/brand/eisoptric-brand-kit.zip); when the kit
// changes, change this too. Each block holds the English and the 中文 copy side by side; a key that exists in
// only one language fails the type check.

export const brandPage = {
  en: {
    title: 'Eisoptric Brand — Logos, colours and press resources',
    description:
      'The Eisoptric name, mark, colours and typefaces, with logo files to download and a short description of Eisoptric you can use in articles, talks and listings.',
    eyebrow: 'Brand',
    heading: 'Brand and press resources.',
    lede: 'The Eisoptric name and mark, our colours and typefaces, and the files for using them. For articles, talks, partner pages and anywhere else Eisoptric is mentioned.',
    downloadKit: 'Download the brand kit',
    kitNote: 'ZIP · every logo file, with the colour and type specifications',
    logosLink: 'Logo files',

    namesTitle: 'The name, and the names you will see.',
    namesLede:
      'Eisoptric comes from the Greek eisoptron, a mirror: eis, into, and opt-, to see. Looking into. The research looks inside language models to understand how they learn and what they compute.',
    namesHead: ['Name', 'What it refers to', 'How to write it'],
    names: [
      ['Eisoptric', 'The research project as a whole.', 'Eisoptric, with a capital E. Not EISOPTRIC or eisoptric.'],
      [
        'Shoggoth',
        'Our series of small language models, trained from scratch and released with every checkpoint.',
        'Shoggoth on its own, without “Eisoptric” in front. A single model is Shoggoth with its size or version.',
      ],
      [
        'Yog-Sothoth',
        'The long-term aim the research points towards: a far more capable system that can still be understood from the inside.',
        'A direction, not a product or a model. Nothing called Yog-Sothoth exists or is offered.',
      ],
      [
        'Eisoptric Workbench, Eisoptric MCP',
        'Two tools we built for our own research and released: a research workbench and an MCP gateway for AI agents.',
        'In full, with the Eisoptric prefix.',
      ],
    ],
    namesNote:
      'Shoggoth and Yog-Sothoth are names from H. P. Lovecraft’s fiction. We use them as images of what the research studies, not for the horror; the identity uses no creatures or imagery from the stories.',

    markTitle: 'The mark.',
    markLede:
      'A capital E in ink faces its reflection in lapis across a gilt mirror line, inside a gilt ring. Above the line, a vermilion lozenge marks the observer: the model, the model seen from inside, and the point we look from.',
    partsHead: ['Part', 'Colour', 'Meaning'],
    parts: [
      ['The two Es', 'Ink, lapis', 'The model, and the model seen from inside.'],
      [
        'Ring and line',
        'Gilt',
        'The instrument: a mirror, and the line between what a model does and what we can read of it.',
      ],
      ['Lozenge', 'Vermilion', 'The observer: the point we look from.'],
    ],
    rulesTitle: 'Using the mark',
    rules: [
      'Please use the files as they are: do not redraw, recolour, stretch, rotate or add effects to the mark.',
      'Leave clear space around it of at least a quarter of its width.',
      'Use the Vellum version on light backgrounds and the Nocturne version on dark ones. On a photograph or a busy background, use the icon, which carries its own background.',
      'Below 64 pixels, use the glyph; for 16 and 32 pixels, the favicon.',
    ],

    filesTitle: 'Logo files.',
    filesLede:
      'Every file comes in Vellum, for light backgrounds, and Nocturne, for dark ones. SVG scales to any size.',
    files: {
      mark: ['Mark', 'The full mark on a transparent background, for 64 pixels and up.'],
      glyph: ['Glyph', 'A simplified mark without the ring, for small sizes from 20 to 64 pixels.'],
      favicon: ['Favicon', 'Drawn for 16 and 32 pixels, for browser tabs and bookmarks.'],
      icon: ['Icon', 'A square tile with its own background, for avatars and app icons. Safe to crop to a circle.'],
      lockupHorizontal: ['Horizontal logo', 'The mark beside the name, for headers and wide spaces.'],
      lockupStacked: ['Stacked logo', 'The mark above the name, for title pages and square spaces.'],
    },
    vellum: 'Vellum',
    nocturne: 'Nocturne',

    colourTitle: 'Colour.',
    colourLede:
      'Each colour is named after a historical pigment, after the manuscripts and star atlases the identity draws on. Vellum is the light theme; Nocturne is the dark one.',
    pigments: {
      vellum: ['Vellum', 'The page: a warm off-white, used instead of pure white.'],
      vellumDeep: ['Vellum deep', 'Panels and code.'],
      ink: ['Ink', 'Text, and the left E of the mark.'],
      inkMuted: ['Ink muted', 'Captions and secondary text.'],
      lapis: ['Lapis', 'The brand colour: links, buttons and the reflected E.'],
      vermilion: ['Vermilion', 'Accents: the lozenge in the mark and the section sign §.'],
      gilt: ['Gilt', 'The ring and mirror line of the mark, rules and ornaments.'],
      verdigris: ['Verdigris', 'The colour for “done” or “fixed”.'],
      hairline: ['Hairline', 'Fine dividing lines in tables and charts.'],
    },

    typeTitle: 'Typefaces.',
    typefaces: [
      ['Cormorant Garamond', 'Titles and headings, and the Eisoptric wordmark.'],
      ['EB Garamond', 'Running text and captions.'],
      ['IBM Plex Mono', 'Code and technical values.'],
      ['Noto Serif TC', 'Traditional Chinese text.'],
    ],
    typeNote: 'All four are free on Google Fonts.',

    aboutTitle: 'Describing Eisoptric.',
    aboutLede: 'You are welcome to use these descriptions as they are, or shorten them.',
    about: [
      [
        'In one sentence',
        'Eisoptric is an independent research project, founded by Rick Weng in Taiwan, that studies how language models learn and what they compute.',
      ],
      [
        'In a paragraph',
        'Eisoptric is an independent AI research project founded by Rick Weng in Taiwan. It studies how capabilities form while language models are trained, and what trained models compute inside, beginning with Shoggoth, a series of small models it trains from scratch and releases with every checkpoint. It has also released two tools from its own research: Eisoptric Workbench, an open-source research workbench, and Eisoptric MCP, a gateway that puts the tool calls of AI agents under policy, approval and audit.',
      ],
    ],
    usageTitle: 'Using the name and mark',
    usage:
      'You may use the Eisoptric name and mark to refer to Eisoptric, its research and its tools, for example in articles, talks, course material and lists of projects. Please do not use them in a way that suggests Eisoptric endorses, sponsors or works with you when it does not, and do not combine the mark with another logo. For anything else, and for press and interview requests, write to us.',
    contact: 'hello@eisoptric.com',

    ctaTitle: 'Everything in one file.',
    ctaBody:
      'The brand kit contains every logo file in both themes, as SVG and PNG, together with the colour and type specifications.',
  },
  zh: {
    title: 'Eisoptric 品牌識別 — 標誌、色彩與媒體資源',
    description: 'Eisoptric 的名稱、標誌、色彩與字體，提供標誌檔下載，以及可用於報導、演講與介紹的 Eisoptric 簡介。',
    eyebrow: '品牌識別',
    heading: '品牌與媒體資源。',
    lede: 'Eisoptric 的名稱與標誌、色彩與字體，以及使用所需的檔案。適用於報導、演講、合作夥伴頁面，以及任何提及 Eisoptric 的場合。',
    downloadKit: '下載品牌素材包',
    kitNote: 'ZIP · 所有標誌檔，以及色彩與字體規格',
    logosLink: '標誌檔案',

    namesTitle: '名稱，以及你會看到的名字。',
    namesLede:
      'Eisoptric 源自希臘文 eisoptron，意為鏡子：eis 是「向內」，opt- 是「看」，合起來即「向內看」。我們的研究向內觀察語言模型，以理解它們如何學習、進行何種計算。',
    namesHead: ['名稱', '所指為何', '書寫方式'],
    names: [
      ['Eisoptric', '整個研究計畫。', '寫作 Eisoptric，首字母大寫；不寫作 EISOPTRIC 或 eisoptric。'],
      [
        'Shoggoth（修格斯）',
        '我們從頭訓練、並連同每個檢查點一併釋出的小型語言模型系列。',
        '單獨寫作 Shoggoth，前面不加 Eisoptric。單一模型寫作 Shoggoth 加上規模或版本。',
      ],
      [
        'Yog-Sothoth（猶格索托斯）',
        '研究所指向的長期目標：能力遠超今日、內部仍可被理解的系統。',
        '是方向，而非產品或模型。目前並沒有名為 Yog-Sothoth 的模型或服務。',
      ],
      [
        'Eisoptric Workbench、Eisoptric MCP',
        '我們為自身研究開發並公開釋出的兩項工具：研究工作台，以及 AI 代理的 MCP 閘道。',
        '寫出全名，包含 Eisoptric 前綴。',
      ],
    ],
    namesNote:
      'Shoggoth 與 Yog-Sothoth 是洛夫克拉夫特小說中的名字。我們借用它們作為研究對象的意象，而非其恐怖色彩；品牌識別中不使用任何來自小說的生物或圖像。',

    markTitle: '標誌。',
    markLede:
      '一個墨色的大寫 E，隔著一道金色鏡線，面對自身的青金石色倒影，外圍環以一道金色圓環；鏡線上方的朱紅菱形標示觀察者。三者分別代表模型、從內部看見的模型，以及我們觀察的位置。',
    partsHead: ['部件', '顏色', '意義'],
    parts: [
      ['兩個 E', '墨、青金石', '模型，以及從內部看見的模型。'],
      ['圓環與鏡線', '金', '觀察的儀器：一面鏡子，以及模型的行為與我們能讀出的內容之間的那道界線。'],
      ['菱形', '朱紅', '觀察者：我們觀察的位置。'],
    ],
    rulesTitle: '使用標誌',
    rules: [
      '請直接使用原始檔案：不要重繪、改色、拉伸、旋轉標誌，或加上任何效果。',
      '標誌四周請保留至少其寬度四分之一的淨空。',
      '淺色背景請使用 Vellum 版本，深色背景請使用 Nocturne 版本。置於照片或繁雜的背景上時，請使用自帶底色的 icon。',
      '小於 64 像素時請使用字形標誌；16 與 32 像素請使用 favicon。',
    ],

    filesTitle: '標誌檔案。',
    filesLede: '每個檔案皆提供 Vellum（淺色背景用）與 Nocturne（深色背景用）兩種版本。SVG 可縮放至任何尺寸。',
    files: {
      mark: ['標誌', '透明背景的完整標誌，適用於 64 像素以上。'],
      glyph: ['字形標誌', '去除圓環的簡化標誌，適用於 20 至 64 像素的小尺寸。'],
      favicon: ['Favicon', '為 16 與 32 像素繪製，用於瀏覽器分頁與書籤。'],
      icon: ['Icon', '自帶底色的正方形圖示，用於頭像與應用程式圖示，可裁切為圓形。'],
      lockupHorizontal: ['橫式標誌', '標誌在名稱左側，適用於頁首與寬幅空間。'],
      lockupStacked: ['直式標誌', '標誌在名稱上方，適用於標題頁與方形空間。'],
    },
    vellum: 'Vellum',
    nocturne: 'Nocturne',

    colourTitle: '色彩。',
    colourLede:
      '每個顏色皆以一種歷史顏料命名，取法品牌識別所參考的手抄本與星圖。Vellum 是淺色主題，Nocturne 是深色主題。',
    pigments: {
      vellum: ['Vellum', '頁面底色：帶暖意的米白，取代純白。'],
      vellumDeep: ['Vellum deep', '面板與程式碼區塊。'],
      ink: ['Ink', '文字，以及標誌左側的 E。'],
      inkMuted: ['Ink muted', '圖說與次要文字。'],
      lapis: ['Lapis', '品牌主色：連結、按鈕與倒影的 E。'],
      vermilion: ['Vermilion', '點綴色：標誌中的菱形與章節記號 §。'],
      gilt: ['Gilt', '標誌的圓環與鏡線、分隔線與裝飾。'],
      verdigris: ['Verdigris', '代表「完成」或「已修正」的顏色。'],
      hairline: ['Hairline', '表格與圖表中的細分隔線。'],
    },

    typeTitle: '字體。',
    typefaces: [
      ['Cormorant Garamond', '標題與 Eisoptric 字標。'],
      ['EB Garamond', '內文與圖說。'],
      ['IBM Plex Mono', '程式碼與技術數值。'],
      ['Noto Serif TC', '繁體中文。'],
    ],
    typeNote: '四套字體皆可在 Google Fonts 免費取得。',

    aboutTitle: '介紹 Eisoptric。',
    aboutLede: '歡迎直接引用以下簡介，或依需要縮短。',
    about: [
      ['一句話簡介', 'Eisoptric 是 Rick Weng 於台灣創立的獨立研究計畫，研究語言模型如何學習，以及其內部進行何種計算。'],
      [
        '一段話簡介',
        'Eisoptric 是由 Rick Weng 於台灣創立的獨立 AI 研究計畫，研究能力如何在語言模型的訓練過程中形成，以及訓練完成的模型內部進行何種計算。研究從 Shoggoth 開始，這是一系列從頭訓練、並連同每個檢查點一併釋出的小型模型。Eisoptric 也公開釋出兩項源自自身研究的工具：開源研究工作台 Eisoptric Workbench，以及為 AI 代理的工具呼叫加上政策、核准與稽核的閘道 Eisoptric MCP。',
      ],
    ],
    usageTitle: '使用名稱與標誌',
    usage:
      '你可以使用 Eisoptric 的名稱與標誌來指稱 Eisoptric、其研究與工具，例如用於報導、演講、課程教材與專案列表。若 Eisoptric 並未背書、贊助或與你合作，請勿以暗示上述關係的方式使用，也請勿將標誌與其他標誌組合使用。其他用途，以及媒體與採訪邀約，歡迎來信。',
    contact: 'hello@eisoptric.com',

    ctaTitle: '完整內容，收於單一檔案。',
    ctaBody: '品牌素材包收錄兩種主題的所有標誌檔（SVG 與 PNG），以及色彩與字體規格。',
  },
} as const
