import React, { useEffect, useState } from "react";
import { useParams, useHistory} from 'react-router-dom'
import axios from 'axios'
import '../css/bookDetail.css'
import parse from 'html-react-parser';
import Review from "../components/Review";

const BookDetail = (props) => {

    let { id }= useParams()
    
    let history = useHistory()

   
    const [ book, setBook ] = useState()
    const [ reviews, setReviews ] = useState()

    

    useEffect(() => {
        let isFetching = true
        const fetchBook= async () => {
            try{
               const response =  await axios(`https://www.googleapis.com/books/v1/volumes/${id}`, { withCredentials: false })
                if(isFetching){
                    setBook(response.data)
                }
            }catch(err){
                props.onError(err.response.data.error)
            }
        }
        const fetchReviews = async () => {
            try{
                const response = await axios (`https://read-it-react.herokuapp.com/getSingleBookReviews/${id}`)
                console.log(response.data)
                if(isFetching){
                    setReviews(response.data)
                } // && response.data.length
            }catch(err){
                props.onError(err.response.data.error)
            }
        }
        fetchBook()
        fetchReviews()
        return () => isFetching = false
    }, [props, id])



if(!book){
    return <div className="loader">Loading...</div>
}

console.log(history)
console.log(book)
    return (
        <>
        <button className="link" onClick={() => history.goBack()}>Back</button>
        <div className="bookDetail">
            <div>
                <h1>{book.volumeInfo.title}</h1>
                <h2>{book.volumeInfo.subtitle}</h2>
            </div>
            <img src={book.volumeInfo.imageLinks.smallThumbnail} alt="book cover"/>
            <div className="pub-authors">
                <div>
                {book.volumeInfo.authors? book.volumeInfo.authors.map((author, index) => {
                        // console.log(author)
                        return <h4 key={author+index}> By: {author}</h4>
                    }) : null }
                </div>
                <div>
                    <p>Published: {new Date(book.volumeInfo.publishedDate).toDateString().slice(4,15)}</p>
                    <p>Published by: <strong>{book.volumeInfo.publisher}</strong></p>
                </div>
            </div>
            {book.volumeInfo.description? <div>{parse(book.volumeInfo.description)}</div>: null}
        
            <a href={book.volumeInfo.infoLink}>More Information</a>
        </div>
        <div className="reviews">
            <h2>Reviews</h2>
            {reviews ? 
            reviews.map(review => {
               return <Review {...review} key={review.id}/>
            })
        : null}
        </div>
        </>
    )
}

export default BookDetail