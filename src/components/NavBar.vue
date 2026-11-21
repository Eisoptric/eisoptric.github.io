<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import Brand from './Brand.vue'
import { localePath, useI18n, type Locale } from '../i18n'
import { isPageName, pageInLanguage } from '../page-table'
import { ORG_GITHUB_URL } from '../config'
import { isUnder, useSiteGroups, type GroupKey } from '../site-groups'

const { locale, t } = useI18n()
const route = useRoute()
// The phone menu, and its button: the menu closes on Escape, on a click outside it, and when a link in it is followed.
const menuOpen = ref(false)
const menuButton = ref<HTMLButtonElement | null>(null)
const menuPanel = ref<HTMLElement | null>(null)
// Which popup is open: the language menu in the bar or in the phone tools, or the Releases menu.
// Only one thing is open at a time: opening a popup closes the phone menu, and the other way round.
const langMenu = ref<'bar' | 'tools' | 'releases' | null>(null)

watch(
  () => route.path,
  () => {
    menuOpen.value = false
    langMenu.value = null
  },
)

function toggleLang(which: 'bar' | 'tools' | 'releases') {
  langMenu.value = langMenu.value === which ? null : which
  if (langMenu.value) menuOpen.value = false
}

// The phone menu lists the research, tools and project groups (the legal pages stay in the footer), each one
// collapsible. It opens with the group of the current page expanded.
const siteGroups = useSiteGroups()
const menuGroups = computed(() => siteGroups.value.filter((group) => group.key !== 'legal'))
const openGroups = ref(new Set<GroupKey>())

function currentGroup(): GroupKey | undefined {
  return menuGroups.value.find((group) => group.links.some((link) => isUnder(route.path, link.to)))?.key
}

function toggleGroup(key: GroupKey) {
  const next = new Set(openGroups.value)
  if (!next.delete(key)) next.add(key)
  openGroups.value = next
}

function toggleMenu() {
  menuOpen.value = !menuOpen.value
  langMenu.value = null
  if (menuOpen.value) {
    const current = currentGroup()
    openGroups.value = new Set(current ? [current] : [])
  }
}

function closeMenu({ focusButton = false } = {}) {
  if (!menuOpen.value) return
  menuOpen.value = false
  if (focusButton) menuButton.value?.focus()
}

// A link in the menu closes it, including a link to the page already open (which does not change the route).
function onMenuClick(event: MouseEvent) {
  if ((event.target as HTMLElement).closest('a')) closeMenu()
}

function onDocumentClick(event: MouseEvent) {
  langMenu.value = null
  const target = event.target as Node
  if (!menuPanel.value?.contains(target) && !menuButton.value?.contains(target)) closeMenu()
}

function onKeydown(event: KeyboardEvent) {
  if (event.key !== 'Escape') return
  if (langMenu.value) langMenu.value = null
  else closeMenu({ focusButton: true })
}

onMounted(() => {
  document.addEventListener('click', onDocumentClick)
  document.addEventListener('keydown', onKeydown)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', onDocumentClick)
  document.removeEventListener('keydown', onKeydown)
})

// Research and the Releases menu sit left of the centred wordmark, About sits right.
const researchLink = computed(() => ({ label: t.value.nav.research, to: localePath('/research', locale.value) }))
// What the project releases: its models and its two tools, each with one line on what it is.
const releases = computed(() => [
  { label: t.value.nav.shoggoth, note: t.value.nav.releasesNotes.shoggoth, to: localePath('/shoggoth', locale.value) },
  { label: t.value.nav.app, note: t.value.nav.releasesNotes.app, to: localePath('/app', locale.value) },
  { label: t.value.nav.mcp, note: t.value.nav.releasesNotes.mcp, to: localePath('/mcp', locale.value) },
])
const releasesCurrent = computed(() => releases.value.some((item) => item.to === route.path))
const aboutLink = computed(() => ({ label: t.value.nav.about, to: localePath('/about', locale.value) }))
// The same page in the other language; a post written in one language only switches to the post list.
const inLanguage = (lang: Locale) =>
  isPageName(route.meta.page) ? pageInLanguage(route.meta.page, lang) : localePath(route.path, lang)
const enTo = computed(() => inLanguage('en'))
const zhTo = computed(() => inLanguage('zh'))
</script>

<template>
  <header class="site-header">
    <div class="wrap bar">
      <nav class="nav-links" :aria-label="locale === 'zh' ? '主要' : 'Main'">
        <RouterLink
          class="pill"
          :to="researchLink.to"
          :aria-current="route.path === researchLink.to ? 'page' : undefined"
          >{{ researchLink.label }}</RouterLink
        >
        <div class="releases" @click.stop>
          <button
            class="pill pill-menu"
            :class="{ current: releasesCurrent }"
            type="button"
            :aria-expanded="langMenu === 'releases'"
            aria-controls="releases-panel"
            @click="toggleLang('releases')"
          >
            {{ t.nav.releases }}
            <svg viewBox="0 0 12 12" aria-hidden="true"><path d="M3 4.5l3 3 3-3" /></svg>
          </button>
          <div v-if="langMenu === 'releases'" id="releases-panel" class="releases-panel">
            <RouterLink
              v-for="item in releases"
              :key="item.to"
              :to="item.to"
              :aria-current="route.path === item.to ? 'page' : undefined"
              @click="langMenu = null"
            >
              <strong>{{ item.label }}</strong>
              <span>{{ item.note }}</span>
            </RouterLink>
          </div>
        </div>
      </nav>

      <Brand />

      <div class="nav-end">
        <RouterLink class="pill" :to="aboutLink.to" :aria-current="route.path === aboutLink.to ? 'page' : undefined">{{
          aboutLink.label
        }}</RouterLink>
        <a class="pill" :href="ORG_GITHUB_URL" target="_blank" rel="noopener noreferrer">{{ t.nav.cta }}</a>
        <div class="lang" @click.stop>
          <button
            class="lang-btn"
            type="button"
            :aria-expanded="langMenu === 'bar'"
            aria-haspopup="menu"
            :aria-label="locale === 'en' ? 'Language' : '語言'"
            @click="toggleLang('bar')"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="12" r="9" />
              <path d="M3 12h18" />
              <path d="M12 3a14 14 0 0 1 4 9 14 14 0 0 1-4 9 14 14 0 0 1-4-9 14 14 0 0 1 4-9z" />
            </svg>
          </button>
          <div
            v-if="langMenu === 'bar'"
            class="lang-menu"
            role="menu"
            :aria-label="locale === 'en' ? 'Language' : '語言'"
          >
            <RouterLink
              role="menuitem"
              :to="enTo"
              hreflang="en"
              lang="en"
              :class="{ active: locale === 'en' }"
              :aria-current="locale === 'en' ? 'true' : undefined"
              @click="langMenu = null"
            >
              English(US)
            </RouterLink>
            <RouterLink
              role="menuitem"
              :to="zhTo"
              hreflang="zh-Hant"
              lang="zh-Hant"
              :class="{ active: locale === 'zh' }"
              :aria-current="locale === 'zh' ? 'true' : undefined"
              @click="langMenu = null"
            >
              繁體中文
            </RouterLink>
          </div>
        </div>
      </div>

      <div class="mobile-tools">
        <a class="pill mobile-start" :href="ORG_GITHUB_URL" target="_blank" rel="noopener noreferrer">{{
          t.nav.cta
        }}</a>
        <div class="lang" @click.stop>
          <button
            class="lang-btn"
            type="button"
            :aria-expanded="langMenu === 'tools'"
            aria-haspopup="menu"
            :aria-label="locale === 'en' ? 'Language' : '語言'"
            @click="toggleLang('tools')"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="12" r="9" />
              <path d="M3 12h18" />
              <path d="M12 3a14 14 0 0 1 4 9 14 14 0 0 1-4 9 14 14 0 0 1-4-9 14 14 0 0 1 4-9z" />
            </svg>
          </button>
          <div
            v-if="langMenu === 'tools'"
            class="lang-menu"
            role="menu"
            :aria-label="locale === 'en' ? 'Language' : '語言'"
          >
            <RouterLink
              role="menuitem"
              :to="enTo"
              hreflang="en"
              lang="en"
              :class="{ active: locale === 'en' }"
              :aria-current="locale === 'en' ? 'true' : undefined"
              @click="langMenu = null"
            >
              English(US)
            </RouterLink>
            <RouterLink
              role="menuitem"
              :to="zhTo"
              hreflang="zh-Hant"
              lang="zh-Hant"
              :class="{ active: locale === 'zh' }"
              :aria-current="locale === 'zh' ? 'true' : undefined"
              @click="langMenu = null"
            >
              繁體中文
            </RouterLink>
          </div>
        </div>
        <button
          ref="menuButton"
          class="menu-toggle"
          type="button"
          :aria-expanded="menuOpen"
          aria-controls="mobile-menu"
          :aria-label="menuOpen ? t.nav.menuClose : t.nav.menuOpen"
          @click="toggleMenu"
        >
          <!-- Three rules, or a cross while the menu is open. It changes in place: the brand allows no motion here. -->
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path v-if="menuOpen" d="M6.5 6.5l11 11M17.5 6.5l-11 11" />
            <path v-else d="M4.5 7h15M4.5 12h15M4.5 17h15" />
          </svg>
        </button>
      </div>
    </div>

    <nav
      v-if="menuOpen"
      id="mobile-menu"
      ref="menuPanel"
      class="mobile-menu wrap"
      :aria-label="t.nav.menuLabel"
      @click="onMenuClick"
    >
      <div v-for="group in menuGroups" :key="group.key" class="menu-group">
        <button
          class="menu-group-toggle"
          type="button"
          :aria-expanded="openGroups.has(group.key)"
          :aria-controls="`menu-group-${group.key}`"
          @click="toggleGroup(group.key)"
        >
          <span>{{ group.heading }}</span>
          <svg viewBox="0 0 12 12" aria-hidden="true"><path d="M3 4.5l3 3 3-3" /></svg>
        </button>
        <ul v-show="openGroups.has(group.key)" :id="`menu-group-${group.key}`" class="menu-group-links">
          <li v-for="link in group.links" :key="link.to">
            <RouterLink :to="link.to" :aria-current="route.path === link.to ? 'page' : undefined">{{
              link.label
            }}</RouterLink>
          </li>
        </ul>
      </div>
      <a class="mobile-only menu-github" :href="ORG_GITHUB_URL" target="_blank" rel="noopener noreferrer">{{
        t.nav.cta
      }}</a>
    </nav>
  </header>
</template>
