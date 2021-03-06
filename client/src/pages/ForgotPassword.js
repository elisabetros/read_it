import React, { useState } from "react"
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

   const [ email, setEmail ] = useState()

    const handleSubmitEmail = async (e) => {
        e.preventDefault()
        try{
            const response = await axios.post('https://read-it-react.herokuapp.com/sendResetLink', { email })
            if(response.data.response){
                props.onNotification('email sent')
                props.history.push('/')
            }
        }catch(err){
            if(err){
                console.log(err) 
                props.onError(err.response.data.error)
         }
        }
  
    }


    return(
        
        <form>
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

