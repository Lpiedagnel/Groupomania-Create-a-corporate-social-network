const express = require('express')
const cookieParser = require('cookie-parser')
const userRoutes = require('./routes/user.routes')
const postRoutes = require('./routes/post.routes')
require('dotenv').config({path: './config/.env'})
require ('./config/db')
const {checkUser, requireAuth} = require('./middleware/auth.middleware')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// Headers
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
  res.setHeader('Cross-Origin-Resource-Policy', 'same-site');
  next()
})

// jsonWebToken
app.get('*', checkUser)
app.get('/jwtid', requireAuth, (req, res) => {
    res.status(200).send(res.locals.user._id)
})

// Routes
app.use('/api/user', userRoutes)
app.use('/api/post', postRoutes)

// Server
app.listen(4200, () => {
    console.log('Listening on port 4200')
})