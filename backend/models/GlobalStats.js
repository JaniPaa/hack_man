const mongoose = require('mongoose')

const Schema = mongoose.Schema

const globalStatsSchema = new Schema({
    easy: {
        gamesPlayed: Number,
        wins: Number,
        losses: Number
    },
    medium: {
        gamesPlayed: Number,
        wins: Number,
        losses: Number
    },
    hard: {
        gamesPlayed: Number,
        wins: Number,
        losses: Number
    }
})

const GlobalStats = mongoose.model('GlobalStats', globalStatsSchema)

globalStatsSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = GlobalStats