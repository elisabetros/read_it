import React from 'react'
import axios from 'axios'
import isAuthorized from '../auth/isAuthorized'
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles'
import { useHistory } from 'react-router-dom';
  
  const useStyles = makeStyles(theme => ({
    submit: {
     justifySelf: 'center',
     color:'white'
   },
 }));


const LogOut = (props) => {
    const classes = useStyles()
    const history = useHistory()
    const handleLogout = async () => {
        try{
            const response = await axios('http://localhost/user/logout')
            console.log(props)   
            if(response.data.response){
                props.onLogout(false)
                props.onNotification('You are now logged out')
                console.log(history.location)
                if(history.location === '/profile'){
                    props.history.push('/')
                }
            }       
        }catch(err){
            if(err){
                console.log(err)
                // props.onError(err.response.data.error)
             }
        }

    }

    return(
        <Button type="submit"
        fullWidth
        variant="contained"
        color="secondary"
        className={classes.submit} onClick={handleLogout}>Log Out</Button>
    )

}
export default isAuthorized(LogOut)