const express = require('express');
const {
    createPatient,
    getAllPatients,
    getPatientById,
    updatePatientById,
    deletePatientById,
} = require('../controllers/patientController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Route to create a new patient (Protected for admins and receptionists)
router.post('/', authMiddleware('admin', 'receptionist'), createPatient);

// Route to get all patients (Protected for authenticated users)
router.get('/', authMiddleware(), getAllPatients);

// Route to get a single patient by ID (Protected for authenticated users)
router.get('/:id', authMiddleware(), getPatientById);

// Route to update a patient by ID (Protected for admins and receptionists)
router.put('/:id', authMiddleware('admin', 'receptionist'), updatePatientById);

// Route to delete a patient by ID (Protected for admins)
router.delete('/:id', authMiddleware('admin'), deletePatientById);

module.exports = router;
