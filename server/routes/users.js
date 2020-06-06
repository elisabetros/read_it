const router = require('express').Router();
const credentials = require("../config/emailcredentials")

const bcrypt = require('bcryptjs')
const saltRounds = 10;

const User = require("../models/User");


// TODO: add resetpassword route

router.post('/user/login', async (req, res) => {
    // console.log('login')
    const { email, password } = req.body;
    // console.log(email, password)
    if(!email || !password){
        return res.status(500).send({error: "missing fields"})
    }
    const users = await User.query().where({ email }).limit(1);
    const user = users[0]
    if(!user){
        return res.status(500).send({ error: 'wrong username' })
    }
    // console.log(user)
    bcrypt.compare(password, user.password, async (error, isSame) => {
        if(error){
            return res.status(500).send({ error:'error' })
        }
        if(!isSame){
            return res.status(500).send({ error: 'wrong password' })
        }else{
            if(user.token){
                  await User.query().update({
                    token: null,
                    token_exp_date: null
                }).where({ 'id': user.id })
            }
            req.session.user = user;
            delete req.session.user.password;
            req.session.isLoggedIn = true;
            return res.status(200).send({response: 'login successful'})
        }
    })
})

router.get('/auth', (req, res) => {
    // console.log('auth', req.session.user )
    if(!req.session.isLoggedIn){
        return res.status(500).send({error: 'Please Log in'})
    }else{
        return res.status(200).send({response: req.session.user.id})
    }
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
            return res.status(500).send({error: "passwords don't match"})
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

router.post('/user/update', async (req, res) => {
    let { newFirstname, newLastname, newEmail } = req.body
    if(!req.session.isLoggedIn){
        return res.status(500).send({error:'Log in to change information'})
    }
    if(!newFirstname){
        newFirstname = req.session.firstName
    }
    if(!newLastname){
        newLastname = req.session.lastName
    }
    if(!newEmail){
        newEmail = req.session.email
    }
    // if(!newFirstname || !newLastname || !newEmail){
    //     return res.send({error: 'Missing fields'})
    // }
    try{
        await User.query().findById(req.session.user.id).patch({
            first_name: newFirstname,
            last_name: newLastname,
            email: newEmail
        })
        return res.status(200).send({response: 'Information successfully changed'})
    }catch(error){
        return res.status(500).send({ error: "Something went wrong with the database"});
    }
})    

router.get('/user/logout', (req, res) => {
    req.session.user = null;
    req.session.isLoggedIn = false;
    return res.status(200).send({response: 'Log out succsessful'})
})

router.delete('/user/deleteAccount', async (req, res) => {
    if(!req.session.isLoggedIn){
        return res.status(500).send({error: 'Log in to delete account'})
    }
    try{
        await User.query().deleteById(req.session.user.id)
        req.session.user = null;
        req.session.isLoggedIn = false;
        return res.status(200).send({resonse: 'Account deleted'})
        
    }catch(err){
        return res.status(500).send({ error: "Something went wrong with the database"});
    }
})




module.exports = router;