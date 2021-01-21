const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const usersRouter = require('./controllers/userRouter')
const globalStatsRouter = require('./controllers/globalStatsRouter')
require('dotenv').config

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

const password = process.argv[2]

const uri =
    `mongodb+srv://admin:${password}@hackmancluster.1q2mw.mongodb.net/<dbname>?retryWrites=true&w=majority`

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true }
)

const connection = mongoose.connection

connection.once('open', () => {
    console.log("Connected to MongoDB")
})

app.use('/users', usersRouter)
app.use('/stats', globalStatsRouter)

app.listen(port, () => {
    console.log(`server is running on port: ${port}`)
})

// node server <password>