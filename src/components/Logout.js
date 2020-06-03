import React from 'react'
import axios from 'axios'
import isAuthorized from '../auth/isAuthorized'
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles'
  
  const useStyles = makeStyles(theme => ({
    submit: {
     justifySelf: 'center',
     color:'white'
   },
 }));


const LogOut = (props) => {
    const classes = useStyles()

    const handleLogout = async () => {
        try{
            const response = await axios('http://localhost/user/logout')
            console.log(props)          
            props.onLogout(false)
        }catch(err){
            if(err){
                console.log(err.response.data.error)
                
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