import type { Locale } from '../i18n'
import type { LegalSection } from '../legal'
import { en } from './en'
import { zh } from './zh'

// The Eisoptric MCP Gateway system whitepaper shown on the Trust page, one file per language.
// It uses the legal text's blocks and status badges.

export type TrustPaper = {
  eyebrow: string
  heading: string
  updated: string
  lede: string
  sections: readonly LegalSection[]
}

export const trustPaper: Record<Locale, TrustPaper> = { en, zh }
