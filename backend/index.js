const express = require('express')
const db = require('./config/db')
const consign = require('consign')

const app = express()
const port = 3000

consign()
    .include('./config/passport.js')
    .then('./config/middlewares.js')
    .then('./api')
    .then('./config/routes.js')
    .into(app)

app.db = db



app.listen(port, () =>{
    console.log('Backend is running is on', port)
} )