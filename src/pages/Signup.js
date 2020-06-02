import React, { useState } from "react";
import signupCss from '../css/form.css'
import Error from '../components/Error'
import axios from "axios";


import { makeStyles } from '@material-ui/styles'
import {
    Button,
    FormControl,
    Input,
    InputLabel
  } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
     submit: {
      marginTop: theme.spacing.unit * 3,
      justifySelf: 'center',
      color:'white'
    },
  }));

const Signup = (props) => {

    const classes= useStyles()

const [email, setEmail] = useState()
const [firstName, setFirstName] = useState()
const [lastName, setLastName] = useState()
const [password, setPassword] = useState()
const [repeatPassword, setRepeatPassword] = useState()
const [error, setError] = useState('')

// const regExp TODO: validate email
const validateForm = () => {
    console.log('validating')
    if(!email || !firstName || !lastName || !password || !repeatPassword){
        return true
    }
    return false
}

const handleSubmit = async (e) => {
    setError(null)
    e.preventDefault()  
    if(password !== repeatPassword){
        console.log('errors')
        setError("Passwords don't match")
    }
    if(password < 8){
        console.log('error')
        setError('Password too short')
    }
    if(!error){
        console.log(firstName)
        const response = await axios.post('http://localhost/user/register', {
            firstName,
            lastName,
            email,
            password,
            repeatPassword
        })
        console.log(response)
        props.history.push('/login')
    }
    console.log('submit')
    console.log(error)
}
    return(
        <>
       { console.log(error)}
        {error ? <Error message={error}/> : null}
        <form >
        <h1>Sign up</h1>
        <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="email">Email</InputLabel>
            <Input name="email" type="email" id="email" autoComplete="email" onChange={(e) => setEmail(e.target.value)}/>
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="firstName">Firstname</InputLabel>
            <Input name="firstName" type="text" id="firstName" autoComplete="firstName" onChange={(e) => setFirstName(e.target.value)}/>
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="lastname">Lastname</InputLabel>
            <Input name="lastname" type="text" id="lastname" autoComplete="lastname" onChange={(e) => setLastName(e.target.value)}/>
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input name="password" type="password" id="password" autoComplete="password" onChange={(e) => setPassword(e.target.value)}/>
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="repeatPassword">Repeat Password</InputLabel>
            <Input name="repeatPassword" type="password" id="repeatPassword" autoComplete="repeatPassword" onChange={(e) => setRepeatPassword(e.target.value)}/>
          </FormControl>
            {/* <label><p> Last Name</p><input type="text" name="LastName" onChange={(e)=>setLastName(e.target.value)}/> </label>
            <label><p> Password</p><input type="password" name="password" onChange={(e)=>setPassword(e.target.value)}/> </label>
            <label><p> Repeat Password</p><input type="password" name="repeatPassword" onChange={(e)=>setRepeatPassword(e.target.value)}/> </label> */}
            <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
            onClick={(e)=> handleSubmit(e)}
            >Sign Up</Button>
        </form>
        </>
    )
}

export default Signup