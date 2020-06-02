const router = require('express').Router();
const credentials = require("../config/emailcredentials")
const nodemailer = require('nodemailer')

const User = require('../models/User')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user: credentials.username,
        pass: credentials.password
    }
  });

  router.post('/sendResetLink', async (req, res) => {
    const { email } = req.body
    if(!email){
        return res.send({error: 'missing fields'})
    }
    // if email is not an email
    const user = await User.query().select().where({ email })
    if(!user[0]){
        return res.send({error: 'no user with this email'})
    }
    const mailOptions = {
        from: credentials.username,
        to: email,
        subject: 'Reset password',
        html: `<div>reset password <a href="http://localhost:3000/resetpassword/${user[0].id}">here</a></div>`
      };
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
          return res.send({error: 'error'})
        } else {
        //   console.log('Email sent: ' + info.response);
          return res.send({response: 'Email sent: ' + info.response});
        }
      });
})


module.exports = router;
