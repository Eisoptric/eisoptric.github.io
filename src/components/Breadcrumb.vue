<script setup lang="ts">
import { computed } from 'vue'
import { localePath, useI18n } from '../i18n'

// Eisoptric / [parent /] current. Posts pass the post list as their parent.
defineProps<{ current: string; parent?: { label: string; to: string } }>()

const { locale } = useI18n()
const home = computed(() => localePath('/', locale.value))
</script>

<template>
  <nav class="crumbs" :aria-label="locale === 'zh' ? '導覽路徑' : 'Breadcrumb'">
    <ol>
      <li><RouterLink :to="home">Eisoptric</RouterLink></li>
      <li v-if="parent">
        <RouterLink :to="parent.to">{{ parent.label }}</RouterLink>
      </li>
      <li aria-current="page">{{ current }}</li>
    </ol>
  </nav>
</template>
