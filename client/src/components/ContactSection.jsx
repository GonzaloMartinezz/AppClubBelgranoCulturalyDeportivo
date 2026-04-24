import React from 'react';

const ContactSection = () => {
  return (
    <section className="bg-[#111111] text-white py-20 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 items-start">
        
        {/* Título Gigante */}
        <div className="flex-1">
          <h2 className="text-7xl md:text-9xl font-black uppercase leading-[0.85] tracking-tighter text-gray-200">
            ¿Querés <br />
            unirte <br />
            a nosotros?
          </h2>
        </div>

        {/* Formulario Minimalista */}
        <div className="flex-1 w-full max-w-lg mt-8 md:mt-0">
          <form className="space-y-10">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="relative flex-1">
                <input 
                  type="text" 
                  id="nombre"
                  className="w-full bg-transparent border-b border-gray-600 py-2 text-sm text-white focus:outline-none focus:border-white transition-colors peer"
                  placeholder=" "
                />
                <label className="absolute left-0 top-2 text-xs text-gray-500 uppercase tracking-widest peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-white transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-xs">
                  Nombre
                </label>
              </div>
              <div className="relative flex-1">
                <input 
                  type="text" 
                  id="apellido"
                  className="w-full bg-transparent border-b border-gray-600 py-2 text-sm text-white focus:outline-none focus:border-white transition-colors peer"
                  placeholder=" "
                />
                <label className="absolute left-0 top-2 text-xs text-gray-500 uppercase tracking-widest peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-white transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-xs">
                  Apellido
                </label>
              </div>
            </div>

            <div className="relative">
              <input 
                type="email" 
                id="email"
                className="w-full bg-transparent border-b border-gray-600 py-2 text-sm text-white focus:outline-none focus:border-white transition-colors peer"
                placeholder=" "
              />
              <label className="absolute left-0 top-2 text-xs text-gray-500 uppercase tracking-widest peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-white transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-xs">
                Email
              </label>
            </div>

            <div className="flex items-center gap-6 pt-4">
              <button 
                type="submit" 
                className="bg-white text-black font-bold uppercase text-xs tracking-[0.2em] px-10 py-4 hover:bg-gray-200 transition-colors"
              >
                Enviar
              </button>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="privacy" className="accent-gray-500" />
                <label htmlFor="privacy" className="text-[10px] text-gray-500">
                  Acepto la <a href="#" className="underline hover:text-white">Política de Privacidad</a>
                </label>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
