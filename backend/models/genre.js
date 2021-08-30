const Joi = require('joi')
const mongoose = require('mongoose')

const genreSchema = new mongoose.Schema({
    genre: { type: String, required: true, min: 2},
    actors: {
        type: Array,
        validate: {
            validator: function(value){
                return value && value.length > 0
            },
            message: 'actors should have at least one actor'
        }
    },
    rating: { type: Number, min: 0, max: 5},
    movie: { type: String, required: true, min: 2}
})

const Genre = mongoose.model('Genre', genreSchema)


function ValidateGnere(genre){
    const schema = Joi.object({
        genre: Joi.string().min(2).required(),
        actors: Joi.array().required(),
        rating: Joi.number().min(0).max(5).required(),
        movie: Joi.string().min(2).required()
    })

    return schema.validate(genre)
}

exports.validate = ValidateGnere
exports.Genre = Genre