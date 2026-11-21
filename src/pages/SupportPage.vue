<script setup lang="ts">
import Breadcrumb from '../components/Breadcrumb.vue'
import Epigraph from '../components/Epigraph.vue'
import Ornament from '../components/Ornament.vue'
import SectionMark from '../components/SectionMark.vue'
import { CONTACT_ADDRESS, DONATE_URL } from '../config'
import { useI18n } from '../i18n'
import { roman } from '../roman'

const { t } = useI18n()
</script>

<template>
  <section class="hero page-hero">
    <div class="wrap">
      <Breadcrumb :current="t.nav.support" />
      <p class="eyebrow accent">{{ t.supportPage.eyebrow }}</p>
      <h1>{{ t.supportPage.heading }}</h1>
      <p class="lede">{{ t.supportPage.lede }}</p>
      <div class="actions">
        <a class="btn btn-primary btn-lg" :href="DONATE_URL" target="_blank" rel="noopener">{{
          t.supportPage.sponsor
        }}</a>
        <a class="btn btn-outline btn-lg" :href="`mailto:${CONTACT_ADDRESS}`">{{ t.supportPage.contact }}</a>
      </div>
    </div>
  </section>

  <section id="why" class="section band-oat">
    <div class="wrap">
      <Epigraph center />
      <Ornament />
      <div class="manuscript">
        <div class="section-head">
          <SectionMark :index="0" />
          <h2>{{ t.supportPage.whyTitle }}</h2>
        </div>
        <div class="prose">
          <p v-for="para in t.supportPage.why" :key="para">{{ para }}</p>
        </div>
      </div>
    </div>
  </section>

  <section id="funds" class="section">
    <div class="wrap">
      <div class="section-head">
        <SectionMark :index="1" />
        <h2>{{ t.supportPage.fundsTitle }}</h2>
      </div>
      <ul class="principles four-col">
        <li v-for="(item, i) in t.supportPage.funds" :key="item[0]">
          <span class="roman">{{ roman(i + 1) }}</span>
          <h3>{{ item[0] }}</h3>
          <p>{{ item[1] }}</p>
        </li>
      </ul>
    </div>
  </section>

  <section id="ways" class="section band-oat">
    <div class="wrap">
      <div class="section-head">
        <SectionMark :index="2" />
        <h2>{{ t.supportPage.waysTitle }}</h2>
        <p class="lede">{{ t.supportPage.waysDesc }}</p>
      </div>
      <div class="two series">
        <article v-for="item in t.supportPage.ways" :key="item[0]" class="folio">
          <h3>{{ item[0] }}</h3>
          <p>{{ item[1] }}</p>
        </article>
      </div>
    </div>
  </section>

  <section id="principles" class="section">
    <div class="wrap two">
      <div class="section-head">
        <SectionMark :index="3" />
        <h2>{{ t.supportPage.principlesTitle }}</h2>
      </div>
      <div class="prose">
        <p v-for="para in t.supportPage.principles" :key="para">{{ para }}</p>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="wrap cta">
      <Ornament />
      <h2>{{ t.supportPage.ctaTitle }}</h2>
      <p class="lede">{{ t.supportPage.ctaBody }}</p>
      <div class="actions">
        <a class="btn btn-primary btn-lg" :href="DONATE_URL" target="_blank" rel="noopener">{{
          t.supportPage.sponsor
        }}</a>
        <a class="btn btn-outline btn-lg" :href="`mailto:${CONTACT_ADDRESS}`">{{ t.supportPage.contact }}</a>
      </div>
    </div>
  </section>
</template>
