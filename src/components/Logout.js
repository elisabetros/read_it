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
        const response = await axios('http://localhost/user/logout')
            // console.log(response)
        if(response.data.error){
            console.log('error')
        }else{  
            console.log(props)          
            props.onLogout(false)
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