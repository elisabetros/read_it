import React, { useState } from "react";
import signupCss from '../css/form.css'
import Error from '../components/Error'
import axios from "axios";
import { AiFillPropertySafety } from "react-icons/ai";

const Signup = (props) => {
const [email, setEmail] = useState()
const [firstName, setFirstName] = useState()
const [lastName, setLastName] = useState()
const [password, setPassword] = useState()
const [repeatPassword, setRepeatPassword] = useState()
const [error, setError] = useState('')

// const regExp TODO: validate email
const validateForm = () => {
    console.log('validating')
    if(!email || !firstName || !lastName || !password || !repeatPassword){
        return true
    }
    return false
}

const handleSubmit = async (e) => {
    setError(null)
    e.preventDefault()  
    if(password !== repeatPassword){
        console.log('errors')
        setError("Passwords don't match")
    }
    if(password < 8){
        console.log('error')
        setError('Password too short')
    }
    if(!error){
        console.log(firstName)
        const response = await axios.post('http://localhost/user/register', {
            firstName,
            lastName,
            email,
            password,
            repeatPassword
        })
        console.log(response)
        props.history.push('/login')
    }
    console.log('submit')
    console.log(error)
}
    return(
        <>
       { console.log(error)}
        {error ? <Error message={error}/> : null}
        <h1>Sign up</h1>
        <form >
            <label><p> Email</p><input type="text" name="email"  onChange={(e)=>setEmail(e.target.value)}/> </label>
            <label><p> First Name</p><input type="text" name="firstName" onChange={(e)=>setFirstName(e.target.value)}/> </label>
            <label><p> Last Name</p><input type="text" name="LastName" onChange={(e)=>setLastName(e.target.value)}/> </label>
            <label><p> Password</p><input type="password" name="password" onChange={(e)=>setPassword(e.target.value)}/> </label>
            <label><p> Repeat Password</p><input type="password" name="repeatPassword" onChange={(e)=>setRepeatPassword(e.target.value)}/> </label>
            <button onClick={(e)=>handleSubmit(e)} disabled={validateForm()}>Sign up</button>
        </form>
        </>
    )
}

export default Signup