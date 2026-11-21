<script setup lang="ts">
import Breadcrumb from '../components/Breadcrumb.vue'
import Ornament from '../components/Ornament.vue'
import SectionMark from '../components/SectionMark.vue'
import { useI18n } from '../i18n'

const { t } = useI18n()

// Everything here is served from public/brand/, copied from the official brand kit. Replace from the kit, never by hand.
const KIT = '/brand/eisoptric-brand-kit.zip'
const file = (name: string) => `/brand/eisoptric-${name}`

type FileKey = 'mark' | 'glyph' | 'favicon' | 'icon' | 'lockupHorizontal' | 'lockupStacked'
const logoFiles: { key: FileKey; base: string; png: string[]; wide?: boolean }[] = [
  { key: 'mark', base: 'mark', png: [] },
  { key: 'glyph', base: 'glyph', png: [] },
  { key: 'icon', base: 'icon', png: ['512', '180'] },
  { key: 'favicon', base: 'favicon', png: ['32', '16'] },
  { key: 'lockupHorizontal', base: 'lockup-horizontal', png: [], wide: true },
  { key: 'lockupStacked', base: 'lockup-stacked', png: [] },
]
const themes = ['vellum', 'nocturne'] as const

// The pigments in both themes, from the kit's tokens.css. The swatches are drawn by .sw-<key> in styles/brand.css.
type PigmentKey =
  'vellum' | 'vellumDeep' | 'ink' | 'inkMuted' | 'lapis' | 'vermilion' | 'gilt' | 'verdigris' | 'hairline'
const pigments: { key: PigmentKey; vellum: string; nocturne: string }[] = [
  { key: 'vellum', vellum: '#FAF8F4', nocturne: '#14161F' },
  { key: 'vellumDeep', vellum: '#F1EDE6', nocturne: '#1E2130' },
  { key: 'ink', vellum: '#1F1A14', nocturne: '#EEE6D6' },
  { key: 'inkMuted', vellum: '#5E5446', nocturne: '#A9A08F' },
  { key: 'lapis', vellum: '#23407A', nocturne: '#8FA8E0' },
  { key: 'vermilion', vellum: '#A8321F', nocturne: '#E07A62' },
  { key: 'gilt', vellum: '#9C7A2E', nocturne: '#C9A65A' },
  { key: 'verdigris', vellum: '#006E64', nocturne: '#4EB9AD' },
  { key: 'hairline', vellum: '#D9D2C5', nocturne: '#3A3D4D' },
]
const typefaceClasses = ['tf-cormorant', 'tf-garamond', 'tf-mono', 'tf-noto']
</script>

<template>
  <section class="hero page-hero brand-hero">
    <div class="wrap hero-grid">
      <div>
        <Breadcrumb :current="t.nav.brand" />
        <p class="eyebrow accent">{{ t.brandPage.eyebrow }}</p>
        <h1>{{ t.brandPage.heading }}</h1>
        <p class="lede">{{ t.brandPage.lede }}</p>
        <div class="actions">
          <a class="btn btn-primary btn-lg" :href="KIT" download>{{ t.brandPage.downloadKit }}</a>
          <a class="btn btn-outline btn-lg" href="#files">{{ t.brandPage.logosLink }}</a>
        </div>
        <p class="hero-note">{{ t.brandPage.kitNote }}</p>
      </div>
      <figure class="brand-hero-mark">
        <img :src="file('mark-vellum.svg')" alt="" width="256" height="256" />
      </figure>
    </div>
  </section>

  <section id="names" class="section band-oat">
    <div class="wrap">
      <div class="section-head">
        <SectionMark :index="0" />
        <h2>{{ t.brandPage.namesTitle }}</h2>
        <p class="lede">{{ t.brandPage.namesLede }}</p>
      </div>
      <div class="table-wrap">
        <table class="doc-table brand-table">
          <thead>
            <tr>
              <th v-for="cell in t.brandPage.namesHead" :key="cell">{{ cell }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in t.brandPage.names" :key="row[0]">
              <th scope="row">{{ row[0] }}</th>
              <td>{{ row[1] }}</td>
              <td>{{ row[2] }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="brand-note">{{ t.brandPage.namesNote }}</p>
    </div>
  </section>

  <section id="mark" class="section">
    <div class="wrap">
      <div class="section-head">
        <SectionMark :index="1" />
        <h2>{{ t.brandPage.markTitle }}</h2>
        <p class="lede">{{ t.brandPage.markLede }}</p>
      </div>
      <div class="brand-mark-pair">
        <figure v-for="theme in themes" :key="theme" class="brand-tile" :class="`tile-${theme}`">
          <img
            :src="file(`mark-${theme}.svg`)"
            :alt="`Eisoptric mark, ${t.brandPage[theme]}`"
            width="200"
            height="200"
          />
          <figcaption>{{ t.brandPage[theme] }}</figcaption>
        </figure>
      </div>
      <div class="brand-mark-text">
        <div class="table-wrap">
          <table class="doc-table brand-table">
            <thead>
              <tr>
                <th v-for="cell in t.brandPage.partsHead" :key="cell">{{ cell }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in t.brandPage.parts" :key="row[0]">
                <th scope="row">{{ row[0] }}</th>
                <td>{{ row[1] }}</td>
                <td>{{ row[2] }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <h3 class="brand-subhead">{{ t.brandPage.rulesTitle }}</h3>
          <ul class="brand-rules">
            <li v-for="rule in t.brandPage.rules" :key="rule">{{ rule }}</li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  <section id="files" class="section band-oat">
    <div class="wrap">
      <div class="section-head">
        <SectionMark :index="2" />
        <h2>{{ t.brandPage.filesTitle }}</h2>
        <p class="lede">{{ t.brandPage.filesLede }}</p>
      </div>
      <div class="brand-files">
        <article v-for="item in logoFiles" :key="item.key" class="brand-file" :class="{ wide: item.wide }">
          <div class="brand-file-previews">
            <a
              v-for="theme in themes"
              :key="theme"
              class="brand-tile"
              :class="`tile-${theme}`"
              :href="file(`${item.base}-${theme}.svg`)"
              target="_blank"
              rel="noopener"
            >
              <img
                :src="file(`${item.base}-${theme}.svg`)"
                :alt="`${t.brandPage.files[item.key][0]}, ${t.brandPage[theme]}`"
              />
            </a>
          </div>
          <h3>{{ t.brandPage.files[item.key][0] }}</h3>
          <p>{{ t.brandPage.files[item.key][1] }}</p>
          <ul class="brand-downloads">
            <li v-for="theme in themes" :key="theme">
              <span class="brand-downloads-theme">{{ t.brandPage[theme] }}</span>
              <a class="text-link" :href="file(`${item.base}-${theme}.svg`)" download>SVG</a>
              <a
                v-for="size in item.png"
                :key="size"
                class="text-link"
                :href="file(`${item.base}-${theme}-${size}.png`)"
                download
                >PNG {{ size }}</a
              >
            </li>
          </ul>
        </article>
      </div>
    </div>
  </section>

  <section id="colour" class="section">
    <div class="wrap">
      <div class="section-head">
        <SectionMark :index="3" />
        <h2>{{ t.brandPage.colourTitle }}</h2>
        <p class="lede">{{ t.brandPage.colourLede }}</p>
      </div>
      <ul class="brand-pigments">
        <li v-for="pigment in pigments" :key="pigment.key">
          <div class="brand-swatch" aria-hidden="true">
            <span :class="`sw-${pigment.key}-vellum`"></span>
            <span :class="`sw-${pigment.key}-nocturne`"></span>
          </div>
          <h3>{{ t.brandPage.pigments[pigment.key][0] }}</h3>
          <p class="brand-hex">
            <span>{{ t.brandPage.vellum }} {{ pigment.vellum }}</span>
            <span>{{ t.brandPage.nocturne }} {{ pigment.nocturne }}</span>
          </p>
          <p>{{ t.brandPage.pigments[pigment.key][1] }}</p>
        </li>
      </ul>
    </div>
  </section>

  <section id="type" class="section band-oat">
    <div class="wrap">
      <div class="section-head">
        <SectionMark :index="4" />
        <h2>{{ t.brandPage.typeTitle }}</h2>
      </div>
      <ul class="brand-typefaces">
        <li v-for="(face, i) in t.brandPage.typefaces" :key="face[0]">
          <p class="brand-specimen" :class="typefaceClasses[i]" lang="en">{{ face[0] }}</p>
          <p>{{ face[1] }}</p>
        </li>
      </ul>
      <p class="brand-note">{{ t.brandPage.typeNote }}</p>
    </div>
  </section>

  <section id="about" class="section">
    <div class="wrap">
      <div class="section-head">
        <SectionMark :index="5" />
        <h2>{{ t.brandPage.aboutTitle }}</h2>
        <p class="lede">{{ t.brandPage.aboutLede }}</p>
      </div>
      <dl class="brand-about">
        <div v-for="item in t.brandPage.about" :key="item[0]">
          <dt>{{ item[0] }}</dt>
          <dd>{{ item[1] }}</dd>
        </div>
      </dl>
      <div class="brand-usage">
        <h3 class="brand-subhead">{{ t.brandPage.usageTitle }}</h3>
        <p>{{ t.brandPage.usage }}</p>
        <p>
          <a class="text-link" :href="`mailto:${t.brandPage.contact}`">{{ t.brandPage.contact }}</a>
        </p>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="wrap cta">
      <Ornament />
      <h2>{{ t.brandPage.ctaTitle }}</h2>
      <p class="lede">{{ t.brandPage.ctaBody }}</p>
      <div class="actions">
        <a class="btn btn-primary btn-lg" :href="KIT" download>{{ t.brandPage.downloadKit }}</a>
      </div>
    </div>
  </section>
</template>
