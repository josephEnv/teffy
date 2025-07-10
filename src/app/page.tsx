"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Heart, Sparkles, Lock } from "lucide-react"
import Image from "next/image"
import cute_couple from "@/images/cute-couple.gif"

export default function PreguntaDeAmor() {
  const [nombreVerificado, setNombreVerificado] = useState(false)
  const [entradaNombre, setEntradaNombre] = useState("")
  const [errorNombre, setErrorNombre] = useState("")
  const [mostrarResultado, setMostrarResultado] = useState(false)
  const [posicionBotonNo, setPosicionBotonNo] = useState({ x: 200, y: 0 })
  const [textoBotonNo, setTextoBotonNo] = useState("No")
  const [estaInicializado, setEstaInicializado] = useState(false)
  const botonNoRef = useRef<HTMLButtonElement>(null)
  const contenedorRef = useRef<HTMLDivElement>(null)

  const nombresCorrectos = ["teffy", "tefi", "tefy"];


  const textosBotonNo = [
    "No",
    "¿Segura?",
    "¿En serio?",
    "¡Piénsalo bien!",
    "¡No seas traviesa!",
    "¡Intenta de nuevo!",
    "¡Imposible!",
    "¡Nunca!",
    "¡Vamos!",
    "¡Di que sí, por fa!",
  ]
  const [indiceTexto, setIndiceTexto] = useState(0)

  useEffect(() => {
    const inicializarPosicion = () => {
      if (contenedorRef.current) {
        const contenedor = contenedorRef.current.getBoundingClientRect()
        setPosicionBotonNo({
          x: Math.min(250, contenedor.width - 150),
          y: 0,
        })
        setEstaInicializado(true)
      }
    }

    if (nombreVerificado) {
      inicializarPosicion()
      window.addEventListener("resize", inicializarPosicion)
      return () => window.removeEventListener("resize", inicializarPosicion)
    }
  }, [nombreVerificado])

  const validarNombre = (e: React.FormEvent) => {
    e.preventDefault();
    const entradaNormalizada = entradaNombre.trim().toLowerCase();

    if (nombresCorrectos.includes(entradaNormalizada)) {
      setNombreVerificado(true);
      setErrorNombre("");
    } else {
      setErrorNombre("¡Ese no es tu apodo! Intenta de nuevo 🥺");
      setEntradaNombre("");
    }
  };

  const moverBotonNo = () => {
    if (contenedorRef.current) {
      const contenedor = contenedorRef.current.getBoundingClientRect()
      const anchoBoton = 120
      const altoBoton = 56

      const maxX = Math.max(0, contenedor.width - anchoBoton - 40)
      const maxY = Math.max(0, 200)

      const nuevoX = Math.random() * maxX
      const nuevoY = Math.random() * maxY - 100

      setPosicionBotonNo({ x: nuevoX, y: nuevoY })
      setIndiceTexto((prev) => (prev + 1) % textosBotonNo.length)
      setTextoBotonNo(textosBotonNo[(indiceTexto + 1) % textosBotonNo.length])
    }
  }

  const manejarClickSi = () => {
    setMostrarResultado(true)
  }

  // === Etapa 1: Verificación de nombre ===
  if (!nombreVerificado) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center p-4">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 max-w-md w-full text-center space-y-6">
          <div className="relative">
            <Lock className="w-16 h-16 text-purple-500 mx-auto mb-4" />
            <Sparkles className="w-6 h-6 text-yellow-400 absolute -top-1 -right-6 animate-spin" />
          </div>

          <div className="space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Acceso Requerido
            </h1>
            <p className="text-gray-600 text-lg">Para entrar a este lugar especial, necesito saber quién eres 💕</p>
          </div>

          <form onSubmit={validarNombre} className="space-y-4">
            <div className="text-left">
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                ¿Cuál es tu apodo favorito?
              </label>
              <input
                type="text"
                id="fullName"
                value={entradaNombre}
                onChange={(e) => setEntradaNombre(e.target.value)}
                className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors text-gray-800"
                placeholder="Escríbelo aquí..."
                required
              />
            </div>

            {errorNombre && (
              <div className="text-red-500 text-sm bg-red-50 p-3 rounded-lg border border-red-200">{errorNombre}</div>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              Verificar Identidad ✨
            </button>
          </form>

          <p className="text-xs text-gray-500 italic">Pista: ¿Cómo te gusta que te digan? 😉</p>
        </div>
      </div>
    )
  }

  // === Etapa 2: Resultado positivo ===
  if (mostrarResultado) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-indigo-200 flex items-center justify-center p-4">
        <div className="text-center space-y-6 md:space-y-8 animate-fade-in max-w-2xl mx-auto">
          <div className="mb-8">
            <Image
              src={cute_couple}
              alt="Parejita tierna"
              width={192}
              height={192}
              className="w-32 h-32 md:w-48 md:h-48 mx-auto rounded-2xl shadow-lg"
              priority
            />
          </div>

          <div className="relative">
            <Heart className="w-20 h-20 md:w-32 md:h-32 text-red-500 mx-auto animate-pulse" fill="currentColor" />
            <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-yellow-400 absolute -top-2 -right-2 animate-spin" />
            <Sparkles className="w-4 h-4 md:w-6 md:h-6 text-pink-400 absolute -bottom-2 -left-2 animate-bounce" />
          </div>

          <div className="space-y-4">
            <h1 className="text-3xl md:text-6xl font-bold bg-gradient-to-r from-pink-500 via-red-500 to-purple-600 bg-clip-text text-transparent">
              ¡Yo también te amo! 💖
            </h1>
            <p className="text-lg md:text-2xl text-gray-700 font-medium">
              Me enseñaste que la distancia es solo un detalle 🌍
            </p>
            <p className="text-base md:text-lg text-gray-600 max-w-md mx-auto px-4">
              Aprendí que el amor no se toca ni se ve… se siente.
              A veces, el corazón puede tocar más profundo que cualquier mano. Contigo aprendí eso.
            </p>
            <p className="text-sm italic text-gray-500 mt-4">
              — Att: Joseph 💖
            </p>
          </div>

          <div className="flex justify-center space-x-2 md:space-x-4">
            {[...Array(5)].map((_, i) => (
              <Heart
                key={i}
                className="w-4 h-4 md:w-6 md:h-6 text-red-400 animate-bounce"
                fill="currentColor"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>
      </div>
    )
  }

  // === Etapa 3: Pregunta central "¿Me amas?" ===
  return (
    <div
      ref={contenedorRef}
      className="min-h-screen bg-gradient-to-br from-rose-100 via-pink-50 to-purple-100 flex items-center justify-center p-4 relative overflow-hidden"
    >
      {/* Corazones flotantes de fondo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <Heart
            key={i}
            className="absolute text-pink-300 opacity-20 animate-float hidden md:block"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
            size={Math.random() * 30 + 20}
          />
        ))}
      </div>

      <div className="text-center space-y-8 md:space-y-12 z-10 relative w-full max-w-4xl mx-auto">
        <div className="space-y-4 md:space-y-6">
          <div className="relative inline-block">
            <Heart className="w-16 h-16 md:w-20 md:h-20 text-red-500 mx-auto mb-4 animate-pulse" fill="currentColor" />
            <Sparkles className="w-4 h-4 md:w-6 md:h-6 text-yellow-400 absolute -top-1 -right-1 animate-spin" />
          </div>

          <h1 className="text-4xl md:text-7xl font-bold bg-gradient-to-r from-pink-500 via-red-500 to-purple-600 bg-clip-text text-transparent px-4">
            ¿Me amas?
          </h1>

          <p className="text-lg md:text-2xl text-gray-600 font-medium px-4">Responde con sinceridad... 💖</p>
        </div>

        <div className="relative h-40 md:h-32 w-full">
          <div className="flex justify-center mb-4 md:mb-0">
            <button
              onClick={manejarClickSi}
              className="bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white font-bold py-3 px-8 md:py-4 md:px-12 rounded-full text-lg md:text-xl shadow-lg transform hover:scale-105 transition-all duration-200 z-20 relative"
            >
              ¡Sí! 💕
            </button>
          </div>

          {estaInicializado && (
            <button
              ref={botonNoRef}
              onMouseEnter={moverBotonNo}
              onTouchStart={moverBotonNo}
              onFocus={moverBotonNo}
              className="absolute bg-gradient-to-r from-red-400 to-red-600 hover:from-red-500 hover:to-red-700 text-white font-bold py-3 px-6 md:py-4 md:px-8 rounded-full text-lg md:text-xl shadow-lg transform transition-all duration-300 ease-out z-10 whitespace-nowrap"
              style={{
                left: `${Math.min(posicionBotonNo.x, window.innerWidth - 140)}px`,
                top: `${posicionBotonNo.y}px`,
              }}
            >
              {textoBotonNo}
            </button>
          )}
        </div>

        <p className="text-xs md:text-sm text-gray-500 italic mt-4 md:mt-8 px-4">
          Pista: ¡Solo hay una respuesta correcta! 😉
        </p>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }

        @keyframes fade-in {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }

        .animate-float {
          animation: float 4s ease-in-out infinite;
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
      `}</style>
    </div>
  )
}
