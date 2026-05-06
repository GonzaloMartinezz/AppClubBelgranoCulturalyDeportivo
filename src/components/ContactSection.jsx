const ContactSection = () => {
  return (
    <section id="contacto" className="bg-surface relative py-32 px-6 md:px-12 overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
        maskImage: 'radial-gradient(ellipse 50% 50% at 50% 0%, black 20%, transparent 100%)'
      }}></div>

      {/* Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand/5 rounded-full blur-[150px]"></div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 items-center">

          {/* Left - Title */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-3 border border-brand/30 bg-brand/5 px-4 py-2 font-oswald text-[10px] uppercase tracking-[0.25em] text-brand font-bold">
              SUMATE A LA FAMILIA
            </div>

            <h2 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-teko font-bold uppercase leading-[0.85] tracking-tight">
              <span className="text-white">¿Querés</span><br />
              <span className="text-brand">Unirte</span><br />
              <span className="text-stroke">a nosotros?</span>
            </h2>

            <p className="text-gray-500 font-sans text-base leading-relaxed max-w-md pt-4">
              Dejanos tus datos y nos pondremos en contacto para contarte sobre los beneficios de ser parte de Belgrano.
            </p>

            {/* Contact Info */}
            <div className="flex flex-col gap-4 pt-8 border-t border-white/5">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-brand/10 border border-brand/20 flex items-center justify-center">
                  <svg className="w-4 h-4 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="text-sm text-gray-400">info@belgrano.com</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-brand/10 border border-brand/20 flex items-center justify-center">
                  <svg className="w-4 h-4 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <span className="text-sm text-gray-400">+54 381 456-7890</span>
              </div>
            </div>
          </div>

          {/* Right - Form */}
          <div className="w-full max-w-lg lg:ml-auto">
            <div className="bg-dark/80 border border-white/10 p-8 md:p-12">
              <form className="space-y-10">
                <div className="flex flex-col sm:flex-row gap-8">
                  <div className="relative flex-1 group">
                    <input
                      type="text"
                      id="nombre"
                      className="w-full bg-transparent border-b border-white/20 py-3 text-sm text-white focus:outline-none focus:border-brand transition-colors peer placeholder-transparent"
                      placeholder="Nombre"
                    />
                    <label htmlFor="nombre" className="absolute left-0 top-3 text-[10px] font-oswald text-gray-600 uppercase tracking-[0.2em] peer-focus:-top-4 peer-focus:text-brand peer-focus:text-[9px] transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-[10px]">
                      Nombre
                    </label>
                  </div>
                  <div className="relative flex-1 group">
                    <input
                      type="text"
                      id="apellido"
                      className="w-full bg-transparent border-b border-white/20 py-3 text-sm text-white focus:outline-none focus:border-brand transition-colors peer placeholder-transparent"
                      placeholder="Apellido"
                    />
                    <label htmlFor="apellido" className="absolute left-0 top-3 text-[10px] font-oswald text-gray-600 uppercase tracking-[0.2em] peer-focus:-top-4 peer-focus:text-brand peer-focus:text-[9px] transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-[10px]">
                      Apellido
                    </label>
                  </div>
                </div>

                <div className="relative group">
                  <input
                    type="email"
                    id="email"
                    className="w-full bg-transparent border-b border-white/20 py-3 text-sm text-white focus:outline-none focus:border-brand transition-colors peer placeholder-transparent"
                    placeholder="Email"
                  />
                  <label htmlFor="email" className="absolute left-0 top-3 text-[10px] font-oswald text-gray-600 uppercase tracking-[0.2em] peer-focus:-top-4 peer-focus:text-brand peer-focus:text-[9px] transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-[10px]">
                    Email
                  </label>
                </div>

                <div className="relative group">
                  <input
                    type="tel"
                    id="telefono"
                    className="w-full bg-transparent border-b border-white/20 py-3 text-sm text-white focus:outline-none focus:border-brand transition-colors peer placeholder-transparent"
                    placeholder="Teléfono"
                  />
                  <label htmlFor="telefono" className="absolute left-0 top-3 text-[10px] font-oswald text-gray-600 uppercase tracking-[0.2em] peer-focus:-top-4 peer-focus:text-brand peer-focus:text-[9px] transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-[10px]">
                    Teléfono
                  </label>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-white/5">
                  <div className="flex items-center gap-3">
                    <input type="checkbox" id="privacy" className="w-4 h-4 accent-brand bg-dark border-gray-600 cursor-pointer" />
                    <label htmlFor="privacy" className="text-[10px] text-gray-500">
                      Acepto la <a href="#" className="text-white hover:text-brand underline transition-colors">Política de Privacidad</a>
                    </label>
                  </div>
                  <button
                    type="submit"
                    className="w-full sm:w-auto group relative px-10 py-4 bg-white text-dark font-oswald font-bold uppercase text-xs tracking-[0.2em] overflow-hidden hover:text-white transition-colors duration-300"
                  >
                    <span className="relative z-10">Enviar</span>
                    <div className="absolute inset-0 bg-brand translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300"></div>
                  </button>
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactSection;
