<script setup lang="ts">
import Brand from './Brand.vue'
import { useI18n } from '../i18n'
import { useSiteGroups } from '../site-groups'

const { locale, t } = useI18n()
const year = new Date().getFullYear()
const columns = useSiteGroups()
</script>

<template>
  <footer class="site-footer">
    <div class="wrap">
      <div class="footer-main">
        <div class="footer-brand">
          <Brand />
          <p class="tagline">{{ t.footer.tagline }}</p>
        </div>
        <nav v-for="column in columns" :key="column.key" :aria-label="column.heading">
          <p class="footer-heading">{{ column.heading }}</p>
          <RouterLink v-for="link in column.links" :key="link.to" :to="link.to">{{ link.label }}</RouterLink>
        </nav>
      </div>
      <p class="legal">© {{ year }} {{ t.footer.project }}{{ locale === 'zh' ? ' ' : '. ' }}{{ t.footer.rights }}</p>
    </div>
  </footer>
</template>
