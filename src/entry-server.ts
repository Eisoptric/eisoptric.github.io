import { createSSRApp } from 'vue'
import { renderToString } from 'vue/server-renderer'
import App from './App.vue'
import { locale, localeFromPath } from './i18n'
import { isPageName, type PageName } from './page-table'
import { createAppRouter } from './router'
import { headTags, notFoundHeadTags } from './seo'

export { SITE_URL } from './config'
export { htmlLang, markdownPath, prerenderPaths, sitemapXml } from './seo'
export { documentHeader, llmsFull, llmsIndex } from './llms'

export async function render(url: string) {
  const lang = localeFromPath(url.split('?')[0] ?? '/')
  locale.value = lang
  const appRouter = createAppRouter()
  const app = createSSRApp(App)
  app.use(appRouter)
  await appRouter.push(url)
  await appRouter.isReady()
  const html = await renderToString(app)
  const meta = appRouter.currentRoute.value.meta
  if (meta.notFound) return { html, head: notFoundHeadTags(lang), lang, page: null }
  const current: PageName = isPageName(meta.page) ? meta.page : 'home'
  return { html, head: headTags(current, lang), lang, page: current }
}
