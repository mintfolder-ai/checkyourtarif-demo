export type Flight = {
  id: string
  airline: string
  code: string
  from: string
  to: string
  fromCity: string
  toCity: string
  depart: string
  arrive: string
  durationMin: number
  durationText: string
  stops: number
  stopInfo?: string
  priceNum: number
  price: string
  badge?: string
}

export const AIRPORTS = ['FRA Frankfurt', 'MUC München', 'BER Berlin', 'JFK New York', 'BCN Barcelona', 'IST Istanbul', 'DXB Dubai']

/** Beispielhafte Flugdaten (Demo). Fluglinien-Namen sind illustrativ. */
export const FLIGHTS: Flight[] = [
  {
    id: 'f1', airline: 'SkyEuropa', code: 'SE', from: 'FRA', to: 'JFK', fromCity: 'Frankfurt', toCity: 'New York',
    depart: '08:15', arrive: '11:40', durationMin: 505, durationText: '8 Std 25 Min', stops: 0,
    priceNum: 489, price: '489', badge: 'Günstigster',
  },
  {
    id: 'f2', airline: 'AtlanticJet', code: 'AJ', from: 'FRA', to: 'JFK', fromCity: 'Frankfurt', toCity: 'New York',
    depart: '10:05', arrive: '12:55', durationMin: 470, durationText: '7 Std 50 Min', stops: 0,
    priceNum: 612, price: '612', badge: 'Schnellster',
  },
  {
    id: 'f3', airline: 'NordWind Air', code: 'NW', from: 'FRA', to: 'JFK', fromCity: 'Frankfurt', toCity: 'New York',
    depart: '13:30', arrive: '19:10', durationMin: 640, durationText: '10 Std 40 Min', stops: 1, stopInfo: '1 Stopp · London (LHR)',
    priceNum: 421, price: '421',
  },
  {
    id: 'f4', airline: 'BlueHorizon', code: 'BH', from: 'FRA', to: 'JFK', fromCity: 'Frankfurt', toCity: 'New York',
    depart: '16:45', arrive: '22:05', durationMin: 500, durationText: '8 Std 20 Min', stops: 0,
    priceNum: 534, price: '534', badge: 'Beliebt',
  },
  {
    id: 'f5', airline: 'SkyEuropa', code: 'SE', from: 'FRA', to: 'JFK', fromCity: 'Frankfurt', toCity: 'New York',
    depart: '19:20', arrive: '01:35', durationMin: 735, durationText: '12 Std 15 Min', stops: 1, stopInfo: '1 Stopp · Reykjavik (KEF)',
    priceNum: 398, price: '398',
  },
  {
    id: 'f6', airline: 'AtlanticJet', code: 'AJ', from: 'FRA', to: 'JFK', fromCity: 'Frankfurt', toCity: 'New York',
    depart: '21:50', arrive: '01:20', durationMin: 510, durationText: '8 Std 30 Min', stops: 0,
    priceNum: 571, price: '571',
  },
]
