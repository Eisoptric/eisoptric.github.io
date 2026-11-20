<script setup lang="ts">
import { localePath, useI18n } from '../i18n'
import { CONTACT_ADDRESS, ORG_GITHUB_URL } from '../config'

const { locale, t } = useI18n()
</script>

<template>
  <section class="h-hero">
    <div class="wrap">
      <p class="h-kicker">{{ t.hero.eyebrow }}</p>
      <h1 class="h-title">{{ t.hero.title }}</h1>
      <div class="h-hero-foot">
        <p class="h-lede">{{ t.hero.desc }}</p>
        <div class="h-actions">
          <RouterLink class="btn btn-primary btn-lg" :to="localePath('/research', locale)">{{ t.hero.primary }}</RouterLink>
          <RouterLink class="btn btn-outline btn-lg" :to="localePath('/about', locale)">{{ t.hero.secondary }}</RouterLink>
        </div>
      </div>
    </div>
  </section>

  <section class="h-section">
    <div class="wrap h-split">
      <h2 class="h-label">{{ t.hero.questionsLabel }}</h2>
      <ul class="h-questions">
        <li v-for="q in t.hero.questions" :key="q">{{ q }}</li>
      </ul>
    </div>
  </section>

  <section class="h-section">
    <div class="wrap">
      <div class="h-head">
        <h2>{{ t.areas.title }}</h2>
        <p>{{ t.areas.desc }}</p>
      </div>
      <div class="h-grid3">
        <article v-for="item in t.areas.items" :key="item[0]" class="h-area">
          <h3>{{ item[0] }}</h3>
          <p>{{ item[1] }}</p>
        </article>
      </div>
    </div>
  </section>

  <section class="h-section">
    <div class="wrap h-grid2">
      <article class="h-card">
        <p class="h-card-label">
          {{ t.homeLilith.eyebrow }}
          <span class="status-badge status-planned">{{ t.homeLilith.badge }}</span>
        </p>
        <h3>{{ t.homeLilith.title }}</h3>
        <p>{{ t.homeLilith.desc }}</p>
        <RouterLink class="h-link" :to="localePath('/lilith', locale)">{{ t.homeLilith.link }} <span aria-hidden="true">→</span></RouterLink>
      </article>
      <article class="h-card">
        <p class="h-card-label">
          {{ t.notes.title.replace(/[.。]$/, '') }}
          <span class="status-badge status-planned">{{ t.notes.badge }}</span>
        </p>
        <h3>{{ t.notes.placeholderTitle }}</h3>
        <p>{{ t.notes.placeholderBody }}</p>
        <RouterLink class="h-link" :to="localePath('/research', locale)">{{ t.notes.link }} <span aria-hidden="true">→</span></RouterLink>
      </article>
    </div>
  </section>

  <section id="tools" class="h-section h-band">
    <div class="wrap">
      <div class="h-head">
        <h2>{{ t.tools.title }}</h2>
        <p>{{ t.tools.desc }}</p>
      </div>
      <div class="h-grid2">
        <RouterLink class="h-tile h-tile-dark" :to="localePath('/app', locale)">
          <svg class="h-tile-art" viewBox="0 0 72 72" aria-hidden="true">
            <line x1="10" y1="58" x2="10" y2="46" />
            <line x1="20" y1="58" x2="20" y2="36" />
            <line x1="30" y1="58" x2="30" y2="40" />
            <circle cx="46" cy="28" r="16" />
            <line x1="57" y1="40" x2="66" y2="50" />
            <circle class="fill" cx="46" cy="28" r="5" />
          </svg>
          <span class="h-tile-kind">{{ t.tools.appKind }}</span>
          <strong>Eisoptric Workbench</strong>
          <span class="h-tile-text">{{ t.tools.app }}</span>
          <span class="h-tile-arrow" aria-hidden="true">→</span>
        </RouterLink>
        <RouterLink class="h-tile" :to="localePath('/mcp', locale)">
          <svg class="h-tile-art" viewBox="0 0 72 72" aria-hidden="true">
            <path d="M12 62V22a24 24 0 0 1 48 0v40" />
            <path d="M24 62V26a12 12 0 0 1 24 0v36" />
            <line x1="6" y1="62" x2="66" y2="62" />
            <circle class="fill" cx="36" cy="44" r="5" />
          </svg>
          <span class="h-tile-kind">{{ t.tools.mcpKind }}</span>
          <strong>Eisoptric MCP</strong>
          <span class="h-tile-text">{{ t.tools.mcp }}</span>
          <span class="h-tile-arrow" aria-hidden="true">→</span>
        </RouterLink>
      </div>
    </div>
  </section>

  <section class="h-section">
    <div class="wrap h-split">
      <h2 class="h-split-title">{{ t.principles.title }}</h2>
      <dl class="h-rows">
        <div v-for="item in t.principles.items" :key="item[0]">
          <dt>{{ item[0] }}</dt>
          <dd>{{ item[1] }}</dd>
        </div>
      </dl>
    </div>
  </section>

  <section id="faq" class="h-section">
    <div class="wrap h-split">
      <h2 class="h-split-title">{{ t.homeFaq.title }}</h2>
      <dl class="h-rows h-faq">
        <div v-for="item in t.homeFaq.items" :key="item[0]">
          <dt>{{ item[0] }}</dt>
          <dd>{{ item[1] }}</dd>
        </div>
      </dl>
    </div>
  </section>

  <section class="h-section h-cta">
    <div class="wrap">
      <h2>{{ t.cta.title }}</h2>
      <p>{{ t.cta.body }}</p>
      <div class="h-actions">
        <a class="btn btn-primary btn-lg" :href="ORG_GITHUB_URL" target="_blank" rel="noopener noreferrer">{{ t.cta.primary }}</a>
        <a class="btn btn-outline btn-lg" :href="`mailto:${CONTACT_ADDRESS}`">{{ t.cta.secondary }}</a>
      </div>
    </div>
  </section>
</template>
