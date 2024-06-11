const mongoose = require('mongoose')

const gameSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    opponent: {
        type: String,
        required: true
    },
    availableReservations: {
        type: Number,
        required: true,
        default: 10
    }
})

module.exports = mongoose.model('Game', gameSchema)