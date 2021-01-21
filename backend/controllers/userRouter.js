const userRouter = require('express').Router()
const { useReducer } = require('react')
let User = require('../models/User')

userRouter.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err))
})

userRouter.route('/add').post((req, res) => {
    const body = req.body

    if (body === undefined) {
        return response.status(400).json({ error: 'body missing' })
    }

    const newUser = new User({
        username: body.username,
        password: body.password,
        stats: {
            gamesPlayed: body.stats.gamesPlayed,
            wins: body.stats.wins,
            losses: body.stats.losses
        }
    })

    newUser.save()
        .then(() => res.json('User added succesfully!'))
        .catch(err => res.status(400).json('Error: ' + err))
})

userRouter.route('/:username').get((req, res) => {
    User.findOne({ 'username': req.params.username })
        .then(user => res.json(user)).catch(err => res.status(400)
            .json('Error: ' + err))
})

userRouter.route('/update/:username').put((req, res) => {
    const body = req.body

    if (Object.keys(body).length === 0) {
        return response.status(400).json({
            error: 'body missing'
        })
    }

    const updatedUser = body

    User.findOneAndUpdate({ 'username': req.params.username }, updatedUser)
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error: ' + err))

})

module.exports = userRouter