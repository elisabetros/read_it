import React, { useState, useEffect } from "react";
import axios from "axios";
import reviewCSS from '../css/review.css'
import Review from "../components/Review";


export default function Reviews(props) {
    const [ reviews, setReviews ] = useState()

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
                    props.onError(err.response.data.error)
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
                return <Review {...review} key={review.id}/>                
            })
        : null}
        
        </div>
    )
}
