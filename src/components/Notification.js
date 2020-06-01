import React, { useState } from 'react'

const Notification = (props) => {
// console.log(props)
    return(
        <div >
            <h3>{props.notification}</h3>
        </div>
    )
}

export default Notification;