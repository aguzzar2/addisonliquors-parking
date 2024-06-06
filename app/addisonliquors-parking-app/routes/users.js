const express = require('express')
const User = require('../models/user') //Access to user 
const Reservation = require('../models/reservation')
const router = express.Router()



// All Users Route
router.get('/', async (req, res) => {
    let searchOptions = {}
    if (req.query.name != null && req.query.name !== '') {
        searchOptions.name =  new RegExp(req.query.name, 'i') // Regular Expression 'i' case insensitive
    }
    if (req.query.email != null && req.query.email !== '') {
        searchOptions.email =  new RegExp(req.query.email, 'i') // Regular Expression 'i' case insensitive
    }
    try {
        const users = await User.find(searchOptions)
        res.render('users/index', { 
            users: users,
            searchOptions : req.query
         })
    } catch {
        res.redirect('/')
    }
})

// New users Route
router.get('/new', (req, res) => {
    res.render('users/new', {user: new User()})
})

// Create User Route
router.post('/', async (req, res) => {
    const user = new User ({
        name: req.body.name,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber
    })
    try{
        const newUser = await user.save() // await is async
        res.redirect(`users/${newUser.id}`)
    }catch (err) {
        console.log(err)
        res.render('users/new', {
            user: user,
            errorMessage: 'Error creating user'
        })
    }
}) // Post for Creation


router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        const reservations = await Reservation.find( {user: user.id }).limit(6).exec()
        res.render('users/show', {
            user: user,
            reservationsByUser: reservations
        })
    } catch {
        res.redirect('/')
    }
})

router.get('/:id/edit', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        res.render('users/edit', { user: user })

    } catch {
        console.log('Error Creating Edit Page')
        res.redirect('/users')
    }
    
})

// Creating User
router.put('/:id', async (req, res) => {
    let user
    try{
        user = await User.findById(req.params.id)
        user.name = req.body.name
        user.email = req.body.email
        user.phoneNumber = req.body.phoneNumber
        await user.save() // await is async
        res.redirect(`/users/${user.id}`) // backslash because we need full URL
    }catch {
        if (user == null) {
            res.redirect('/')
        }
        res.render('users/edit', {
            user: user,
            errorMessage: 'Error updating user'
        })
    }
})

// Delete User Route
router.delete('/:id', async (req, res) => {
    let user
    try{
        user = await User.findById(req.params.id)
        await user.deleteOne() // remove() is deprecated
        res.redirect('/users')
    }catch (err) {
        console.log(err)
        if (user == null) {
            res.redirect('/')
        } else {
            res.redirect(`/users/${user.id}`)
        }
    }
}) // Get dangerous, delete safe need form to work tho



module.exports = router