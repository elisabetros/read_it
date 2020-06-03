import React, { useState, useEffect } from "react";
import axios from "axios";
import reviewCSS from '../css/review.css'

export default function Reviews() {
    const [ reviews, setReviews ] = useState()
    const [ error, setError ] = useState()

    useEffect(() => {
        let isFetching = true
        const fetchReviews = async () => {
            try{
                const response = await axios('http://localhost/getReviews')
                console.log(response.data)
                if(isFetching){
                    setReviews(response.data)
                }
            }catch(err){
                if(err){
                    setError(err.response.data.error)
                 }
            }
           
        } 
        fetchReviews()
        return () => isFetching= false
    },[])

    return(
        <div className="reviewsWrapper">
            <h1>Reviews</h1>
            {reviews ? 
            reviews.map(review => {
                return(
                    <div className="review" key={review.id}>
                        <img src={review.img}/>
                        <div>
                            <h5>{review.book_title}</h5>
                            <p>Review by {review.user.first_name} {review.user.last_name}</p>
                        </div>
                        <h3>{review.title}</h3>
                        <p>{review.review}</p>
                    </div>
                )
            })
        : null}
        </div>
    )
}
