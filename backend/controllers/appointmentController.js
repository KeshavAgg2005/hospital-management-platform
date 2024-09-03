const Appointment = require('../models/Appointment');
const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');

// Create a new appointment
exports.createAppointment = async (req, res) => {
    if (req.user.role !== 'admin' && req.user.role !== 'receptionist') {
        return res.status(403).json({ message: 'Access denied' });
    }

    try {
        const { patientId, doctorId, appointmentDate, reason } = req.body;
        const patient = await Patient.findById(patientId);
        const doctor = await Doctor.findById(doctorId);

        if (!patient || !doctor) {
            return res.status(404).json({ message: 'Patient or Doctor not found' });
        }

        const appointment = new Appointment({
            patientId,
            doctorId,
            appointmentDate,
            reason
        });

        await appointment.save();
        res.status(201).json(appointment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all appointments
exports.getAllAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find().populate('patientId').populate('doctorId');
        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get an appointment by ID
exports.getAppointmentById = async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id).populate('patientId').populate('doctorId');
        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }
        res.status(200).json(appointment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update an appointment
exports.updateAppointment = async (req, res) => {
    try {
        const appointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }
        res.status(200).json(appointment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete an appointment
exports.deleteAppointment = async (req, res) => {
    try {
        const appointment = await Appointment.findByIdAndDelete(req.params.id);
        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }
        res.status(204).json();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
