import React, { useState, useEffect } from 'react';
import axios from 'axios';

const isAuthorized = ComponentToWrap => props => {
    const [isLoggedIn, setLoginStatus] = useState(false);
     
    useEffect(() => {
      let isFetching = true
      
      const fetchOnlineUser = async () => {        
        try{
          const response = await axios.get("http://localhost/auth")
          if(isFetching){
            setLoginStatus(response.data)
          }
        }catch(err){
          if(err){
            console.log(err.response.data)
          }
        }
      }

      fetchOnlineUser()
      return () => isFetching = false; //unsubscribe
},[])

  return (
    <ComponentToWrap isAuthorized={isLoggedIn} {...props}/>
  );
}


export default isAuthorized