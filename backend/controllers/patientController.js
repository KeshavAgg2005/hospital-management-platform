const Patient = require('../models/Patient');

// Create a new patient
exports.createPatient = async (req, res) => {
    if (req.user.role !== 'admin' && req.user.role !== 'receptionist') {
        return res.status(403).json({ message: 'Access denied' });
    }

    try {
        const newPatient = new Patient(req.body);
        await newPatient.save();
        res.status(201).json(newPatient);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all patients
exports.getAllPatients = async (req, res) => {
    if (req.user.role !== 'admin' && req.user.role !== 'receptionist' && req.user.role !== 'patient') {
        return res.status(403).json({ message: 'Access denied' });
    }

    try {
        const patients = await Patient.find();
        res.status(200).json(patients);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single patient by ID
exports.getPatientById = async (req, res) => {
    if (req.user.role !== 'admin' && req.user.role !== 'receptionist' && req.user.role !== 'patient') {
        return res.status(403).json({ message: 'Access denied' });
    }

    try {
        const patient = await Patient.findById(req.params.id);
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }
        res.status(200).json(patient);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a patient by ID
exports.updatePatientById = async (req, res) => {
    if (req.user.role !== 'admin' && req.user.role !== 'receptionist') {
        return res.status(403).json({ message: 'Access denied' });
    }

    try {
        const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }
        res.status(200).json(patient);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a patient by ID
exports.deletePatientById = async (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied' });
    }

    try {
        const patient = await Patient.findByIdAndDelete(req.params.id);
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }
        res.status(200).json({ message: 'Patient deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
