import { motion } from 'framer-motion';
import { Scissors, Ruler, Droplets, Sparkles } from 'lucide-react';

const services = [
  {
    icon: <Scissors className="w-8 h-8 text-primary" />,
    title: "Corte Clásico",
    price: "$35",
    desc: "Corte de precisión adaptado a la forma de tu cabeza y estilo personal, con acabado profesional."
  },
  {
    icon: <Ruler className="w-8 h-8 text-primary" />,
    title: "Arreglo de Barba",
    price: "$25",
    desc: "Modelado detallado de barba, perfilado y acondicionamiento con aceites premium."
  },
  {
    icon: <Droplets className="w-8 h-8 text-primary" />,
    title: "Afeitado Clásico",
    price: "$40",
    desc: "Afeitado tradicional con navaja, toallas calientes con aceites esenciales y aftershave relajante."
  },
  {
    icon: <Sparkles className="w-8 h-8 text-primary" />,
    title: "El Ejecutivo",
    price: "$75",
    desc: "Servicio completo: Corte, afeitado clásico, exfoliación facial y masaje capilar relajante."
  }
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const Services = () => {
  return (
    <section id="services" className="py-24 bg-dark relative">
      {/* Background texture element */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px]" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-primary tracking-widest uppercase text-sm font-semibold mb-2"
          >
            Nuestro Menú
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-heading font-bold"
          >
            Servicios Premium
          </motion.h2>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {services.map((service, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              className="glass-card p-8 group hover:-translate-y-2 transition-transform duration-300"
            >
              <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-white/5">
                {service.icon}
              </div>
              <div className="flex justify-between items-end mb-4">
                <h3 className="text-xl font-heading font-bold">{service.title}</h3>
                <span className="text-primary font-bold text-lg">{service.price}</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                {service.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
