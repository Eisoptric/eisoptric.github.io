// Status labels in the whitepaper and the legal text ([Current], 【已修正】 and so on) are drawn as badges.
// splitStatusBadges() cuts a line of plain text into runs of text and badges.

export type BadgeKind = 'current' | 'fixed' | 'open' | 'planned'

export type TextSegment = { badge: false; text: string } | { badge: true; kind: BadgeKind; text: string }

const BADGE_RE =
  /(【(?:現況|已修正|未解決|規劃中)】|\[(?:Current|Fixed|Open|Planned)\]|^(?:Current|Fixed|Open|Planned)$|(?:^|(?<=\s))(?:Current|Fixed|Open|Planned)(?=\s*[:：—–-]))/g

function badgeKindFor(raw: string): { kind: BadgeKind; label: string } {
  const cleaned = raw.replace(/^\[|\]$/g, '')
  if (cleaned === '【現況】' || cleaned === 'Current') return { kind: 'current', label: cleaned }
  if (cleaned === '【已修正】' || cleaned === 'Fixed') return { kind: 'fixed', label: cleaned }
  if (cleaned === '【未解決】' || cleaned === 'Open') return { kind: 'open', label: cleaned }
  return { kind: 'planned', label: cleaned }
}

export function splitStatusBadges(text: string): TextSegment[] {
  const out: TextSegment[] = []
  let lastIndex = 0
  for (const match of text.matchAll(BADGE_RE)) {
    const idx = match.index ?? 0
    if (idx > lastIndex) {
      out.push({ badge: false, text: text.slice(lastIndex, idx) })
    }
    const { kind, label } = badgeKindFor(match[0])
    out.push({ badge: true, kind, text: label })
    lastIndex = idx + match[0].length
  }
  if (lastIndex < text.length) {
    out.push({ badge: false, text: text.slice(lastIndex) })
  }
  return out.length ? out : [{ badge: false, text }]
}
