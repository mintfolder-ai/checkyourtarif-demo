export type Offer = {
  id: string
  provider: string
  plan: string
  rating: number
  reviews: number
  price: string
  priceUnit: string
  oldPrice?: string
  features: string[]
  badge?: string
  save?: string
  /** Numeric price for range filtering / sorting. */
  priceNum: number
  /** Filterable feature tags (match facet option values). */
  tags: string[]
  /** Minimum contract term in months (0 = monatlich kündbar). */
  contractMonths: number
  /** Category-specific numeric for range facets. */
  dataGB?: number
  speedMbit?: number
  ramGB?: number
  storageGB?: number
  screenInch?: number
}

/**
 * Beispiel-Tarifdaten (Demo). Anbieternamen sind illustrativ und stehen für
 * das Vergleichs-Layout. Die realen, affiliate-gestützten Rechner sind pro
 * Kategorie verlinkt (siehe categories.ts).
 */
export const OFFERS: Record<string, Offer[]> = {
  strom: [
    {
      id: 's1', provider: 'GreenPower Direkt', plan: 'ÖkoFix 12', rating: 4.8, reviews: 3421,
      price: '71,90', priceUnit: '€ / Monat', oldPrice: '94,50', priceNum: 71.9, contractMonths: 12,
      tags: ['oeko', 'preisgarantie', 'bonus'],
      features: ['100 % Ökostrom', 'Preisgarantie 12 Monate', '150 € Sofortbonus'],
      badge: 'Testsieger', save: '850 €/Jahr',
    },
    {
      id: 's2', provider: 'StadtEnergie', plan: 'Classic Vario', rating: 4.6, reviews: 2187,
      price: '74,20', priceUnit: '€ / Monat', priceNum: 74.2, contractMonths: 0,
      tags: ['flexibel', 'bonus', 'tuev'],
      features: ['Monatlich kündbar', '100 € Neukundenbonus', 'TÜV-geprüft'],
      save: '690 €/Jahr',
    },
    {
      id: 's3', provider: 'Voltaro', plan: 'SmartStrom 24', rating: 4.5, reviews: 1760,
      price: '76,80', priceUnit: '€ / Monat', priceNum: 76.8, contractMonths: 24,
      tags: ['preisgarantie', 'bonus', 'app'],
      features: ['24 Monate Preisgarantie', 'App-Steuerung', '120 € Bonus'],
    },
    {
      id: 's4', provider: 'EnviaMax', plan: 'Basis', rating: 4.2, reviews: 980,
      price: '79,40', priceUnit: '€ / Monat', priceNum: 79.4, contractMonths: 12,
      tags: ['flexibel'],
      features: ['Keine Vorkasse', 'Faire Grundgebühr'],
    },
  ],
  gas: [
    {
      id: 'g1', provider: 'StadtEnergie', plan: 'ErdgasFix 12', rating: 4.7, reviews: 1890,
      price: '96,50', priceUnit: '€ / Monat', oldPrice: '128,00', priceNum: 96.5, contractMonths: 12,
      tags: ['preisgarantie', 'bonus', 'klimaneutral'],
      features: ['Preisgarantie 12 Monate', '180 € Sofortbonus', 'Klimaneutral optional'],
      badge: 'Top-Angebot', save: '1.000 €/Jahr',
    },
    {
      id: 'g2', provider: 'Voltaro', plan: 'GasSmart', rating: 4.5, reviews: 1340,
      price: '99,90', priceUnit: '€ / Monat', priceNum: 99.9, contractMonths: 0,
      tags: ['flexibel', 'bonus', 'app'],
      features: ['Monatlich kündbar', '120 € Bonus', 'App-Steuerung'],
      save: '820 €/Jahr',
    },
    {
      id: 'g3', provider: 'GreenPower Direkt', plan: 'BioGas 24', rating: 4.4, reviews: 1120,
      price: '103,20', priceUnit: '€ / Monat', priceNum: 103.2, contractMonths: 24,
      tags: ['oeko', 'preisgarantie', 'bonus'],
      features: ['Anteil Biogas', '24 Monate Garantie', '90 € Bonus'],
    },
  ],
  dsl: [
    {
      id: 'd1', provider: 'NetFibre', plan: 'Glasfaser 250', rating: 4.8, reviews: 5210,
      price: '24,99', priceUnit: '€ / Monat', oldPrice: '44,99', priceNum: 24.99, contractMonths: 24, speedMbit: 250,
      tags: ['glasfaser', 'router', 'cashback'],
      features: ['250 Mbit/s', 'Router inklusive', '385 € Cashback', '6 Monate halber Preis'],
      badge: 'Testsieger', save: '385 € Cashback',
    },
    {
      id: 'd2', provider: 'CableMax', plan: 'Kabel 1000', rating: 4.6, reviews: 4100,
      price: '34,99', priceUnit: '€ / Monat', priceNum: 34.99, contractMonths: 24, speedMbit: 1000,
      tags: ['kabel', 'bonus'],
      features: ['1.000 Mbit/s', 'Keine Drosselung', 'TV-Paket optional'],
      save: '200 € Bonus',
    },
    {
      id: 'd3', provider: 'SpeedLink', plan: 'DSL 100', rating: 4.4, reviews: 2890,
      price: '19,99', priceUnit: '€ / Monat', priceNum: 19.99, contractMonths: 0, speedMbit: 100,
      tags: ['dsl', 'flexibel', 'telefon'],
      features: ['100 Mbit/s', 'Telefon-Flat', 'Ohne Mindestlaufzeit'],
    },
  ],
  handy: [
    {
      id: 'h1', provider: 'MobilOne', plan: 'Allnet Flat 50 GB', rating: 4.7, reviews: 8320,
      price: '9,99', priceUnit: '€ / Monat', oldPrice: '24,99', priceNum: 9.99, contractMonths: 0, dataGB: 50,
      tags: ['5g', 'allnet', 'flexibel', 'roaming'],
      features: ['50 GB 5G', 'Allnet- & SMS-Flat', 'EU-Roaming', 'Monatlich kündbar'],
      badge: 'Preis-Tipp', save: '50 % Rabatt',
    },
    {
      id: 'h2', provider: 'FoneGo', plan: 'Unlimited 5G', rating: 4.6, reviews: 6210,
      price: '19,99', priceUnit: '€ / Monat', priceNum: 19.99, contractMonths: 24, dataGB: 999,
      tags: ['5g', 'allnet', 'unlimited'],
      features: ['Unbegrenztes Datenvolumen', '5G max.', 'Allnet-Flat'],
      save: 'Top-Netz',
    },
    {
      id: 'h3', provider: 'SimPlus', plan: 'Smart 20 GB', rating: 4.4, reviews: 3980,
      price: '7,99', priceUnit: '€ / Monat', priceNum: 7.99, contractMonths: 0, dataGB: 20,
      tags: ['allnet', 'flexibel'],
      features: ['20 GB LTE', 'Allnet-Flat', 'Keine Anschlussgebühr'],
    },
  ],
  kfz: [
    {
      id: 'k1', provider: 'SicherDirekt', plan: 'Komfort Vollkasko', rating: 4.8, reviews: 4530,
      price: '189', priceUnit: '€ / Jahr', oldPrice: '612', priceNum: 189, contractMonths: 12,
      tags: ['vollkasko', 'werkstatt', 'sfschutz'],
      features: ['Vollkasko SF-Schutz', 'Werkstattbindung optional', '1-Klick-Kündigung'],
      badge: 'Testsieger', save: '420 €/Jahr',
    },
    {
      id: 'k2', provider: 'AutoProtect', plan: 'Haftpflicht Plus', rating: 4.6, reviews: 3210,
      price: '96', priceUnit: '€ / Jahr', priceNum: 96, contractMonths: 12,
      tags: ['haftpflicht', 'rabattschutz', 'mallorca'],
      features: ['Erweiterte Haftpflicht', 'Mallorca-Police', 'Rabattschutz'],
      save: '280 €/Jahr',
    },
    {
      id: 'k3', provider: 'DriveSafe', plan: 'Teilkasko', rating: 4.4, reviews: 2140,
      price: '134', priceUnit: '€ / Jahr', priceNum: 134, contractMonths: 12,
      tags: ['teilkasko', 'marder'],
      features: ['Teilkasko', 'Marderschaden', 'Flexible Zahlweise'],
    },
  ],
  kredit: [
    {
      id: 'c1', provider: 'FairBank', plan: 'Ratenkredit', rating: 4.8, reviews: 6720,
      price: '3,89', priceUnit: '% eff. Zins', priceNum: 3.89, contractMonths: 0,
      tags: ['sondertilgung', 'sofortzusage', 'ratenkredit'],
      features: ['Bonitätsunabhängig geprüft', 'Sondertilgung kostenlos', 'Sofortzusage'],
      badge: 'Bestzins', save: 'ab 3,89 %',
    },
    {
      id: 'c2', provider: 'KreditWerk', plan: 'Autokredit', rating: 4.6, reviews: 4180,
      price: '4,29', priceUnit: '% eff. Zins', priceNum: 4.29, contractMonths: 0,
      tags: ['autokredit', 'flexibel'],
      features: ['Für Neu- & Gebrauchtwagen', 'Flexible Laufzeit', 'Ohne Anzahlung'],
    },
    {
      id: 'c3', provider: 'MiniCredit', plan: 'Minikredit', rating: 4.3, reviews: 2560,
      price: '5,90', priceUnit: '% eff. Zins', priceNum: 5.9, contractMonths: 0,
      tags: ['minikredit', 'sofortzusage'],
      features: ['200 bis 3.000 €', 'Auszahlung in 24 h', 'Ohne Schufa-Eintrag'],
    },
  ],
  laptop: [
    {
      id: 'l1', provider: 'NovaBook', plan: 'Air 14 Pro', rating: 4.8, reviews: 2140,
      price: '29,99', priceUnit: '€ / Monat', oldPrice: '1.499', priceNum: 29.99, contractMonths: 24,
      ramGB: 16, storageGB: 512, screenInch: 14,
      tags: ['5g', '0anzahlung', 'ssd', 'garantie'],
      features: ['14" Retina-Display', '16 GB RAM · 512 GB SSD', 'inkl. 50 GB 5G-Datenflat', '0 € Anzahlung'],
      badge: 'Testsieger', save: 'spare 480 €',
    },
    {
      id: 'l2', provider: 'ZenTech', plan: 'UltraSlim 15', rating: 4.6, reviews: 1680,
      price: '24,99', priceUnit: '€ / Monat', oldPrice: '1.199', priceNum: 24.99, contractMonths: 36,
      ramGB: 16, storageGB: 1000, screenInch: 15,
      tags: ['0anzahlung', 'ssd', 'garantie'],
      features: ['15,6" Full-HD', '16 GB RAM · 1 TB SSD', '36 Monate Garantie', '0 € Anzahlung'],
      save: 'spare 320 €',
    },
    {
      id: 'l3', provider: 'CorePoint', plan: 'Creator 16', rating: 4.5, reviews: 1120,
      price: '39,99', priceUnit: '€ / Monat', oldPrice: '1.899', priceNum: 39.99, contractMonths: 24,
      ramGB: 32, storageGB: 1000, screenInch: 16,
      tags: ['5g', 'ssd', 'garantie'],
      features: ['16" OLED', '32 GB RAM · 1 TB SSD', 'Dedizierte Grafik', 'inkl. 100 GB 5G'],
      badge: 'Power-Tipp',
    },
    {
      id: 'l4', provider: 'EasyBook', plan: 'Go 13', rating: 4.3, reviews: 890,
      price: '14,99', priceUnit: '€ / Monat', oldPrice: '649', priceNum: 14.99, contractMonths: 24,
      ramGB: 8, storageGB: 256, screenInch: 13,
      tags: ['0anzahlung', 'ssd'],
      features: ['13,3" IPS', '8 GB RAM · 256 GB SSD', 'Leicht & kompakt', '0 € Anzahlung'],
      save: 'Preis-Tipp',
    },
  ],
  tv: [
    {
      id: 't1', provider: 'VisionMax', plan: 'OLED 55', rating: 4.9, reviews: 3210,
      price: '27,99', priceUnit: '€ / Monat', oldPrice: '1.299', priceNum: 27.99, contractMonths: 24,
      screenInch: 55,
      tags: ['oled', '4k', 'smarttv', '0anzahlung'],
      features: ['55" OLED 4K', '120 Hz · HDR10+', 'Smart TV inkl. Apps', '0 € Anzahlung'],
      badge: 'Testsieger', save: 'spare 350 €',
    },
    {
      id: 't2', provider: 'ClearView', plan: 'QLED 65', rating: 4.7, reviews: 2480,
      price: '34,99', priceUnit: '€ / Monat', oldPrice: '1.499', priceNum: 34.99, contractMonths: 24,
      screenInch: 65,
      tags: ['4k', 'smarttv', '0anzahlung'],
      features: ['65" QLED 4K', 'Gaming 144 Hz', 'Sprachsteuerung', '0 € Anzahlung'],
      save: 'spare 260 €',
    },
    {
      id: 't3', provider: 'HomeScreen', plan: 'LED 50', rating: 4.4, reviews: 1540,
      price: '16,99', priceUnit: '€ / Monat', oldPrice: '599', priceNum: 16.99, contractMonths: 24,
      screenInch: 50,
      tags: ['4k', 'smarttv'],
      features: ['50" LED 4K', 'Smart TV', 'Triple-Tuner', 'Schlankes Design'],
      save: 'Preis-Tipp',
    },
    {
      id: 't4', provider: 'CinePro', plan: 'OLED 77', rating: 4.8, reviews: 980,
      price: '54,99', priceUnit: '€ / Monat', oldPrice: '2.699', priceNum: 54.99, contractMonths: 36,
      screenInch: 77,
      tags: ['oled', '4k', 'smarttv'],
      features: ['77" OLED 4K', 'Kino-Format', 'Dolby Vision & Atmos', '36 Monate Garantie'],
      badge: 'Premium',
    },
  ],
  tablet: [
    {
      id: 'tb1', provider: 'SlateOne', plan: 'Pad Pro 11', rating: 4.8, reviews: 2760,
      price: '19,99', priceUnit: '€ / Monat', oldPrice: '899', priceNum: 19.99, contractMonths: 24,
      storageGB: 256, screenInch: 11,
      tags: ['5g', 'stift', '0anzahlung'],
      features: ['11" Liquid-Display', '256 GB · 5G', 'inkl. Eingabestift', '0 € Anzahlung'],
      badge: 'Testsieger', save: 'spare 260 €',
    },
    {
      id: 'tb2', provider: 'FlexTab', plan: 'Galaxy-Klasse 11', rating: 4.6, reviews: 1980,
      price: '14,99', priceUnit: '€ / Monat', oldPrice: '649', priceNum: 14.99, contractMonths: 24,
      storageGB: 128, screenInch: 11,
      tags: ['5g', '0anzahlung'],
      features: ['11" 90 Hz', '128 GB · 5G-Datenflat', 'inkl. Cover', '0 € Anzahlung'],
      save: 'spare 180 €',
    },
    {
      id: 'tb3', provider: 'MiniSlate', plan: 'Go 8', rating: 4.3, reviews: 1240,
      price: '8,99', priceUnit: '€ / Monat', oldPrice: '299', priceNum: 8.99, contractMonths: 24,
      storageGB: 64, screenInch: 8,
      tags: ['0anzahlung'],
      features: ['8" kompakt', '64 GB', 'Ideal für unterwegs', '0 € Anzahlung'],
      save: 'Preis-Tipp',
    },
  ],
}
