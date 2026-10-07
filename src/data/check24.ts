/**
 * Live CHECK24 partner comparison widgets (partner ID 1172792).
 *
 * Each entry mirrors an official CHECK24 embed snippet: a target <div> with a
 * fixed id (plus optional data-* attributes) and a loader <script> that injects
 * the live comparison iframe into that div. These replace the demo offer cards
 * for the categories that have a real widget — the data is calculated live by
 * CHECK24, not mocked.
 */
export type Check24Widget = {
  /** The fixed element id the loader script looks up (document.getElementById). */
  containerId: string
  /** The loader script URL. */
  scriptSrc: string
  /** data-* attributes to set on the target div (key without the "data-" prefix). */
  data?: Record<string, string>
}

const CDN = 'https://files.check24.net/widgets/auto/1172792'

/** Keyed by the site's category id (see data/categories.ts). */
export const CHECK24_WIDGETS: Record<string, Check24Widget> = {
  strom: {
    containerId: 'c24pp-power-iframe',
    scriptSrc: `${CDN}/c24pp-power-iframe/power-iframe.js`,
    data: { scrollto: 'begin' },
  },
  gas: {
    containerId: 'c24pp-gas-iframe',
    scriptSrc: `${CDN}/c24pp-gas-iframe/gas-iframe.js`,
    data: { scrollto: 'begin' },
  },
  dsl: {
    containerId: 'c24pp-dsl-iframe',
    scriptSrc: `${CDN}/c24pp-dsl-iframe/dsl-iframe.js`,
  },
  handy: {
    containerId: 'c24pp-mobileservice-iframe',
    scriptSrc: `${CDN}/c24pp-mobileservice-iframe/sim-only-iframe.js`,
  },
  paket: {
    containerId: 'c24pp-package-iframe',
    scriptSrc: `${CDN}/c24pp-package-iframe/package-iframe.js`,
    data: { offer: 'allgemein', scrollto: 'begin', 'forward-url': 'no' },
  },
}
