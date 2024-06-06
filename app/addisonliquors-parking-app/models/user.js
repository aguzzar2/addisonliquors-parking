const mongoose = require('mongoose')
const Reservation = require('./reservation')
// Create Schema normal table database for Mongoose
const userSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: String,
        required: true
    }
})


userSchema.pre('deleteOne', { document: true, query: false }, async function(next) {
    try {
        const reservations = await Reservation.find({ user: this._id });
        if (reservations.length > 0) {
            next(new Error('This user has reservations still'));
        } else {
            next();
        }
    } catch (err) {
        next(err);
    }
});

module.exports = mongoose.model('User', userSchema)