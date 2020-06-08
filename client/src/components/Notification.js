import React from 'react'

const Notification = (props) => {
// console.log(props)
    return(
        <div className="notificationWrapper">
            <h3>{props.notification}</h3>
        </div>
    )
}

export default Notification;