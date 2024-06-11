const express = require('express')
const router = express.Router()
const Reservation = require('../models/reservation') //Access to user 
const Game = require('../models/game') //Access to game 
const User = require('../models/user')
const imageMimeTypes = ['image/jpeg', 'image/png', 'image/gif'] // Fixed mime types

// All Reservation Route
router.get('/', async (req, res) => {
    let query = Reservation.find({}).populate('user').populate('game')

    if (req.query.user != null && req.query.user !== '') {
        const users = await User.find({ name: new RegExp(req.query.user, 'i') })
        const userIds = users.map(user => user._id)
        query = query.where('user').in(userIds)
    }

    try {
        const reservations = await query.exec()
        res.render('reservations/index', {
            reservations: reservations,
            searchOptions: req.query
        })
    } catch (error) {
        console.error('Error fetching reservations:', error)
        res.redirect('/')
    }
})


// New Reservation Route
router.get('/new', (req, res) => {
    renderNewPage(res, new Reservation())
})

// Create Reservation Route
router.post('/', async (req, res) => {
    try {
        const game = await Game.findById(req.body.game)

        if (!game) {
            throw new Error('Game not found')
        }

        if (game.availableReservations > 0) {
            const reservation = new Reservation({
                user: req.body.user,
                carMake: req.body.carMake,
                carModel: req.body.carModel,
                gameDay: game.date,
                reservationDate: new Date(),
                parkingSpot: req.body.parkingSpot,
                status: "confirmed",
                game: req.body.game
            })
            
            await reservation.save()
            game.availableReservations -= 1
            await game.save()
            res.redirect(`/reservations/${reservation.id}`)
        } else {
            renderNewPage(res, new Reservation(), true, 'No reservations available for this game')
        }
    } catch (error) {
        console.error('Error creating reservation:', error)
        renderNewPage(res, new Reservation(), true, error.message)
    }
})

// Show Reservation Route
router.get('/:id', async (req,res) => {
    try {
        const reservation = await Reservation.findById(req.params.id).populate('user').populate('game').exec()
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
        reservation.reservationDate = new Date() // some type magic
        reservation.parkingSpot = req.body.parkingSpot
        reservation.status = "confirmed"
        reservation.game = req.body.game // New, removed gameDay

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
        const game = await Game.findById(reservation.game)
        if (game) {
            game.availableReservation+=1
            await game.save()
        }
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
        const games = await Game.find({})
        const params = {
            users: users,
            games: games,
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
