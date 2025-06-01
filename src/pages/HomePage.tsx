import { useEffect, useState } from 'react'
import { Html5QrcodeScanner, Html5QrcodeScanType } from 'html5-qrcode'


const LAT_UNI = -16.3989
const LNG_UNI = -71.5369
const RANGO_METROS = 150

function calcularDistancia(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371e3
  const toRad = (value: number) => (value * Math.PI) / 180
  const φ1 = toRad(lat1)
  const φ2 = toRad(lat2)
  const Δφ = toRad(lat2 - lat1)
  const Δλ = toRad(lon2 - lon1)

  const a =
    Math.sin(Δφ / 2) ** 2 +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  return R * c
}

export default function HomePage() {
  const [locationOk, setLocationOk] = useState(false)
  const [error, setError] = useState('')
  const [scanned, setScanned] = useState(false)
  const [history, setHistory] = useState<string[]>([])

  useEffect(() => {
    const latitude = -16.3989
    const longitude = -71.5369
    const distancia = calcularDistancia(latitude, longitude, LAT_UNI, LNG_UNI)
    console.log('Distancia (simulada):', distancia)

    if (distancia <= RANGO_METROS) {
      setLocationOk(true)
    } else {
      setError('No estás en la ubicación permitida.')
    }
  }, [])

  useEffect(() => {
    if (locationOk && !scanned) {
      const scanner = new Html5QrcodeScanner(
        'qr-reader',
        {
          fps: 10,
          qrbox: 250,
          rememberLastUsedCamera: true,
          supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA]
        },
        false
      )      

      scanner.render(
        (result) => {
          console.log('QR leído:', result)
          setScanned(true)
          setHistory((prev) => [...prev, `Asistencia registrada: ${new Date().toLocaleString()}`])
          scanner.clear()
        },
        (err) => {
          console.warn('Error de escaneo', err)
        }
      )

      return () => {
        scanner.clear().catch((err) => console.error('Error al limpiar escáner:', err))
      }
    }
  }, [locationOk, scanned])

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="w-full max-w-xl bg-white shadow-xl rounded-2xl p-6 space-y-6">
        <h1 className="text-3xl font-bold text-center text-[#90A23C]">Página Principal</h1>

        {error && (
          <p className="text-red-600 text-center font-semibold">{error}</p>
        )}

        {locationOk && !scanned && (
          <div id="qr-reader" className="rounded-md border-2 border-dashed border-[#E6953A] p-2" />
        )}

        {locationOk && scanned && (
          <p className="text-green-700 bg-green-100 text-center py-2 rounded-md font-medium">
            ¡Asistencia registrada con éxito!
          </p>
        )}

        <div className="pt-4">
          <h2 className="text-2xl font-semibold text-[#E6953A] mb-2">Historial de Asistencias</h2>
          {history.length === 0 ? (
            <p className="text-gray-500 italic">No hay asistencias registradas.</p>
          ) : (
            <ul className="space-y-2">
              {history.map((item, index) => (
                <li
                  key={index}
                  className="bg-[#F3F4F6] rounded-md p-2 text-sm text-gray-800 border-l-4 border-[#90A23C]"
                >
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}

