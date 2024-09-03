const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    dateOfBirth: {
        type: Date,
        required: true,
    },
    contactNumber: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    address: {
        type: String,
        required: true,
    },
    medicalHistory: {
        type: String,
    },
    medications: [
        {
            name: String,
            dosage: String,
            frequency: String,
            startDate: Date,
            endDate: Date,
        },
    ],
    appointments: [
        {
            doctor: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Doctor',
            },
            date: Date,
            reason: String,
        },
    ],
});

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;
