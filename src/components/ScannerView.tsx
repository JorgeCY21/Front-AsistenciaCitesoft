interface ScannerViewProps {
    scanned: boolean
    error: string
    setScanned: (val: boolean) => void
  }
  
  export default function ScannerView({ scanned, error, setScanned }: ScannerViewProps) {
    return (
      <div className="bg-white rounded-xl shadow-md p-4">
        {/* contenido igual que antes, con `scanned`, `error`, `setScanned` como props */}
      </div>
    )
  }
  