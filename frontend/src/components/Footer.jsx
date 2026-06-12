import { MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-dark pt-20 pb-10 border-t border-white/10 relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
      
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-heading font-bold tracking-wider flex flex-col leading-none mb-6">
              <span className="text-white">BLADE<span className="text-primary">&</span>FADE</span>
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Elevando el estándar del cuidado masculino. Donde las técnicas tradicionales de barbería se encuentran con el lujo moderno.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-dark transition-all duration-300 font-bold text-sm">
                IG
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-dark transition-all duration-300 font-bold text-sm">
                FB
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-dark transition-all duration-300 font-bold text-sm">
                X
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-bold text-lg mb-6 tracking-wide">Contáctanos</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 text-gray-400 text-sm">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
                <p>123 Luxury Ave, Barber District<br/>New York, NY 10001</p>
              </div>
              <div className="flex items-center space-x-3 text-gray-400 text-sm">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <p>(555) 000-0000</p>
              </div>
              <div className="flex items-center space-x-3 text-gray-400 text-sm">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <p>hello@bladeandfade.com</p>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-heading font-bold text-lg mb-6 tracking-wide">Horarios de Atención</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-gray-400">
                <span>Lunes - Viernes</span>
                <span className="text-white">9:00 AM - 8:00 PM</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Sábado</span>
                <span className="text-white">9:00 AM - 6:00 PM</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Domingo</span>
                <span className="text-white">10:00 AM - 5:00 PM</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Blade & Fade Barber Shop. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
