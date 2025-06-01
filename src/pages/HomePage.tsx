import { useEffect, useState } from 'react'
import {
  Html5QrcodeScanner,
  Html5QrcodeScanType,
} from 'html5-qrcode'

const LAT_UNI = -16.3989
const LNG_UNI = -71.5369
const RANGO_METROS = 150

function calcularDistancia(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371e3
  const toRad = (v: number) => (v * Math.PI) / 180
  const φ1 = toRad(lat1), φ2 = toRad(lat2)
  const Δφ = toRad(lat2 - lat1), Δλ = toRad(lon2 - lon1)
  const a = Math.sin(Δφ/2)**2 + Math.cos(φ1)*Math.cos(φ2)*Math.sin(Δλ/2)**2
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

export default function HomePage() {
  const [locationOk, setLocationOk] = useState(false)
  const [error, setError] = useState('')
  const [scanned, setScanned] = useState(false)
  const [history, setHistory] = useState<string[]>([])
  const [view, setView] = useState<'scanner' | 'history'>('scanner')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const latitude = -16.3989
    const longitude = -71.5369
    const distancia = calcularDistancia(latitude, longitude, LAT_UNI, LNG_UNI)
    if (distancia <= RANGO_METROS) {
      setLocationOk(true)
    } else {
      setError('No estás en la ubicación permitida para registrar asistencia.')
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    if (locationOk && !scanned && view === 'scanner') {
      const scanner = new Html5QrcodeScanner(
        'qr-reader',
        {
          fps: 10,
          qrbox: {width: 250, height: 250},
          rememberLastUsedCamera: true,
          supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA],
        },
        false
      )

      scanner.render(
        (result) => {
          console.log('QR leído:', result)
          setScanned(true)
          setHistory((prev) => [...prev, `✅ ${new Date().toLocaleString()}`])
          scanner.clear()
        },
        (err) => console.warn('Error de escaneo', err)
      )

      return () => {
        scanner.clear().catch(console.error)
      }
    }
  }, [locationOk, scanned, view])

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#90A23C] to-[#7C8D34] text-white px-4 py-4 shadow-lg">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <h1 className="text-2xl font-bold tracking-tight">Asistencia CITESOFT</h1>
          <nav className="flex gap-2 w-full sm:w-auto">
            <button
              className={`flex-1 sm:flex-none px-4 py-2 rounded-lg transition-all font-semibold text-sm sm:text-base 
                ${view === 'scanner' ? 
                  'bg-[#E6953A] text-white shadow-md transform scale-105' : 
                  'bg-white/20 text-white hover:bg-white/30'}`}
              onClick={() => setView('scanner')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Registrar
            </button>
            <button
              className={`flex-1 sm:flex-none px-4 py-2 rounded-lg transition-all font-semibold text-sm sm:text-base 
                ${view === 'history' ? 
                  'bg-[#E6953A] text-white shadow-md transform scale-105' : 
                  'bg-white/20 text-white hover:bg-white/30'}`}
              onClick={() => setView('history')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Historial
            </button>
          </nav>
        </div>
      </header>

      <main className="flex-grow max-w-4xl w-full mx-auto p-4 sm:p-6">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#E6953A]"></div>
          </div>
        ) : (
          <>
            {view === 'scanner' && (
              <div className="bg-white rounded-xl shadow-md overflow-hidden p-4 sm:p-6 h-full">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Registrar Asistencia</h2>
                
                {error ? (
                  <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-red-700">{error}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    {!scanned ? (
                      <div className="space-y-6">
                        <p className="text-gray-600">Escanea el código QR para registrar tu asistencia</p>
                        <div id="qr-reader" className="border-2 border-dashed border-gray-200 rounded-lg overflow-hidden"></div>
                        <div className="bg-[#90A23C]/10 border-l-4 border-[#90A23C] p-4">
                          <div className="flex items-center">
                            <div className="flex-shrink-0">
                              <svg className="h-5 w-5 text-[#90A23C]" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <div className="ml-3">
                              <p className="text-sm text-[#90A23C]">
                                Asegúrate de permitir el acceso a la cámara y mantener el código QR dentro del marco.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-[#90A23C]/10 mb-4">
                          <svg className="h-6 w-6 text-[#90A23C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">¡Asistencia registrada!</h3>
                        <p className="text-gray-500 mb-6">Tu asistencia ha sido registrada correctamente.</p>
                        <button
                          onClick={() => setScanned(false)}
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#E6953A] hover:bg-[#D08530] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#E6953A]"
                        >
                          Escanear otro código
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}

            {view === 'history' && (
              <div className="bg-white rounded-xl shadow-md overflow-hidden h-full">
                <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-[#E6953A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    Historial de Asistencias
                  </h2>
                </div>
                {history.length === 0 ? (
                  <div className="text-center py-12">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    <h3 className="mt-2 text-lg font-medium text-gray-900">No hay registros</h3>
                    <p className="mt-1 text-gray-500">Aún no has registrado ninguna asistencia.</p>
                    <button
                      onClick={() => setView('scanner')}
                      className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#90A23C] hover:bg-[#7C8D34] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#90A23C]"
                    >
                      Registrar asistencia
                    </button>
                  </div>
                ) : (
                  <ul className="divide-y divide-gray-200 max-h-[calc(100vh-250px)] overflow-y-auto">
                    {history.map((item, i) => (
                      <li key={i} className="px-4 py-4 sm:px-6 hover:bg-gray-50 transition-colors">
                        <div className="flex items-center">
                          <div className="min-w-0 flex-1 flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-[#90A23C]/10">
                              <svg className="h-6 w-6 text-[#90A23C]" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <div className="min-w-0 flex-1 px-4">
                              <p className="text-sm font-medium text-gray-900">{item}</p>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </>
        )}
      </main>

      {/* Footer fijo en la parte inferior */}
      <footer className="bg-[#90A23C] text-white py-4 mt-auto">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center text-sm">
          © {new Date().getFullYear()} CITESOFT - Todos los derechos reservados
        </div>
      </footer>
    </div>
  )
}