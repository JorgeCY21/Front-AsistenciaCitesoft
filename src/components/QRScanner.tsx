import React, { useEffect } from 'react'
import { Html5QrcodeScanner } from 'html5-qrcode'

interface QRScannerProps {
  onScan: (data: string) => void
}

export function QRScanner({ onScan }: QRScannerProps) {
  useEffect(() => {
    const scanner = new Html5QrcodeScanner('qr-reader', {
      fps: 10,
      qrbox: 250,
    })

    scanner.render(
      (decodedText) => {
        onScan(decodedText)
        scanner.clear()
      },
      (error) => {
        console.warn('QR scan error', error)
      }
    )

    return () => {
      scanner.clear()
    }
  }, [onScan])

  return <div id="qr-reader" className="rounded-lg shadow-md" />
}
