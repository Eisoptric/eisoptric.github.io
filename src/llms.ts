import { CONSOLE_URL, CONTACT_ADDRESS, DONATE_URL, GITHUB_URL, ORG_GITHUB_URL, RELEASES_URL, SITE_URL } from './config'
import { pageMeta, type Locale, type PageName } from './i18n'
import { PAGES, canonicalUrl, markdownUrl } from './seo'

// llms.txt, llms-full.txt and the Markdown copy of each page are built from the rendered pages by
// scripts/prerender.mjs. Only the summary and the facts below are written by hand: everything else
// comes from the same copy the site shows, so the two cannot drift apart.

const SUMMARY =
  'Eisoptric is a small, independent AI research project founded and run by Rick Weng in Taiwan. It studies how capabilities form during pretraining, what trained models compute inside (interpretability), and how to keep models that act through tools under human oversight. It releases the tools it builds for that work: Eisoptric App, an open-source desktop research workbench, and Eisoptric MCP, a gateway that puts every tool call an AI agent makes under policy, human approval and audit.'

const FACTS = [
  `Website: ${SITE_URL}/`,
  `Contact: ${CONTACT_ADDRESS}`,
  `GitHub: ${ORG_GITHUB_URL}`,
  'Research status: research notes are in progress; none are published yet.',
  `Eisoptric MCP console: ${CONSOLE_URL}`,
  `Eisoptric App source: ${GITHUB_URL}`,
  `Eisoptric App releases: ${RELEASES_URL}`,
  `Sponsorship: ${DONATE_URL}`,
  'Price: both tools are free, with every feature on every account. There are no paid plans.',
  'License: Eisoptric App is licensed under the Apache License 2.0.',
  'Operator: Rick Weng, an individual in Taiwan, who operates the website, the hosted gateway and Eisoptric App distribution.',
]

const SECTION_TITLES: Record<Locale, string> = { en: 'English', zh: '中文（繁體）' }

function header(): string {
  return ['# Eisoptric', '', `> ${SUMMARY}`, '', ...FACTS.map((fact) => `- ${fact}`)].join('\n')
}

/** llms.txt: the summary, the facts, and a link to the Markdown copy of every page in both languages. */
export function llmsIndex(): string {
  const sections = (['en', 'zh'] as const).map((lang) => {
    const links = PAGES.map((page) => {
      const meta = pageMeta(page, lang)
      return `- [${meta.title}](${markdownUrl(page, lang)}): ${meta.description}`
    })
    return [`## ${SECTION_TITLES[lang]}`, '', ...links].join('\n')
  })
  return [
    header(),
    '',
    'Each link below is a Markdown copy of a page, generated from the same source as the page itself.',
    '',
    ...sections.flatMap((section) => [section, '']),
    '## Optional',
    '',
    `- [Full text](${SITE_URL}/llms-full.txt): Every page above in one file, English first, then 中文.`,
    `- [Sitemap](${SITE_URL}/sitemap.xml): Every public page in English and 繁體中文.`,
    '',
  ].join('\n')
}

export interface PageDocument {
  page: PageName
  lang: Locale
  markdown: string
}

/** The front matter that opens each page's Markdown copy. */
export function documentHeader(page: PageName, lang: Locale, built: string): string {
  const other: Locale = lang === 'en' ? 'zh' : 'en'
  return [
    `Source: ${canonicalUrl(page, lang)}`,
    `${other === 'zh' ? '中文' : 'English'}: ${markdownUrl(page, other)}`,
    `Built: ${built}`,
  ].join('\n')
}

/** llms-full.txt: the summary and facts, then every page's Markdown, English first. */
export function llmsFull(documents: PageDocument[], built: string): string {
  const ordered = (['en', 'zh'] as const).flatMap((lang) =>
    PAGES.map((page) => documents.find((doc) => doc.page === page && doc.lang === lang)),
  )
  if (ordered.some((doc) => !doc)) throw new Error('llms-full.txt is missing a page')
  return [
    header(),
    `- Built: ${built}`,
    '',
    ...ordered.flatMap((doc) => ['---', '', doc!.markdown.trim(), '']),
  ].join('\n')
}
