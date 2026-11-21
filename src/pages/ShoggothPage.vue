<script setup lang="ts">
import Breadcrumb from '../components/Breadcrumb.vue'
import Epigraph from '../components/Epigraph.vue'
import SectionMark from '../components/SectionMark.vue'
import Ornament from '../components/Ornament.vue'
import { useI18n } from '../i18n'
import { CONTACT_ADDRESS, ORG_GITHUB_URL } from '../config'
import { roman } from '../roman'

const { t } = useI18n()
</script>

<template>
  <section class="hero page-hero shoggoth-hero">
    <div class="wrap">
      <Breadcrumb :current="t.nav.shoggoth" />
      <p class="eyebrow accent">{{ t.shoggothPage.eyebrow }}</p>
      <h1 class="title-plate">
        <span>{{ t.shoggothPage.heading }}</span>
      </h1>
      <p class="lede">{{ t.shoggothPage.lede }}</p>
      <p class="status-line">
        <span class="status-badge status-planned">{{ t.shoggothPage.status.badge }}</span>
        <span>{{ t.shoggothPage.status.text }}</span>
      </p>
    </div>
  </section>

  <section id="name" class="section band-oat">
    <div class="wrap">
      <Epigraph center />
      <Ornament />
      <div class="manuscript">
        <div class="section-head">
          <SectionMark :index="0" />
          <h2>{{ t.shoggothPage.storyTitle }}</h2>
        </div>
        <div class="prose">
          <p v-for="para in t.shoggothPage.story" :key="para">{{ para }}</p>
        </div>
      </div>
    </div>
  </section>

  <section id="series" class="section">
    <div class="wrap">
      <div class="section-head">
        <SectionMark :index="1" />
        <h2>{{ t.shoggothPage.seriesTitle }}</h2>
        <p class="lede">{{ t.shoggothPage.seriesDesc }}</p>
      </div>
      <div class="two series">
        <article v-for="item in t.shoggothPage.series" :key="item[0]" class="folio">
          <h3>{{ item[0] }}</h3>
          <p>{{ item[1] }}</p>
        </article>
      </div>
    </div>
  </section>

  <section id="release" class="section band-oat">
    <div class="wrap">
      <div class="section-head">
        <SectionMark :index="2" />
        <h2>{{ t.shoggothPage.releaseTitle }}</h2>
      </div>
      <ul class="principles four-col">
        <li v-for="(item, i) in t.shoggothPage.release" :key="item[0]">
          <span class="roman">{{ roman(i + 1) }}</span>
          <h3>{{ item[0] }}</h3>
          <p>{{ item[1] }}</p>
        </li>
      </ul>
    </div>
  </section>

  <section id="scale" class="section">
    <div class="wrap two">
      <div class="section-head">
        <SectionMark :index="3" />
        <h2>{{ t.shoggothPage.scaleTitle }}</h2>
      </div>
      <div class="prose">
        <p v-for="para in t.shoggothPage.scale" :key="para">{{ para }}</p>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="wrap cta">
      <Ornament />
      <h2>{{ t.shoggothPage.ctaTitle }}</h2>
      <p class="lede">{{ t.shoggothPage.ctaBody }}</p>
      <div class="actions">
        <a class="btn btn-primary btn-lg" :href="ORG_GITHUB_URL" target="_blank" rel="noopener noreferrer">{{
          t.cta.primary
        }}</a>
        <a class="btn btn-outline btn-lg" :href="`mailto:${CONTACT_ADDRESS}`">{{ t.cta.secondary }}</a>
      </div>
    </div>
  </section>
</template>
