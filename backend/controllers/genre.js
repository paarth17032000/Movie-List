const {Genre, validate} = require('../models/genre')

const getAllGenres = async(req, res) => {
    const genres = await Genre.find()
    res.send(genres)
}

const addNewGenre = async(req, res) => {
    const result = validate(req.body)
    console.log(req.body)

    if(result.error) return res.status(401).send(result.error.details[0].message)

    let genre = new Genre({
        genre: req.body.genre,
        actors: req.body.actors,
        rating: req.body.rating,
        movie: req.body.movie
    })

    genre = await genre.save()
    res.send(genre)
}

const deleteGenre = async(req, res) => {
    const genre = await Genre.findByIdAndRemove(req.body.genre_id)

    if(!genre) {
        return res.status(404).send('Genre not found')
    }

    res.send(genre)
}

exports.getAllGenres = getAllGenres
exports.addNewGenre = addNewGenre
exports.deleteGenre = deleteGenre
