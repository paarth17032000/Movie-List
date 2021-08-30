const express = require('express')
const router = express.Router()
const {Genre, validate} = require('../models/genre')

router.get('/', async(req, res) => {
    const genres = await Genre.find()
    res.send(genres)
})

router.post('/', async(req, res) => {
    const result = validate(req.body)
    // console.log(result)

    if(result.error) res.status(400).send(result.error.details[0].message)

    let genre = new Genre({
        genre: req.body.genre,
        actors: req.body.actors,
        rating: req.body.rating,
        movie: req.body.movie
    })

    genre = await genre.save()
    res.send(genre)
})

router.delete('/:genre_id', async(req, res) => {
    const genre = await Genre.findByIdAndRemove(req.body.genre_id)

    if(!genre) res.status(404).send('Genre not found')

    res.send(genre)
})

module.exports = router