const express = require('express')
const app = express()
const session = require('express-session')
const privateKey = require('./config/authSession').privateKey

var cors = require('cors', );

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(cors({
  credentials: true,
  origin: 'http://localhost:3000'
  }));

//   ##########################
app.use(session({
    secret: privateKey,
    resave: true,
    saveUninitialized: true,
    cookie:  { 
      maxAge: 1000 * 60 * 60 * 24
     }
  }))



//   ##########################

const { Model } = require('objection');
const Knex = require('knex');
const knexFile = require('./knexfile.js')

const knex = Knex(knexFile.development)

Model.knex(knex)
//   ##########################

const userRoute = require('./routes/users')
const bookRoute = require('./routes/books')
const resetPasswordRoute = require('./routes/resetPassword')

app.use(userRoute)
app.use(bookRoute)
app.use(resetPasswordRoute)

//   ##########################
app.listen(80, (err) => {
    if(err){console.log("server couldn't connect");return;}
    console.log('server running on port 80')
})