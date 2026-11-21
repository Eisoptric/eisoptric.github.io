<script setup lang="ts">
import { computed } from 'vue'
import Breadcrumb from '../components/Breadcrumb.vue'
import { localePath, useI18n } from '../i18n'
import { pageInLanguage, postPage } from '../page-table'
import { POSTS } from '../posts'

const { locale, t } = useI18n()

// Every post, newest first. A post not written in this page's language is still listed, in the language it has,
// and marked with that language.
const items = computed(() =>
  POSTS.map((post) => {
    const own = post.versions[locale.value]
    const lang = own ? locale.value : locale.value === 'en' ? 'zh' : 'en'
    const version = own ?? post.versions[lang]!
    return {
      slug: post.slug,
      to: pageInLanguage(postPage(post.slug), lang),
      title: version.title,
      description: version.description,
      date: version.date,
      otherLanguage: own ? null : t.value.postsPage.languages[lang],
    }
  }),
)
</script>

<template>
  <section class="hero page-hero">
    <div class="wrap">
      <Breadcrumb :current="t.nav.posts" />
      <p class="eyebrow accent">{{ t.postsPage.eyebrow }}</p>
      <h1>{{ t.postsPage.heading }}</h1>
      <p class="lede">{{ t.postsPage.lede }}</p>
      <p class="status-line">
        <RouterLink class="text-link" :to="localePath('/research', locale)"
          >{{ t.postsPage.researchLink }} →</RouterLink
        >
      </p>
    </div>
  </section>

  <section class="section band-oat">
    <div class="wrap">
      <ol v-if="items.length" class="post-list">
        <li v-for="item in items" :key="item.slug">
          <p class="post-meta">
            <time :datetime="item.date">{{ item.date }}</time>
            <span v-if="item.otherLanguage" class="post-lang">{{ item.otherLanguage }}</span>
          </p>
          <h2>
            <RouterLink :to="item.to">{{ item.title }}</RouterLink>
          </h2>
          <p>{{ item.description }}</p>
        </li>
      </ol>
      <p v-else class="post-empty">{{ t.postsPage.empty }}</p>
    </div>
  </section>
</template>
