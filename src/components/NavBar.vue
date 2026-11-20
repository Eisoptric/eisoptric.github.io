<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import Brand from './Brand.vue'
import { localePath, useI18n } from '../i18n'
import { ORG_GITHUB_URL } from '../config'

const { locale, t } = useI18n()
const route = useRoute()
const menuOpen = ref(false)
// Which popup is open: the language menu in the bar or in the phone tools, or the Releases menu.
const langMenu = ref<'bar' | 'tools' | 'releases' | null>(null)

watch(
  () => route.path,
  () => {
    menuOpen.value = false
    langMenu.value = null
  },
)

function closeLang() {
  langMenu.value = null
}

function toggleLang(which: 'bar' | 'tools' | 'releases') {
  langMenu.value = langMenu.value === which ? null : which
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') langMenu.value = null
}

onMounted(() => {
  document.addEventListener('click', closeLang)
  document.addEventListener('keydown', onKeydown)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', closeLang)
  document.removeEventListener('keydown', onKeydown)
})

// Research and the Releases menu sit left of the centred wordmark, About sits right.
const researchLink = computed(() => ({ label: t.value.nav.research, to: localePath('/research', locale.value) }))
// What the project releases: its models and its two tools, each with one line on what it is.
const releases = computed(() => [
  { label: t.value.nav.lilith, note: t.value.nav.releasesNotes.lilith, to: localePath('/lilith', locale.value) },
  { label: t.value.nav.app, note: t.value.nav.releasesNotes.app, to: localePath('/app', locale.value) },
  { label: t.value.nav.mcp, note: t.value.nav.releasesNotes.mcp, to: localePath('/mcp', locale.value) },
])
const releasesCurrent = computed(() => releases.value.some((item) => item.to === route.path))
const aboutLink = computed(() => ({ label: t.value.nav.about, to: localePath('/about', locale.value) }))
const enTo = computed(() => localePath(route.path, 'en'))
const zhTo = computed(() => localePath(route.path, 'zh'))
</script>

<template>
  <header class="site-header">
    <div class="wrap bar">
      <nav class="nav-links" :aria-label="locale === 'zh' ? '主要' : 'Main'">
        <RouterLink class="pill" :to="researchLink.to" :aria-current="route.path === researchLink.to ? 'page' : undefined">{{ researchLink.label }}</RouterLink>
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
        <RouterLink class="pill" :to="aboutLink.to" :aria-current="route.path === aboutLink.to ? 'page' : undefined">{{ aboutLink.label }}</RouterLink>
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
          <div v-if="langMenu === 'bar'" class="lang-menu" role="menu" :aria-label="locale === 'en' ? 'Language' : '語言'">
            <RouterLink role="menuitem" :to="enTo" hreflang="en" lang="en" :class="{ active: locale === 'en' }" :aria-current="locale === 'en' ? 'true' : undefined" @click="langMenu = null">
              English(US)
            </RouterLink>
            <RouterLink role="menuitem" :to="zhTo" hreflang="zh-Hant" lang="zh-Hant" :class="{ active: locale === 'zh' }" :aria-current="locale === 'zh' ? 'true' : undefined" @click="langMenu = null">
              繁體中文
            </RouterLink>
          </div>
        </div>
      </div>

      <div class="mobile-tools">
        <a class="pill mobile-start" :href="ORG_GITHUB_URL" target="_blank" rel="noopener noreferrer">{{ t.nav.cta }}</a>
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
          <div v-if="langMenu === 'tools'" class="lang-menu" role="menu" :aria-label="locale === 'en' ? 'Language' : '語言'">
            <RouterLink role="menuitem" :to="enTo" hreflang="en" lang="en" :class="{ active: locale === 'en' }" :aria-current="locale === 'en' ? 'true' : undefined" @click="langMenu = null">
              English(US)
            </RouterLink>
            <RouterLink role="menuitem" :to="zhTo" hreflang="zh-Hant" lang="zh-Hant" :class="{ active: locale === 'zh' }" :aria-current="locale === 'zh' ? 'true' : undefined" @click="langMenu = null">
              繁體中文
            </RouterLink>
          </div>
        </div>
        <button
          class="menu-toggle"
          type="button"
          :aria-expanded="menuOpen"
          :aria-label="t.nav.menu"
          @click="menuOpen = !menuOpen"
        >
          <span />
        </button>
      </div>
    </div>

    <div v-if="menuOpen" class="mobile-menu wrap">
      <RouterLink :to="researchLink.to" :aria-current="route.path === researchLink.to ? 'page' : undefined">{{ researchLink.label }}</RouterLink>
      <p class="mobile-group">{{ t.nav.releases }}</p>
      <RouterLink v-for="item in releases" :key="item.to" class="mobile-sub" :to="item.to" :aria-current="route.path === item.to ? 'page' : undefined">{{ item.label }}</RouterLink>
      <RouterLink :to="aboutLink.to" :aria-current="route.path === aboutLink.to ? 'page' : undefined">{{ aboutLink.label }}</RouterLink>
      <a class="mobile-only" :href="ORG_GITHUB_URL" target="_blank" rel="noopener noreferrer">{{ t.nav.cta }}</a>
    </div>
  </header>
</template>
