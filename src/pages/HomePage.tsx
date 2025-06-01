import { useEffect, useState } from 'react'
import Header from '../components/Header'
import ScannerView from '../components/ScannerView'
import HistoryView from '../components/HistoryView'
import { QRScanner } from '../components/QRScanner'  // Importa tu QRScanner original
import { calcularDistancia, LAT_UNI, LNG_UNI, RANGO_METROS } from '../utils/location'

export default function HomePage() {
  const [locationOk, setLocationOk] = useState(false)
  const [error, setError] = useState('')
  const [scanned, setScanned] = useState(false)
  const [history, setHistory] = useState<string[]>([])
  const [view, setView] = useState<'scanner' | 'history'>('scanner')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords
        const distancia = calcularDistancia(latitude, longitude, LAT_UNI, LNG_UNI)
        if (distancia <= RANGO_METROS) setLocationOk(true)
        else setError('No estás en la ubicación permitida.')
        setLoading(false)
      },
      () => {
        setError('No se pudo obtener la ubicación.')
        setLoading(false)
      }
    )
  }, [])

  function handleScan(data: string) {
    setScanned(true)
    setHistory((prev) => [...prev, `✅ ${new Date().toLocaleString()} - ${data}`])
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header view={view} setView={setView} />
      <main className="flex-grow max-w-4xl w-full mx-auto p-4 sm:p-6">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#E6953A]"></div>
          </div>
        ) : (
          view === 'scanner' ? (
            <div className="bg-white rounded-xl shadow-md p-4">
              {error ? (
                <p className="text-red-600 font-semibold">{error}</p>
              ) : (
                <>
                  {!scanned ? (
                    <>
                      <QRScanner onScan={handleScan} />
                      <p className="mt-2 text-center text-gray-700">Apunta tu cámara al código QR.</p>
                    </>
                  ) : (
                    <div className="text-center p-4 text-green-700 font-bold">
                      ¡Asistencia registrada con éxito!
                      <button
                        onClick={() => setScanned(false)}
                        className="mt-3 px-3 py-1 bg-[#7C8D34] text-white rounded hover:bg-[#90A23C]"
                      >
                        Escanear otro
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          ) : (
            <HistoryView history={history} setView={setView} />
          )
        )}
      </main>
    </div>
  )
}
