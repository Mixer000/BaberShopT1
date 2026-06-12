const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');
const { validateAppointment } = require('../middleware/validate');
const auth = require('../middleware/auth');
const { sendNewAppointmentEmail } = require('../utils/email');

// @route   POST /api/appointments
// @desc    Create a new appointment
// @access  Public
router.post('/', validateAppointment, async (req, res) => {
  try {
    const { date, time } = req.body;
    
    // Create UTC midnight boundaries for the provided date
    const searchDate = new Date(date);
    const startOfDay = new Date(searchDate);
    startOfDay.setUTCHours(0, 0, 0, 0);
    
    const endOfDay = new Date(searchDate);
    endOfDay.setUTCHours(23, 59, 59, 999);

    // Prevent double booking
    const existingAppointment = await Appointment.findOne({
      date: { $gte: startOfDay, $lte: endOfDay },
      time: time,
      status: { $ne: 'Cancelled' }
    });

    if (existingAppointment) {
      return res.status(400).json({ msg: 'Lo sentimos, pero este horario ya está reservado. Por favor selecciona otra hora.' });
    }

    const newAppointment = new Appointment(req.body);
    const appointment = await newAppointment.save();
    
    // Send email notification asynchronously
    sendNewAppointmentEmail(appointment).catch(console.error);

    res.status(201).json(appointment);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/appointments/stats
// @desc    Get appointment statistics
// @access  Private (Admin only)
router.get('/stats', auth, async (req, res) => {
  try {
    const total = await Appointment.countDocuments();
    const pending = await Appointment.countDocuments({ status: 'Pending' });
    const confirmed = await Appointment.countDocuments({ status: 'Confirmed' });
    const completed = await Appointment.countDocuments({ status: 'Completed' });
    const cancelled = await Appointment.countDocuments({ status: 'Cancelled' });

    res.json({ total, pending, confirmed, completed, cancelled });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/appointments
// @desc    Get all appointments (with optional filtering)
// @access  Private (Admin only)
router.get('/', auth, async (req, res) => {
  try {
    const { status, date, search } = req.query;
    let query = {};

    if (status) {
      query.status = status;
    }
    
    if (date) {
      // Find appointments for a specific day
      const searchDate = new Date(date);
      const nextDay = new Date(searchDate);
      nextDay.setDate(nextDay.getDate() + 1);
      
      query.date = {
        $gte: searchDate,
        $lt: nextDay
      };
    }

    if (search) {
      // Basic text search on name, email or phone
      query.$or = [
        { fullName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } }
      ];
    }

    const appointments = await Appointment.find(query).sort({ date: -1, time: -1 });
    res.json(appointments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT /api/appointments/:id
// @desc    Update appointment status
// @access  Private (Admin only)
router.put('/:id', auth, async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!status) {
      return res.status(400).json({ msg: 'Por favor proporciona un estado para actualizar' });
    }

    let appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({ msg: 'Cita no encontrada' });
    }

    appointment.status = status;
    await appointment.save();

    res.json(appointment);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Cita no encontrada' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   DELETE /api/appointments/:id
// @desc    Delete an appointment
// @access  Private (Admin only)
router.delete('/:id', auth, async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    
    if (!appointment) {
      return res.status(404).json({ msg: 'Cita no encontrada' });
    }

    await appointment.deleteOne();
    res.json({ msg: 'Cita eliminada' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Cita no encontrada' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;
