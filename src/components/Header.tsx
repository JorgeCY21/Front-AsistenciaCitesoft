interface HeaderProps {
  overrideButton?: React.ReactNode;
}
export default function Header({ overrideButton }: HeaderProps) {
  return (
    <header className="bg-gradient-to-r from-[#90A23C] to-[#7C8D34] text-white px-4 py-4 shadow-lg">
        <div className="max-w-4xl mx-auto w-full flex flex-col sm:flex-row justify-between items-center gap-4">
            <h1 className="text-2xl font-bold tracking-tight">Asistencia CITESOFT</h1>
            {overrideButton && <div>{overrideButton}</div>}
        </div>
        
    </header>
  );
}


