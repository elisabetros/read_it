import React, { useState, useEffect } from "react"
import axios from "axios"
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

const ForgotPassword = (props) => {
    const classes = useStyles()

   const [ email, setEmail ] = useState('')
   const [ error, setError ] = useState('')
   const [ successMessage, setSuccessMessage ] = useState('')

    const handleSubmitEmail = (e) => {
        e.preventDefault()
        axios.post('http://localhost/sendResetLink', {
            email
        })
        .then(response => {
            console.log(response.data)
            if(response.data.error){
                setError(response.data.error)
            }else{
                setError('')
                setSuccessMessage('You will receive an email shortly')
                setTimeout(()=> {
                    props.history.push('/home')
                },3000)
            }
            // if(response){
            //    return (
            //        <h1> You will receive an email shortly</h1>
            //    )
            // }
    })
    }


    return(
        
        <form>
        <div className={error? 'error': 'successMessage'}>{error? error: successMessage}</div>
        <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="email">Email Address</InputLabel>
            <Input id="email" name="email" autoComplete="email" autoFocus onChange={(e) => setEmail(e.target.value)} />
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
            onClick={(e)=>handleSubmitEmail(e)}>Send Email</Button>
        </form>
        
    )
}


export default ForgotPassword

