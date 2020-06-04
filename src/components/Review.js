import React, { useEffect, useState } from "react";
import { BsFillStarFill } from 'react-icons/bs'

const Review = (props) => {
    console.log(props)
    const showRating = () => {
        let ratingArray = []
        for(let i= 0; i< parseInt(props.rating); i++){
            ratingArray.push(<BsFillStarFill />)
        }
        return ratingArray
    }
      return(
        // {props.review?
         <div className="review" key={props.id}>
            <div className="pub-authors"> 
                <div>
                <h5>{props.book_title}</h5>
                <p>Review by {props.user.first_name} {props.user.last_name}</p>
                </div>
                 <div className="rating"> {showRating()}</div>
            </div>
            <img src={props.img}/>
            <h3>{props.title}</h3>
            <p>{props.review}</p>
        </div>
    )
}

export default Review