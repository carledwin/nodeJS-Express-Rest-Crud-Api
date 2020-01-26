require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true})

const db = mongoose.connection

db.on('error', (error) => console.error(error))
db.once('open', () => console.info('Connected to Database...'))

app.use(express.json())

const filmesRouter = require('./routes/filmes.js')
app.use('/filmes', filmesRouter)
app.listen(3000, () => console.log('Server Started...'))