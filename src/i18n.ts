import { computed, ref } from 'vue'
import * as siteCopy from './copy/site'
import * as homeCopy from './copy/home'
import * as researchCopy from './copy/research'
import * as shoggothCopy from './copy/shoggoth'
import * as aboutCopy from './copy/about'
import * as mcpCopy from './copy/mcp'
import * as appCopy from './copy/app'
import * as trustCopy from './copy/trust'
import * as supportCopy from './copy/support'
import * as brandCopy from './copy/brand'
import * as postsCopy from './copy/posts'

export type Locale = 'en' | 'zh'

export function localeFromPath(path: string): Locale {
  return path === '/zh' || path.startsWith('/zh/') ? 'zh' : 'en'
}

export const locale = ref<Locale>(typeof window === 'undefined' ? 'en' : localeFromPath(window.location.pathname))

export function localePath(path: string, lang: Locale): string {
  const withSlash = path.startsWith('/') ? path : `/${path}`
  const bare = withSlash === '/zh' ? '/' : withSlash.startsWith('/zh/') ? withSlash.slice(3) : withSlash
  if (lang === 'zh') return bare === '/' ? '/zh' : `/zh${bare}`
  return bare
}

// The page copy lives in src/copy/, one file per page, with each section's English and 中文 side by side.
// Here the sections are gathered into one object per language: t.nav, t.shoggothPage and so on.
const sections = {
  ...siteCopy,
  ...homeCopy,
  ...researchCopy,
  ...shoggothCopy,
  ...aboutCopy,
  ...mcpCopy,
  ...appCopy,
  ...trustCopy,
  ...supportCopy,
  ...brandCopy,
  ...postsCopy,
}
type Sections = typeof sections
type Messages<L extends Locale> = { [K in keyof Sections]: Sections[K][L] }

function messagesFor<L extends Locale>(lang: L): Messages<L> {
  return Object.fromEntries(Object.entries(sections).map(([key, section]) => [key, section[lang]])) as Messages<L>
}

const messages = { en: messagesFor('en'), zh: messagesFor('zh') }

export function copy(lang: Locale = locale.value) {
  return messages[lang]
}

export function useI18n() {
  const t = computed(() => messages[locale.value])
  return { locale, t }
}
