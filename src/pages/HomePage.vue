<script setup lang="ts">
import Epigraph from '../components/Epigraph.vue'
import SectionMark from '../components/SectionMark.vue'
import Ornament from '../components/Ornament.vue'
import { localePath, useI18n } from '../i18n'
import { CONTACT_ADDRESS, ORG_GITHUB_URL } from '../config'
import { roman } from '../roman'

const { locale, t } = useI18n()
</script>

<template>
  <section class="hero home-hero">
    <div class="wrap hero-grid">
      <div>
        <p class="eyebrow accent">{{ t.hero.eyebrow }}</p>
        <h1>{{ t.hero.title }}</h1>
        <p class="lede">{{ t.hero.desc }}</p>
        <div class="actions">
          <RouterLink class="btn btn-primary btn-lg" :to="localePath('/research', locale)">{{ t.hero.primary }}</RouterLink>
          <RouterLink class="btn btn-outline btn-lg" :to="localePath('/about', locale)">{{ t.hero.secondary }}</RouterLink>
        </div>
        <p class="hero-note">{{ t.hero.note }}</p>
      </div>
      <div class="hero-aside">
        <div class="questions">
          <p class="eyebrow">{{ t.hero.questionsLabel }}</p>
          <ol>
            <li v-for="(q, i) in t.hero.questions" :key="q">
              <span class="num">{{ roman(i + 1) }}</span>
              <span>{{ q }}</span>
            </li>
          </ol>
        </div>
      </div>
    </div>
  </section>

  <section class="section band-oat epigraph-band">
    <div class="wrap">
      <Epigraph center />
    </div>
  </section>

  <section class="section">
    <div class="wrap">
      <div class="section-head">
        <SectionMark :index="0" />
        <h2>{{ t.areas.title }}</h2>
        <p class="lede">{{ t.areas.desc }}</p>
      </div>
      <div class="three">
        <article v-for="(item, i) in t.areas.items" :key="item[0]" class="benefit">
          <span class="num">{{ roman(i + 1) }}</span>
          <h3>{{ item[0] }}</h3>
          <p>{{ item[1] }}</p>
        </article>
      </div>
    </div>
  </section>

  <section class="section band-oat">
    <div class="wrap two lilith-teaser">
      <div class="section-head">
        <SectionMark :index="1" />
        <p class="eyebrow accent">{{ t.homeLilith.eyebrow }}</p>
        <h2>{{ t.homeLilith.title }}</h2>
      </div>
      <div>
        <p class="lede">{{ t.homeLilith.desc }}</p>
        <p class="status-line">
          <span class="status-badge status-planned">{{ t.homeLilith.badge }}</span>
          <RouterLink class="text-link" :to="localePath('/lilith', locale)">{{ t.homeLilith.link }} →</RouterLink>
        </p>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="wrap">
      <div class="section-head">
        <SectionMark :index="2" />
        <h2>{{ t.notes.title }}</h2>
        <p class="lede">{{ t.notes.desc }}</p>
      </div>
      <div class="note-placeholder">
        <span class="status-badge status-planned">{{ t.notes.badge }}</span>
        <h3>{{ t.notes.placeholderTitle }}</h3>
        <p>{{ t.notes.placeholderBody }}</p>
        <RouterLink class="text-link" :to="localePath('/research', locale)">{{ t.notes.link }} →</RouterLink>
      </div>
    </div>
  </section>

  <section id="tools" class="section band-oat product">
    <div class="wrap">
      <div class="section-head">
        <SectionMark :index="3" />
        <p class="eyebrow accent">{{ t.tools.eyebrow }}</p>
        <h2>{{ t.tools.title }}</h2>
        <p class="lede">{{ t.tools.desc }}</p>
      </div>
      <div class="two tool-cards">
        <RouterLink class="hero-product dark" :to="localePath('/app', locale)">
          <svg class="art" viewBox="0 0 72 72" aria-hidden="true">
            <line x1="10" y1="58" x2="10" y2="46" />
            <line x1="20" y1="58" x2="20" y2="36" />
            <line x1="30" y1="58" x2="30" y2="40" />
            <circle cx="46" cy="28" r="16" />
            <line x1="57" y1="40" x2="66" y2="50" />
            <circle class="fill" cx="46" cy="28" r="5" />
          </svg>
          <span class="eyebrow">{{ t.tools.appKind }}</span>
          <strong>Eisoptric App</strong>
          <span>{{ t.tools.app }}</span>
          <span class="arrow" aria-hidden="true">→</span>
        </RouterLink>
        <RouterLink class="hero-product" :to="localePath('/mcp', locale)">
          <svg class="art" viewBox="0 0 72 72" aria-hidden="true">
            <path d="M12 62V22a24 24 0 0 1 48 0v40" />
            <path d="M24 62V26a12 12 0 0 1 24 0v36" />
            <line x1="6" y1="62" x2="66" y2="62" />
            <circle class="fill" cx="36" cy="44" r="5" />
          </svg>
          <span class="eyebrow">{{ t.tools.mcpKind }}</span>
          <strong>Eisoptric MCP</strong>
          <span>{{ t.tools.mcp }}</span>
          <span class="arrow" aria-hidden="true">→</span>
        </RouterLink>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="wrap">
      <div class="section-head">
        <SectionMark :index="4" />
        <h2>{{ t.principles.title }}</h2>
      </div>
      <ul class="principles">
        <li v-for="(item, i) in t.principles.items" :key="item[0]">
          <span class="roman">{{ roman(i + 1) }}</span>
          <h3>{{ item[0] }}</h3>
          <p>{{ item[1] }}</p>
        </li>
      </ul>
    </div>
  </section>

  <section class="section band-oat" id="faq">
    <div class="wrap">
      <div class="section-head">
        <SectionMark :index="5" />
        <h2>{{ t.homeFaq.title }}</h2>
      </div>
      <dl class="faq">
        <div v-for="item in t.homeFaq.items" :key="item[0]">
          <dt>{{ item[0] }}</dt>
          <dd>{{ item[1] }}</dd>
        </div>
      </dl>
    </div>
  </section>

  <section class="section">
    <div class="wrap cta">
      <Ornament />
      <h2>{{ t.cta.title }}</h2>
      <p class="lede">{{ t.cta.body }}</p>
      <div class="actions">
        <a class="btn btn-primary btn-lg" :href="ORG_GITHUB_URL" target="_blank" rel="noopener noreferrer">{{ t.cta.primary }}</a>
        <a class="btn btn-outline btn-lg" :href="`mailto:${CONTACT_ADDRESS}`">{{ t.cta.secondary }}</a>
      </div>
    </div>
  </section>
</template>
