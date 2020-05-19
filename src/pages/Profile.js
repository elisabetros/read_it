import React, { useState, useEffect } from "react"
import axios from 'axios'
import isAuthorized from '../auth/isAuthorized'
import Error from '../components/Error'
import { NavLink } from "react-router-dom"

const Profile = (props) => {
    const [error, setError ] = useState()

    console.log(props)
    useEffect(() => {

        if(!props.isAuthorized){
            setError('Log in to view your profile')     
    }else{
        setError('')
    }
    },[props.isAuthorized])
    if(error){
        return (<div><Error message={error}/><NavLink to="/login"> Login</NavLink></div>)
    }
    return(
        <>
        <h1>Profile</h1>
        <div>
            <h2>Your Books</h2>
        </div>
        </>
    )

}
export default isAuthorized(Profile)