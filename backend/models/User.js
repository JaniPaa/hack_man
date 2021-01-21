const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
  username: String,
  password: String,
  stats: {
    gamesPlayed: Number,
    wins: Number,
    losses: Number
  }
},
  {
    timestamps: true,
  })

const User = mongoose.model('User', userSchema)

module.exports = User