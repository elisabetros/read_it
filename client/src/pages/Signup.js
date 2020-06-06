import React, { useState } from "react";
import '../css/form.css'
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
      marginTop: theme.spacing * 3,
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

// const regExp TODO: validate email


const handleSubmit = async (e) => {
    props.onError(null)
    e.preventDefault()  
    if(password !== repeatPassword){
        console.log('errors')
        props.onError("Passwords don't match")
        return
    }
    if(password < 8){
        console.log('error')
        props.onError('Password too short')
        return
    }
      try{
        
        console.log(firstName)
        const response = await axios.post('https://read-it-react.herokuapp.com/user/register', {
            firstName,
            lastName,
            email,
            password,
            repeatPassword
        })
        console.log(response)
        props.onNotification('Signup succsessful')
          props.history.push('/read_it/login')
          
      }catch(err){
        if(err){
          console.log(err.response.data.error);
          props.onError(err.response.data.error) }
      }
    
    console.log('submit')
}
    return(
        <>
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
            <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
            onClick={(e) => handleSubmit(e)}
            >Sign Up</Button>
        </form>
        </>
    )
}

export default Signup