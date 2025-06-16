import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import type { ViewType } from './types'; // para ViewType

interface Asistencia {
  id: number;
  nombre: string;
  correo: string;
  horaIngreso: string;
  horaSalida: string;
  fecha: string;
}

interface HistorialGeneralProps {
  setView: (view: ViewType) => void;
}

const datosDeAsistencia: Asistencia[] = [
  {
    id: 1,
    nombre: 'JorgitoPro',
    correo: 'miau@example.com',
    horaIngreso: '08:00',
    horaSalida: '12:30',
    fecha: '2025-06-07',
  },
  {
    id: 2,
    nombre: 'Pollito',
    correo: 'pio@example.com',
    horaIngreso: '08:15',
    horaSalida: '12:45',
    fecha: '2025-06-07',
  },
  {
    id: 3,
    nombre: 'Siu Martinez',
    correo: 'siu@example.com',
    horaIngreso: '09:00',
    horaSalida: '13:00',
    fecha: '2025-06-06',
  },
];

export default function HistorialGeneral({ setView }: HistorialGeneralProps) {
  const [fechaSeleccionada, setFechaSeleccionada] = useState<Date | null>(new Date());

  const formatearFecha = (fecha: Date) => {
    return fecha.toLocaleDateString('sv-SE');
  };

  const asistenciasFiltradas = datosDeAsistencia.filter(
    (asistencia) => asistencia.fecha === formatearFecha(fechaSeleccionada || new Date())
  );

  return (
    <div className="px-4">

      {/* Contenido del historial */}
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow-md mt-4">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
          Historial de Asistencias
        </h2>

        <div className="flex justify-center mb-6">
          <label className="mr-2 text-gray-600 font-medium">Selecciona una fecha:</label>
          <DatePicker
            selected={fechaSeleccionada}
            onChange={(date) => setFechaSeleccionada(date)}
            className="border border-gray-300 rounded px-3 py-1 text-sm"
            dateFormat="yyyy-MM-dd"
          />
        </div>

        {asistenciasFiltradas.length > 0 ? (
          <table className="w-full table-auto border border-gray-300">
            <thead className="bg-[#E6953A] text-white">
              <tr>
                <th className="p-2 text-left">Nombre</th>
                <th className="p-2 text-left">Correo</th>
                <th className="p-2 text-left">Hora de Ingreso</th>
                <th className="p-2 text-left">Hora de Salida</th>
              </tr>
            </thead>
            <tbody>
              {asistenciasFiltradas.map((asistencia) => (
                <tr key={asistencia.id} className="border-t border-gray-200 hover:bg-gray-50">
                  <td className="p-2">{asistencia.nombre}</td>
                  <td className="p-2">{asistencia.correo}</td>
                  <td className="p-2">{asistencia.horaIngreso}</td>
                  <td className="p-2">{asistencia.horaSalida}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-gray-600">
            No hay asistencias registradas para esta fecha.
          </p>
        )}
      </div>
    </div>
  );
}
