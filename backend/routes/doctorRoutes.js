const express = require('express');
const {
    createDoctor,
    getAllDoctors,
    getDoctorById,
    updateDoctorById,
    deleteDoctorById,
} = require('../controllers/doctorController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Route to create a new doctor (Protected for admins)
router.post('/', authMiddleware('admin'), createDoctor);

// Route to get all doctors
router.get('/', getAllDoctors);

// Route to get a single doctor by ID
router.get('/:id', getDoctorById);

// Route to update a doctor by ID (Protected for admins)
router.put('/:id', authMiddleware('admin'), updateDoctorById);

// Route to delete a doctor by ID (Protected for admins)
router.delete('/:id', authMiddleware('admin'), deleteDoctorById);

module.exports = router;
