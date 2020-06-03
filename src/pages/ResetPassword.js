import React, { useState } from "react";
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import Error from '../components/Error'

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

const ResetPassword = ( props) => {
    const classes = useStyles()

    const [ newPassword, setNewPassword ] = useState('')
    const [ newRepeatPassword, setRepeatPassword ] = useState('')
    const [ error, setError ] = useState('')

    // console.log()
    const handleSubmit = async (e) => {
        console.log("click")
        e.preventDefault()
        if(!newPassword || !newRepeatPassword){
            setError('Missing fields')
            return
        }
        if(newPassword !== newRepeatPassword){
            setError('Passwords dont match')
            return
        }
        try{ 
            console.log('try')
            const response = await axios.post('http://localhost/resetpassword', {
            token: props.match.params.token,
            newPassword,
            newRepeatPassword
        })
        if(response.data.response){
            props.history.push('/login')
        }
        }catch(err){
           setError(err.response.data.error)
        }
       
        
}
console.log(error)
    return(
        <>
       <div className={error? 'show errorWrapper': 'errorWrapper'}>
            <Error error={error} />
        </div>
        <form>
            <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="newPassword">New Password</InputLabel>
                <Input name="newPassword" type="password" id="newPassword"  onChange={(e) => setNewPassword(e.target.value)}/>
          </FormControl>
            <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="newRepeatPassword">Repeat New Password</InputLabel>
                <Input name="newRepeatPassword" type="password" id="newRepeatPassword"  onChange={(e) => setRepeatPassword(e.target.value)}/>
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
            onClick={(e)=> handleSubmit(e)}
            >Set new Password</Button>
    </form>
    </>
    )
}

export default ResetPassword;