const jwt = require("jsonwebtoken")
const UserModel = require("../models/user.model")
require("dotenv").config({ path: "./config/.env" })

module.exports.checkUser = (req, res, next) => {
  const token = req.cookies.jwt
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      if (err) {
        res.locals.user = null
        next()
      } else {
        let user = await UserModel.findById(decodedToken.id)
        res.locals.user = user
        res.locals.isAdmin = user.isAdmin
        next()
      }
    })
  } else {
    res.locals.user = null
    next()
  }
}

module.exports.requireAuth = (req, res, next) => {
  const token = req.cookies.jwt
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      if (err) {
        console.log(err)
      } else {
        next()
      }
    })
  } else {
    console.log("No token")
  }
}

module.exports.requireLoggedIn = (req, res, next) => {
  try {
    const token = req.cookies.jwt
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET)
    const userId = decodedToken.userId
    res.locals.loggedIn = true
    next()
} catch(error) {
  res.locals.loggedIn = false
    res.status(403).json({ message: 'Vous devez être connecté pour faire cette action.' })
}
}

module.exports.requireAdmin = (req, res, next) => {
  const token = req.cookies.jwt
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      if (err) {
        res.locals.isAdmin = false
        next()
      } else {
        let user = await UserModel.findById(decodedToken.id)
        res.locals.isAdmin = user.isAdmin
        console.log("The current user is admin? " + res.locals.isAdmin)
        next()
      }
    })
  } else {
    res.locals.isAdmin = false
    next()
  }
}
