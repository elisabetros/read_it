import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom'

// import formCss from '../css/form.css'
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
    const classes = useStyles()
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ error, setError ] = useState('')

    const handleSubmit = async (e) => {
        setError('')
        e.preventDefault()
        if(!email || !password){
            setError('Missing fields')
            return;
        }
        if(!error){
          try{
            const response = await axios.post("http://localhost/user/login", {
              email, password
          })
          console.log(response.data)
          props.onLogin(true)
          props.history.push('/profile')

        }catch(err){
          if(err){
            console.log(err.response.data.error);
            setError(err.response.data.error)
           }
          }
        
        }
      }
// TODO: add forgot password
    return(
        <div className="loginPage">
        <form method="post" >
            <div className="error">{error}</div>
            <h1>Log in</h1>
            <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="email">Email Address</InputLabel>
            <Input id="email" name="email" autoComplete="email" autoFocus onChange={(e) => setEmail(e.target.value)} />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input name="password" type="password" id="password" autoComplete="current-password" onChange={(e) => setPassword(e.target.value)}/>
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
            onClick={(e)=> handleSubmit(e)}
            >
            Log in
          </Button>
                
            
        {/* <Link to="/sendResetEmail">Forgot your Password?</Link> */}

        </form>
        <Link to="/forgotpassword">Forgot Your Password?</Link>
        </div>
    )
}

export default Login