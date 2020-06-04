import React, { useState, useEffect } from "react";
import axios from "axios";
import reviewCSS from '../css/review.css'
import Review from "../components/Review";
import { Link } from "react-router-dom";

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
                return (<div><Review {...review} /> <Link to={"bookdetail/"+review.book_id}>About {review.book_title}</Link></div> )               
            })
        : null}
        
        </div>
    )
}
