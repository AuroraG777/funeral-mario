'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import Image from 'next/image'

export default function LibroCondolencias() {
  const [mensajes, setMensajes] = useState([])
  const [nombre, setNombre] = useState('')
  const [mensaje, setMensaje] = useState('')
  const [enviando, setEnviando] = useState(false)

  useEffect(() => {
    fetchMensajes()
  }, [])

  const fetchMensajes = async () => {
    const { data, error } = await supabase
      .from('condolencias')
      .select('*')
      .order('created_at', { ascending: false })

    if (!error) setMensajes(data)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!nombre.trim() || !mensaje.trim()) return

    setEnviando(true)
    const { error } = await supabase
      .from('condolencias')
      .insert([{ nombre, mensaje }])

    if (!error) {
      setNombre('')
      setMensaje('')
      fetchMensajes()
    } else {
      alert('Hubo un error al enviar el mensaje')
    }
    setEnviando(false)
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950 text-neutral-100 py-16 px-4 sm:px-6 lg:px-8 selection:bg-neutral-800">
      <div className="max-w-2xl mx-auto space-y-10">
        
        {/* Cabecera con Homenaje Bilingüe */}
        <div className="text-center space-y-6 border-b border-neutral-800/80 pb-10">
          
          {/* Contorno decorativo para la foto (Imagen más grande) */}
          <div className="relative w-48 h-48 sm:w-56 sm:h-56 mx-auto rounded-full p-1.5 bg-gradient-to-b from-neutral-700 via-neutral-800 to-neutral-950 shadow-2xl">
            <div className="relative w-full h-full rounded-full overflow-hidden bg-neutral-900">
              <Image 
                src="/mario.jpeg" 
                alt="Mario Pino Bambara" 
                fill 
                className="object-cover"
                priority
              />
            </div>
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl sm:text-4xl font-serif tracking-wide text-neutral-100 font-normal">
              Mario Pino Bambara
            </h1>
            
            {/* Subtítulo en Español y Francés */}
            <div className="space-y-1 text-sm sm:text-base text-neutral-400 max-w-lg mx-auto font-light leading-relaxed italic">
              <p>Queremos despedir a nuestro amigo. Deja tu mensaje y dedicatoria en este espacio.</p>
              <p className="text-neutral-500 text-xs sm:text-sm">Nous voulons dire au revoir à notre ami. Laissez votre message et votre dédicace dans cet espace.</p>
            </div>
          </div>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="bg-neutral-900/40 p-6 sm:p-8 rounded-3xl border border-neutral-800/80 space-y-5 shadow-2xl backdrop-blur-md relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-neutral-700 to-transparent"></div>
          
          <div>
            <label className="block text-xs uppercase tracking-widest text-neutral-400 mb-2 font-medium">Tu Nombre / Votre Nom</label>
            <input 
              type="text" 
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
              className="w-full bg-neutral-950/80 border border-neutral-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-neutral-500 text-neutral-100 placeholder-neutral-600 transition"
              placeholder="Ej. María González"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-neutral-400 mb-2 font-medium">Tu Mensaje / Votre Message</label>
            <textarea 
              rows="4"
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
              required
              className="w-full bg-neutral-950/80 border border-neutral-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-neutral-500 text-neutral-100 placeholder-neutral-600 resize-none transition"
              placeholder="Escribe aquí tu recuerdo..."
            />
          </div>
          <button 
            type="submit"
            disabled={enviando}
            className="w-full bg-neutral-100 text-neutral-950 font-medium py-3.5 rounded-xl hover:bg-white transition text-sm disabled:opacity-50 cursor-pointer shadow-lg tracking-wide"
          >
            {enviando ? 'Enviando...' : 'Publicar Mensaje / Publier'}
          </button>
        </form>

        {/* Muro de mensajes */}
        <div className="space-y-4 pt-4">
          <h2 className="text-xs font-semibold tracking-widest text-neutral-500 uppercase text-center sm:text-left">
            Mensajes de Recuerdos ({mensajes.length})
          </h2>
          
          <div className="space-y-4">
            {mensajes.map((item) => (
              <div key={item.id} className="bg-neutral-900/30 border border-neutral-800/60 p-6 rounded-2xl space-y-2.5 shadow-sm hover:border-neutral-700/60 transition">
                <div className="flex justify-between items-center text-xs text-neutral-500 border-b border-neutral-800/40 pb-2">
                  <span className="font-semibold text-neutral-100 text-sm tracking-wide">{item.nombre}</span>
                  <span className="text-neutral-500">{new Date(item.created_at).toLocaleDateString('es-CL', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                <p className="text-neutral-300 text-sm sm:text-base whitespace-pre-wrap leading-relaxed font-light">{item.mensaje}</p>
              </div>
            ))}
            {mensajes.length === 0 && (
              <p className="text-center text-neutral-600 text-sm py-12 italic">Aún no hay mensajes. Sé el primero en dejar un recuerdo.</p>
            )}
          </div>
        </div>

      </div>
    </main>
  )
}