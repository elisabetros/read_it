import React, { useState } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom'
import '../css/form.css'

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

const Login = (props) => {
  const [ loading, setLoading ] = useState(false)

    const classes = useStyles()    
    const { values, errors, handleChange, handleSubmit } = useForm(login, validate);

    async function login() {
      // console.log(values)
      setLoading(true)
      try{
        const response = await axios.post("https://read-it-react.herokuapp.com/user/login", {
          email:values.email, password:values.password
              })
         console.log(response.data)
        props.onLogin(true)
        props.onNotification('Login successful')
        setLoading(false)
        props.history.push('/read_it/profile')
      }catch(err){
        if(err){
          console.log(err);
           props.onError(err)
        }
      }
    }
    function validate(){
      let errors = {};
      if (!values.email) {
        errors.email = 'Email address is required';
      } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = 'Email address is invalid';
      }
      if (!values.password) {
        errors.password = 'Password is required';
      } else if (values.password.length < 8) {
        errors.password = 'Password must be 8 or more characters';
      }
      return errors;
    }
    
    return(
        <div className="loginPage">
        <form method="post" >
            <h1>Log in</h1>
            <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="email">Email Address</InputLabel>
            <Input id="email" name="email" autoComplete="email" autoFocus onChange={handleChange} />
            {errors.email && (
                    <p className="help is-danger">{errors.email}</p>
                  )}
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input name="password" type="password" id="password" autoComplete="current-password" onChange={handleChange}/>
            {errors.password && (
                    <p className="help is-danger">{errors.password}</p>
                  )}
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
            onClick={(e)=> handleSubmit(e)}
            >{!loading? 'Log in': '...Loading'}
          </Button>
        </form>
        <Link to="/read_it/forgotpassword">Forgot Your Password?</Link>
        </div>
    )
}

export default Login