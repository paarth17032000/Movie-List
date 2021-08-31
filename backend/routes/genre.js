const express = require('express')
const router = express.Router()
const { getAllGenres, addNewGenre, deleteGenre } = require('../controllers/genre')

router.get('/', getAllGenres)

router.post('/', addNewGenre)

router.delete('/:genre_id', deleteGenre)

module.exports = router