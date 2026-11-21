<div align="center">

<img src="public/favicon.png" alt="Eisoptric" width="112" height="112" />

# Eisoptric website

**The source of [eisoptric.com](https://eisoptric.com).**

Eisoptric is a small, independent AI research project founded by Rick Weng in Taiwan. The site holds the landing page, Research, About, the pages of the two tools it releases (Eisoptric Workbench and Eisoptric MCP), Trust (with the whitepaper), Support, Brand, Terms and Privacy, in English and 繁體中文, prerendered to static HTML.

![Vue](https://img.shields.io/badge/Vue-3.5-4FC08D.svg?logo=vuedotjs&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF.svg?logo=vite&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6.svg?logo=typescript&logoColor=white)
![Cloudflare Workers](https://img.shields.io/badge/hosted%20on-Cloudflare%20Workers-F38020.svg?logo=cloudflareworkers&logoColor=white)

[Pages](#pages) · [Quick start](#quick-start) · [Prerendering](#how-prerendering-works) · [i18n](#i18n) · [SEO](#seo-and-structured-data) · [Headers](#security-headers) · [Deploy](#deploy) · [中文](README_ZH.md)

</div>

---

Built with Vue 3, Vite and TypeScript. Every page is prerendered to static HTML and served by a Cloudflare Worker as static assets ([`wrangler.jsonc`](wrangler.jsonc)). There is no server code: the build output in `dist/` is the whole site.

## Pages

Every page exists twice: once at its English path and once under `/zh` in 繁體中文. The pages are listed in [`src/page-table.ts`](src/page-table.ts), and [`src/router.ts`](src/router.ts) builds the routes from it.

| English | 中文 | Component | What it contains |
| --- | --- | --- | --- |
| `/` | `/zh` | `HomePage.vue` | The research questions, the three research areas, the latest research notes (a placeholder until the first is published), the tools from our work (`#tools`), how we work, FAQ (`#faq`) and a call to follow on GitHub |
| `/research` | `/zh/research` | `ResearchPage.vue` | The research agenda (`#agenda`), the list of research notes (`#notes`, a placeholder for now) and what every note includes |
| `/posts` | `/zh/posts` | `PostsPage.vue` | Posts, newest first: shorter writing that is not a research note. A post not written in the page's language is listed in the language it has, and marked |
| `/posts/<slug>` | `/zh/posts/<slug>` | `PostPage.vue` | One post, rendered from its Markdown in `src/posts/`. A post exists only in the languages it is written in |
| `/shoggoth` | `/zh/shoggoth` | `ShoggothPage.vue` | Shoggoth, Eisoptric’s own small models (in preparation): the name and mission toward an understandable Yog-Sothoth (`#name`), Shoggoth and its controlled variants (`#series`), what each model will be released with (`#release`) and why small (`#scale`) |
| `/about` | `/zh/about` | `AboutPage.vue` | Mission, who we are, why we build tools, and contact (`#contact`) |
| `/mcp` | `/zh/mcp` | `McpPage.vue` | Eisoptric MCP, the gateway: an example policy, the four setup steps, use cases, capabilities, security, why a dedicated gateway and the console |
| `/app` | `/zh/app` | `AppPage.vue` | Eisoptric Workbench, the AI research workbench: a link to the GitHub repository, a link to its releases, features and requirements |
| `/trust` | `/zh/trust` | `TrustPage.vue` | How keys, payloads and credentials are protected, FAQ, the system whitepaper (`#whitepaper`) and vulnerability disclosure (`#disclosure`) |
| `/support` | `/zh/support` | `SupportPage.vue` | Why independent research needs support (`#why`), what support pays for (`#funds`), ways to help (`#ways`) and what support does not change (`#principles`), with links to GitHub Sponsors and email |
| `/brand` | `/zh/brand` | `BrandPage.vue` | Brand and press resources for people outside the project, from the official kit: the names (`#names`), the mark and how to use it (`#mark`), logo files to download (`#files`), colour (`#colour`), typefaces (`#type`), and a description of Eisoptric others can quote with terms for using the name and mark (`#about`), with a download of the whole kit |
| `/terms` | `/zh/terms` | `LegalPage.vue` | Terms of Service |
| `/privacy` | `/zh/privacy` | `LegalPage.vue` | Privacy Policy |

The App page links to the releases at `RELEASES_URL` in [`src/config.ts`](src/config.ts). Eisoptric Workbench's releases are pre-releases with the version in their file names, so a stable `/releases/latest` address cannot point at one. The "Get started" buttons go to the console at `console.eisoptric.com`.

Any other path is a 404. The build prerenders [`NotFoundPage.vue`](src/pages/NotFoundPage.vue) to `dist/404.html` and `dist/zh/404.html`. Cloudflare serves the nearest `404.html` with status 404, so `/zh/anything` gets the Chinese page. There is no `/* /index.html 200` fallback, because that rule would answer every unknown path with 200 and the home page. The 404 page has `noindex` and no canonical URL, and is not in the sitemap or `llms.txt`. In the browser, the router's catch-all routes show the same page.

## Quick start

Requires [Node.js](https://nodejs.org) 22 (pinned in `.node-version`).

```bash
npm install
npm run dev
```

`npm run dev` serves the site with Vite's dev server and hot reload. In development the app renders in the browser only; prerendering happens in `npm run build`.

## Scripts

| Script | What it does |
| --- | --- |
| `npm run dev` | Starts the Vite dev server |
| `npm run build` | Type-checks (`vue-tsc -b`), builds the client into `dist/`, builds a server bundle from `src/entry-server.ts` into `dist-ssr/`, then runs `scripts/prerender.mjs`, which writes every page and `sitemap.xml` into `dist/` |
| `npm run preview` | Serves `dist/` locally with `vite preview`. Cloudflare's `_headers` and 404 handling are not applied there; `npx wrangler dev` applies both |
| `npm run deploy` | Runs `npm run build`, then `wrangler deploy` |
| `npm run format` | Formats every file with Prettier |
| `npm run lint` | Runs ESLint |
| `npm run check` | Checks formatting, lint and types without changing anything. GitHub Actions runs it, and `npm run build`, on every pull request ([`.github/workflows/check.yml`](.github/workflows/check.yml)) |

`dist/` and `dist-ssr/` are build output and are ignored by git.

## How prerendering works

1. `vite build` writes the client bundle and `dist/index.html`. The template [`index.html`](index.html) holds two markers: `<!--seo-->…<!--/seo-->` around the default title and description, and `<!--app-html-->` inside `<div id="app">`.
2. `vite build --ssr src/entry-server.ts --outDir dist-ssr` builds a Node bundle that exports `render(url)`, `prerenderPaths()` and `sitemapXml()`.
3. [`scripts/prerender.mjs`](scripts/prerender.mjs) loads that bundle and, for each path in `prerenderPaths()` (every fixed page in both languages, and every post in the languages it is written in):
   - renders the page with `renderToString` on a router in memory history, with the locale taken from the path;
   - replaces the `<!--seo-->` block with the page's head tags from `headTags()` in `src/seo.ts`;
   - sets `<html lang>` to `en` or `zh-Hant`, and puts the rendered HTML in place of `<!--app-html-->`;
   - writes `dist/index.html` for `/`, and `dist/<path>.html` for every other path (`dist/mcp.html`, `dist/zh/trust.html`), so Cloudflare serves `/mcp` as it is instead of redirecting to `/mcp/`, and the canonical URLs need no redirect;
   - converts the page's `<main>` to Markdown with [Turndown](https://github.com/mixmark-io/turndown) and writes it to the page's URL plus `.md` (`/mcp.md`, `/zh/trust.md`), or `index.md` for a home page.
4. It renders the 404 page in both languages to `dist/404.html` and `dist/zh/404.html`.
5. It writes `dist/sitemap.xml` from `sitemapXml()`, and `dist/llms.txt` and `dist/llms-full.txt` from `llmsIndex()` and `llmsFull()` in [`src/llms.ts`](src/llms.ts).

The script stops with an error if the template lacks either marker, if a rendered page has no `<h1>`, or if a page's Markdown has no title, is shorter than 100 characters (fixed pages only; a post may be one paragraph), still contains HTML, or names a Eisoptric Workbench release version such as `v1.2.3` (Eisoptric Workbench ships often, so the site links to the releases page instead).

In the browser, [`src/main.ts`](src/main.ts) uses `createSSRApp` in production, so Vue hydrates the prerendered HTML instead of drawing it again; the development server uses `createApp`. From then on the site navigates as a single-page app, and [`src/App.vue`](src/App.vue) calls `applyHead()` on every route or language change to keep the title, meta tags, canonical link and structured data in step.

## i18n

The two locales are `en` and `zh` (繁體中文, served as `zh-Hant`). The locale comes from the path: `/zh` and anything under `/zh/` is Chinese, the rest English. The language menu in the navigation bar switches to the same page in the other language with `localePath()`.

Copy lives in four files, each with an `en` and a `zh` side:

| File | What it holds |
| --- | --- |
| [`src/copy/`](src/copy) | Page copy, one file per page (`site.ts` holds the navigation, footer and other shared copy). Each section keeps its `en` and `zh` side by side |
| [`src/trust-paper/`](src/trust-paper) | The whitepaper on the Trust page, `en.ts` and `zh.ts` |
| [`src/legal/`](src/legal) | Terms of Service and Privacy Policy, `en.ts` and `zh.ts` |

[`src/i18n.ts`](src/i18n.ts) gathers the sections in `src/copy/` into one object per language, which components read through `useI18n()`.

**A new string.** Add the key in the same place under both `en` and `zh` of its section in `src/copy/`, then use it in a component through `useI18n()`:

```vue
<script setup lang="ts">
import { useI18n } from '../i18n'
const { t } = useI18n()
</script>

<template>
  <p>{{ t.appPage.newLine }}</p>
</template>
```

`t` is typed from both languages, so a key that exists in only one fails `vue-tsc` in `npm run build`.

**A new page.** Every page is one entry in [`src/page-table.ts`](src/page-table.ts): its English path, where its title and description live, its breadcrumb label and its sitemap priority. The routes, head tags, breadcrumbs, sitemap, Markdown copies, `llms.txt` and `llms-full.txt` all read that table.

1. Add a `<name>Page` section with at least `title` and `description` under both `en` and `zh`, in a new file in `src/copy/`, and add that file to the imports in `src/i18n.ts`.
2. Add an entry for the page to `PAGE_TABLE` in `src/page-table.ts`. The `/zh` path is derived from the English one.
3. Create the component in `src/pages/` and add it to `components` in `src/router.ts`. The type checker fails the build until you do.
4. Link it from `src/components/NavBar.vue` or `src/components/Footer.vue` with `localePath()`.

Chinese copy uses Taiwan terms and full-width punctuation, as the existing text does.

## SEO and structured data

[`src/seo.ts`](src/seo.ts) produces every page's head, for both the prerendered HTML (`headTags()`) and client-side navigation (`applyHead()`):

- **Canonical and alternates.** A canonical URL on `https://eisoptric.com`, `hreflang` links for `en` and `zh-Hant`, and `x-default` pointing at the English page.
- **Open Graph and Twitter cards.** Title, description, locale (`en_US` or `zh_TW`) and `og.png` at 1200 × 630, with alt text in the page's language.
- **Robots.** `index, follow, max-image-preview:large`.
- **JSON-LD.** One `@graph` per page with the `Organization` and `WebSite`, the page's `WebPage` (with a `BreadcrumbList` on every page but home), `FAQPage` on Home and Trust built from the FAQ copy, and `SoftwareApplication` entries for Eisoptric MCP (Home, MCP) and Eisoptric Workbench (Home, App).
- **Sitemap.** `sitemapXml()` lists every URL with its alternates, a priority per page, and the build date as `lastmod`.

Files that serve crawlers and language models:

| File | Purpose |
| --- | --- |
| `public/robots.txt` | Allows every crawler, names the AI crawlers explicitly, and points to the sitemap, `llms.txt` and the Markdown copies |
| `llms.txt` (generated) | A summary of Eisoptric, key facts, and a link to every page's Markdown copy in English and 中文 |
| `llms-full.txt` (generated) | Every page's Markdown in one file, including the whitepaper, Terms and Privacy |
| `<page>.md` (generated) | A Markdown copy of each page, linked from its HTML with `<link rel="alternate" type="text/markdown">` |
| `public/site.webmanifest` | Name, colours and icon |
| `public/.well-known/security.txt` | Where to report a vulnerability |

The Markdown copies, `llms.txt` and `llms-full.txt` are built from the rendered pages, so they change with the page copy. Only the summary and the facts at the top of `llms.txt` and `llms-full.txt` are written by hand, in [`src/llms.ts`](src/llms.ts).

### The OG image

`public/og.png` is drawn from [`scripts/og.html`](scripts/og.html) by [`scripts/og.mjs`](scripts/og.mjs) in a headless Chromium. It needs Playwright with a Chromium installed, and network access for Google Fonts. It takes the output path and a logo image as arguments:

```bash
node scripts/og.mjs public/og.png public/brand/eisoptric-mark-vellum.svg
```

The text on the image is set in the script.

## Security headers

[`public/_headers`](public/_headers) applies to every path:

| Header | Value |
| --- | --- |
| `Content-Security-Policy` | See below |
| `Strict-Transport-Security` | Two years, with subdomains |
| `X-Frame-Options` | `DENY` |
| `X-Content-Type-Options` | `nosniff` |
| `Referrer-Policy` | `no-referrer` |
| `Permissions-Policy` | Accelerometer, camera, geolocation, gyroscope, microphone, payment and USB turned off |

It also sets a `charset=utf-8` content type on `llms.txt`, `llms-full.txt`, `robots.txt`, `sitemap.xml` and `.well-known/security.txt`, and `text/markdown` on the `.md` copies.

The Content Security Policy allows scripts only from the site itself (`script-src 'self'`), styles from the site and Google Fonts, fonts from the site and `fonts.gstatic.com`, images from the site and `data:` URLs, and no frames, plugins or embedding in other sites.

**Changing it safely.** The policy has no `'unsafe-inline'`, hashes or nonces, and needs none today:

- The only inline `<script>` in the built pages is the JSON-LD block, `type="application/ld+json"`. Browsers do not execute it, so `script-src` does not apply to it.
- The app itself is the module script Vite emits as a separate file under `/assets/`.
- No template uses a `style="…"` attribute or a `:style` binding. Prerendering would write either into the HTML as an inline style attribute, which `style-src 'self'` blocks.

So keep scripts and styles in files. If something truly needs an inline script, add its SHA-256 hash to `script-src` instead of `'unsafe-inline'`, and recompute the hash whenever the script changes. Adding an outside service (analytics, a form endpoint, a font host) means adding its origin to the directive it uses, and nothing wider. After changing the policy, deploy and check the browser console on a few pages for CSP violations: `npm run preview` does not apply `_headers`.

## Writing a post

Posts are for shorter writing that is not a research note: progress on Shoggoth, working notes, announcements. Each post is a folder in [`src/posts/`](src/posts) named by its slug, which becomes its address (`/posts/<slug>`), holding `en.md`, `zh.md` or both:

```markdown
---
title: What we saw in the first 1,000 steps
description: One sentence for the post list, search results and social cards.
date: 2026-11-21
---

The body, in Markdown. Headings start at `##`.
```

That is all: the post list, the post's page, its head tags, the sitemap, the Markdown copy and `llms.txt` all pick it up on the next build. A post written in one language has no page in the other; the language switch on it goes to the other language's post list. The slug is lowercase letters, digits and `-`; the date is `YYYY-MM-DD`. Write Markdown, not HTML, because the Content Security Policy blocks inline styles and scripts.

## Editing legal text

The Terms of Service and the Privacy Policy are data in [`src/legal/`](src/legal), one file per language, rendered by `src/pages/LegalPage.vue`. Each document has a `title` and `description` for the head, a `crumb`, a `heading`, an `updated` date, a link to the other document, and `sections`. A section is a `heading` and a list of blocks:

| Block | Renders |
| --- | --- |
| `{ type: 'p', text }` | A paragraph |
| `{ type: 'ul', items }` · `{ type: 'ol', items }` | A bulleted or numbered list |
| `{ type: 'h3', text }` | A subheading |
| `{ type: 'table', head, rows }` | A table |

Text is plain: there is no HTML or Markdown in it. Status labels (`[Current]`, `[Fixed]`, `[Open]`, `[Planned]`, and 【現況】, 【已修正】, 【未解決】, 【規劃中】) are drawn as badges by `splitStatusBadges()` in `src/status-badges.ts`; the Trust whitepaper uses the same blocks and badges.

When you change one language, change the other in the same commit, and update `updated` in both.

## Deploy

```bash
npm run deploy
```

Builds the site and uploads `dist/` to the Worker `eisoptric-github-io`, as [`wrangler.jsonc`](wrangler.jsonc) describes. It needs a Wrangler login with access to that Worker (`npx wrangler login`), and uncommitted changes go live with it.

Cloudflare Workers Builds also builds and deploys the Worker from this repository on each push to its production branch, running `npm run build` and then `npx wrangler deploy`. Keep `wrangler.jsonc` in the repository: without it, `wrangler deploy` configures the project by itself, adds Cloudflare's Vite plugin, and that plugin breaks the SSR build the prerender step reads.

## github.io

The `gh-pages` branch serves eisoptric.github.io, which only redirects to eisoptric.com. GitHub does not let an organization's `.github.io` repository turn Pages off. The site source on `main` is not published from GitHub.

## Project layout

| Path | What it holds |
| --- | --- |
| `index.html` | The HTML template, with the `<!--seo-->` and `<!--app-html-->` markers |
| `src/main.ts` | The browser entry: creates the app and hydrates the prerendered HTML |
| `src/entry-server.ts` | The prerender entry: `render(url)`, and the paths and sitemap from `seo.ts` |
| `src/page-table.ts` | Every page: its path, title and description, breadcrumb label and sitemap priority |
| `src/router.ts` | The routes in both languages, built from the page table, and the 404 catch-alls |
| `src/App.vue` | The shell: navigation bar, page, footer, and head updates |
| `src/pages/` | One component per page; `LegalPage.vue` serves both Terms and Privacy |
| `src/components/` | Navigation bar, footer, breadcrumb, epigraph, section marks and the example policy |
| `src/copy/` | Page copy, one file per page, English and 中文 side by side |
| `src/i18n.ts` | The locale, `localePath()`, and `useI18n()` over the copy in `src/copy/` |
| `src/trust-paper/` | The system whitepaper shown on the Trust page |
| `src/legal/` | Terms of Service and Privacy Policy |
| `src/status-badges.ts` | Draws the status labels in the whitepaper and the legal text as badges |
| `src/seo.ts` | Canonical URLs, structured data and the sitemap |
| `src/llms.ts` | The summary and facts for language models, and how `llms.txt` and `llms-full.txt` are put together |
| `src/config.ts` | Site, console, contact, GitHub, download and Donate links |
| `src/styles/` | The site's styles: `index.css` imports the rest in cascade order, from `tokens.css` to `header.css`. Each file builds on and overrides the ones before it, so keep the order |
| `public/` | Files served as-is: `_headers`, `robots.txt`, `.well-known/security.txt`, the web manifest, icons and `og.png` |
| `public/brand/` | The logo files from the official Eisoptric brand kit, served as-is at `/brand/` for anyone who needs the mark, together with the kit itself as `eisoptric-brand-kit.zip`. The Brand page (`src/copy/brand.ts`) summarises the kit's guide; when the kit changes, update the files and that page together. `favicon.svg`, `favicon.png` and `apple-touch-icon.png` are copies of its Vellum favicon and icon. Replace them from the kit, never by hand |
| `scripts/prerender.mjs` | Writes the prerendered pages, their Markdown copies, the sitemap, `llms.txt` and `llms-full.txt` |
| `scripts/og.html`, `scripts/og.mjs` | Draw `public/og.png` |

## License

Copyright © 2026 Rick Weng. All rights reserved. This repository is not open-source licensed: see [`LICENSE`](LICENSE).
