export const LAT_UNI = -16.3989
export const LNG_UNI = -71.5369
export const RANGO_METROS = 150

export function calcularDistancia(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371e3
  const toRad = (v: number) => (v * Math.PI) / 180
  const φ1 = toRad(lat1), φ2 = toRad(lat2)
  const Δφ = toRad(lat2 - lat1), Δλ = toRad(lon2 - lon1)
  const a = Math.sin(Δφ/2)**2 + Math.cos(φ1)*Math.cos(φ2)*Math.sin(Δλ/2)**2
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}
