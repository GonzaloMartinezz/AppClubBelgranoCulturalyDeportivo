import React from 'react';

const ContactSection = () => {
  return (
    <section className="bg-surface relative py-32 px-6 md:px-12 lg:px-24 overflow-hidden">
      {/* Decorative background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-20 items-center relative z-10">

        {/* Título Gigante */}
        <div className="flex-1 space-y-6">
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-dark text-brand text-xs font-oswald font-bold tracking-widest rounded-full border border-brand/20">
            SUMATE A LA FAMILIA
          </div>
          <h2 className="text-7xl md:text-[8rem] font-teko font-bold uppercase leading-[0.8] tracking-normal text-white drop-shadow-xl">
            ¿Querés <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-brand to-cyan-400">Unirte</span> <br />
            a nosotros?
          </h2>
          <p className="text-gray-400 font-sans font-light text-lg max-w-md pt-4">
            Dejanos tus datos y nos pondremos en contacto con vos para contarte sobre los beneficios de ser socio de Belgrano.
          </p>
        </div>

        {/* Formulario Minimalista */}
        <div className="flex-1 w-full max-w-lg">
          <div className="bg-dark/80 backdrop-blur-xl border border-white/10 rounded-4xl p-10 shadow-2xl">
            <form className="space-y-10">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="relative flex-1 group">
                  <input
                    type="text"
                    id="nombre"
                    className="w-full bg-transparent border-b border-white/20 py-3 text-sm text-white font-sans focus:outline-none focus:border-brand transition-colors peer placeholder-transparent"
                    placeholder="Nombre"
                  />
                  <label htmlFor="nombre" className="absolute left-0 top-3 text-xs font-oswald text-gray-500 uppercase tracking-widest peer-focus:-top-5 peer-focus:text-[10px] peer-focus:text-brand transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-xs">
                    Nombre
                  </label>
                </div>
                <div className="relative flex-1 group">
                  <input
                    type="text"
                    id="apellido"
                    className="w-full bg-transparent border-b border-white/20 py-3 text-sm text-white font-sans focus:outline-none focus:border-brand transition-colors peer placeholder-transparent"
                    placeholder="Apellido"
                  />
                  <label htmlFor="apellido" className="absolute left-0 top-3 text-xs font-oswald text-gray-500 uppercase tracking-widest peer-focus:-top-5 peer-focus:text-[10px] peer-focus:text-brand transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-xs">
                    Apellido
                  </label>
                </div>
              </div>

              <div className="relative group">
                <input
                  type="email"
                  id="email"
                  className="w-full bg-transparent border-b border-white/20 py-3 text-sm text-white font-sans focus:outline-none focus:border-brand transition-colors peer placeholder-transparent"
                  placeholder="Email"
                />
                <label htmlFor="email" className="absolute left-0 top-3 text-xs font-oswald text-gray-500 uppercase tracking-widest peer-focus:-top-5 peer-focus:text-[10px] peer-focus:text-brand transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-xs">
                  Email
                </label>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6">
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <input type="checkbox" id="privacy" className="w-4 h-4 accent-brand bg-dark border-gray-600 rounded cursor-pointer" />
                  <label htmlFor="privacy" className="text-[10px] font-sans text-gray-400">
                    Acepto la <a href="#" className="text-white hover:text-brand underline transition-colors">Política de Privacidad</a>
                  </label>
                </div>
                <button
                  type="submit"
                  className="w-full sm:w-auto bg-white text-dark font-oswald font-bold uppercase text-sm tracking-[0.2em] px-10 py-4 rounded-xl hover:bg-brand hover:text-white transition-all duration-300 shadow-lg hover:shadow-brand/30"
                >
                  Enviar Datos
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
