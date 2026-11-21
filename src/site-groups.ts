import { computed } from 'vue'
import { localePath, useI18n } from './i18n'

// The site's pages in four groups: the research, the tools it produced, the project itself, and the legal text.
// The footer shows all four; the phone menu shows the first three as collapsible groups.

export type GroupKey = 'research' | 'tools' | 'project' | 'legal'

export interface SiteGroup {
  key: GroupKey
  heading: string
  links: { label: string; to: string }[]
}

export function useSiteGroups() {
  const { locale, t } = useI18n()
  const to = (path: string) => localePath(path, locale.value)
  return computed<SiteGroup[]>(() => [
    {
      key: 'research',
      heading: t.value.footer.research,
      links: [
        { label: t.value.nav.research, to: to('/research') },
        { label: t.value.nav.posts, to: to('/posts') },
        { label: t.value.nav.shoggoth, to: to('/shoggoth') },
      ],
    },
    {
      key: 'tools',
      heading: t.value.footer.tools,
      links: [
        { label: t.value.footer.app, to: to('/app') },
        { label: t.value.footer.mcp, to: to('/mcp') },
        { label: t.value.footer.trust, to: to('/trust') },
      ],
    },
    {
      key: 'project',
      heading: t.value.footer.project,
      links: [
        { label: t.value.nav.about, to: to('/about') },
        { label: t.value.footer.support, to: to('/support') },
        { label: t.value.footer.brand, to: to('/brand') },
      ],
    },
    {
      key: 'legal',
      heading: t.value.footer.legal,
      links: [
        { label: t.value.footer.privacy, to: to('/privacy') },
        { label: t.value.footer.terms, to: to('/terms') },
      ],
    },
  ])
}

/** Whether `path` is this link's page or a page under it (a post is under the post list). */
export function isUnder(path: string, linkTo: string): boolean {
  return path === linkTo || path.startsWith(`${linkTo}/`)
}
