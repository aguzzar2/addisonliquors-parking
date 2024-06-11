const express = require('express')
const router = express.Router()
const Reservation = require('../models/reservation')
const User = require('../models/user')


router.get('/', async (req, res) => {
    try {
        const reservations = await Reservation.find({}).populate('user').populate('game').exec()
        res.render('index', { reservations: reservations })
    } catch (error) {
        console.error('Error fetching reservations:', error)
        res.redirect('/')
    }
})
module.exports = router