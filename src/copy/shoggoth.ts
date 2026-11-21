// The Shoggoth page. Each block holds the English and the 中文 copy side by side;
// a key that exists in only one language fails the type check.

export const shoggothPage = {
  en: {
    title: 'Shoggoth — Small open models for studying how models learn',
    description:
      'Shoggoth is Eisoptric’s series of small language models, trained from scratch and released with every checkpoint, the data order and the code. Understanding them is the first step towards far more capable systems that can still be read from the inside. No model has been released yet.',
    eyebrow: 'Shoggoth · Models',
    heading: 'Shoggoth',
    lede: 'Small language models, trained from scratch and released with every step of their training, so that how they learn can be studied rather than guessed.',
    status: {
      badge: 'In preparation',
      text: 'No Shoggoth model has been trained or released yet. This page describes what we are building.',
    },
    storyTitle: 'The name, and where it leads.',
    story: [
      'Among AI researchers, the shoggoth, borrowed from H. P. Lovecraft, has become an image for the pretrained network beneath a model’s friendly interface: a system that begins as random weights and grows internal structure that nobody wrote and nobody has yet fully read. We borrow the image, not the mythology.',
      'We take the image at its word. Our long-term aim is a Yog-Sothoth that can be understood: a system far more capable than today’s, whose computation can still be read, traced back to what it learned from, and checked against what it was meant to do.',
      'We are a long way from that, so we begin where the claim can be tested. If we cannot explain what a small model we trained from step zero computes, we have no grounds to say we understand a larger one. Shoggoth is that first test, and Eisoptric is the mirror we hold up to it.',
    ],
    seriesTitle: 'One main line, and its controls.',
    seriesDesc: 'Each Shoggoth run comes with smaller variants, built to be compared against it.',
    series: [
      [
        'Shoggoth',
        'The main line: small language models pretrained from scratch, with a training recipe kept simple enough to repeat and to inspect at every step.',
      ],
      [
        'Controlled variants',
        'Runs that change one thing at a time (size, seed or data order), so that a difference in behaviour can be attributed to a single cause.',
      ],
    ],
    releaseTitle: 'What each model will come with.',
    release: [
      [
        'Every checkpoint',
        'Saved densely through training, and most densely early on, where many capabilities first appear.',
      ],
      [
        'The exact data order',
        'Which tokens the model saw at each step, so a change in behaviour can be traced back to what it was learning from.',
      ],
      [
        'Code and configuration',
        'The training code, hyperparameters and environment: enough to train the same model again.',
      ],
      [
        'Notes',
        'What we measured along the way: evaluations across checkpoints, the probes we ran, and what did not work.',
      ],
    ],
    scaleTitle: 'Why small.',
    scale: [
      'Shoggoth will not be a frontier model, and is not meant to be. A small model can be trained many times, inspected at every step, and compared under one controlled change at a time.',
      'That is what studying how models learn requires, and what frontier-scale training cannot offer. What holds up here is what we will carry to larger models.',
    ],
    ctaTitle: 'Follow Shoggoth from the first checkpoint.',
    ctaBody: 'Training runs, releases and notes will be announced on GitHub.',
  },
  zh: {
    title: 'Shoggoth — 用於研究模型如何學習的小型開放模型',
    description:
      'Shoggoth 是 Eisoptric 從頭訓練的小型語言模型系列，將連同每一個檢查點、資料順序與程式碼一併釋出。理解這些模型，是邁向能力更強、內部仍可解讀之系統的第一步。目前尚未釋出任何模型。',
    eyebrow: 'Shoggoth · 模型',
    heading: 'Shoggoth',
    lede: '從頭訓練的小型語言模型，連同訓練過程的每一步一併釋出，使模型如何學習成為可以研究、而非只能推測的問題。',
    status: {
      badge: '籌備中',
      text: '目前尚無任何 Shoggoth 模型完成訓練或釋出。本頁說明的是正在建構中的研究。',
    },
    storyTitle: '名稱，以及它所指向的方向。',
    story: [
      '在 AI 研究者之間，Shoggoth（修格斯，出自洛夫克拉夫特的小說）已成為一個意象，指模型友善介面之下的預訓練網路：它從隨機權重開始，發展出無人撰寫、也尚無人完整解讀的內部結構。我們借用的是這個意象，而非其神話。',
      '我們認真看待這個意象。我們的長期目標是一個可被理解的 Yog-Sothoth（猶格索托斯）：能力遠超今日的系統，其內部計算仍可解讀，可追溯其學習來源，並能與其預定目的相互核對。',
      '我們距離這個目標仍很遙遠，因此從可被檢驗的主張著手。若無法解釋一個從第 0 步親手訓練的小型模型進行了何種計算，便沒有理由宣稱理解更大的模型。Shoggoth 是第一道檢驗，Eisoptric 則是我們用以觀察它的那面鏡子。',
    ],
    seriesTitle: '一條主線，及其對照組。',
    seriesDesc: '每一次 Shoggoth 訓練，都搭配數個較小的變體，專供與其比較。',
    series: [
      ['Shoggoth', '主線：從頭預訓練的小型語言模型，訓練流程維持簡潔，以便重複訓練，並在每一步受檢視。'],
      ['受控變體', '每次只改變一項條件（規模、隨機種子或資料順序）的訓練，使行為上的差異能歸因於單一原因。'],
    ],
    releaseTitle: '每個模型將一併釋出的內容。',
    release: [
      ['每一個檢查點', '於整個訓練過程中密集保存，早期尤其密集，因為許多能力正是在此階段首次出現。'],
      ['確切的資料順序', '模型在每一步讀過哪些詞元（token），使行為的變化能追溯至當時的學習內容。'],
      ['程式碼與設定', '訓練程式碼、超參數與執行環境，足以重新訓練出同一個模型。'],
      ['研究筆記', '訓練過程中的量測：跨檢查點的評測、所執行的探針，以及未能成立的結果。'],
    ],
    scaleTitle: '為何選擇小型模型。',
    scale: [
      'Shoggoth 不會是前沿等級的模型，也無意成為前沿模型。小型模型可以重複訓練、在每一步受檢視，並以每次只改變一項條件的方式進行比較。',
      '研究模型如何學習，所需要的正是這些，而前沿規模的訓練無法提供。在此經得起檢驗的結論，才值得推展到更大的模型。',
    ],
    ctaTitle: '從第一個檢查點開始追蹤 Shoggoth。',
    ctaBody: '訓練進度、模型釋出與研究筆記，皆將於 GitHub 公告。',
  },
} as const
