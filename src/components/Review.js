import React, { useEffect, useState } from "react";

const Review = (props) => {
    console.log(props)
      return(
        // {props.review?
         <div className="review" key={props.id}>
            <img src={props.img}/>
            <div>
                <h5>{props.book_title}</h5>
                <p>props by {props.user.first_name} {props.user.last_name}</p>
            </div>
            <h3>{props.title}</h3>
            <p>{props.review}</p>
        </div>
    )
}

export default Review