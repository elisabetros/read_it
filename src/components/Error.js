import React, { useState } from 'react'

const Error = (props) => {
console.log(props)
    return(
        <div className="error">
            <p>{props.message}</p>
        </div>
    )
}

export default Error;