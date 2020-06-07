import React, { useState } from "react";
import '../css/form.css'
import axios from "axios";
import useForm from "../customHooks/useForm";

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

  const { values, errors, handleChange, handleSubmit } = useForm(signup, validate);

  async function signup() {
    console.log(values)
    try{        
      const response = await axios.post('https://read-it-react.herokuapp.com/user/register', {
                  firstName:  values.firstName,
                  lastName:  values.lastname,
                  email:  values.email,
                  password:  values.password,
                  repeatPassword: values.repeatPassword
       })
       console.log(response)
       props.onNotification('Signup succsessful')
       props.history.push('/read_it/login')
    }catch(err){
      if(err){
        console.log(err.response.data.error);
         props.onError(err.response.data.error)
      }
    }
  }

  function validate() {
    let errors = {};
    if (!values.email) {
      errors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'Email address is invalid';
    }
    if(!values.firstName){
      errors.firstName = 'Firstname is required'
    }
    if(!values.lastname){
      errors.lastname = 'Lastname is required'
    }
    if (!values.password) {
      errors.password = 'Password is required';
    } else if (values.password.length < 8) {
      errors.password = 'Password must be 8 or more characters';
    }
    if(!values.repeatPassword){
      errors.repeatPassword = 'Repeat your password'
    }
    if(values.repeatPassword !== values.password){
      errors.repeatPassword = 'Passwords must match'
    }
    return errors;
  }
    return(
        <>
        <form >
        <h1>Sign up</h1>
        <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="email">Email</InputLabel>
            <Input name="email" type="email" id="email" autoComplete="email"  onChange={handleChange}/>
            {errors.email && (
                    <p className="help is-danger">{errors.email}</p>
                  )}
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="firstName">Firstname</InputLabel>
            <Input name="firstName" type="text" id="firstName" autoComplete="firstName" onChange={handleChange}/>
            {errors.firstName && (
                    <p className="help is-danger">{errors.firstName}</p>
                  )}
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="lastname">Lastname</InputLabel>
            <Input name="lastname" type="text" id="lastname" autoComplete="lastname" onChange={handleChange}/>
            {errors.lastname && (
                    <p className="help is-danger">{errors.lastname}</p>
                  )}
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input name="password" type="password" id="password" min="8" autoComplete="password" onChange={handleChange}/>
            {errors.password && (
                    <p className="help is-danger">{errors.password}</p>
                  )}
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="repeatPassword">Repeat Password</InputLabel>
            <Input name="repeatPassword" type="password" id="repeatPassword" autoComplete="repeatPassword" onChange={handleChange}/>
            {errors.repeatPassword && (
                    <p className="help is-danger">{errors.repeatPassword}</p>
                  )}
          </FormControl>
            <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
            onClick={handleSubmit}
            >Sign Up</Button>
        </form>
        </>
    )
}

export default Signup