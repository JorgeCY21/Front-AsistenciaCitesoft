import { useEffect, useState } from 'react';
import { BotonesNavegacion } from '../components/BotonesNavegacion';
import { HistorialAsistencia } from '../components/HistorialAsistencia';
import { QRScanner } from '../components/QRScanner';
import { calcularDistancia, LAT_UNI, LNG_UNI, RANGO_METROS } from '../components/helpers';
import type { ViewType } from '../components/types';

import { MapContainer, TileLayer, Marker, Circle } from 'react-leaflet';
import L from 'leaflet';

// Icono personalizado para el marcador
const userIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/64/64113.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

export default function HomePage() {
  const [error, setError] = useState('');
  const [scanned, setScanned] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [view, setView] = useState<ViewType>('scanner');
  const [loading, setLoading] = useState(true);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Tu navegador no soporta geolocalización.');
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lng: longitude });

        const distancia = calcularDistancia(latitude, longitude, LAT_UNI, LNG_UNI);
        if (distancia > RANGO_METROS) {
          setError('No estás en la ubicación permitida para registrar asistencia.');
        } else {
          setError('');
        }
        setLoading(false);
      },
      () => {
        setError('No se pudo obtener tu ubicación. Asegúrate de permitir el acceso.');
        setLoading(false);
      }
    );
  }, []);

  const handleScan = (result: string) => {
    console.log('QR leído:', result);
    setScanned(true);
    setHistory((prev) => [...prev, `✅ ${new Date().toLocaleString()}`]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
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

                {userLocation && (
                  <div className="mb-4 h-64">
                    <MapContainer
                      center={[LAT_UNI, LNG_UNI]}
                      zoom={17}
                      scrollWheelZoom={false}
                      style={{ height: '100%', width: '100%' }}
                    >
                      <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution="© OpenStreetMap contributors"
                      />
                      <Circle center={[LAT_UNI, LNG_UNI]} radius={RANGO_METROS} pathOptions={{ color: '#90A23C' }} />
                      <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon} />
                    </MapContainer>
                  </div>
                )}

                {error ? (
                  <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
                    <div className="flex items-center">
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
                          className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md shadow-sm text-white bg-[#E6953A] hover:bg-[#D08530]"
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
        <div className="max-w-4xl mx-auto px-4 text-center text-sm">
          © {new Date().getFullYear()} CITESOFT - Todos los derechos reservados
        </div>
      </footer>
    </div>
  );
}
