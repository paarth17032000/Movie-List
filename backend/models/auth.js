const Joi = require('joi')
const mongoose = require('mongoose')

const registerSchema = new mongoose.Schema({
    name: {type: String, required: true, min: 2},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true, min: 6}
})

const Register = mongoose.model('User', registerSchema)

function validateRegister(user){
    const schema = Joi.object({
        name: Joi.string().required().min(2),
        email: Joi.string().required().email(),
        password: Joi.string().required().min(6)
    })

    return schema.validate(user)
}

exports.validateRegister = validateRegister
exports.Register = Register