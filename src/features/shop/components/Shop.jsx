import { useState } from 'react';

export const Shop = ({ products = [] }) => {
  const [cart, setCart] = useState([]);
  
  const defaultProducts = [
    { _id: '1', name: 'Camiseta Oficial 2026', price: 25000, image: 'https://images.unsplash.com/photo-1553486788-be94c0d6297e?w=400', category: 'ropa' },
    { _id: '2', name: 'Buzo Entrenamiento', price: 35000, image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400', category: 'ropa' },
    { _id: '3', name: 'Gorras Logo', price: 5000, image: 'https://images.unsplash.com/photo-1588850561407-ed78c2826cfc?w=400', category: 'accesorios' },
    { _id: '4', name: 'Llavero Belgrano', price: 2500, image: 'https://images.unsplash.com/photo-1596439377671-c45cd20ec37d?w=400', category: 'accesorios' },
    { _id: '5', name: 'Pelota Oficial', price: 15000, image: 'https://images.unsplash.com/photo-1519861531473-92002639313dd?w=400', category: 'equipamiento' },
    { _id: '6', name: 'Medias Team', price: 8000, image: 'https://images.unsplash.com/photo-1571019613454-1b1a6e23da40?w=400', category: 'ropa' }
  ];

  const productList = products.length > 0 ? products : defaultProducts;

  const addToCart = (product) => {
    setCart(prev => {
      const exists = prev.find(p => p._id === product._id);
      if (exists) {
        return prev.map(p => p._id === product._id ? { ...p, qty: p.qty + 1 } : p);
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const cartTotal = cart.reduce((acc, p) => acc + (p.price * p.qty), 0);

  return (
    <section id="shop" className="px-6 md:px-12 py-16 bg-surface border-b-2 border-white/10">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-teko text-white mb-8 uppercase">Tienda</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {productList.map(product => (
            <div key={product._id} className="bg-dark border-2 border-white hover:border-brand transition-all group">
              <div className="aspect-square overflow-hidden">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-teko text-white uppercase mb-1">{product.name}</h3>
                <p className="text-xl font-teko text-brand mb-3">${product.price.toLocaleString('es-AR')}</p>
                <button 
                  onClick={() => addToCart(product)}
                  className="w-full py-2 border-2 border-white font-oswald font-bold text-xs uppercase tracking-[0.2em] hover:bg-white hover:text-dark transition-all"
                >
                  AGREGAR
                </button>
              </div>
            </div>
          ))}
        </div>

        {cart.length > 0 && (
          <div className="fixed bottom-4 right-4 bg-brand p-4 border-2 border-white">
            <div className="flex items-center gap-4">
              <span className="text-white font-oswald">{cart.reduce((a, p) => a + p.qty, 0)} items</span>
              <span className="text-white font-teko text-xl">${cartTotal.toLocaleString('es-AR')}</span>
              <button className="bg-white text-brand px-4 py-2 font-oswald font-bold text-xs uppercase">
                Comprar
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Shop;