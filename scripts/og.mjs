// Draws public/og.png (1200 × 630) from scripts/og.html with a headless Chromium.
// Usage: node scripts/og.mjs public/og.png public/brand/eisoptric-mark-vellum.svg
// Needs Playwright with a Chromium (npm i -D playwright && npx playwright install chromium) and network access for Google Fonts.
import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright'

const [outPath, logoPath] = process.argv.slice(2)
if (!outPath || !logoPath) throw new Error('Usage: node scripts/og.mjs <out.png> <logo.png>')

const here = dirname(fileURLToPath(import.meta.url))
const mime = logoPath.endsWith('.svg') ? 'image/svg+xml' : 'image/png'
const logo = `data:${mime};base64,${readFileSync(resolve(logoPath)).toString('base64')}`
const html = readFileSync(resolve(here, 'og.html'), 'utf8').replace('LOGO', logo)

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 })
await page.setContent(html, { waitUntil: 'networkidle' })
await page.evaluate(() => document.fonts.ready)
await page.screenshot({ path: resolve(outPath) })
await browser.close()
