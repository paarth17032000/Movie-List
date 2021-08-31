const {validateRegister, Register} = require('../models/auth')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Joi = require('joi')

const registerUser = async (req, res) => {

    const {error} = validateRegister(req.body)
    if(error) return res.status(400).send(error.details[0].message)


    let user = await Register.findOne({email: req.body.email})
    if(user) return res.status(400).send('User already exists')

    user = new Register({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })

    user.password = await bcrypt.hash(req.body.password, 10)

    await user.save()

    res.send(user)

}

const loginUser = async (req, res) => {
    const {email, password} = req.body

    const {error} = validateUser(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    let user = await Register.findOne({email})
    if(!user) return res.status(400).send('Incorrect email or password')

    let validPassword = await bcrypt.compare(password, user.password)
    if(!validPassword) return res.status(400).send('Incorrect email or password')

    let token = jwt.sign({id: user._id}, 'PrivateKey')
    res.send(token)
}

function validateUser(user){
    const schema = Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string().required().min(6)
    })

    return schema.validate(user)
}

exports.registerUser = registerUser
exports.loginUser = loginUser