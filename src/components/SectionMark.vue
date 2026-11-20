<script setup lang="ts">
// Sections are numbered with a vermilion section sign, the way a scholar's notebook numbers them.
defineProps<{ index: number }>()
</script>

<template>
  <span class="section-mark" aria-hidden="true">
    <span class="sign">§</span>
    <span class="no">{{ index + 1 }}</span>
  </span>
</template>
