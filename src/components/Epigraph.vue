<script setup lang="ts">
import { useI18n } from '../i18n'

defineProps<{ center?: boolean }>()
const { t } = useI18n()
</script>

<template>
  <figure class="epigraph" :class="{ center }">
    <blockquote>{{ t.epigraph.quote }}</blockquote>
    <figcaption>{{ t.epigraph.cite }}</figcaption>
  </figure>
</template>
