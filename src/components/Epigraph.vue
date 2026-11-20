<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from '../i18n'

// The default is the Delphic maxim, the house epigraph. The Lilith page keeps the line from the Alphabet of Ben Sira,
// which its own name comes from.
const props = defineProps<{ center?: boolean; source?: 'delphi' | 'ben-sira' }>()
const { t } = useI18n()
const delphi = computed(() => (props.source ?? 'delphi') === 'delphi')
</script>

<template>
  <figure class="epigraph" :class="{ center }">
    <template v-if="delphi">
      <blockquote lang="grc">Γνῶθι σεαυτόν.</blockquote>
      <figcaption>{{ t.epigraph.delphi }}</figcaption>
    </template>
    <template v-else>
      <blockquote>{{ t.epigraph.quote }}</blockquote>
      <figcaption>{{ t.epigraph.cite }}</figcaption>
    </template>
  </figure>
</template>
