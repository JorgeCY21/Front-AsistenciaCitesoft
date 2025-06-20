import type { ViewType } from './types';

interface BotonesNavegacionProps {
  view: ViewType;
  setView: (view: ViewType) => void;
  role?: 'admin' | 'user';
}

export const BotonesNavegacion = ({ view, setView, role = 'user' }: BotonesNavegacionProps) => (
  <div className="w-full flex flex-wrap items-center justify-between gap-2 mt-4">
    <nav className="flex gap-2">
      {role === 'user' && (
        <>
          {/* Botón Registrar */}
          <button
            className={`px-4 py-2 rounded-lg transition-all font-semibold text-sm sm:text-base cursor-pointer
              ${view === 'scanner'
                ? 'bg-[#E6953A] text-white shadow-md transform scale-105'
                : 'bg-white/20 text-white hover:bg-white/30'}`}
            onClick={() => setView('scanner')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Registrar
          </button>

          {/* Botón Historial */}
          <button
            className={`px-4 py-2 rounded-lg transition-all font-semibold text-sm sm:text-base cursor-pointer
              ${view === 'history'
                ? 'bg-[#E6953A] text-white shadow-md transform scale-105'
                : 'bg-white/20 text-white hover:bg-white/30'}`}
            onClick={() => setView('history')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Historial
          </button>
        </>
      )}
    </nav>

    {/* Botón Volver para admin */}
    {role === 'admin' && (view === 'historialGeneral' || view === 'usuariosActivos') && (
      <button
        onClick={() => setView('adminDashboard')}
        className="px-4 py-2 bg-[#E6953A] hover:bg-[#cf7e27] text-white font-semibold rounded-lg text-sm sm:text-base shadow-md"
      >
        ← Volver al menú principal
      </button>
    )}
  </div>
);
