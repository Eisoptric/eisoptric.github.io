import { Marked } from 'marked'
import type { Locale } from '../i18n'

// Posts: shorter writing that is not a research note (progress, working notes, announcements).
// Each post is a folder, src/posts/<slug>/, with en.md, zh.md or both. A file opens with front matter:
//
//   ---
//   title: What we learned from the first 1,000 steps
//   description: One sentence for the list, search results and social cards.
//   date: 2026-11-21
//   ---
//
// The body is Markdown. Headings start at ## (a # is set as ##, since the title is the page's only h1).
// Write plain Markdown, not HTML: the page is served under a strict Content Security Policy.

export interface PostVersion {
  title: string
  description: string
  date: string
  html: string
}

export interface Post {
  slug: string
  /** The date of the earliest version, used to order the list. */
  date: string
  versions: Partial<Record<Locale, PostVersion>>
}

const files = import.meta.glob('./*/*.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>

const markdown = new Marked({
  gfm: true,
  walkTokens(token) {
    if (token.type === 'heading' && token.depth === 1) token.depth = 2
  },
})

function parse(path: string, source: string): PostVersion {
  const match = source.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
  if (!match) throw new Error(`${path} has no front matter`)
  const fields: Record<string, string> = {}
  for (const line of match[1].split('\n')) {
    const colon = line.indexOf(':')
    if (colon < 1) continue
    fields[line.slice(0, colon).trim()] = line
      .slice(colon + 1)
      .trim()
      .replace(/^(['"])(.*)\1$/, '$2')
  }
  for (const key of ['title', 'description', 'date']) {
    if (!fields[key]) throw new Error(`${path} is missing "${key}" in its front matter`)
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(fields.date)) throw new Error(`${path}: date must be YYYY-MM-DD`)
  return {
    title: fields.title,
    description: fields.description,
    date: fields.date,
    html: markdown.parse(match[2].trim(), { async: false }),
  }
}

function collect(): Post[] {
  const bySlug = new Map<string, Post>()
  for (const [path, source] of Object.entries(files)) {
    const found = path.match(/^\.\/([a-z0-9-]+)\/(en|zh)\.md$/)
    if (!found)
      throw new Error(`${path}: a post is src/posts/<slug>/en.md or zh.md, slug in lowercase letters, digits and -`)
    const [, slug, lang] = found as [string, string, Locale]
    const version = parse(path, source.replace(/\r\n/g, '\n'))
    const post = bySlug.get(slug) ?? { slug, date: version.date, versions: {} }
    post.versions[lang] = version
    if (version.date < post.date) post.date = version.date
    bySlug.set(slug, post)
  }
  return [...bySlug.values()].sort((a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug))
}

/** Every post, newest first. */
export const POSTS: readonly Post[] = collect()

export function findPost(slug: string): Post | undefined {
  return POSTS.find((post) => post.slug === slug)
}

/** The languages a post is written in, English first. */
export function postLanguages(post: Post): Locale[] {
  return (['en', 'zh'] as const).filter((lang) => post.versions[lang])
}
