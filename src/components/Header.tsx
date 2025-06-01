interface HeaderProps {
    view: 'scanner' | 'history'
    setView: (view: 'scanner' | 'history') => void
  }
  
  export default function Header({ view, setView }: HeaderProps) {
    return (
      <header className="bg-gradient-to-r from-[#90A23C] to-[#7C8D34] text-white px-4 py-4 shadow-lg">
        {/* contenido igual, solo reemplaza setView y view */}
      </header>
    )
  }
  