import React, { useState } from 'react'
import { EyeIcon, EyeOffIcon, UserIcon, LockIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export function Login() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const { username, password } = formData
  
    if (username === 'admin' && password === '1234') {
      alert('Inicio de sesión exitoso')
      navigate('/home') // 🔁 Redirección
    } else {
      alert('Usuario o contraseña incorrectos')
    }
  }
  
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
            <p className="text-white mt-2">Inicia sesión para registrar tu asistencia</p>
          </div>

          {/* Login Form */}
          <div className="p-8">
            <form onSubmit={handleSubmit}>
              {/* Username Field */}
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-medium mb-2"
                  htmlFor="username"
                >
                  Usuario
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <UserIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    className="pl-10 w-full border-2 border-gray-200 rounded-lg py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                    placeholder="Ingresa tu usuario"
                    value={formData.username}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              {/* Password Field */}
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-medium mb-2"
                  htmlFor="password"
                >
                  Contraseña
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <LockIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    className="pl-10 w-full border-2 border-gray-200 rounded-lg py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                    placeholder="Ingresa tu contraseña"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <EyeOffIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <EyeIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="w-full bg-[#E6953A] hover:bg-[#d8842e] text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-[#f0a450]"
              >
                Iniciar Sesión
              </button>
            </form>            
          </div>
        </div>
      </div>
    </div>
  )
}
