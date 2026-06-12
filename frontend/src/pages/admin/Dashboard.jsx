import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { LogOut, Calendar as CalendarIcon, List, Search, Trash2, Edit2 } from 'lucide-react';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const Dashboard = () => {
  const { logout } = useContext(AuthContext);
  const [appointments, setAppointments] = useState([]);
  const [stats, setStats] = useState({ total: 0, pending: 0, confirmed: 0, completed: 0, cancelled: 0 });
  const [view, setView] = useState('list'); // 'list' or 'calendar'
  
  // Filters
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    fetchAppointments();
  }, [statusFilter, search]); // Re-fetch on filter change

  const fetchAppointments = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/appointments', {
        params: { status: statusFilter, search }
      });
      setAppointments(res.data);

      const statsRes = await axios.get('http://localhost:5000/api/appointments/stats');
      setStats(statsRes.data);
    } catch (error) {
      console.error('Error fetching data', error);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.put(`http://localhost:5000/api/appointments/${id}`, { status: newStatus });
      fetchAppointments();
    } catch (error) {
      console.error('Error updating status', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta cita?')) {
      try {
        await axios.delete(`http://localhost:5000/api/appointments/${id}`);
        fetchAppointments();
      } catch (error) {
        console.error('Error deleting appointment', error);
      }
    }
  };

  // Prepare events for calendar
  const calendarEvents = appointments.map(apt => {
    // Combine date and time
    const [hours, minutes] = apt.time.split(':');
    const startDate = new Date(apt.date);
    startDate.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0);
    
    const endDate = new Date(startDate);
    endDate.setHours(startDate.getHours() + 1); // Assume 1 hour duration

    return {
      title: `${apt.fullName} - ${apt.service} (${apt.status})`,
      start: startDate,
      end: endDate,
      resource: apt
    };
  });

  return (
    <div className="min-h-screen bg-dark flex flex-col">
      {/* Top Navigation */}
      <header className="bg-secondary border-b border-white/10 px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-heading font-bold text-white tracking-wider">
          BLADE<span className="text-primary">&</span>FADE <span className="text-gray-500 font-body text-sm ml-2">Panel de Control</span>
        </h1>
        <button 
          onClick={logout}
          className="flex items-center text-gray-400 hover:text-white transition-colors text-sm"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Cerrar Sesión
        </button>
      </header>

      <main className="flex-1 p-6">
        {/* Statistics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white/5 border border-white/10 p-4 rounded text-center">
            <p className="text-gray-400 text-xs uppercase tracking-widest mb-1">Total</p>
            <p className="text-3xl font-bold text-white">{stats.total}</p>
          </div>
          <div className="bg-white/5 border border-white/10 p-4 rounded text-center">
            <p className="text-gray-400 text-xs uppercase tracking-widest mb-1">Pendiente</p>
            <p className="text-3xl font-bold text-yellow-400">{stats.pending}</p>
          </div>
          <div className="bg-white/5 border border-white/10 p-4 rounded text-center">
            <p className="text-gray-400 text-xs uppercase tracking-widest mb-1">Completado</p>
            <p className="text-3xl font-bold text-blue-400">{stats.completed}</p>
          </div>
          <div className="bg-white/5 border border-white/10 p-4 rounded text-center">
            <p className="text-gray-400 text-xs uppercase tracking-widest mb-1">Cancelado</p>
            <p className="text-3xl font-bold text-red-400">{stats.cancelled}</p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div className="flex space-x-2">
            <button 
              onClick={() => setView('list')}
              className={`flex items-center px-4 py-2 rounded text-sm ${view === 'list' ? 'bg-primary text-dark font-bold' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}
            >
              <List className="w-4 h-4 mr-2" /> Vista de Lista
            </button>
            <button 
              onClick={() => setView('calendar')}
              className={`flex items-center px-4 py-2 rounded text-sm ${view === 'calendar' ? 'bg-primary text-dark font-bold' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}
            >
              <CalendarIcon className="w-4 h-4 mr-2" /> Calendario
            </button>
          </div>

          {view === 'list' && (
            <div className="flex space-x-4 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input 
                  type="text" 
                  placeholder="Buscar nombre, teléfono, email..." 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded pl-10 pr-4 py-2 text-white text-sm focus:outline-none focus:border-primary"
                />
              </div>
              <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-white/5 border border-white/10 rounded px-4 py-2 text-white text-sm focus:outline-none focus:border-primary appearance-none"
              >
                <option value="">Todos los Estados</option>
                <option value="Pending">Pendiente</option>
                <option value="Confirmed">Confirmado</option>
                <option value="Completed">Completado</option>
                <option value="Cancelled">Cancelado</option>
              </select>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="glass-card p-6 h-[70vh]">
          {view === 'list' ? (
            <div className="overflow-x-auto h-full">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10 text-xs uppercase tracking-wider text-gray-500">
                    <th className="pb-4 font-medium">Cliente</th>
                    <th className="pb-4 font-medium">Servicio</th>
                    <th className="pb-4 font-medium">Fecha y Hora</th>
                    <th className="pb-4 font-medium">Estado</th>
                    <th className="pb-4 font-medium text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {appointments.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="py-8 text-center text-gray-500">No se encontraron citas.</td>
                    </tr>
                  ) : appointments.map((apt) => (
                    <tr key={apt._id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                      <td className="py-4">
                        <p className="text-white font-medium">{apt.fullName}</p>
                        <p className="text-xs text-gray-500">{apt.phone} | {apt.email}</p>
                      </td>
                      <td className="py-4 text-gray-300">{apt.service}</td>
                      <td className="py-4 text-gray-300">
                        {new Date(apt.date).toLocaleDateString()} <br/>
                        <span className="text-primary">{apt.time}</span>
                      </td>
                      <td className="py-4">
                        <select
                          value={apt.status}
                          onChange={(e) => handleStatusChange(apt._id, e.target.value)}
                          className={`text-xs px-2 py-1 rounded border outline-none bg-dark ${
                            apt.status === 'Confirmed' ? 'border-green-500/50 text-green-400' :
                            apt.status === 'Completed' ? 'border-blue-500/50 text-blue-400' :
                            apt.status === 'Cancelled' ? 'border-red-500/50 text-red-400' :
                            'border-yellow-500/50 text-yellow-400'
                          }`}
                        >
                          <option value="Pending">Pendiente</option>
                          <option value="Confirmed">Confirmado</option>
                          <option value="Completed">Completado</option>
                          <option value="Cancelled">Cancelado</option>
                        </select>
                      </td>
                      <td className="py-4 text-right">
                        <button 
                          onClick={() => handleDelete(apt._id)}
                          className="p-2 text-gray-500 hover:text-red-400 transition-colors"
                          title="Delete Appointment"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="h-full bg-white text-black rounded p-2 overflow-hidden">
              <Calendar
                localizer={localizer}
                events={calendarEvents}
                startAccessor="start"
                endAccessor="end"
                style={{ height: '100%' }}
                views={['month', 'week', 'day']}
              />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
