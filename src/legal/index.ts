import type { Locale } from '../i18n'
import { en } from './en'
import { zh } from './zh'

// The Terms of Service and the Privacy Policy, one file per language. Text is plain: no HTML or Markdown.
// When you change one language, change the other in the same commit, and update `updated` in both.

export type LegalBlock =
  | { type: 'p'; text: string }
  | { type: 'ul'; items: readonly string[] }
  | { type: 'ol'; items: readonly string[] }
  | { type: 'h3'; text: string }
  | { type: 'table'; head: readonly string[]; rows: readonly (readonly string[])[] }

export type LegalSection = {
  heading: string
  blocks: readonly LegalBlock[]
}

export type LegalDoc = {
  title: string
  description: string
  crumb: string
  heading: string
  updated: string
  relatedPath: '/terms' | '/privacy'
  relatedLabel: string
  sections: readonly LegalSection[]
}

export const legalCopy: Record<Locale, { terms: LegalDoc; privacy: LegalDoc }> = { en, zh }
