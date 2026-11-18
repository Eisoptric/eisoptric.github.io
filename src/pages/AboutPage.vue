<script setup lang="ts">
import Breadcrumb from '../components/Breadcrumb.vue'
import { localePath, useI18n } from '../i18n'
import { DONATE_URL, ORG_GITHUB_URL } from '../config'

const { locale, t } = useI18n()
const toolPaths = ['/app', '/mcp']
</script>

<template>
  <section class="hero page-hero">
    <div class="wrap">
      <Breadcrumb :current="t.nav.about" />
      <p class="eyebrow accent">{{ t.aboutPage.eyebrow }}</p>
      <h1>{{ t.aboutPage.heading }}</h1>
      <p class="lede">{{ t.aboutPage.lede }}</p>
    </div>
  </section>

  <section class="section band-oat">
    <div class="wrap two">
      <div>
        <h2>{{ t.aboutPage.missionTitle }}</h2>
      </div>
      <div class="prose">
        <p v-for="para in t.aboutPage.mission" :key="para">{{ para }}</p>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="wrap">
      <div class="section-head">
        <h2>{{ t.aboutPage.teamTitle }}</h2>
      </div>
      <ul class="principles two-col">
        <li v-for="item in t.aboutPage.team" :key="item[0]">
          <h3>{{ item[0] }}</h3>
          <p>{{ item[1] }}</p>
        </li>
      </ul>
    </div>
  </section>

  <section class="section band-oat">
    <div class="wrap">
      <div class="section-head">
        <h2>{{ t.aboutPage.toolsTitle }}</h2>
        <p class="lede">{{ t.aboutPage.toolsDesc }}</p>
      </div>
      <div class="two tool-cards">
        <RouterLink
          v-for="(item, i) in t.aboutPage.tools"
          :key="item[0]"
          class="hero-product"
          :class="{ dark: i === 0 }"
          :to="localePath(toolPaths[i] ?? '/', locale)"
        >
          <strong>{{ item[0] }}</strong>
          <span>{{ item[1] }}</span>
          <span class="arrow" aria-hidden="true">→</span>
        </RouterLink>
      </div>
    </div>
  </section>

  <section class="section" id="contact">
    <div class="wrap">
      <div class="section-head">
        <h2>{{ t.aboutPage.contactTitle }}</h2>
      </div>
      <dl class="faq">
        <div v-for="item in t.aboutPage.contact" :key="item[0]">
          <dt>{{ item[0] }}</dt>
          <dd><a class="text-link" :href="`mailto:${item[1]}`">{{ item[1] }}</a></dd>
        </div>
      </dl>
      <div class="actions">
        <a class="btn btn-primary btn-lg" :href="ORG_GITHUB_URL" target="_blank" rel="noopener noreferrer">{{ t.aboutPage.github }}</a>
        <a class="btn btn-outline btn-lg" :href="DONATE_URL" target="_blank" rel="noopener">{{ t.aboutPage.donate }}</a>
      </div>
    </div>
  </section>
</template>
