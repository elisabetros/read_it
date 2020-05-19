import { useState } from "react";

const Signup = () => {


    return(
        <>
        <h1>Sign up</h1>
        <form>
            <label> Email
                <input type="text" name="email"/>
            </label>
            <label> First Name<input type="text" name="firstName"/> </label>
            <label> Last Name<input type="text" name="LastName"/> </label>
            <label> Password<input type="password" name="password"/> </label>
            <label> Repeat Password<input type="password" name="repeatPassword"/> </label>
        </form>
        </>
    )
}

export default Signup