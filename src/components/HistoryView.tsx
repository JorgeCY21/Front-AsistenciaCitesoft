interface HistoryViewProps {
    history: string[]
    setView: (val: 'scanner') => void
  }
  
  export default function HistoryView({ history, setView }: HistoryViewProps) {
    return (
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <h2 className="font-semibold text-lg p-4 border-b">Historial de asistencias</h2>
        {history.length === 0 ? (
          <p className="p-4 text-gray-600 text-center">No hay registros aún.</p>
        ) : (
          <ul className="max-h-64 overflow-auto p-4 space-y-2">
            {history.map((item, i) => (
              <li key={i} className="bg-green-100 rounded px-3 py-2 text-green-800">{item}</li>
            ))}
          </ul>
        )}
        <div className="p-4 border-t flex justify-end">
          <button
            onClick={() => setView('scanner')}
            className="px-4 py-2 bg-[#7C8D34] text-white rounded hover:bg-[#90A23C]"
          >
            Volver a escanear
          </button>
        </div>
      </div>
    )
  }
  