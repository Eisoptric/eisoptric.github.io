import { CONTACT_ADDRESS, GITHUB_URL, ORG_GITHUB_URL, RELEASES_URL, SITE_URL } from './config'
import { copy, type Locale } from './i18n'
import {
  PAGE_NAMES,
  isPostPage,
  pageCrumb,
  pageLanguages,
  pageMeta,
  pagePath,
  pagePriority,
  postOf,
  type PageName,
} from './page-table'

const ORG_ID = `${SITE_URL}/#organization`
const SITE_ID = `${SITE_URL}/#website`
const OG_IMAGE = new URL('/og.png', SITE_URL).href

export function canonicalUrl(page: PageName, lang: Locale): string {
  return new URL(pagePath(page, lang), SITE_URL).href
}

/** The path a page's Markdown copy is served at: the page's URL with .md, and index.md for a locale's home. */
export function markdownPath(page: PageName, lang: Locale): string {
  const path = pagePath(page, lang)
  if (path === '/') return '/index.md'
  if (path === '/zh') return '/zh/index.md'
  return `${path}.md`
}

export function markdownUrl(page: PageName, lang: Locale): string {
  return new URL(markdownPath(page, lang), SITE_URL).href
}

export function prerenderPaths(): string[] {
  return PAGE_NAMES.flatMap((page) => pageLanguages(page).map((lang) => pagePath(page, lang)))
}

/** The page hreflang x-default points at: English when the page exists in English. */
function defaultUrl(page: PageName): string {
  return canonicalUrl(page, pageLanguages(page)[0])
}

export function htmlLang(lang: Locale): string {
  return lang === 'zh' ? 'zh-Hant' : 'en'
}

function ogLocale(lang: Locale): string {
  return lang === 'zh' ? 'zh_TW' : 'en_US'
}

function imageAlt(lang: Locale): string {
  return lang === 'zh'
    ? 'Eisoptric，研究 AI 模型如何學習、內部在算什麼'
    : 'Eisoptric, research on how AI models learn and what they compute'
}

function faqFor(page: PageName, lang: Locale) {
  const text = copy(lang)
  if (page === 'home') return text.homeFaq.items
  if (page === 'trust') return text.trustPage.faq
  return null
}

function questions(items: readonly (readonly [string, string])[]) {
  return items.map(([name, text]) => ({
    '@type': 'Question',
    name,
    acceptedAnswer: { '@type': 'Answer', text },
  }))
}

function mcpApplication(lang: Locale) {
  const text = copy(lang)
  return {
    '@type': 'SoftwareApplication',
    '@id': `${SITE_URL}/#eisoptric-mcp`,
    name: 'Eisoptric MCP',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    url: canonicalUrl('mcp', lang),
    description: text.mcpPage.description,
    featureList:
      lang === 'zh'
        ? ['工具集', '參數層級政策', '多人核准', '簽章 Webhook', '加密的原始內容', '審計軌跡']
        : [
            'Tool sets',
            'Argument-level policy',
            'Multi-approver quorum',
            'Signed webhooks',
            'Encrypted raw payloads',
            'Audit trail',
          ],
    provider: { '@id': ORG_ID },
    isAccessibleForFree: true,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  }
}

function desktopApplication(lang: Locale) {
  const text = copy(lang)
  return {
    '@type': 'SoftwareApplication',
    '@id': `${SITE_URL}/#eisoptric-workbench`,
    name: 'Eisoptric Workbench',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'macOS, Windows',
    url: canonicalUrl('app', lang),
    description: text.appPage.description,
    downloadUrl: RELEASES_URL,
    codeRepository: GITHUB_URL,
    license: 'https://www.apache.org/licenses/LICENSE-2.0',
    isAccessibleForFree: true,
    featureList:
      lang === 'zh'
        ? [
            '問題、假說、實驗、樣本與結論都是專案裡的純文字檔',
            '每個對話可設定 AI 參與程度',
            '本機 Runtime，只監聽 127.0.0.1',
            '自帶模型',
            'Apache 2.0 授權',
          ]
        : [
            'Questions, hypotheses, experiments, samples and findings as plain files in the project',
            'Per-chat AI involvement',
            'Local runtime on 127.0.0.1',
            'Bring your own model',
            'Apache 2.0 license',
          ],
    provider: { '@id': ORG_ID },
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  }
}

export function jsonLd(page: PageName, lang: Locale) {
  const meta = pageMeta(page, lang)
  const url = canonicalUrl(page, lang)
  const pageNode: Record<string, unknown> = {
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name: meta.title,
    description: meta.description,
    inLanguage: htmlLang(lang),
    isPartOf: { '@id': SITE_ID },
    about: { '@id': ORG_ID },
    primaryImageOfPage: OG_IMAGE,
  }

  const graph: Record<string, unknown>[] = [
    {
      '@type': ['Organization', 'ResearchProject'],
      '@id': ORG_ID,
      name: 'Eisoptric',
      alternateName: 'Eisoptric Research',
      url: SITE_URL,
      logo: new URL('/favicon.png', SITE_URL).href,
      image: OG_IMAGE,
      email: CONTACT_ADDRESS,
      description: copy('en').meta.description,
      sameAs: [ORG_GITHUB_URL, GITHUB_URL],
      knowsAbout: ['Pretraining dynamics', 'Mechanistic interpretability', 'AI agent oversight'],
      founder: { '@type': 'Person', name: 'Rick Weng' },
    },
    {
      '@type': 'WebSite',
      '@id': SITE_ID,
      name: 'Eisoptric',
      url: SITE_URL,
      inLanguage: ['en', 'zh-Hant'],
      publisher: { '@id': ORG_ID },
    },
  ]

  if (page !== 'home') {
    pageNode.breadcrumb = {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Eisoptric', item: canonicalUrl('home', lang) },
        ...(isPostPage(page)
          ? [{ '@type': 'ListItem', position: 2, name: pageCrumb('posts', lang), item: canonicalUrl('posts', lang) }]
          : []),
        { '@type': 'ListItem', position: isPostPage(page) ? 3 : 2, name: pageCrumb(page, lang), item: url },
      ],
    }
  }

  const faq = faqFor(page, lang)
  if (faq) {
    pageNode['@type'] = ['WebPage', 'FAQPage']
    pageNode.mainEntity = questions(faq)
  }

  if (isPostPage(page)) {
    const post = postOf(page)
    const version = post.versions[lang]!
    graph.push({
      '@type': 'BlogPosting',
      '@id': `${url}#post`,
      headline: version.title,
      description: version.description,
      datePublished: version.date,
      inLanguage: htmlLang(lang),
      url,
      mainEntityOfPage: { '@id': `${url}#webpage` },
      author: { '@type': 'Person', name: 'Rick Weng' },
      publisher: { '@id': ORG_ID },
    })
  }

  graph.push(pageNode)
  if (page === 'home' || page === 'mcp') graph.push(mcpApplication(lang))
  if (page === 'home' || page === 'app') graph.push(desktopApplication(lang))

  return { '@context': 'https://schema.org', '@graph': graph }
}

function esc(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')
}

export function headTags(page: PageName, lang: Locale): string {
  const meta = pageMeta(page, lang)
  const url = canonicalUrl(page, lang)
  const alt = imageAlt(lang)
  const otherLang: Locale = lang === 'zh' ? 'en' : 'zh'
  const hasOther = pageLanguages(page).includes(otherLang)
  const alternates = [
    ...pageLanguages(page).map(
      (item) => `<link rel="alternate" hreflang="${htmlLang(item)}" href="${canonicalUrl(page, item)}" />`,
    ),
    `<link rel="alternate" hreflang="x-default" href="${defaultUrl(page)}" />`,
  ]
  const json = JSON.stringify(jsonLd(page, lang)).replace(/</g, '\\u003c')
  return [
    `<title>${esc(meta.title)}</title>`,
    `<meta name="description" content="${esc(meta.description)}" />`,
    `<meta name="robots" content="index, follow, max-image-preview:large" />`,
    `<link rel="canonical" href="${url}" />`,
    ...alternates,
    `<link rel="alternate" type="text/markdown" href="${markdownUrl(page, lang)}" title="${lang === 'zh' ? 'Markdown 版本' : 'Markdown version'}" />`,
    `<meta property="og:type" content="${isPostPage(page) ? 'article' : 'website'}" />`,
    `<meta property="og:site_name" content="Eisoptric" />`,
    `<meta property="og:locale" content="${ogLocale(lang)}" />`,
    ...(hasOther ? [`<meta property="og:locale:alternate" content="${ogLocale(otherLang)}" />`] : []),
    `<meta property="og:title" content="${esc(meta.title)}" />`,
    `<meta property="og:description" content="${esc(meta.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${OG_IMAGE}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${esc(alt)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(meta.title)}" />`,
    `<meta name="twitter:description" content="${esc(meta.description)}" />`,
    `<meta name="twitter:image" content="${OG_IMAGE}" />`,
    `<meta name="twitter:image:alt" content="${esc(alt)}" />`,
    `<script id="seo-jsonld" type="application/ld+json">${json}</script>`,
  ].join('\n    ')
}

/** Head tags for the 404 page: its own title, and noindex so the page is never listed. No canonical URL, alternates or structured data. */
export function notFoundHeadTags(lang: Locale): string {
  const text = copy(lang).notFound
  return [
    `<title>${esc(text.title)}</title>`,
    `<meta name="description" content="${esc(text.description)}" />`,
    `<meta name="robots" content="noindex" />`,
  ].join('\n    ')
}

export function applyNotFoundHead(lang: Locale) {
  if (typeof document === 'undefined') return
  const text = copy(lang).notFound
  document.documentElement.lang = htmlLang(lang)
  document.title = text.title
  upsertMeta('name', 'description', text.description)
  upsertMeta('name', 'robots', 'noindex')
  document.head
    .querySelectorAll(
      'link[rel="canonical"], link[rel="alternate"][hreflang], link[rel="alternate"][type="text/markdown"], #seo-jsonld',
    )
    .forEach((el) => el.remove())
}

export function sitemapXml(): string {
  const lastmod = new Date().toISOString().slice(0, 10)
  const urls = PAGE_NAMES.flatMap((page) =>
    pageLanguages(page).map((lang) => {
      const alternates = [
        ...pageLanguages(page).map(
          (alt) => `    <xhtml:link rel="alternate" hreflang="${htmlLang(alt)}" href="${canonicalUrl(page, alt)}"/>`,
        ),
        `    <xhtml:link rel="alternate" hreflang="x-default" href="${defaultUrl(page)}"/>`,
      ].join('\n')
      return `  <url>\n    <loc>${canonicalUrl(page, lang)}</loc>\n    <lastmod>${lastmod}</lastmod>\n${alternates}\n    <changefreq>weekly</changefreq>\n    <priority>${pagePriority(page)}</priority>\n  </url>`
    }),
  )
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join('\n')}\n</urlset>\n`
}

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.content = content
}

function upsertCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!el) {
    el = document.createElement('link')
    el.rel = 'canonical'
    document.head.appendChild(el)
  }
  el.href = href
}

export function applyHead(page: PageName, lang: Locale) {
  if (typeof document === 'undefined') return
  const meta = pageMeta(page, lang)
  const url = canonicalUrl(page, lang)
  const alt = imageAlt(lang)
  document.documentElement.lang = htmlLang(lang)
  document.title = meta.title
  upsertMeta('name', 'description', meta.description)
  upsertMeta('name', 'robots', 'index, follow, max-image-preview:large')
  upsertCanonical(url)
  document.querySelectorAll('link[rel="alternate"][hreflang]').forEach((el) => el.remove())
  for (const item of pageLanguages(page)) {
    const link = document.createElement('link')
    link.rel = 'alternate'
    link.hreflang = htmlLang(item)
    link.href = canonicalUrl(page, item)
    document.head.appendChild(link)
  }
  const fallback = document.createElement('link')
  fallback.rel = 'alternate'
  fallback.hreflang = 'x-default'
  fallback.href = defaultUrl(page)
  document.head.appendChild(fallback)
  upsertMeta('property', 'og:type', isPostPage(page) ? 'article' : 'website')
  upsertMeta('property', 'og:site_name', 'Eisoptric')
  upsertMeta('property', 'og:locale', ogLocale(lang))
  const otherLang: Locale = lang === 'zh' ? 'en' : 'zh'
  document.head.querySelector('meta[property="og:locale:alternate"]')?.remove()
  if (pageLanguages(page).includes(otherLang)) upsertMeta('property', 'og:locale:alternate', ogLocale(otherLang))
  upsertMeta('property', 'og:title', meta.title)
  upsertMeta('property', 'og:description', meta.description)
  upsertMeta('property', 'og:url', url)
  upsertMeta('property', 'og:image', OG_IMAGE)
  upsertMeta('property', 'og:image:width', '1200')
  upsertMeta('property', 'og:image:height', '630')
  upsertMeta('property', 'og:image:alt', alt)
  upsertMeta('name', 'twitter:card', 'summary_large_image')
  upsertMeta('name', 'twitter:title', meta.title)
  upsertMeta('name', 'twitter:description', meta.description)
  upsertMeta('name', 'twitter:image', OG_IMAGE)
  upsertMeta('name', 'twitter:image:alt', alt)
  jsonLdElement().textContent = JSON.stringify(jsonLd(page, lang)).replace(/</g, '\\u003c')
}

function jsonLdElement(): HTMLScriptElement {
  const existing = document.getElementById('seo-jsonld')
  if (existing instanceof HTMLScriptElement) return existing
  const created = document.createElement('script')
  created.id = 'seo-jsonld'
  created.type = 'application/ld+json'
  document.head.appendChild(created)
  return created
}
