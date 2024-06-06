const mongoose = require('mongoose')

// Create Schema normal table database for Mongoose
const reservationSchema = new mongoose.Schema({
    carMake: {
        type: String,
        required: true
    },
    carModel: {
        type: String,
        required: true
    },
    gameDay: {
        type: Date,
        required: true
    },
    reservationDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    parkingSpot: {
        type: String,
        required: false
    },
    status: {
        type: String,
        required: false,
        enum: ['confirmed', 'pending', 'cancelled'],
        default: 'pending'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
})

module.exports = mongoose.model('Reservation', reservationSchema)