const router = require('express').Router()
let User = require('../models/User')

router.route('/').get((req, res) => {
    User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/add').post((req, res) => {
    const username = req.body.username
    const password = req.body.password

    const newUser = new User({username, password})

    newUser.save()
    .then(() => res.json('User added succesfully!'))
    .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/:username').get((req, res) => {
    User.findOne({'username': req.params.username})
    .then(user => res.json(user)).catch(err => res.status(400)
    .json('Error: ' + err))
})

module.exports = router