import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LogInIcon } from 'lucide-react'

export function Login() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const handleGoogleLogin = () => {
    const width = 500
    const height = 600
    const left = (window.innerWidth - width) / 2
    const top = (window.innerHeight - height) / 2

    setIsLoading(true)

    const authWindow = window.open(
      `${import.meta.env.VITE_API_BACK_URL}/auth/google`,
      '_blank',
      `width=${width},height=${height},left=${left},top=${top}`
    )

    const interval = setInterval(() => {
      if (authWindow?.closed) {
        clearInterval(interval)
        setIsLoading(false)
      }
    }, 1000)
  }

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== import.meta.env.VITE_API_BACK_URL) return

      if (event.data?.success) {
        fetch(`${import.meta.env.VITE_API_BACK_URL}/api/me`, {
          method: 'GET',
          credentials: 'include',
        })
          .then((res) => {
            if (!res.ok) throw new Error('No autenticado')
            return res.json()
          })
          .then((userData) => {
            console.log('Usuario autenticado:', userData)
            navigate('/')
          })
          .catch(() => {
            alert('Ocurrió un error al verificar tu sesión.')
          })
      }

      if (event.data?.error) {
        alert('Error al iniciar sesión con Google.')
        setIsLoading(false)
      }
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [navigate])

  return (
    <div className="min-h-screen w-full bg-[#ecf0f3] flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#90A23C] to-[#7F8E34] p-6 text-center">
            <img
              src="/logo.png"
              alt="Logo de Citesoft"
              className="mx-auto mb-4 w-20 h-20 object-contain rounded-full shadow-md bg-white p-1"
            />
            <h1 className="text-3xl font-bold text-white">Bienvenidos a Citesoft!</h1>
            <p className="text-white mt-2">Inicia sesión con Google</p>
          </div>

          {/* Google Login Button */}
          <div className="p-8 flex flex-col items-center">
            <button
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="flex items-center gap-2 w-full bg-[#E6953A] hover:bg-[#d8842e] text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-[#f0a450] justify-center"
            >
              <LogInIcon className="w-5 h-5" />
              {isLoading ? 'Cargando...' : 'Iniciar sesión con Google'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
