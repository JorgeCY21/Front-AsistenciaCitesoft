import React, { useEffect, useState } from 'react'
import { QRScanner } from '../components/QRScanner'

export function HomePage() {
  const [ubicacionValida, setUbicacionValida] = useState(false)
  const [mensaje, setMensaje] = useState('')
  const [asistencias, setAsistencias] = useState<string[]>([])

  const latitudUni = -16.426563
  const longitudUni = -71.529391
  const margen = 0.002

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        const estaCerca =
          Math.abs(latitude - latitudUni) < margen &&
          Math.abs(longitude - longitudUni) < margen

        setUbicacionValida(estaCerca)
        setMensaje(
          estaCerca
            ? 'Estás en la universidad. Puedes registrar tu asistencia.'
            : 'No estás en la universidad. No puedes registrar asistencia.'
        )
      },
      () => {
        setMensaje('No se pudo obtener la ubicación.')
      }
    )
  }, [])

  const handleQRScan = (data: string) => {
    setAsistencias((prev) => [...prev, `${new Date().toLocaleString()} - ${data}`])
  }

  return (
    <div className="min-h-screen bg-[#CACBCD] p-6">
      <h1 className="text-3xl font-bold mb-4">Página Principal</h1>
      <p className="mb-4 text-lg">{mensaje}</p>

      {ubicacionValida && <QRScanner onScan={handleQRScan} />}

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-2">Historial de Asistencias</h2>
        <ul className="bg-white rounded-lg p-4 shadow-md space-y-2">
          {asistencias.length === 0 && <li>No hay asistencias registradas.</li>}
          {asistencias.map((registro, index) => (
            <li key={index} className="border-b last:border-none py-2">
              {registro}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
