import type { ViewType } from './types';

interface HistorialAsistenciaProps {
  history: string[];
  setView: (view: ViewType) => void;
}

export const HistorialAsistencia = ({ history, setView }: HistorialAsistenciaProps) => (
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
);