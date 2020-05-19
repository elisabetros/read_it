const express = require('express')
const app = express()

var cors = require('cors');

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(cors({
  credentials: true
  }));

//   ##########################

const { Model } = require('objection');
const Knex = require('knex');
const knexFile = require('./knexfile.js')

const knex = Knex(knexFile.development)

Model.knex(knex)
//   ##########################

const userRoute = require('./routes/users')

app.use(userRoute)

//   ##########################
app.listen(80, (err) => {
    if(err){console.log("server couldn't connect");return;}
    console.log('server running on port 80')
})