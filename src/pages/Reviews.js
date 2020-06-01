import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Reviews() {
    const [ reviews, setReviews ] = useState()

    useEffect(() => {
        let isFetching = true
        const fetchReviews = async () => {
            const response = await axios('http://localhost/getReviews')
            console.log(response.data)
            if(isFetching){
                setReviews(response.data)
            }
        } 
        fetchReviews()
        return () => isFetching= false
    },[])

    return(
        <div>
            <h1>Reviews</h1>
            {/* {reviews} */}
        </div>
    )
}
