<script setup lang="ts">
import { localePath, useI18n } from '../i18n'

const { locale, t } = useI18n()

// The Eisoptric glyph: the Speculum without its ring, cut for small sizes (see public/brand/).
// The E is one path; its reflection is the same path mirrored about x = 128.
const E =
  'M40 60H118V96H106V82L100 76H76V120H96V108H106V148H96V136H76V180H102L110 172V154H122V196H40V180H52V76H40Z'
</script>

<template>
  <RouterLink :to="localePath('/', locale)" class="brand" :aria-label="t.nav.home">
    <svg class="mark" viewBox="0 0 256 256" aria-hidden="true" focusable="false">
      <path class="m-gilt" d="M125 52h6v152h-6z" />
      <path class="m-verm" d="M128 14l16 16-16 16-16-16z" />
      <path class="m-ink" :d="E" />
      <path class="m-lapis" :d="E" transform="matrix(-1 0 0 1 256 0)" />
    </svg>
    <span class="wordmark">Eisoptric</span>
  </RouterLink>
</template>
