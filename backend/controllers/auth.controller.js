const UserModel = require('../models/user.model')
const jwt = require('jsonwebtoken')
const { signUpErrors, signInErrors } = require('../utils/errors.utils')
require('dotenv').config({path: './config/.env'})

const maxAge = 3 * 21 * 60 * 1000 // Three days (the first number (3) is the number of day)

const createToken = (id) => {
    return jwt.sign({id}, process.env.TOKEN_KEY, {
        expiresIn: maxAge
    })
}

module.exports.signUp = async (req, res) => {
    console.log(req.body)
    const {firstName, lastName, job, email, password} = req.body

    try {
        const user = await UserModel.create({firstName, lastName, job, email, password})
        res.status(201).json({ user: user._id})
    }
    catch(err) {
        const errors = signUpErrors(err)
        res.status(200).send({ errors })
    }
}

module.exports.signIn = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await UserModel.login(email, password)
        const token = createToken(user._id)
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge })
        res.status(200).json({ user: user._id})
    } catch (err) {
        const errors = signInErrors(err)
        res.status(200).json({errors})
    }
}

module.exports.logout = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 })
    res.redirect('/')
}