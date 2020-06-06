import React, { useState, useEffect } from "react";
import  '../css/searchResults.css'
import { BsHeart, BsHeartFill} from "react-icons/bs";
import axios from "axios";
import { Link } from "react-router-dom";
import isAuthorized from "../auth/isAuthorized";

const SearchResult = (props) => {
//    const [ searchResults, setSearchResults] = useState(props)
   const [ isLiked, setLike ] = useState(false)

console.log(props)
let authors = null;
let publishedYear;
let shortenedDesc;

const shortenDesc = (text,max) => {
    return text && text.length > max ? text.slice(0,max).split(' ').slice(0, -1).join(' ') : text
}

if(props.volumeInfo.hasOwnProperty('publishedYear')){
    publishedYear = props.volumeInfo.publishedDate.slice(0,4)
}
if(props.volumeInfo.hasOwnProperty('description')){
    shortenedDesc = shortenDesc(props.volumeInfo.description, 150)
}
if(props.volumeInfo.hasOwnProperty('authors')){
    authors = props.volumeInfo.authors.map(author => {
            return author
        })
    }
   
    const handleLike = async () => {
        if(props.isAuthorized){
       if(!props.volumeInfo.hasOwnProperty('authors')){
           authors = null;
       }else{
           authors = authors.toString()
       }
        console.log(authors)
        try{
            const response = await axios.post('https://read-it-react.herokuapp.com/addBookToLibrary', {
                bookID: props.id, 
                title: props.volumeInfo.title,
                author: authors,
                img: props.volumeInfo.imageLinks.thumbnail
            })
            console.log(response.data)
            // props.notification(response.data.response)
            setLike(true)
        }catch(err){
            if(err){
                // props.error(err.response.data.error)
                console.log(err.response.data.error)
             }
        }     
        }else{
        props.error('Please login to add a book to your library')
        }    
    }

    const handleUnlike = async () => {
        console.log('remove from library')
        // if(props.isAuthorized){
        try{
            const response = await axios.post('https://read-it-react.herokuapp.com/removeBookFromLibrary', {likedBookID: props.id})
            console.log(response.data)
           setLike(false)
        }catch(err){
            if(err){
                // props.error(err.response.data.error)
            }
        }    
    // }  
    }

    useEffect(() => {
        if(props.likedBooks){
            const isSame = props.likedBooks.find(book => book.book_id === props.id)
            if(isSame){
                setLike(true)              
            }else{
                setLike(false)
             }
            }

    }, [props])
    
    console.log(props.likedBooks)

    return(
        <div className="searchResult" >
           
            {props.volumeInfo.imageLinks? <img src={props.volumeInfo.imageLinks.smallThumbnail} alt="book cover" /> : null}
            {!isLiked ?
            <BsHeart className="heartIcon" onClick={handleLike}/>
            : <BsHeartFill className="heartIcon" onClick={handleUnlike} /> }
            <h3>{props.volumeInfo.title}</h3>
            <div className="authors">
            {authors? authors.map((author, index) => {
                // console.log(author)
                return <h4 key={author+index}> By: {author}</h4>
            }) : null }
            </div>
            <p>{shortenedDesc} <Link to={'/bookdetail/'+ props.id}>...Read More</Link></p>
            <div>
        	<p>{props.volumeInfo.publisher}</p>
        	<p>{publishedYear}</p>
            </div>
            
        </div>
    )
// }

       
        
    
}
export default isAuthorized(SearchResult)