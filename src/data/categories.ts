export type Category = {
  id: string
  name: string
  tagline: string
  savings: string
  savingsUnit: string
  icon: string
  /** Deep link to the live comparison calculator (affiliate-backed). */
  href: string
  /** Keywords the AI assistant matches against a free-text query. */
  keywords: string[]
  accent: 'blue' | 'violet' | 'gold'
}

const BASE = 'https://checkyourtarif.de'

export const CATEGORIES: Category[] = [
  {
    id: 'strom',
    name: 'Strom',
    tagline: 'Über 330 Stromtarife in Sekunden gegenübergestellt.',
    savings: '850',
    savingsUnit: '€ / Jahr',
    icon: 'bolt',
    href: `${BASE}/stromvergleich`,
    keywords: ['strom', 'stromtarif', 'stromanbieter', 'kwh', 'elektrizitaet', 'power'],
    accent: 'gold',
  },
  {
    id: 'gas',
    name: 'Gas',
    tagline: 'Gaspreise regional vergleichen und dauerhaft sparen.',
    savings: '1.000',
    savingsUnit: '€ / Jahr',
    icon: 'flame',
    href: `${BASE}/gasvergleich`,
    keywords: ['gas', 'gastarif', 'gasanbieter', 'erdgas', 'heizen'],
    accent: 'gold',
  },
  {
    id: 'dsl',
    name: 'DSL & Internet',
    tagline: 'Highspeed-Internet zum Bestpreis mit Cashback.',
    savings: '385',
    savingsUnit: '€ Cashback',
    icon: 'wifi',
    href: `${BASE}/dsl`,
    keywords: ['dsl', 'internet', 'glasfaser', 'kabel', 'wlan', 'router', 'highspeed'],
    accent: 'blue',
  },
  {
    id: 'handy',
    name: 'Handytarife',
    tagline: 'Allnet-Flat, Datenflat und Handy mit Vertrag.',
    savings: '50',
    savingsUnit: '% Rabatt',
    icon: 'phone',
    href: `${BASE}/handytarife`,
    keywords: ['handy', 'mobilfunk', 'allnet', 'flat', 'sim', 'vertrag', 'smartphone', 'tarif'],
    accent: 'blue',
  },
  {
    id: 'kfz',
    name: 'Kfz-Versicherung',
    tagline: 'In 5 Minuten zum günstigen Kfz-Tarif. 1-Klick-Kündigung.',
    savings: '420',
    savingsUnit: '€ / Jahr',
    icon: 'shield',
    href: `${BASE}/kfz-versicherung`,
    keywords: ['kfz', 'auto', 'versicherung', 'haftpflicht', 'vollkasko', 'fahrzeug', 'pkw'],
    accent: 'violet',
  },
  {
    id: 'kredit',
    name: 'Online-Kredit',
    tagline: 'Ratenkredit, Autokredit und Minikredit fair vergleichen.',
    savings: '2.1',
    savingsUnit: '% eff. Zins',
    icon: 'bank',
    href: `${BASE}/online-kredit`,
    keywords: ['kredit', 'darlehen', 'finanzierung', 'raten', 'zins', 'autokredit', 'geld'],
    accent: 'violet',
  },
  {
    id: 'laptop',
    name: 'Laptops',
    tagline: 'Premium-Notebooks mit Vertrag, ab 0 € Anzahlung.',
    savings: '480',
    savingsUnit: '€ Ersparnis',
    icon: 'laptop',
    href: `${BASE}/top-deals`,
    keywords: ['laptop', 'notebook', 'macbook', 'ultrabook', 'computer', 'pc'],
    accent: 'blue',
  },
  {
    id: 'tv',
    name: 'Fernseher',
    tagline: 'OLED- und 4K-TVs bequem mit monatlicher Rate.',
    savings: '350',
    savingsUnit: '€ Ersparnis',
    icon: 'tv',
    href: `${BASE}/top-deals`,
    keywords: ['tv', 'fernseher', 'oled', 'qled', '4k', 'smart tv', 'television'],
    accent: 'violet',
  },
  {
    id: 'tablet',
    name: 'Tablets',
    tagline: 'Tablets mit 5G und Datenflat im Vertrag.',
    savings: '260',
    savingsUnit: '€ Ersparnis',
    icon: 'tablet',
    href: `${BASE}/top-deals`,
    keywords: ['tablet', 'ipad', 'galaxy tab', 'surface'],
    accent: 'gold',
  },
  {
    id: 'paket',
    name: 'Pauschalreisen',
    tagline: 'Urlaubsreisen inkl. Flug & Hotel zum Bestpreis vergleichen.',
    savings: '163',
    savingsUnit: '€ p. P.',
    icon: 'plane',
    href: `${BASE}/pauschalreisen`,
    keywords: ['reise', 'urlaub', 'pauschalreise', 'hotel', 'flug', 'ferien', 'last minute'],
    accent: 'blue',
  },
]

export const EXTRA_LINKS: { label: string; href: string }[] = [
  { label: 'Privathaftpflicht', href: `${BASE}/privathaftpflicht` },
  { label: 'Zahnzusatzversicherung', href: `${BASE}/zahnzusatz` },
  { label: 'Gratis SIM-Karten', href: `${BASE}/gratis-simkarten` },
  { label: 'Top-Deals', href: `${BASE}/top-deals` },
  { label: 'Girokonto', href: `${BASE}/girokonto` },
  { label: 'Kündigungshilfe', href: `${BASE}/kuendigungshilfe` },
]

/** Full category tile set for the mega grid (Check24-style breadth). */
export type Tile = { name: string; icon: string; href: string; hot?: boolean }

export const TILES: Tile[] = [
  { name: 'Strom', icon: 'bolt', href: `${BASE}/stromvergleich`, hot: true },
  { name: 'Gas', icon: 'flame', href: `${BASE}/gasvergleich` },
  { name: 'DSL & Internet', icon: 'wifi', href: `${BASE}/dsl`, hot: true },
  { name: 'Handytarife', icon: 'phone', href: `${BASE}/handytarife`, hot: true },
  { name: 'Laptops', icon: 'laptop', href: `${BASE}/top-deals`, hot: true },
  { name: 'Fernseher', icon: 'tv', href: `${BASE}/top-deals` },
  { name: 'Tablets', icon: 'tablet', href: `${BASE}/top-deals` },
  { name: 'Flüge', icon: 'plane', href: '#/flug', hot: true },
  { name: 'Kfz-Versicherung', icon: 'car', href: `${BASE}/kfz-versicherung` },
  { name: 'Ratenkredit', icon: 'bank', href: `${BASE}/online-kredit` },
  { name: 'Girokonto', icon: 'card', href: `${BASE}/girokonto` },
  { name: 'Tagesgeld', icon: 'piggy', href: `${BASE}/tagesgeld` },
  { name: 'Privathaftpflicht', icon: 'shield', href: `${BASE}/privathaftpflicht` },
  { name: 'Zahnzusatz', icon: 'tooth', href: `${BASE}/zahnzusatz` },
  { name: 'Hausrat', icon: 'home', href: `${BASE}/hausrat` },
  { name: 'Reiseversicherung', icon: 'plane', href: `${BASE}/auslandskranken` },
  { name: 'Hundehaftpflicht', icon: 'paw', href: `${BASE}/hundehaftpflichtversicherung` },
  { name: 'Kreditkarte', icon: 'card', href: `${BASE}/studentenkreditkarte` },
  { name: 'Baufinanzierung', icon: 'home', href: `${BASE}/baufinanzierung` },
  { name: 'Handy mit Vertrag', icon: 'phone', href: `${BASE}/handy-mit-vertrag` },
]
