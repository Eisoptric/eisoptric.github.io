import { copy, localePath, type Locale } from './i18n'
import { legalCopy } from './legal'
import { POSTS, findPost, postLanguages, type Post } from './posts'

// Every page on the site, in the order the sitemap, llms.txt and llms-full.txt list them: the fixed pages in
// PAGE_TABLE, then one page per post in src/posts/. The router, the head tags, the breadcrumbs, the sitemap and the
// Markdown copies all read this file, so a new fixed page is one entry in PAGE_TABLE plus its component in
// src/router.ts (the type checker asks for that), and a new post is only its Markdown file.

interface PageEntry {
  /** The English path. The 中文 path is the same under /zh. */
  path: string
  /** The page's <title> and meta description. */
  meta: (lang: Locale) => { title: string; description: string }
  /** The page's name in its breadcrumb. */
  crumb: (lang: Locale) => string
  /** The sitemap priority. */
  priority: '1.0' | '0.9' | '0.8' | '0.5' | '0.3'
}

export const PAGE_TABLE = {
  home: { path: '/', meta: (lang) => copy(lang).meta, crumb: () => 'Eisoptric', priority: '1.0' },
  research: {
    path: '/research',
    meta: (lang) => copy(lang).researchPage,
    crumb: (lang) => copy(lang).nav.research,
    priority: '0.9',
  },
  posts: {
    path: '/posts',
    meta: (lang) => copy(lang).postsPage,
    crumb: (lang) => copy(lang).nav.posts,
    priority: '0.8',
  },
  shoggoth: {
    path: '/shoggoth',
    meta: (lang) => copy(lang).shoggothPage,
    crumb: (lang) => copy(lang).nav.shoggoth,
    priority: '0.9',
  },
  about: {
    path: '/about',
    meta: (lang) => copy(lang).aboutPage,
    crumb: (lang) => copy(lang).nav.about,
    priority: '0.8',
  },
  mcp: { path: '/mcp', meta: (lang) => copy(lang).mcpPage, crumb: (lang) => copy(lang).nav.mcp, priority: '0.9' },
  app: { path: '/app', meta: (lang) => copy(lang).appPage, crumb: (lang) => copy(lang).nav.app, priority: '0.9' },
  trust: {
    path: '/trust',
    meta: (lang) => copy(lang).trustPage,
    crumb: (lang) => copy(lang).nav.trust,
    priority: '0.8',
  },
  support: {
    path: '/support',
    meta: (lang) => copy(lang).supportPage,
    crumb: (lang) => copy(lang).nav.support,
    priority: '0.8',
  },
  brand: {
    path: '/brand',
    meta: (lang) => copy(lang).brandPage,
    crumb: (lang) => copy(lang).nav.brand,
    priority: '0.5',
  },
  terms: {
    path: '/terms',
    meta: (lang) => legalCopy[lang].terms,
    crumb: (lang) => legalCopy[lang].terms.crumb,
    priority: '0.3',
  },
  privacy: {
    path: '/privacy',
    meta: (lang) => legalCopy[lang].privacy,
    crumb: (lang) => legalCopy[lang].privacy.crumb,
    priority: '0.3',
  },
} satisfies Record<string, PageEntry>

export type FixedPage = keyof typeof PAGE_TABLE
export const FIXED_PAGES = Object.keys(PAGE_TABLE) as FixedPage[]

/** A post's page: `post:<slug>`. */
export type PostPage = `post:${string}`
export type PageName = FixedPage | PostPage

export function postPage(slug: string): PostPage {
  return `post:${slug}`
}

export const PAGE_NAMES: readonly PageName[] = [...FIXED_PAGES, ...POSTS.map((post) => postPage(post.slug))]

export function isPostPage(page: PageName): page is PostPage {
  return page.startsWith('post:')
}

export function postOf(page: PostPage): Post {
  const post = findPost(page.slice('post:'.length))
  if (!post) throw new Error(`No post for ${page}`)
  return post
}

export function isPageName(value: unknown): value is PageName {
  if (typeof value !== 'string') return false
  if (value.startsWith('post:')) return findPost(value.slice('post:'.length)) !== undefined
  return Object.hasOwn(PAGE_TABLE, value)
}

/** The languages a page exists in. Fixed pages exist in both; a post, in the ones it is written in. */
export function pageLanguages(page: PageName): Locale[] {
  return isPostPage(page) ? postLanguages(postOf(page)) : ['en', 'zh']
}

export function pagePath(page: PageName, lang: Locale): string {
  if (isPostPage(page)) return localePath(`/posts/${postOf(page).slug}`, lang)
  return localePath(PAGE_TABLE[page].path, lang)
}

/** Where the language switch goes: the same page in `lang`, or the post list when a post is not written in it. */
export function pageInLanguage(page: PageName, lang: Locale): string {
  return pageLanguages(page).includes(lang) ? pagePath(page, lang) : pagePath('posts', lang)
}

export function pageMeta(page: PageName, lang: Locale) {
  if (isPostPage(page)) {
    const post = postOf(page)
    const version = post.versions[lang] ?? post.versions[pageLanguages(page)[0]]!
    return { title: `${version.title} — Eisoptric`, description: version.description }
  }
  const { title, description } = PAGE_TABLE[page].meta(lang)
  return { title, description }
}

export function pageCrumb(page: PageName, lang: Locale): string {
  if (isPostPage(page)) {
    const post = postOf(page)
    return (post.versions[lang] ?? post.versions[pageLanguages(page)[0]]!).title
  }
  return PAGE_TABLE[page].crumb(lang)
}

export function pagePriority(page: PageName): string {
  return isPostPage(page) ? '0.6' : PAGE_TABLE[page].priority
}
