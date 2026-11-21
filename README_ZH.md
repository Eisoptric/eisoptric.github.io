<div align="center">

<img src="public/favicon.png" alt="Eisoptric" width="112" height="112" />

# Eisoptric 網站

**[eisoptric.com](https://eisoptric.com) 的原始碼。**

首頁、Eisoptric MCP、Eisoptric Workbench、Trust（含白皮書）、支持我們、品牌識別、服務條款與隱私權政策，提供英文與繁體中文，並預先渲染成靜態 HTML。

![Vue](https://img.shields.io/badge/Vue-3.5-4FC08D.svg?logo=vuedotjs&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF.svg?logo=vite&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6.svg?logo=typescript&logoColor=white)
![Cloudflare Workers](https://img.shields.io/badge/hosted%20on-Cloudflare%20Workers-F38020.svg?logo=cloudflareworkers&logoColor=white)

[頁面](#頁面) · [快速開始](#快速開始) · [預先渲染](#預先渲染的運作方式) · [多語系](#多語系) · [SEO](#seo-與結構化資料) · [安全標頭](#安全標頭) · [部署](#部署) · [English](README.md)

</div>

---

以 Vue 3、Vite 與 TypeScript 建置。每個頁面都預先渲染成靜態 HTML，由 Cloudflare Worker 以靜態資源提供（[`wrangler.jsonc`](wrangler.jsonc)）。網站沒有伺服器端程式碼：`dist/` 的建置產出就是整個網站。

## 頁面

每個頁面都有兩份：一份在英文路徑，一份在 `/zh` 底下，為繁體中文。頁面列在 [`src/page-table.ts`](src/page-table.ts)，[`src/router.ts`](src/router.ts) 依它產生路由。

| 英文 | 中文 | 元件 | 內容 |
| --- | --- | --- | --- |
| `/` | `/zh` | `HomePage.vue` | 研究問題、三條研究主線、最新研究筆記（第一篇發表前為佔位）、研究途中做出來的工具（`#tools`）、我們怎麼做研究、常見問題（`#faq`）與追蹤 GitHub 的行動呼籲 |
| `/research` | `/zh/research` | `ResearchPage.vue` | 研究方向（`#agenda`）、研究筆記列表（`#notes`，目前為佔位）與每篇筆記包含的內容 |
| `/posts` | `/zh/posts` | `PostsPage.vue` | 文章，由新到舊：還不到研究筆記程度的較短文字。沒有這個語言版本的文章，會以它既有的語言列出並加上標示 |
| `/posts/<slug>` | `/zh/posts/<slug>` | `PostPage.vue` | 單篇文章，由 `src/posts/` 裡的 Markdown 渲染。文章只存在於它寫成的語言 |
| `/shoggoth` | `/zh/shoggoth` | `ShoggothPage.vue` | Eisoptric 自己的小型模型 Shoggoth（準備中）：名字與走向可理解的猶格索托斯的使命（`#name`）、Shoggoth 與受控對照變體（`#series`）、每個模型會一起釋出什麼（`#release`），以及為什麼是小模型（`#scale`） |
| `/about` | `/zh/about` | `AboutPage.vue` | 使命、我們是誰、為什麼做工具，以及聯絡方式（`#contact`） |
| `/mcp` | `/zh/mcp` | `McpPage.vue` | Eisoptric MCP，也就是 Gateway：政策範例、四個設定步驟、使用情境、功能、安全、為什麼需要專屬 Gateway 與主控台 |
| `/app` | `/zh/app` | `AppPage.vue` | Eisoptric Workbench，AI 研究工作台：GitHub 儲存庫連結、發行版本連結、功能與系統需求 |
| `/trust` | `/zh/trust` | `TrustPage.vue` | 金鑰、原始內容與憑證如何受到保護、常見問題、系統白皮書（`#whitepaper`）與漏洞回報（`#disclosure`） |
| `/support` | `/zh/support` | `SupportPage.vue` | 為什麼獨立研究需要支持（`#why`）、支持會用在哪裡（`#funds`）、可以怎麼幫忙（`#ways`），以及支持不會改變的事（`#principles`），附 GitHub Sponsors 與電子郵件連結 |
| `/brand` | `/zh/brand` | `BrandPage.vue` | 給外部讀者的品牌與媒體資源，內容取自官方素材包：名稱（`#names`）、標誌與使用方式（`#mark`）、可下載的標誌檔（`#files`）、色彩（`#colour`）、字體（`#type`），以及可供引用的 Eisoptric 簡介與名稱、標誌的使用條件（`#about`），並可下載整份素材包 |
| `/terms` | `/zh/terms` | `LegalPage.vue` | 服務條款 |
| `/privacy` | `/zh/privacy` | `LegalPage.vue` | 隱私權政策 |

App 頁連到 [`src/config.ts`](src/config.ts) 的 `RELEASES_URL`。Eisoptric Workbench 的版本都是 pre-release，檔名也含版本號，所以固定的 `/releases/latest` 網址指不到它們。「開始使用」按鈕連到 `console.eisoptric.com` 的主控台。

其他任何路徑都是 404。建置時會把 [`NotFoundPage.vue`](src/pages/NotFoundPage.vue) 預先渲染成 `dist/404.html` 與 `dist/zh/404.html`。Cloudflare 會以狀態碼 404 提供最近的 `404.html`，所以 `/zh/任何路徑` 會拿到中文頁。網站沒有 `/* /index.html 200` 這條後備規則，因為它會讓每個不存在的路徑都回 200 和首頁。404 頁設有 `noindex`、沒有 canonical 網址，也不在 sitemap 與 `llms.txt` 裡。在瀏覽器裡，路由器的萬用路由會顯示同一個頁面。

## 快速開始

需要 [Node.js](https://nodejs.org) 22（版本固定在 `.node-version`）。

```bash
npm install
npm run dev
```

`npm run dev` 以 Vite 開發伺服器提供網站，支援熱更新。開發模式只在瀏覽器端渲染；預先渲染只在 `npm run build` 進行。

## 指令

| 指令 | 作用 |
| --- | --- |
| `npm run dev` | 啟動 Vite 開發伺服器 |
| `npm run build` | 型別檢查（`vue-tsc -b`）、把用戶端建置到 `dist/`、從 `src/entry-server.ts` 建置伺服器端套件到 `dist-ssr/`，再執行 `scripts/prerender.mjs`，把每個頁面與 `sitemap.xml` 寫入 `dist/` |
| `npm run preview` | 以 `vite preview` 在本機提供 `dist/`。這裡不會套用 Cloudflare 的 `_headers` 與 404 處理；`npx wrangler dev` 兩者都會套用 |
| `npm run deploy` | 執行 `npm run build`，再執行 `wrangler deploy` |
| `npm run format` | 以 Prettier 格式化所有檔案 |
| `npm run lint` | 執行 ESLint |
| `npm run check` | 檢查格式、lint 與型別，不改動任何檔案。GitHub Actions 會在每個 pull request 執行它與 `npm run build`（[`.github/workflows/check.yml`](.github/workflows/check.yml)） |

`dist/` 與 `dist-ssr/` 是建置產出，git 會忽略。

## 預先渲染的運作方式

1. `vite build` 寫出用戶端套件與 `dist/index.html`。範本 [`index.html`](index.html) 有兩個標記：包住預設標題與描述的 `<!--seo-->…<!--/seo-->`，以及 `<div id="app">` 裡的 `<!--app-html-->`。
2. `vite build --ssr src/entry-server.ts --outDir dist-ssr` 建置一個 Node 套件，匯出 `render(url)`、`prerenderPaths()` 與 `sitemapXml()`。
3. [`scripts/prerender.mjs`](scripts/prerender.mjs) 載入這個套件，對 `prerenderPaths()` 的每個路徑（每個固定頁面的兩種語言，以及每篇文章已寫成的語言）：
   - 以記憶體歷程的路由器、依路徑決定的語系，用 `renderToString` 渲染頁面；
   - 以 `src/seo.ts` 的 `headTags()` 產生的 head 標籤取代 `<!--seo-->` 區塊；
   - 把 `<html lang>` 設為 `en` 或 `zh-Hant`，並以渲染出的 HTML 取代 `<!--app-html-->`；
   - `/` 寫到 `dist/index.html`，其他路徑寫到 `dist/<路徑>.html`（`dist/mcp.html`、`dist/zh/trust.html`），讓 Cloudflare 直接以 `/mcp` 提供頁面，不轉址到 `/mcp/`，canonical 網址也就不需要轉址；
   - 以 [Turndown](https://github.com/mixmark-io/turndown) 把頁面的 `<main>` 轉成 Markdown，寫到頁面網址加上 `.md` 的位置（`/mcp.md`、`/zh/trust.md`），首頁則是 `index.md`。
4. 把兩種語言的 404 頁渲染成 `dist/404.html` 與 `dist/zh/404.html`。
5. 以 `sitemapXml()` 寫出 `dist/sitemap.xml`，並以 [`src/llms.ts`](src/llms.ts) 的 `llmsIndex()` 與 `llmsFull()` 寫出 `dist/llms.txt` 與 `dist/llms-full.txt`。

範本缺少任一標記、渲染出的頁面沒有 `<h1>`，或頁面的 Markdown 沒有標題、少於 100 個字元（只檢查固定頁面；文章可以只有一段）、仍含有 HTML，或寫出 `v1.2.3` 這類 Eisoptric Workbench 版號（App 經常更新，網站一律連到 releases 頁面），指令碼都會報錯停止。

在瀏覽器裡，[`src/main.ts`](src/main.ts) 在正式環境使用 `createSSRApp`，因此 Vue 會 hydrate 預先渲染的 HTML，而不是重新繪製；開發伺服器則用 `createApp`。之後網站以單頁應用程式的方式切換頁面，[`src/App.vue`](src/App.vue) 在每次路由或語言改變時呼叫 `applyHead()`，讓標題、meta 標籤、canonical 連結與結構化資料保持一致。

## 多語系

兩個語系是 `en` 與 `zh`（繁體中文，以 `zh-Hant` 提供）。語系由路徑決定：`/zh` 及 `/zh/` 底下的路徑是中文，其餘是英文。導覽列的語言選單以 `localePath()` 切換到另一種語言的同一頁。

文案放在以下位置，每處都有 `en` 與 `zh` 兩邊：

| 檔案 | 內容 |
| --- | --- |
| [`src/copy/`](src/copy) | 頁面文案，每頁一個檔案（導覽、頁尾等共用文案在 `site.ts`）。每個區塊的 `en` 與 `zh` 並排放在一起 |
| [`src/trust-paper/`](src/trust-paper) | Trust 頁面上的白皮書，分成 `en.ts` 與 `zh.ts` |
| [`src/legal/`](src/legal) | 服務條款與隱私權政策，分成 `en.ts` 與 `zh.ts` |

[`src/i18n.ts`](src/i18n.ts) 把 `src/copy/` 的各區塊組成每種語言一個物件，元件透過 `useI18n()` 讀取。

**新增一段文字。** 在 `src/copy/` 對應區塊的 `en` 與 `zh` 底下、相同位置加上同一個鍵，再在元件裡透過 `useI18n()` 使用：

```vue
<script setup lang="ts">
import { useI18n } from '../i18n'
const { t } = useI18n()
</script>

<template>
  <p>{{ t.appPage.newLine }}</p>
</template>
```

`t` 的型別取自兩種語言，因此只存在於一種語言的鍵，會讓 `npm run build` 裡的 `vue-tsc` 失敗。

**新增一個頁面。** 每個頁面都是 [`src/page-table.ts`](src/page-table.ts) 裡的一筆資料：英文路徑、標題與描述的來源、麵包屑標籤，以及 sitemap 優先順序。路由、head 標籤、麵包屑、sitemap、Markdown 版本、`llms.txt` 與 `llms-full.txt` 都讀這張表。

1. 在 `src/copy/` 新增一個檔案，放入 `<名稱>Page` 區塊，`en` 與 `zh` 底下至少都要有 `title` 與 `description`，再把這個檔案加進 `src/i18n.ts` 的 import。
2. 在 `src/page-table.ts` 的 `PAGE_TABLE` 加上這個頁面。`/zh` 路徑會從英文路徑自動產生。
3. 在 `src/pages/` 建立元件，並加進 `src/router.ts` 的 `components`。沒加的話，型別檢查會讓建置失敗。
4. 用 `localePath()` 從 `src/components/NavBar.vue` 或 `src/components/Footer.vue` 連過去。

中文文案沿用現有用法：台灣用語、全形標點。

## SEO 與結構化資料

[`src/seo.ts`](src/seo.ts) 產生每一頁的 head，預先渲染的 HTML 用 `headTags()`，瀏覽器端切換頁面用 `applyHead()`：

- **Canonical 與替代語言。** 以 `https://eisoptric.com` 為準的 canonical URL、`en` 與 `zh-Hant` 的 `hreflang` 連結，以及指向英文頁的 `x-default`。
- **Open Graph 與 Twitter 卡片。** 標題、描述、語系（`en_US` 或 `zh_TW`），以及 1200 × 630 的 `og.png`，替代文字使用該頁的語言。
- **Robots。** `index, follow, max-image-preview:large`。
- **JSON-LD。** 每頁一個 `@graph`，包含 `Organization` 與 `WebSite`、該頁的 `WebPage`（首頁以外都附 `BreadcrumbList`）、首頁與 Trust 由常見問題文案產生的 `FAQPage`，以及 Eisoptric MCP（首頁、MCP）與 Eisoptric Workbench（首頁、App）的 `SoftwareApplication`。
- **Sitemap。** `sitemapXml()` 列出每個網址及其替代語言、每頁的優先順序，並以建置日期作為 `lastmod`。

提供給搜尋引擎爬蟲與語言模型的檔案：

| 檔案 | 用途 |
| --- | --- |
| `public/robots.txt` | 允許所有爬蟲、逐一列出 AI 爬蟲，並指向 sitemap、`llms.txt` 與 Markdown 版本 |
| `llms.txt`（建置產生） | Eisoptric 的摘要、重要資訊，以及每個頁面中英文 Markdown 版本的連結 |
| `llms-full.txt`（建置產生） | 所有頁面的 Markdown 合併成一個檔案，包含白皮書、服務條款與隱私權政策 |
| `<頁面>.md`（建置產生） | 每個頁面的 Markdown 版本，HTML 以 `<link rel="alternate" type="text/markdown">` 指向它 |
| `public/site.webmanifest` | 名稱、顏色與圖示 |
| `public/.well-known/security.txt` | 漏洞回報的聯絡方式 |

Markdown 版本、`llms.txt` 與 `llms-full.txt` 都由渲染出的頁面產生，會跟著頁面文案一起更新。只有 `llms.txt` 與 `llms-full.txt` 開頭的摘要與重要資訊是手寫的，放在 [`src/llms.ts`](src/llms.ts)。

### OG 圖片

`public/og.png` 由 [`scripts/og.mjs`](scripts/og.mjs) 在無頭 Chromium 中渲染 [`scripts/og.html`](scripts/og.html) 產生。需要安裝 Playwright 與 Chromium，並能連上 Google Fonts。它接受輸出路徑與一張 logo 圖片作為參數：

```bash
node scripts/og.mjs public/og.png public/brand/eisoptric-mark-vellum.svg
```

圖片上的文字寫在指令碼裡。

## 安全標頭

[`public/_headers`](public/_headers) 套用到所有路徑：

| 標頭 | 值 |
| --- | --- |
| `Content-Security-Policy` | 見下方 |
| `Strict-Transport-Security` | 兩年，含子網域 |
| `X-Frame-Options` | `DENY` |
| `X-Content-Type-Options` | `nosniff` |
| `Referrer-Policy` | `no-referrer` |
| `Permissions-Policy` | 關閉加速度計、相機、定位、陀螺儀、麥克風、付款與 USB |

它也為 `llms.txt`、`llms-full.txt`、`robots.txt`、`sitemap.xml` 與 `.well-known/security.txt` 設定 `charset=utf-8` 的內容類型，並為 `.md` 版本設定 `text/markdown`。

Content Security Policy 只允許來自網站本身的指令碼（`script-src 'self'`）、來自網站本身與 Google Fonts 的樣式、來自網站本身與 `fonts.gstatic.com` 的字型、來自網站本身與 `data:` 網址的圖片，並禁止 frame、外掛，以及被其他網站嵌入。

**安全地修改。** 這份政策沒有 `'unsafe-inline'`、雜湊值或 nonce，目前也都不需要：

- 建置出的頁面裡唯一的內嵌 `<script>` 是 JSON-LD 區塊，`type="application/ld+json"`。瀏覽器不會執行它，所以 `script-src` 不適用。
- 應用程式本身是 Vite 輸出到 `/assets/` 底下的獨立 module 指令碼。
- 沒有任何範本使用 `style="…"` 屬性或 `:style` 綁定。預先渲染會把兩者都寫成 HTML 的內嵌樣式屬性，而 `style-src 'self'` 會擋下它。

所以請把指令碼與樣式放在檔案裡。如果真的需要內嵌指令碼，請把它的 SHA-256 雜湊加進 `script-src`，不要用 `'unsafe-inline'`，而且指令碼每次修改都要重新計算雜湊。加入外部服務（分析、表單端點、字型來源）時，只把它的來源加到它用到的那一項指令，不要放寬更多。修改政策後，請部署並在幾個頁面的瀏覽器主控台檢查有沒有 CSP 違規：`npm run preview` 不會套用 `_headers`。

## 撰寫文章

文章用來發表還不到研究筆記程度的較短文字：Shoggoth 的進度、工作筆記、公告。每篇文章是 [`src/posts/`](src/posts) 裡以 slug 命名的資料夾，slug 就是它的網址（`/posts/<slug>`），裡面放 `en.md`、`zh.md` 或兩者：

```markdown
---
title: 前 1,000 步我們觀察到什麼
description: 一句話，用在文章列表、搜尋結果與社群卡片。
date: 2026-11-21
---

內文用 Markdown 撰寫，小標從 `##` 開始。
```

這樣就完成了：下一次建置時，文章列表、文章頁、head 標籤、sitemap、Markdown 版本與 `llms.txt` 都會自動收錄。只寫一種語言的文章，在另一種語言沒有頁面；在它上面切換語言，會到另一種語言的文章列表。slug 只用小寫字母、數字與 `-`；日期格式是 `YYYY-MM-DD`。請寫 Markdown 而不是 HTML，因為 Content Security Policy 會擋下行內樣式與指令碼。

## 編輯法律條文

服務條款與隱私權政策是 [`src/legal/`](src/legal) 裡的資料，每種語言一個檔案，由 `src/pages/LegalPage.vue` 渲染。每份文件有 head 用的 `title` 與 `description`、`crumb`、`heading`、`updated` 日期、另一份文件的連結，以及 `sections`。每個章節是一個 `heading` 加上一串區塊：

| 區塊 | 渲染為 |
| --- | --- |
| `{ type: 'p', text }` | 段落 |
| `{ type: 'ul', items }` · `{ type: 'ol', items }` | 項目符號或編號清單 |
| `{ type: 'h3', text }` | 小標題 |
| `{ type: 'table', head, rows }` | 表格 |

內文是純文字：不含 HTML 或 Markdown。狀態標籤（`[Current]`、`[Fixed]`、`[Open]`、`[Planned]`，以及【現況】、【已修正】、【未解決】、【規劃中】）由 `src/status-badges.ts` 的 `splitStatusBadges()` 繪製成徽章；Trust 白皮書使用相同的區塊與徽章。

改了一種語言，請在同一個 commit 裡改另一種，並更新兩邊的 `updated`。

## 部署

```bash
npm run deploy
```

建置網站，並依 [`wrangler.jsonc`](wrangler.jsonc) 把 `dist/` 上傳到 Worker `eisoptric-github-io`。需要有權存取該 Worker 的 Wrangler 登入（`npx wrangler login`），未 commit 的變更也會一起上線。

Cloudflare Workers Builds 也會在每次推送到正式分支時，從這個 repo 建置並部署 Worker：先執行 `npm run build`，再執行 `npx wrangler deploy`。請保留 repo 裡的 `wrangler.jsonc`：少了它，`wrangler deploy` 會自行設定專案、加入 Cloudflare 的 Vite plugin，而這個 plugin 會弄壞預渲染所需的 SSR 建置。

## github.io

`gh-pages` 分支提供 eisoptric.github.io，它只會轉址到 eisoptric.com。GitHub 不允許組織的 `.github.io` 儲存庫關閉 Pages。`main` 上的網站原始碼不由 GitHub 發佈。

## 專案結構

| 路徑 | 內容 |
| --- | --- |
| `index.html` | HTML 範本，含 `<!--seo-->` 與 `<!--app-html-->` 標記 |
| `src/main.ts` | 瀏覽器端進入點：建立應用程式並 hydrate 預先渲染的 HTML |
| `src/entry-server.ts` | 預先渲染的進入點：`render(url)`，以及來自 `seo.ts` 的路徑與 sitemap |
| `src/page-table.ts` | 所有頁面：路徑、標題與描述、麵包屑標籤與 sitemap 優先順序 |
| `src/router.ts` | 依頁面表產生的兩種語言路由，以及 404 的萬用路由 |
| `src/App.vue` | 外框：導覽列、頁面、頁尾，以及 head 更新 |
| `src/pages/` | 每個頁面一個元件；`LegalPage.vue` 同時負責服務條款與隱私權政策 |
| `src/components/` | 導覽列、頁尾、麵包屑、題辭、章節記號與政策範例 |
| `src/copy/` | 頁面文案，每頁一個檔案，英文與中文並排 |
| `src/i18n.ts` | 語系、`localePath()`，以及讀取 `src/copy/` 的 `useI18n()` |
| `src/trust-paper/` | Trust 頁面上的系統白皮書 |
| `src/legal/` | 服務條款與隱私權政策 |
| `src/status-badges.ts` | 把白皮書與法律條文裡的狀態標籤繪製成徽章 |
| `src/seo.ts` | Canonical URL、結構化資料與 sitemap |
| `src/llms.ts` | 給語言模型的摘要與重要資訊，以及 `llms.txt` 與 `llms-full.txt` 的組成方式 |
| `src/config.ts` | 網站、主控台、聯絡信箱、GitHub、下載與贊助連結 |
| `src/styles/` | 網站樣式：`index.css` 依層疊順序匯入其他檔案，從 `tokens.css` 到 `header.css`。後面的檔案建立在前面之上並覆寫它們，所以請保持順序 |
| `public/` | 原樣提供的檔案：`_headers`、`robots.txt`、`.well-known/security.txt`、web manifest、圖示與 `og.png` |
| `public/brand/` | 官方 Eisoptric 品牌素材包裡的標誌檔，原樣放在 `/brand/` 供需要標誌的人取用，素材包本身也以 `eisoptric-brand-kit.zip` 放在這裡。品牌識別頁（`src/copy/brand.ts`）是素材包指南的摘要；素材包更新時，請同時更新檔案與這一頁。`favicon.svg`、`favicon.png` 與 `apple-touch-icon.png` 是其中 Vellum 版 favicon 與 icon 的複本。要更新請從素材包替換，不要手改 |
| `scripts/prerender.mjs` | 寫出預先渲染的頁面、各頁的 Markdown 版本、sitemap、`llms.txt` 與 `llms-full.txt` |
| `scripts/og.html`、`scripts/og.mjs` | 繪製 `public/og.png` |

## 授權

Copyright © 2026 Rick Weng。版權所有。本儲存庫未採用開放原始碼授權，詳見 [`LICENSE`](LICENSE)。
