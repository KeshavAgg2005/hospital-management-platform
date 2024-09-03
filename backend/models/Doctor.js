const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    specialty: {
        type: String,
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
    availability: [
        {
            day: String,
            startTime: String,
            endTime: String,
        },
    ],
    patients: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Patient',
        },
    ],
});

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;
