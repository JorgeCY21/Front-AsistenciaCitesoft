interface ScannerViewProps {
    scanned: boolean
    error: string
    setScanned: (val: boolean) => void
  }
  
  export default function ScannerView({ scanned, error, setScanned }: ScannerViewProps) {
    return (
      <div className="bg-white rounded-xl shadow-md p-4">
        {error ? (
          <p className="text-red-600 font-semibold">{error}</p>
        ) : (
          <>
            {!scanned ? (
              <>
                <div id="qr-reader" className="w-full max-w-md mx-auto" />
                <p className="mt-2 text-center text-gray-700">Apunta tu cámara al código QR.</p>
              </>
            ) : (
              <div className="text-center p-4 text-green-700 font-bold">
                ¡Asistencia registrada con éxito!
                <button
                  onClick={() => setScanned(false)}
                  className="mt-3 px-3 py-1 bg-[#7C8D34] text-white rounded hover:bg-[#90A23C]"
                >
                  Escanear otro
                </button>
              </div>
            )}
          </>
        )}
      </div>
    )
  }
  