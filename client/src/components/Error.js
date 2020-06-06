import React from 'react'

const Error = (props) => {
// console.log(props)
    return(
        <div className="error">
            <h3>{props.error}</h3>
        </div>
    )
}

export default Error;