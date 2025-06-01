import { useEffect, useState } from 'react';
import { BotonesNavegacion } from '../components/BotonesNavegacion';
import { HistorialAsistencia } from '../components/HistorialAsistencia';
import { QRScanner } from '../components/QRScanner';
import { calcularDistancia, LAT_UNI, LNG_UNI, RANGO_METROS } from '../components/helpers';
import type { ViewType } from '../components/types';

export default function HomePage() {
  const [locationOk, setLocationOk] = useState(false);
  const [error, setError] = useState('');
  const [scanned, setScanned] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [view, setView] = useState<ViewType>('scanner');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const latitude = -16.3989;
    const longitude = -71.5369;
    const distancia = calcularDistancia(latitude, longitude, LAT_UNI, LNG_UNI);
    if (distancia <= RANGO_METROS) {
      setLocationOk(true);
    } else {
      setError('No estás en la ubicación permitida para registrar asistencia.');
    }
    setLoading(false);
  }, []);

  const handleScan = (result: string) => {
    console.log('QR leído:', result);
    setScanned(true);
    setHistory((prev) => [...prev, `✅ ${new Date().toLocaleString()}`]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#90A23C] to-[#7C8D34] text-white px-4 py-4 shadow-lg">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <h1 className="text-2xl font-bold tracking-tight">Asistencia CITESOFT</h1>
          <BotonesNavegacion view={view} setView={setView} />
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
                        <QRScanner onScan={handleScan} />
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
              <HistorialAsistencia history={history} setView={setView} />
            )}
          </>
        )}
      </main>

      <footer className="bg-[#90A23C] text-white py-4 mt-auto">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center text-sm">
          © {new Date().getFullYear()} CITESOFT - Todos los derechos reservados
        </div>
      </footer>
    </div>
  );
}