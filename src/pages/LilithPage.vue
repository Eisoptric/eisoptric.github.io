<script setup lang="ts">
import Breadcrumb from '../components/Breadcrumb.vue'
import Epigraph from '../components/Epigraph.vue'
import LetterMark from '../components/LetterMark.vue'
import Ornament from '../components/Ornament.vue'
import { useI18n } from '../i18n'
import { CONTACT_ADDRESS, ORG_GITHUB_URL } from '../config'
import { roman } from '../roman'
import { BEN_SIRA_LILITH, BEN_SIRA_SOURCE_URL } from '../ben-sira'

const { t } = useI18n()
// The opening word is set in rubric red, as a scribe would begin a passage.
const [firstWord, ...rest] = BEN_SIRA_LILITH.split(' ')
const restOfText = rest.join(' ')
</script>

<template>
  <section class="hero page-hero lilith-hero">
    <div class="wrap">
      <Breadcrumb :current="t.nav.lilith" />
      <p class="eyebrow accent">{{ t.lilithPage.eyebrow }}</p>
      <h1 class="title-plate">
        <span>{{ t.lilithPage.heading }}</span>
        <span class="he" lang="he" aria-hidden="true">לילית</span>
      </h1>
      <p class="lede">{{ t.lilithPage.lede }}</p>
      <p class="status-line">
        <span class="status-badge status-planned">{{ t.lilithPage.status.badge }}</span>
        <span>{{ t.lilithPage.status.text }}</span>
      </p>
    </div>
  </section>

  <section class="section band-oat" id="name">
    <div class="wrap">
      <Epigraph center />
      <Ornament />
      <div class="manuscript">
        <div class="section-head">
          <LetterMark :index="0" />
          <h2>{{ t.lilithPage.storyTitle }}</h2>
        </div>
        <figure class="original">
          <blockquote lang="he" dir="rtl"><span class="rubric">{{ firstWord }}</span> {{ restOfText }} …</blockquote>
          <figcaption>
            <a :href="BEN_SIRA_SOURCE_URL" target="_blank" rel="noopener noreferrer">{{ t.lilithPage.storySource }}</a>
          </figcaption>
        </figure>
      </div>
    </div>
  </section>

  <section class="section" id="series">
    <div class="wrap">
      <div class="section-head">
        <LetterMark :index="1" />
        <h2>{{ t.lilithPage.seriesTitle }}</h2>
        <p class="lede">{{ t.lilithPage.storyNote }}</p>
        <p class="lede">{{ t.lilithPage.seriesDesc }}</p>
      </div>
      <div class="two series">
        <article v-for="item in t.lilithPage.series" :key="item[0]" class="folio">
          <h3>{{ item[0] }}</h3>
          <p>{{ item[1] }}</p>
        </article>
      </div>
    </div>
  </section>

  <section class="section band-oat" id="release">
    <div class="wrap">
      <div class="section-head">
        <LetterMark :index="2" />
        <h2>{{ t.lilithPage.releaseTitle }}</h2>
      </div>
      <ul class="principles four-col">
        <li v-for="(item, i) in t.lilithPage.release" :key="item[0]">
          <span class="roman">{{ roman(i + 1) }}</span>
          <h3>{{ item[0] }}</h3>
          <p>{{ item[1] }}</p>
        </li>
      </ul>
    </div>
  </section>

  <section class="section" id="scale">
    <div class="wrap two">
      <div class="section-head">
        <LetterMark :index="3" />
        <h2>{{ t.lilithPage.scaleTitle }}</h2>
      </div>
      <div class="prose">
        <p v-for="para in t.lilithPage.scale" :key="para">{{ para }}</p>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="wrap cta">
      <Ornament />
      <h2>{{ t.lilithPage.ctaTitle }}</h2>
      <p class="lede">{{ t.lilithPage.ctaBody }}</p>
      <div class="actions">
        <a class="btn btn-primary btn-lg" :href="ORG_GITHUB_URL" target="_blank" rel="noopener noreferrer">{{ t.cta.primary }}</a>
        <a class="btn btn-outline btn-lg" :href="`mailto:${CONTACT_ADDRESS}`">{{ t.cta.secondary }}</a>
      </div>
    </div>
  </section>
</template>
