import { useState } from 'react';
import { BotonesNavegacion } from '../components/BotonesNavegacion';
import type { ViewType } from '../components/types';

const usuariosActivos = [
  { id: 1, nombre: 'JorgitoPro', correo: 'miau@example.com' },
  { id: 2, nombre: 'Pollito', correo: 'pio@example.com' },
  { id: 3, nombre: 'Siu Martinez', correo: 'siu@example.com' },
];

export default function AdminPage() {
  const [view, setView] = useState<ViewType>('scanner'); // Puedes cambiar a 'admin' si lo deseas

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* MAIN */}
      <main className="flex-grow max-w-4xl w-full mx-auto p-4 sm:p-6">
        <section className="bg-white shadow-md rounded-lg p-6 mt-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Usuarios Activos</h2>
          <ul className="space-y-4">
            {usuariosActivos.map((usuario) => (
              <li
                key={usuario.id}
                className="border border-gray-200 rounded p-4 hover:bg-gray-50 transition"
              >
                <p className="font-medium text-gray-900">{usuario.nombre}</p>
                <p className="text-sm text-gray-600">{usuario.correo}</p>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}