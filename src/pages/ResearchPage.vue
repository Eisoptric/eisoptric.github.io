<script setup lang="ts">
import Breadcrumb from '../components/Breadcrumb.vue'
import { useI18n } from '../i18n'
import { CONTACT_ADDRESS, ORG_GITHUB_URL } from '../config'

const { t } = useI18n()
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

  <section class="section band-oat" id="agenda">
    <div class="wrap">
      <div class="section-head">
        <h2>{{ t.researchPage.agendaTitle }}</h2>
        <p class="lede">{{ t.researchPage.agendaDesc }}</p>
      </div>
      <div class="three">
        <article v-for="area in t.researchPage.areas" :key="area.num" class="benefit">
          <span class="num">{{ area.num }}</span>
          <h3>{{ area.title }}</h3>
          <p>{{ area.body }}</p>
          <ul class="checks">
            <li v-for="q in area.questions" :key="q">{{ q }}</li>
          </ul>
        </article>
      </div>
    </div>
  </section>

  <section class="section" id="notes">
    <div class="wrap">
      <div class="section-head">
        <h2>{{ t.researchPage.notesTitle }}</h2>
        <p class="lede">{{ t.researchPage.notesDesc }}</p>
      </div>
      <!-- Published notes go above the placeholder; remove the placeholder once the first one is up. -->
      <div class="note-placeholder">
        <span class="status-badge status-planned">{{ t.researchPage.placeholder.badge }}</span>
        <h3>{{ t.researchPage.placeholder.title }}</h3>
        <p>{{ t.researchPage.placeholder.body }}</p>
      </div>
    </div>
  </section>

  <section class="section band-oat">
    <div class="wrap">
      <div class="section-head">
        <h2>{{ t.researchPage.standardTitle }}</h2>
      </div>
      <ul class="principles four-col">
        <li v-for="item in t.researchPage.standard" :key="item[0]">
          <h3>{{ item[0] }}</h3>
          <p>{{ item[1] }}</p>
        </li>
      </ul>
    </div>
  </section>

  <section class="section">
    <div class="wrap cta">
      <h2>{{ t.researchPage.ctaTitle }}</h2>
      <p class="lede">{{ t.researchPage.ctaBody }}</p>
      <div class="actions">
        <a class="btn btn-primary btn-lg" :href="ORG_GITHUB_URL" target="_blank" rel="noopener noreferrer">{{ t.cta.primary }}</a>
        <a class="btn btn-outline btn-lg" :href="`mailto:${CONTACT_ADDRESS}`">{{ t.cta.secondary }}</a>
      </div>
    </div>
  </section>
</template>
