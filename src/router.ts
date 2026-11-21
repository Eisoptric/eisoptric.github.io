import type { Component } from 'vue'
import { createMemoryHistory, createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import HomePage from './pages/HomePage.vue'
import ResearchPage from './pages/ResearchPage.vue'
import AboutPage from './pages/AboutPage.vue'
import ShoggothPage from './pages/ShoggothPage.vue'
import McpPage from './pages/McpPage.vue'
import AppPage from './pages/AppPage.vue'
import TrustPage from './pages/TrustPage.vue'
import SupportPage from './pages/SupportPage.vue'
import BrandPage from './pages/BrandPage.vue'
import PostsPage from './pages/PostsPage.vue'
import PostPage from './pages/PostPage.vue'
import LegalPage from './pages/LegalPage.vue'
import NotFoundPage from './pages/NotFoundPage.vue'
import { locale, type Locale } from './i18n'
import { PAGE_NAMES, isPostPage, pageLanguages, pagePath, type FixedPage, type PageName } from './page-table'

declare module 'vue-router' {
  interface RouteMeta {
    locale?: Locale
    page?: PageName
    notFound?: boolean
  }
}

// Each page's component. The paths, titles and everything else about a page are in src/page-table.ts.
// Every post uses PostPage.
const components: Record<FixedPage, Component> = {
  home: HomePage,
  research: ResearchPage,
  posts: PostsPage,
  shoggoth: ShoggothPage,
  about: AboutPage,
  mcp: McpPage,
  app: AppPage,
  trust: TrustPage,
  support: SupportPage,
  brand: BrandPage,
  terms: LegalPage,
  privacy: LegalPage,
}

function localized(lang: Locale): RouteRecordRaw[] {
  return PAGE_NAMES.filter((page) => pageLanguages(page).includes(lang)).map((page: PageName): RouteRecordRaw => ({
    path: pagePath(page, lang),
    name: lang === 'en' ? page : `${lang}-${page}`,
    component: isPostPage(page) ? PostPage : components[page],
    meta: { locale: lang, page },
  }))
}

export const routes: RouteRecordRaw[] = [
  ...localized('en'),
  ...localized('zh'),
  // Any other path is a 404. The build prerenders these to 404.html and zh/404.html, which Cloudflare serves with status 404.
  {
    path: '/zh/:pathMatch(.*)*',
    name: 'zh-not-found',
    component: NotFoundPage,
    meta: { locale: 'zh', notFound: true },
  },
  { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFoundPage, meta: { locale: 'en', notFound: true } },
]

export function createAppRouter() {
  const history = import.meta.env.SSR ? createMemoryHistory() : createWebHistory(import.meta.env.BASE_URL)
  const router = createRouter({
    history,
    routes,
    scrollBehavior(to) {
      if (to.hash) return { el: to.hash, top: 88 }
      return { top: 0 }
    },
  })

  router.beforeEach((to) => {
    const next = to.meta.locale === 'zh' ? 'zh' : 'en'
    if (locale.value !== next) locale.value = next
  })

  return router
}

export const router = createAppRouter()
