// src/pages/Home.tsx
import React, { useEffect, useState } from 'react'
// Puedes instalar react-qr-reader o cualquier otra librería compatible
// import QrReader from 'react-qr-reader'

type Asistencia = {
  fecha: string
  hora: string
  ubicacion: string
}

const universidadCoords = {
  lat: -16.3988, // cambia esto por la latitud real
  lng: -71.5369, // cambia esto por la longitud real
  rango: 0.0015 // margen de error en coordenadas
}

function estaEnUbicacion(lat: number, lng: number) {
  return (
    Math.abs(lat - universidadCoords.lat) <= universidadCoords.rango &&
    Math.abs(lng - universidadCoords.lng) <= universidadCoords.rango
  )
}

export function HomePage() {
  const [ubicacionPermitida, setUbicacionPermitida] = useState(false)
  const [historial, setHistorial] = useState<Asistencia[]>([])
  const [coordenadas, setCoordenadas] = useState<{ lat: number; lng: number } | null>(null)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords
        setCoordenadas({ lat: latitude, lng: longitude })
        setUbicacionPermitida(estaEnUbicacion(latitude, longitude))
      },
      () => {
        setUbicacionPermitida(false)
      }
    )
  }, [])

  const registrarAsistencia = () => {
    if (!coordenadas) return
    const ahora = new Date()
    const nuevaAsistencia: Asistencia = {
      fecha: ahora.toLocaleDateString(),
      hora: ahora.toLocaleTimeString(),
      ubicacion: `Lat: ${coordenadas.lat.toFixed(5)}, Lng: ${coordenadas.lng.toFixed(5)}`
    }
    setHistorial([nuevaAsistencia, ...historial])
  }

  return (
    <div className="min-h-screen bg-[#CACBCD] p-6">
      <h1 className="text-3xl font-bold text-center text-[#90A23C] mb-8">
        Registro de Asistencia
      </h1>

      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-6 space-y-6">
        {/* Sección de escaneo */}
        <div className="text-center">
          {ubicacionPermitida ? (
            <>
              <p className="text-[#90A23C] font-medium mb-4">Estás dentro de la universidad.</p>
              {/* <QrReader
                onScan={handleQRScan}
                onError={(err) => console.error(err)}
              /> */}
              <button
                onClick={registrarAsistencia}
                className="bg-[#E6953A] text-white font-bold py-2 px-4 rounded-lg hover:bg-[#d28231] transition"
              >
                Escanear QR / Registrar
              </button>
            </>
          ) : (
            <p className="text-red-500 font-medium">
              No estás en la ubicación permitida. No puedes registrar asistencia.
            </p>
          )}
        </div>

        {/* Historial */}
        <div>
          <h2 className="text-lg font-semibold text-[#90A23C] mb-2">Historial de Asistencias</h2>
          <ul className="space-y-2 max-h-60 overflow-y-auto">
            {historial.length === 0 ? (
              <p className="text-gray-500">Aún no hay asistencias registradas.</p>
            ) : (
              historial.map((item, index) => (
                <li key={index} className="bg-[#F9F9F9] p-3 rounded-lg shadow-sm">
                  <p className="text-sm">
                    <span className="font-semibold">Fecha:</span> {item.fecha}
                  </p>
                  <p className="text-sm">
                    <span className="font-semibold">Hora:</span> {item.hora}
                  </p>
                  <p className="text-sm">
                    <span className="font-semibold">Ubicación:</span> {item.ubicacion}
                  </p>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  )
}
