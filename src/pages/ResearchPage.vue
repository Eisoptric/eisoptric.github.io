<script setup lang="ts">
import Breadcrumb from '../components/Breadcrumb.vue'
import SectionMark from '../components/SectionMark.vue'
import Ornament from '../components/Ornament.vue'
import { localePath, useI18n } from '../i18n'
import { CONTACT_ADDRESS, ORG_GITHUB_URL } from '../config'
import { roman } from '../roman'

const { locale, t } = useI18n()
</script>

<template>
  <section class="hero page-hero">
    <div class="wrap">
      <Breadcrumb :current="t.nav.research" />
      <p class="eyebrow accent">{{ t.researchPage.eyebrow }}</p>
      <h1>{{ t.researchPage.heading }}</h1>
      <p class="lede">{{ t.researchPage.lede }}</p>
    </div>
  </section>

  <section id="agenda" class="section band-oat">
    <div class="wrap">
      <div class="section-head">
        <SectionMark :index="0" />
        <h2>{{ t.researchPage.agendaTitle }}</h2>
        <p class="lede">{{ t.researchPage.agendaDesc }}</p>
      </div>
      <div class="three">
        <article v-for="(area, i) in t.researchPage.areas" :key="area.num" class="benefit">
          <span class="num">{{ roman(i + 1) }}</span>
          <h3>{{ area.title }}</h3>
          <p>{{ area.body }}</p>
          <ul class="checks">
            <li v-for="q in area.questions" :key="q">{{ q }}</li>
          </ul>
        </article>
      </div>
    </div>
  </section>

  <section id="models" class="section">
    <div class="wrap two shoggoth-teaser">
      <div class="section-head">
        <SectionMark :index="1" />
        <h2>{{ t.researchPage.modelsTitle }}</h2>
      </div>
      <div>
        <p class="lede">{{ t.researchPage.models }}</p>
        <p class="status-line">
          <span class="status-badge status-planned">{{ t.homeShoggoth.badge }}</span>
          <RouterLink class="text-link" :to="localePath('/shoggoth', locale)"
            >{{ t.researchPage.modelsLink }} →</RouterLink
          >
        </p>
      </div>
    </div>
  </section>

  <section id="notes" class="section band-oat">
    <div class="wrap">
      <div class="section-head">
        <SectionMark :index="2" />
        <h2>{{ t.researchPage.notesTitle }}</h2>
        <p class="lede">{{ t.researchPage.notesDesc }}</p>
      </div>
      <!-- Published notes go above the placeholder; remove the placeholder once the first one is up. -->
      <div class="note-placeholder">
        <span class="status-badge status-planned">{{ t.researchPage.placeholder.badge }}</span>
        <h3>{{ t.researchPage.placeholder.title }}</h3>
        <p>{{ t.researchPage.placeholder.body }}</p>
      </div>
      <p class="status-line notes-posts">
        <span>{{ t.researchPage.postsNote }}</span>
        <RouterLink class="text-link" :to="localePath('/posts', locale)">{{ t.researchPage.postsLink }} →</RouterLink>
      </p>
    </div>
  </section>

  <section class="section">
    <div class="wrap">
      <div class="section-head">
        <SectionMark :index="3" />
        <h2>{{ t.researchPage.standardTitle }}</h2>
      </div>
      <ul class="principles four-col">
        <li v-for="(item, i) in t.researchPage.standard" :key="item[0]">
          <span class="roman">{{ roman(i + 1) }}</span>
          <h3>{{ item[0] }}</h3>
          <p>{{ item[1] }}</p>
        </li>
      </ul>
    </div>
  </section>

  <section class="section">
    <div class="wrap cta">
      <Ornament />
      <h2>{{ t.researchPage.ctaTitle }}</h2>
      <p class="lede">{{ t.researchPage.ctaBody }}</p>
      <div class="actions">
        <a class="btn btn-primary btn-lg" :href="ORG_GITHUB_URL" target="_blank" rel="noopener noreferrer">{{
          t.cta.primary
        }}</a>
        <a class="btn btn-outline btn-lg" :href="`mailto:${CONTACT_ADDRESS}`">{{ t.cta.secondary }}</a>
      </div>
    </div>
  </section>
</template>
