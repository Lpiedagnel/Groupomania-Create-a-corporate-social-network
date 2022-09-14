require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')

const userRoutes = require('./routes/user');

mongoose.connect(process.env.DATABASE_URL);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected')
})

const app = express()

app.use(express.json())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
    res.setHeader('Cross-Origin-Resource-Policy', 'same-site');
    next()
})

app.use('/api/auth', userRoutes);

module.exports = app