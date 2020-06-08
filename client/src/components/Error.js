import React from 'react'

const Error = (props) => {
// console.log(props)
    return(
        <div className="errorWrapper">
            <h3>{props.error}</h3>
        </div>
    )
}

export default Error;