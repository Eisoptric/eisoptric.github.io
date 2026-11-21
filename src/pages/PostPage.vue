<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Breadcrumb from '../components/Breadcrumb.vue'
import { localePath, useI18n } from '../i18n'
import { isPageName, isPostPage, postOf } from '../page-table'

const route = useRoute()
const { locale, t } = useI18n()

// The router gives every post route its page (`post:<slug>`) and only creates routes for the languages it is written in.
const version = computed(() => {
  const page = route.meta.page
  if (!isPageName(page) || !isPostPage(page)) throw new Error(`${route.path} is not a post`)
  return postOf(page).versions[locale.value]!
})
</script>

<template>
  <article>
    <section class="hero page-hero post-hero">
      <div class="wrap">
        <Breadcrumb :current="version.title" :parent="{ label: t.nav.posts, to: localePath('/posts', locale) }" />
        <p class="eyebrow accent">
          {{ t.postsPage.label }} · <time :datetime="version.date">{{ version.date }}</time>
        </p>
        <h1>{{ version.title }}</h1>
        <p class="lede">{{ version.description }}</p>
      </div>
    </section>

    <section class="section">
      <div class="wrap">
        <!-- The body is the post's Markdown, rendered at build time from a file in src/posts/ in this repository. -->
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div class="post-body" v-html="version.html"></div>
        <p class="post-notice">{{ t.postsPage.notice }}</p>
        <p class="status-line">
          <RouterLink class="text-link" :to="localePath('/posts', locale)">← {{ t.postsPage.back }}</RouterLink>
        </p>
      </div>
    </section>
  </article>
</template>
