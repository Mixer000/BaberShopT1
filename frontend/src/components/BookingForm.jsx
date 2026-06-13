import { useState } from 'react';
import { toast } from 'react-toastify';

const BookingForm = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    try {
      const response = await fetch('https://babershopt1.onrender.com/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.msg || errorData.errors?.[0]?.msg || 'Failed to book appointment');
      }

      toast.success('¡Tu cita ha sido reservada con éxito! Nos vemos pronto.');
      e.target.reset();
      
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="booking" className="py-24 bg-secondary relative">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="glass-card overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* Left side info */}
            <div className="lg:w-2/5 p-10 bg-dark relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px]" />
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  <h3 className="text-3xl font-heading font-bold mb-4">Reserva tu Asiento</h3>
                  <p className="text-gray-400 leading-relaxed mb-8">
                    Reserva tu experiencia en línea. Elige tu servicio preferido, fecha y hora. Nosotros nos encargamos del resto.
                  </p>
                  
                  <div className="space-y-6">
                    <div>
                      <p className="text-primary uppercase tracking-widest text-xs font-bold mb-1">Ubicación</p>
                      <p className="text-sm text-gray-300">123 Luxury Ave, Barber District<br/>New York, NY 10001</p>
                    </div>
                    <div>
                      <p className="text-primary uppercase tracking-widest text-xs font-bold mb-1">Horarios</p>
                      <p className="text-sm text-gray-300">Lun-Sab: 9am - 8pm<br/>Dom: 10am - 5pm</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side form */}
            <div className="lg:w-3/5 p-10">
              <form onSubmit={handleSubmit} className="space-y-6" aria-label="Booking Form">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="fullName" className="block text-xs uppercase tracking-widest text-gray-400 mb-2">Nombre Completo</label>
                    <input 
                      id="fullName"
                      type="text" 
                      name="fullName"
                      required
                      aria-required="true"
                      className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-xs uppercase tracking-widest text-gray-400 mb-2">Teléfono</label>
                    <input 
                      id="phone"
                      type="tel" 
                      name="phone"
                      required
                      aria-required="true"
                      className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                      placeholder="(555) 000-0000"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-xs uppercase tracking-widest text-gray-400 mb-2">Correo Electrónico</label>
                    <input 
                      id="email"
                      type="email" 
                      name="email"
                      required
                      aria-required="true"
                      className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="service" className="block text-xs uppercase tracking-widest text-gray-400 mb-2">Servicio</label>
                    <select 
                      id="service"
                      name="service"
                      required
                      aria-required="true"
                      className="w-full bg-secondary border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all appearance-none"
                    >
                      <option value="">Selecciona un servicio...</option>
                      <option value="Classic Haircut">Corte Clásico ($35)</option>
                      <option value="Beard Trim">Arreglo de Barba ($25)</option>
                      <option value="Hot Towel Shave">Afeitado Clásico ($40)</option>
                      <option value="The Executive">Paquete Ejecutivo ($75)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="date" className="block text-xs uppercase tracking-widest text-gray-400 mb-2">Fecha</label>
                    <input 
                      id="date"
                      type="date" 
                      name="date"
                      required
                      aria-required="true"
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="time" className="block text-xs uppercase tracking-widest text-gray-400 mb-2">Hora</label>
                    <select 
                      id="time"
                      name="time"
                      required
                      aria-required="true"
                      className="w-full bg-secondary border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all appearance-none"
                    >
                      <option value="">Selecciona la hora...</option>
                      <option value="09:00">09:00 AM</option>
                      <option value="10:00">10:00 AM</option>
                      <option value="11:00">11:00 AM</option>
                      <option value="12:00">12:00 PM</option>
                      <option value="13:00">01:00 PM</option>
                      <option value="14:00">02:00 PM</option>
                      <option value="15:00">03:00 PM</option>
                      <option value="16:00">04:00 PM</option>
                      <option value="17:00">05:00 PM</option>
                      <option value="18:00">06:00 PM</option>
                    </select>
                  </div>
                </div>

                <button 
                  type="submit"
                  disabled={loading}
                  aria-busy={loading}
                  className="w-full py-4 bg-primary text-dark font-bold uppercase tracking-widest rounded hover-glow hover:bg-yellow-500 transition-all disabled:opacity-70"
                >
                  {loading ? 'Procesando...' : 'Confirmar Reserva'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingForm;
