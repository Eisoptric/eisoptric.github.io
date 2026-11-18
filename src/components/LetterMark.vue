<script setup lang="ts">
import { computed } from 'vue'

// Sections are marked with the Hebrew alphabet in order, after the Alphabet of Ben Sira, which is arranged letter by letter.
const LETTERS = [
  ['א', 'Aleph'],
  ['ב', 'Bet'],
  ['ג', 'Gimel'],
  ['ד', 'Dalet'],
  ['ה', 'He'],
  ['ו', 'Vav'],
  ['ז', 'Zayin'],
  ['ח', 'Het'],
  ['ט', 'Tet'],
  ['י', 'Yod'],
] as const

const props = defineProps<{ index: number }>()
const letter = computed(() => LETTERS[props.index % LETTERS.length]!)
</script>

<template>
  <span class="letter-mark" aria-hidden="true">
    <span class="he" lang="he">{{ letter[0] }}</span>
    <span class="tr">{{ letter[1] }}</span>
  </span>
</template>
