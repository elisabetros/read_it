const router = require('express').Router();
const credentials = require("../config/emailcredentials")
const jwt = require('jsonwebtoken')

var privateKey = 'privateKey';

const bcrypt = require('bcrypt')
const saltRounds = 10;

const User = require("../models/User");

router.post('/user/login', async (req, res) => {
    const { email, password } = req.body;
    if(!email || !password){
        return res.status(500).send({error: "missing fields"})
    }
    const users = await User.query().where({ email }).limit(1);
    const user = users[0]
    if(!user){
        return res.status(404).send({ error: 'wrong username' })
    }
    bcrypt.compare(password, user.password, (error, isSame) => {
        if(error){
            return res.status(500).send({ error:'error' })
        }
        if(!isSame){
            return res.status(404).send({ error: 'wrong password' })
        }else{
            jwt.sign({user}, privateKey, { expiresIn: '12h' },(err, token) => {
                if(err) { console.log(err) }    
                return res.status(200).send(token);
            });
        }
    })
})

router.post('/user/register', (req, res) => {
        const { firstName, lastName, email, password, repeatPassword } = req.body
    
        if(!firstName || !lastName || !password || !email || !repeatPassword){
            return res.status(500).send({error: "missing fields"})
        }
        if(password.length <8){
            return res.status(500).send({error: "passwords too short"})
        }
        if(password !== repeatPassword){
            return res.status(400).send({error: "passwords don't match"})
        }
        //if email is not correct form
        bcrypt.hash(password, saltRounds, async (error, hashedPassword) => {
            if(error){
                return res.status(500).send({ error: "couldn't hash password" })
            }
                try{
                    // console.log("this newly hashed password",hashedPassword)
                    const existingUser =  await User.query().select().where({ email:email }).limit(1)
                    if(existingUser[0]){
                        return res.status(500).send({ error: "user already exists"});
                    }else{
                        const newUser = await User.query().insert({ 
                            first_name:firstName,
                            last_name : lastName,
                            email:email,
                            password: hashedPassword
                        })
                        return res.status(200).send({ response: newUser })
                    }
                }catch(error){
                    return res.status(500).send({ error: "something went wrong with the database"});
                }
            })
    })





module.exports = router;