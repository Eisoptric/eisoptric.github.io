<script setup lang="ts">
import { useI18n } from '../i18n'

// The Delphic maxim, the house epigraph.
defineProps<{ center?: boolean }>()
const { t } = useI18n()
</script>

<template>
  <figure class="epigraph" :class="{ center }">
    <blockquote lang="grc">Γνῶθι σεαυτόν.</blockquote>
    <figcaption>{{ t.epigraph.delphi }}</figcaption>
  </figure>
</template>
