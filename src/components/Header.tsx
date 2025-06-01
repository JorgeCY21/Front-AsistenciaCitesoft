interface HeaderProps {
    view: 'scanner' | 'history'
    setView: (view: 'scanner' | 'history') => void
  }
  
  export default function Header({ view, setView }: HeaderProps) {
    return (
      <header className="bg-gradient-to-r from-[#90A23C] to-[#7C8D34] text-white px-4 py-4 shadow-lg">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <h1 className="font-bold text-lg">Asistencia QR</h1>
          <nav className="flex gap-4">
            <button
              className={`px-3 py-1 rounded ${view === 'scanner' ? 'bg-white text-[#7C8D34]' : 'hover:bg-white/20'}`}
              onClick={() => setView('scanner')}
            >
              Escanear
            </button>
            <button
              className={`px-3 py-1 rounded ${view === 'history' ? 'bg-white text-[#7C8D34]' : 'hover:bg-white/20'}`}
              onClick={() => setView('history')}
            >
              Historial
            </button>
          </nav>
        </div>
      </header>
    )
  }
  