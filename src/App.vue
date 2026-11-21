<script setup lang="ts">
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import NavBar from './components/NavBar.vue'
import Footer from './components/Footer.vue'
import { locale } from './i18n'
import { isPageName, type PageName } from './page-table'
import { applyHead, applyNotFoundHead } from './seo'

const route = useRoute()

const page = computed<PageName>(() => (isPageName(route.meta.page) ? route.meta.page : 'home'))

watch(
  [locale, page, () => route.meta.notFound],
  () => {
    if (route.meta.notFound) applyNotFoundHead(locale.value)
    else applyHead(page.value, locale.value)
  },
  { immediate: true },
)
</script>

<template>
  <NavBar />
  <main>
    <RouterView />
  </main>
  <Footer />
</template>
