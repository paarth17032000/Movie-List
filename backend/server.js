const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const genre = require('./routes/genre')
const auth = require('./routes/auth')
require('dotenv').config()

mongoose.connect('mongodb://localhost/genre')
.then(() => console.log('database connected'))
.catch(err => console.log('error :', err))

const app = express()

app.use(cors())
app.use(express.json())

app.use('/auth', auth)
app.use('/api/genre', genre)
app.use('/', (req, res) => {
    res.send('Welcome')
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Running on port ${PORT}`))