import { motion } from 'framer-motion';

const images = [
  { id: 1, src: '/images/gallery-1.png', title: 'Fade Moderno' },
  { id: 2, src: '/images/gallery-2.png', title: 'Arreglo de Barba' },
  { id: 3, src: '/images/gallery-3.png', title: 'Herramientas Premium' },
  // Reusing some for demonstration grid if we don't have enough
  { id: 4, src: '/images/gallery-1.png', title: 'Pompadour Clásico' },
  { id: 5, src: '/images/gallery-2.png', title: 'Toalla Caliente' },
  { id: 6, src: '/images/gallery-3.png', title: 'Detallado' },
];

const Gallery = () => {
  return (
    <section id="gallery" className="py-24 bg-secondary relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-primary tracking-widest uppercase text-sm font-semibold mb-2"
          >
            El Lookbook
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-heading font-bold"
          >
            Nuestras Obras Maestras
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group overflow-hidden rounded-xl aspect-[4/5] cursor-pointer"
            >
              <img 
                src={item.src} 
                alt={item.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                <p className="text-primary tracking-widest uppercase text-xs font-semibold mb-1 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">Estilo</p>
                <h3 className="text-2xl font-heading font-bold text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">{item.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
