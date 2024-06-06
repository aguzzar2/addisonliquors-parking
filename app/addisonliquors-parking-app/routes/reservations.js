const express = require('express')
const router = express.Router()
const Reservation = require('../models/reservation') //Access to user 
const User = require('../models/user')
const imageMimeTypes = ['image/jpeg', 'image/png', 'image/gif'] // Fixed mime types

// All Reservation Route
router.get('/', async (req, res) => {
    let query = Reservation.find({}).populate('user') // let b/c reassigned 'query'

    const reservation = await Reservation.findById(req.params.id).populate('user').exec()
    res.render('reservations/show', { reservation: reservation })


    if (req.query.user != null && req.query.user != ''){
        query = query.regex('user', new RegExp(req.query.user, 'i'))
    }

    try{
        const reservations = await query.exec()
        res.render('reservations/index', {
            reservations: reservations,
            searchOptions: req.query
        })
    } catch {
        res.redirect('/')
    }
})

// New Reservation Route
router.get('/new', (req, res) => {
    renderNewPage(res, new Reservation())
})

// Create Reservation Route
router.post('/', async (req, res) => {
    const reservation = new Reservation({
        user: req.body.user,
        carMake: req.body.carMake,
        carModel: req.body.carModel,
        gameDay: new Date(req.body.gameDay),
        reservationDate: new Date(), // some type magic
        parkingSpot: req.body.parkingSpot,
        status: "confirmed"
    })
    try {
        const newReservation = await reservation.save()
        res.redirect(`reservations/${newReservation.id}`)
    } catch (error) {
        console.error('Error creating reservation:', error)
        renderNewPage(res, reservation, true, error.message)
    }
}) // Post for Creation


// Show Reservation Route
router.get('/:id', async (req,res) => {
    try {
        const reservation = await Reservation.findById(req.params.id).populate('user').exec()
        res.render('reservations/show', { reservation: reservation })
    } catch {
        res.redirect('/')
    }
})


// Edit Reservation Route
router.get('/:id/edit', async (req, res) => {
    try {
        const reservation = await Reservation.findById(req.params.id)
        renderEditPage(res, reservation)
    } catch {
        console.log("Edit Reservation Route")
        res.redirect('/')
    }
})



// Update Reservation Route
router.put('/:id', async (req, res) => {

    let reservation 
    try {
        reservation = await Reservation.findById(req.params.id)
        reservation.user = req.body.user
        reservation.carMake = req.body.carMake
        reservation.carModel = req.body.carModel
        reservation.gameDay = new Date(req.body.gameDay)
        reservatoin.reservationDate = new Date() // some type magic
        reservation.parkingSpot = req.body.parkingSpot
        reservation.status = "confirmed"

        await reservation.save()
        res.redirect(`/reservations/${reservation.id}`)

    } catch {
        if (reservation != null) {
            renderEditPage(res, reservation, true)
        } else {
            redirect('/')
        }
    }
}) // Post for Creation


router.delete('/:id', async (req, res) => {
    let reservation 
    try {
        reservation = await Reservation.findById(req.params.id)
        await reservation.deleteOne()
        res.redirect('/')
    } catch (err) {
        console.log(err)
        if (reservation != null) {
            res.render('reservations/show', {
                reservation: reservation,
                errorMessage: 'Could not remove reservation'
            })
        } else {
            res.redirect('/')
        }
    }
})

// function saveCover(reservation, coverEncoded) {
//     if (coverEncoded == null || coverEncoded === '') return;
//     try {
//         console.log('Received coverEncoded:', coverEncoded); // Log the received data
//         const cover = JSON.parse(coverEncoded);
//         if (cover != null && imageMimeTypes.includes(cover.type)) {
//             reservation.coverImage = Buffer.from(cover.data, 'base64');
//             reservation.coverImageType = cover.type;
//         }
//     } catch (error) {
//         console.error('Error parsing cover data:', error);
//     }
// } // deleted feature for saving files

async function renderNewPage(res, reservation, hasError = false) {
    renderFormPage(res, reservation, 'new', hasError)
}

async function renderEditPage(res, reservation, hasError = false) {
    renderFormPage(res, reservation, 'edit', hasError)
}


async function renderFormPage(res, reservation, form, hasError = false) {
    try {
        const users = await User.find({})
        const params = {
            users: users,
            reservation: reservation
        }
        if (hasError) {
            console.log("The form is " + form)
            if (form === 'edit') {
                params.errorMessage = 'Error Updating Reservation'
            } else {
                params.errorMessage = 'Error Creating Reservation'
            }
        }
        res.render(`reservations/${form}`, params)
    } catch (error) {

        res.redirect('/reservations')
    }
}






module.exports = router
