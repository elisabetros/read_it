import React, { useState, useEffect } from 'react';
import axios from 'axios'
import formCss from '../css/form.css'

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [ error, setError ] = useState('')

    const handleSubmit = async (e) => {
        setError('')
        e.preventDefault()
        if(!email || !password){
            setError('Missing fields')
            return;
        }
        if(!error){
            const response = await axios.post("http://localhost/user/login", {
                email, password
            })
            console.log(response)
        }
    }

    return(
        <div className="loginPage">
        <form method="post">
            <div className="error">{error}</div>
            <h1>Please log in</h1>
            <label >
                <p>Email</p>
                <input type="text" onChange={(e) => setEmail(e.target.value)} />
            </label>
            <label>
                <p>Password</p>
                <input type="text" onChange={(e) => setPassword(e.target.value)}/>   
            </label>
                
            <button  onClick={(e)=> handleSubmit(e) }>Log in</button>
        {/* <Link to="/sendResetEmail">Forgot your Password?</Link> */}

        </form>
        </div>
    )
}

export default Login