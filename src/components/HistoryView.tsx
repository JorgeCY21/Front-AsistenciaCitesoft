interface HistoryViewProps {
    history: string[]
    setView: (val: 'scanner') => void
  }
  
  export default function HistoryView({ history, setView }: HistoryViewProps) {
    return (
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        {/* contenido del historial */}
      </div>
    )
  }
  