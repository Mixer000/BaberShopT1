import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Michael Chen",
    role: "Cliente Habitual",
    content: "La atención al detalle aquí es inigualable. Vengo desde hace más de un año y cada corte está perfectamente adaptado. El afeitado con toalla caliente es una experiencia obligada.",
    rating: 5
  },
  {
    id: 2,
    name: "James Wilson",
    role: "Cliente Nuevo",
    content: "Encontré mi nuevo lugar favorito. El ambiente es increíble, una sensación de lujo real sin ser pretencioso. El equipo realmente se toma su tiempo para entender lo que quieres.",
    rating: 5
  },
  {
    id: 3,
    name: "David Rodriguez",
    role: "Paquete Ejecutivo",
    content: "Me regalo el paquete Ejecutivo una vez al mes. Es el reseteo perfecto. Servicio profesional, excelente conversación y el mejor fade de la ciudad.",
    rating: 5
  }
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section id="testimonials" className="py-24 bg-dark relative overflow-hidden">
      {/* Decorative large quote mark */}
      <Quote className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] text-white/[0.02] z-0 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-primary tracking-widest uppercase text-sm font-semibold mb-2"
          >
            Historias de Clientes
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-heading font-bold"
          >
            Lo que dicen de nosotros
          </motion.h2>
        </div>

        <div className="max-w-4xl mx-auto relative">
          <div className="min-h-[300px] flex items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="w-full text-center px-8 md:px-16"
              >
                <div className="flex justify-center gap-1 mb-8">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-primary fill-primary" />
                  ))}
                </div>
                <p className="text-xl md:text-3xl font-light leading-relaxed mb-10 italic text-gray-300">
                  "{testimonials[currentIndex].content}"
                </p>
                <div>
                  <h4 className="font-heading font-bold text-xl">{testimonials[currentIndex].name}</h4>
                  <p className="text-primary text-sm uppercase tracking-widest mt-1">{testimonials[currentIndex].role}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="absolute top-1/2 left-0 right-0 transform -translate-y-1/2 flex justify-between pointer-events-none">
            <button 
              onClick={prev}
              className="w-12 h-12 rounded-full border border-white/10 glass flex items-center justify-center hover:bg-white/5 transition-colors pointer-events-auto"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
              onClick={next}
              className="w-12 h-12 rounded-full border border-white/10 glass flex items-center justify-center hover:bg-white/5 transition-colors pointer-events-auto"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-3 mt-12">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  idx === currentIndex ? 'bg-primary scale-125' : 'bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
