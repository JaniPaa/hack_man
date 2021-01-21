const globalStatsRouter = require('express').Router()
let GlobalStats = require('../models/GlobalStats')

globalStatsRouter.route('/').get((req, res) => {
    GlobalStats.find()
    .then(stats => res.json(stats))
    .catch(err => res.status(400).json('Error: ' + err))
})

globalStatsRouter.route('/add').post((req, res) => {
    const body = req.body

    if (body === undefined) {
        return response.status(400).json({ error: 'body missing' })
    }

    const newStats = new GlobalStats({
        easy: {
            gamesPlayed: body.easy.gamesPlayed,
            wins: body.easy.wins,
            losses: body.easy.losses
        },
        medium: {
            gamesPlayed: body.medium.gamesPlayed,
            wins: body.medium.wins,
            losses: body.medium.losses
        },
        hard: {
            gamesPlayed: body.hard.gamesPlayed,
            wins: body.hard.wins,
            losses: body.hard.losses
        }
    })

    newStats.save()
        .then(() => res.json('Global stats added succesfully!'))
        .catch(err => res.status(400).json('Error: ' + err))
})

globalStatsRouter.route('/update/:id').put((req, res) => {
    const body = req.body
    const id = req.params.id

    if (Object.keys(body).length === 0) {
        return response.status(400).json({
            error: 'body missing'
        })
    }

    const statsObject = body

    GlobalStats.findByIdAndUpdate(id , statsObject)
    .then(updatedStats => res.json(updatedStats))
    .catch(err => res.status(400).json('Error: ' + err))

})

module.exports = globalStatsRouter