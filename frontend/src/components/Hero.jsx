import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/images/hero.png" 
          alt="Luxury Barber Shop Interior" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-dark/80 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl mx-auto"
        >
          <p className="text-primary tracking-[0.2em] uppercase text-sm md:text-base font-semibold mb-4">
            Experiencia de Cuidado Premium
          </p>
          <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6 leading-tight">
            Eleva tu <br />
            <span className="text-gradient">Estilo Personal</span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl mb-10 font-light max-w-2xl mx-auto">
            Experimenta la mezcla perfecta de artesanía tradicional y estilo moderno en nuestro estudio de lujo.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="#booking" 
              className="px-8 py-4 bg-primary text-dark font-bold uppercase tracking-widest rounded hover-glow hover:bg-yellow-500 transition-all w-full sm:w-auto"
            >
              Agendar Cita
            </a>
            <a 
              href="#services" 
              className="px-8 py-4 border border-white/30 text-white font-bold uppercase tracking-widest rounded hover:bg-white/10 transition-all w-full sm:w-auto backdrop-blur-sm"
            >
              Ver Servicios
            </a>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center opacity-50"
      >
        <span className="text-xs uppercase tracking-widest mb-2">Bajar</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent" />
      </motion.div>
    </section>
  );
};

export default Hero;
