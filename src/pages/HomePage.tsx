import { useEffect, useState } from 'react'
import Header from '../components/Header'
import ScannerView from '../components/ScannerView'
import HistoryView from '../components/HistoryView'
import { initQrScanner } from '../components/QRScanner'
import { calcularDistancia, LAT_UNI, LNG_UNI, RANGO_METROS } from '../utils/location'

export default function HomePage() {
  const [locationOk, setLocationOk] = useState(false)
  const [error, setError] = useState('')
  const [scanned, setScanned] = useState(false)
  const [history, setHistory] = useState<string[]>([])
  const [view, setView] = useState<'scanner' | 'history'>('scanner')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const distancia = calcularDistancia(LAT_UNI, LNG_UNI, LAT_UNI, LNG_UNI)
    if (distancia <= RANGO_METROS) setLocationOk(true)
    else setError('No estás en la ubicación permitida.')
    setLoading(false)
  }, [])

  useEffect(() => {
    if (locationOk && !scanned && view === 'scanner') {
      const scanner = initQrScanner(
        (result) => {
          setScanned(true)
          setHistory((prev) => [...prev, `✅ ${new Date().toLocaleString()}`])
          scanner.clear()
        },
        (err) => console.warn('Error escaneando QR:', err)
      )
      return () => { scanner.clear().catch(console.error) }
    }
  }, [locationOk, scanned, view])

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
            <ScannerView scanned={scanned} error={error} setScanned={setScanned} />
          ) : (
            <HistoryView history={history} setView={setView} />
          )
        )}
      </main>
    </div>
  )
}
