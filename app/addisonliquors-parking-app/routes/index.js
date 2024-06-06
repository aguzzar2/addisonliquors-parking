const express = require('express')
const router = express.Router()
const Reservation = require('../models/reservation')
const User = require('../models/user')


router.get('/', async (req, res) => {
    try {
        const reservations = await Reservation.find({}).populate('user').exec()
        res.render('index', {
            reservations: reservations
        })
    } catch (err) {
        console.error('Error fetching reservations:', err)
        res.redirect('/')
    }
})

module.exports = router