<script setup lang="ts">
import { localePath, useI18n } from '../i18n'

const { locale, t } = useI18n()

// The full Eisoptric mark (public/brand/eisoptric-mark-*.svg), with the ring drawn at stroke 8 instead of 4
// so it stays a clear line at header size. The E is one path; its reflection is the same path mirrored about x = 128.
const E =
  'M60 72H118V100H112V88L104 80H86V120H100L104 116V112H110V136H104V132L100 128H86V176H106L114 168V150H122V184H60V176H70V80H60Z'
</script>

<template>
  <RouterLink :to="localePath('/', locale)" class="brand" :aria-label="t.nav.home">
    <svg class="mark" viewBox="0 0 256 256" aria-hidden="true" focusable="false">
      <circle class="m-ring" cx="128" cy="128" r="118" />
      <path class="m-gilt" d="M126 64h4v128h-4z" />
      <path class="m-verm" d="M128 36l12 12-12 12-12-12z" />
      <path class="m-ink" :d="E" />
      <path class="m-lapis" :d="E" transform="matrix(-1 0 0 1 256 0)" />
    </svg>
    <span class="wordmark">Eisoptric</span>
  </RouterLink>
</template>
