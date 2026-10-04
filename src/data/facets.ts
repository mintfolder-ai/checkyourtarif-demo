export type Facet =
  | { id: string; label: string; kind: 'price'; max: number; step: number; unit: string }
  | { id: string; label: string; kind: 'rating' }
  | { id: string; label: string; kind: 'provider' }
  | { id: string; label: string; kind: 'range'; field: 'dataGB' | 'speedMbit' | 'ramGB' | 'storageGB' | 'screenInch'; max: number; step: number; unit: string }
  | { id: string; label: string; kind: 'check'; options: { value: string; label: string }[] }

const CONTRACT: Facet = {
  id: 'laufzeit', label: 'Vertragslaufzeit', kind: 'check',
  options: [
    { value: 'flexibel', label: 'Monatlich kündbar' },
    { value: 'preisgarantie', label: 'Mit Preisgarantie' },
  ],
}

export const FACETS: Record<string, Facet[]> = {
  strom: [
    { id: 'preis', label: 'Max. Preis pro Monat', kind: 'price', max: 110, step: 1, unit: '€' },
    { id: 'rating', label: 'Mindestbewertung', kind: 'rating' },
    {
      id: 'vorteile', label: 'Vorteile', kind: 'check',
      options: [
        { value: 'oeko', label: '100 % Ökostrom' },
        { value: 'bonus', label: 'Mit Sofortbonus' },
        { value: 'preisgarantie', label: 'Preisgarantie' },
        { value: 'app', label: 'App-Steuerung' },
      ],
    },
    CONTRACT,
    { id: 'anbieter', label: 'Anbieter', kind: 'provider' },
  ],
  gas: [
    { id: 'preis', label: 'Max. Preis pro Monat', kind: 'price', max: 140, step: 1, unit: '€' },
    { id: 'rating', label: 'Mindestbewertung', kind: 'rating' },
    {
      id: 'vorteile', label: 'Vorteile', kind: 'check',
      options: [
        { value: 'klimaneutral', label: 'Klimaneutral' },
        { value: 'oeko', label: 'Biogas-Anteil' },
        { value: 'bonus', label: 'Mit Sofortbonus' },
        { value: 'preisgarantie', label: 'Preisgarantie' },
      ],
    },
    CONTRACT,
    { id: 'anbieter', label: 'Anbieter', kind: 'provider' },
  ],
  dsl: [
    { id: 'preis', label: 'Max. Preis pro Monat', kind: 'price', max: 50, step: 1, unit: '€' },
    { id: 'speed', label: 'Min. Geschwindigkeit', kind: 'range', field: 'speedMbit', max: 1000, step: 50, unit: 'Mbit/s' },
    { id: 'rating', label: 'Mindestbewertung', kind: 'rating' },
    {
      id: 'anschluss', label: 'Anschlussart', kind: 'check',
      options: [
        { value: 'glasfaser', label: 'Glasfaser' },
        { value: 'kabel', label: 'Kabel' },
        { value: 'dsl', label: 'DSL' },
        { value: 'router', label: 'Router inklusive' },
        { value: 'cashback', label: 'Mit Cashback' },
      ],
    },
    { id: 'anbieter', label: 'Anbieter', kind: 'provider' },
  ],
  handy: [
    { id: 'preis', label: 'Max. Preis pro Monat', kind: 'price', max: 30, step: 1, unit: '€' },
    { id: 'daten', label: 'Min. Datenvolumen', kind: 'range', field: 'dataGB', max: 100, step: 5, unit: 'GB' },
    { id: 'rating', label: 'Mindestbewertung', kind: 'rating' },
    {
      id: 'netz', label: 'Leistung', kind: 'check',
      options: [
        { value: '5g', label: '5G-fähig' },
        { value: 'allnet', label: 'Allnet-Flat' },
        { value: 'unlimited', label: 'Unbegrenzte Daten' },
        { value: 'roaming', label: 'EU-Roaming' },
        { value: 'flexibel', label: 'Monatlich kündbar' },
      ],
    },
    { id: 'anbieter', label: 'Anbieter', kind: 'provider' },
  ],
  kfz: [
    { id: 'preis', label: 'Max. Preis pro Jahr', kind: 'price', max: 700, step: 10, unit: '€' },
    { id: 'rating', label: 'Mindestbewertung', kind: 'rating' },
    {
      id: 'schutz', label: 'Versicherungsart', kind: 'check',
      options: [
        { value: 'haftpflicht', label: 'Haftpflicht' },
        { value: 'teilkasko', label: 'Teilkasko' },
        { value: 'vollkasko', label: 'Vollkasko' },
        { value: 'sfschutz', label: 'SF-Rabattschutz' },
        { value: 'werkstatt', label: 'Werkstattbindung' },
      ],
    },
    { id: 'anbieter', label: 'Anbieter', kind: 'provider' },
  ],
  kredit: [
    { id: 'preis', label: 'Max. eff. Zins', kind: 'price', max: 8, step: 0.1, unit: '%' },
    { id: 'rating', label: 'Mindestbewertung', kind: 'rating' },
    {
      id: 'art', label: 'Kreditart', kind: 'check',
      options: [
        { value: 'ratenkredit', label: 'Ratenkredit' },
        { value: 'autokredit', label: 'Autokredit' },
        { value: 'minikredit', label: 'Minikredit' },
        { value: 'sondertilgung', label: 'Sondertilgung möglich' },
        { value: 'sofortzusage', label: 'Sofortzusage' },
      ],
    },
    { id: 'anbieter', label: 'Anbieter', kind: 'provider' },
  ],
  laptop: [
    { id: 'preis', label: 'Max. Rate pro Monat', kind: 'price', max: 60, step: 1, unit: '€' },
    { id: 'ram', label: 'Min. Arbeitsspeicher', kind: 'range', field: 'ramGB', max: 32, step: 8, unit: 'GB' },
    { id: 'rating', label: 'Mindestbewertung', kind: 'rating' },
    {
      id: 'ausstattung', label: 'Ausstattung', kind: 'check',
      options: [
        { value: 'ssd', label: 'SSD-Speicher' },
        { value: '5g', label: 'Mit 5G-Datenflat' },
        { value: '0anzahlung', label: '0 € Anzahlung' },
        { value: 'garantie', label: 'Erweiterte Garantie' },
      ],
    },
    { id: 'anbieter', label: 'Anbieter', kind: 'provider' },
  ],
  tv: [
    { id: 'preis', label: 'Max. Rate pro Monat', kind: 'price', max: 60, step: 1, unit: '€' },
    { id: 'zoll', label: 'Min. Bildschirmgröße', kind: 'range', field: 'screenInch', max: 85, step: 5, unit: 'Zoll' },
    { id: 'rating', label: 'Mindestbewertung', kind: 'rating' },
    {
      id: 'ausstattung', label: 'Ausstattung', kind: 'check',
      options: [
        { value: 'oled', label: 'OLED' },
        { value: '4k', label: '4K-Auflösung' },
        { value: 'smarttv', label: 'Smart TV' },
        { value: '0anzahlung', label: '0 € Anzahlung' },
      ],
    },
    { id: 'anbieter', label: 'Anbieter', kind: 'provider' },
  ],
  tablet: [
    { id: 'preis', label: 'Max. Rate pro Monat', kind: 'price', max: 40, step: 1, unit: '€' },
    { id: 'speicher', label: 'Min. Speicher', kind: 'range', field: 'storageGB', max: 256, step: 64, unit: 'GB' },
    { id: 'rating', label: 'Mindestbewertung', kind: 'rating' },
    {
      id: 'ausstattung', label: 'Ausstattung', kind: 'check',
      options: [
        { value: '5g', label: 'Mit 5G' },
        { value: 'stift', label: 'Mit Eingabestift' },
        { value: '0anzahlung', label: '0 € Anzahlung' },
      ],
    },
    { id: 'anbieter', label: 'Anbieter', kind: 'provider' },
  ],
}

export const RATING_OPTIONS = [
  { value: 4.5, label: 'ab 4,5 Sterne' },
  { value: 4.0, label: 'ab 4,0 Sterne' },
  { value: 3.0, label: 'ab 3,0 Sterne' },
]
