import React, { useState, useEffect } from 'react';
import axios from 'axios';

const isAuthorized = ComponentToWrap => props => {
    const [ isLoggedIn, setLoginStatus ] = useState(false);
    const [ userID, setUserID ] = useState()
     
    useEffect(() => {
      let isFetching = true
      
      const fetchOnlineUser = async () => {        
        try{
          const response = await axios.get("https://read-it-react.herokuapp.com/auth")
          if(isFetching){
            setLoginStatus(true)
            setUserID(response.data.response)
          }
        }catch(err){
          if(err){
            // console.log(err.response.data.error)
          }
        }
      }

      fetchOnlineUser()
      return () => isFetching = false; //unsubscribe
},[])

  return (
    <ComponentToWrap isAuthorized={isLoggedIn} userID={userID} {...props}/>
  );
}


export default isAuthorized