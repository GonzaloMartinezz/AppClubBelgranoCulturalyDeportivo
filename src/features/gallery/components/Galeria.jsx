import { useState } from 'react';

const DEFAULT_GALLERY = [
  { _id: '1', url: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800', caption: 'Partido' },
  { _id: '2', url: 'https://images.unsplash.com/photo-1519861531473-92002639313dd?w=800', caption: 'Entrenamiento' },
  { _id: '3', url: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800', caption: 'Victoria' },
  { _id: '4', url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800', caption: 'Equipo' },
  { _id: '5', url: 'https://images.unsplash.com/photo-1599058945522-5f2e32a6d789?w=800', caption: 'Celebración' },
  { _id: '6', url: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800', caption: 'Partido' }
];

export const Galeria = ({ images = [] }) => {
  const [gallery] = useState(() => images.length > 0 ? images : DEFAULT_GALLERY);
  const [lightbox, setLightbox] = useState(null);

  return (
    <section id="galeria" className="px-6 md:px-12 py-16 bg-dark border-b-2 border-white/10">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-teko text-white mb-8 uppercase">Galería</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {gallery.map((img) => (
            <div
              key={img._id}
              className="relative group overflow-hidden cursor-pointer"
              onClick={() => setLightbox(img)}
            >
              <img
                src={img.url}
                alt={img.caption}
                className="w-full h-64 object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <span className="text-white font-oswald text-sm uppercase tracking-widest">{img.caption}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {lightbox && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <img src={lightbox.url} alt={lightbox.caption} className="max-w-full max-h-[80vh] object-contain" />
          <p className="absolute bottom-8 text-white font-oswald text-sm">{lightbox.caption}</p>
        </div>
      )}
    </section>
  );
};

export default Galeria;
