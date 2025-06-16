import { useState } from 'react';
import { Footer } from '../components/Footer';
import Header from '../components/Header';
import { BotonesNavegacion } from '../components/BotonesNavegacion';
import type { ViewType } from '../components/types';
import HistorialGeneral from '../components/HistorialGeneral';
import UsuariosActivos from '../components/UsuariosActivos';

export default function AdminPage() {
  const [view, setView] = useState<ViewType>('adminDashboard'); // vista inicial
  const [selectedUser, setSelectedUser] = useState<number | null>(null); // para historial individual (más adelante)

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
    <Header
      overrideButton={
        (view === 'historialGeneral' || view === 'usuariosActivos') ? (
          <BotonesNavegacion view={view} setView={setView} role="admin" />
        ) : undefined
    }
    />

      <main className="flex-1 p-6">
        {selectedUser ? (
          <div>Historial individual de usuario (proximamente)</div>
        ) : view === 'adminDashboard' ? (
          <section className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              ¡Bienvenido, Administrador!
            </h1>
            <p className="text-gray-600 mb-6">
              Desde aquí puedes revisar las asistencias registradas o ver los usuarios activos en este momento.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={() => setView('historialGeneral')}
                className="bg-[#E6953A] hover:bg-[#cc7e2d] text-white font-semibold py-3 px-6 rounded-lg shadow-md transition"
              >
                Ver historial de asistencias
              </button>
              <button
                onClick={() => setView('usuariosActivos')}
                className="bg-white hover:bg-gray-100 text-[#E6953A] border border-[#E6953A] font-semibold py-3 px-6 rounded-lg shadow-md transition"
              >
                Ver usuarios activos
              </button>
            </div>
          </section>
        ) : view === 'historialGeneral' ? (
          <>
            <HistorialGeneral setView={setView} />
          </>
        ) : view === 'usuariosActivos' ? (
          <>
            <UsuariosActivos setSelectedUser={setSelectedUser} />
          </>
        ) : null}
      </main>

      <Footer />
    </div>
  );
}


