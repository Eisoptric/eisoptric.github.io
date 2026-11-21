// The post list and the frame around each post. The posts themselves are Markdown files in src/posts/.
// Each block holds the English and the 中文 copy side by side; a key that exists in only one language fails the type check.

export const postsPage = {
  en: {
    title: 'Eisoptric Posts — Working notes, progress and announcements',
    description:
      'Shorter writing from Eisoptric: progress on Shoggoth, working notes and announcements that are not research notes.',
    eyebrow: 'Posts',
    heading: 'Posts.',
    lede: 'Shorter writing from the work: progress on Shoggoth, what we are trying, and announcements. Posts are not research notes. They are not held to the same standard of evidence, and they say so. Findings that hold up are published as notes on the Research page.',
    researchLink: 'Research notes',
    empty: 'No posts yet. The first will appear here.',
    label: 'Post',
    languages: { en: 'In English', zh: '中文' },
    back: 'All posts',
    notice: 'This is a post, not a research note. Findings that hold up are published as notes on the Research page.',
  },
  zh: {
    title: 'Eisoptric 文章 — 研究進度、工作紀錄與公告',
    description: 'Eisoptric 的較短篇幅文字：Shoggoth 的研究進度、工作紀錄與公告，尚未達到研究筆記的標準。',
    eyebrow: '文章',
    heading: '文章。',
    lede: '研究過程中的較短篇幅文字：Shoggoth 的進度、正在嘗試的方向，以及公告。文章並非研究筆記，不受相同的證據標準約束，並會明確標示。經得起檢驗的結果，將以研究筆記形式發表於研究頁。',
    researchLink: '研究筆記',
    empty: '目前尚無文章。第一篇將發表於此。',
    label: '文章',
    languages: { en: 'In English', zh: '中文' },
    back: '所有文章',
    notice: '本篇為文章，並非研究筆記。經得起檢驗的結果，將以研究筆記形式發表於研究頁。',
  },
} as const
