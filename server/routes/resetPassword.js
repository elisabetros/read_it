const router = require('express').Router();
const credentials = require("../config/emailcredentials")
const nodemailer = require('nodemailer')

const crypto = require('crypto');
const bcrypt = require('bcrypt')

const User = require('../models/User')

const saltRounds = 10;

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
        return res.status(500).send({response: 'no user with this email'}) // CHANGE IN PRODUCTION TO RESPONSE:OK
    }

    const token = crypto.randomBytes(64).toString('base64');
 
    //token expires after one hour
    const expireDate = new Date();
    expireDate.setDate(expireDate.getDate() + 1/24);
    try{
      await User.query().findById(user[0].id).patch({'token': token, 'token_exp_date': expireDate})
    }catch(err){
      if(err){
        console.log(err)
    }
  }
    const mailOptions = {
        from: credentials.username,
        to: email,
        subject: 'Reset password',
        text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +  
        'Please click on the following link, or paste this into your browser to complete the process:\n\n' +  
        'http://localhost:3000/resetpassword/' + token + '\n\n' +  
        'If you did not request this, please ignore this email and your password will remain unchanged.\n'  
        
      };
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
          return res.send({error: 'error'})
        } else {
          console.log(token, expireDate);
          return res.send({response: 'Email sent: ' + info.response});
        }
      });
})

router.post('/resetPassword', async (req, res) => {
  const { token, newPassword, newRepeatPassword } = req.body
  // let tokenNotExpired;
  
    const user = await User.query().select().where({'token':token})
  if(!user[0]){
    return res.status(500).send({error: 'Invalid Token'})
  } 
  if(new Date(user[0].token_exp_date) > new Date() ){
    // tokenNotExpired = false
    return res.send({error: 'Token expired'})
  }
    //  tokenNotExpired = true

    if(!newPassword && !newRepeatPassword){
        return res.send({error: 'missing fields'})
    }
    if(newPassword !== newRepeatPassword){
        return res.send({error: "passwords don't match"})
    }
    const existingUser =  await User.query().select().where({ 'id': user[0].id }).limit(1)
    if(!existingUser[0]){
        return res.status(500).send({ error: "no user with that information"});
    }
    bcrypt.hash(newPassword, saltRounds, async (error, hashedPassword) => {
        if(error){
            return res.status(500).send({ error: "couldn't hash password" })
        }
        try{
            await User.query().update({ 
                password: hashedPassword,
                token: null,
                token_exp_date: null
            }).where({ 'id': user[0].id })
            return res.status(200).send(true)

        }catch(error){
            return res.status(500).send({ error: "something went wrong with the database"});
        }
    })
})

module.exports = router;
