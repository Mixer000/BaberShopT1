import { useState, useEffect } from 'react';
import { Menu, X, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Inicio', href: '#home' },
    { name: 'Servicios', href: '#services' },
    { name: 'Galería', href: '#gallery' },
    { name: 'Testimonios', href: '#testimonials' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'glass py-4' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        <a href="#home" className="text-2xl font-heading font-bold tracking-wider flex flex-col leading-none">
          <span className="text-white">BLADE<span className="text-primary">&</span>FADE</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="text-sm uppercase tracking-widest hover:text-primary transition-colors">
              {link.name}
            </a>
          ))}
          <a href="#booking" className="px-6 py-2 border border-primary text-primary hover:bg-primary hover:text-dark transition-all duration-300 rounded uppercase tracking-widest text-sm font-semibold hover-glow">
            Reservar
          </a>
          <Link to="/admin/login" className="flex items-center gap-2 text-sm uppercase tracking-widest text-white/70 hover:text-primary transition-colors border-l border-white/20 pl-6 ml-2">
            <User size={16} />
            <span className="hidden lg:inline">Barberos</span>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full glass flex flex-col items-center py-8 space-y-6 md:hidden border-t border-white/10"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={() => setIsOpen(false)}
                className="text-lg uppercase tracking-widest hover:text-primary transition-colors"
              >
                {link.name}
              </a>
            ))}
            <a 
              href="#booking" 
              onClick={() => setIsOpen(false)}
              className="px-8 py-3 bg-primary text-dark rounded uppercase tracking-widest text-sm font-bold"
            >
              Reservar
            </a>
            <Link 
              to="/admin/login"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 text-lg uppercase tracking-widest text-white/70 hover:text-primary transition-colors pt-4 border-t border-white/10 w-full justify-center"
            >
              <User size={20} />
              Portal Barberos
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
