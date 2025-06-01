import { useEffect } from 'react'
import { Html5QrcodeScanner } from 'html5-qrcode/esm/html5-qrcode-scanner'

interface QRScannerProps {
  onScan: (data: string) => void
}

export function QRScanner({ onScan }: QRScannerProps) {
  useEffect(() => {
    const scanner = new Html5QrcodeScanner('qr-reader', {
      fps: 10,
      qrbox: 250,
    }, false) // <-- se añadió el tercer argumento

    scanner.render(
      (decodedText: string) => {
        onScan(decodedText)
        scanner.clear().catch(err => console.error('Error al limpiar', err))
      },
      (error: any) => {
        console.warn('Error de escaneo', error)
      }
    )

    return () => {
      scanner.clear().catch(err => console.error('Error al desmontar', err))
    }
  }, [onScan])

  return <div id="qr-reader" />
}
