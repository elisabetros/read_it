import React, { useState } from "react";
import searchResultcss from '../css/searchResults.css'
import { AiOutlineHeart } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";
import Error from '../components/Error'
import axios from "axios";

const SearchResult = (props) => {
//    const [ searchResults, setSearchResults] = useState(props)
   const [ isLiked, setLike ] = useState(false)
    const [ error, setError ] = useState()
    const [ notification, setNotification ] = useState()


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

    const handleClick = async () => {
       if(!props.volumeInfo.hasOwnProperty('authors')){
           authors = null;
       }else{
           authors = authors[0]
       }
        console.log(authors)
        const response = await axios.post('http://localhost/addBookToLibrary', {
            bookID: props.id, 
            title: props.volumeInfo.title,
            author: authors
        })
        if(response.data.error){
            setError(response.data.error)
        }
        setNotification(response.data.response)
        setLike(true)
    }
    


    return(
        <div className="searchResult" >
            {error ? <Error {...error} /> : null}
            {props.volumeInfo.imageLinks? <img src={props.volumeInfo.imageLinks.thumbnail} /> : null}
            {!isLiked ?
            <AiOutlineHeart className="heartIcon" onClick={handleClick}/>
            : <AiFillHeart className="heartIcon" onClick={handleClick} /> }
            <h3>{props.volumeInfo.title}</h3>
            <div className="authors">
            {authors? authors.map((author, index) => {
                // console.log(author)
                return <h4 key={author+index}> By: {author}</h4>
            }) : null }
            </div>
            <p>{shortenedDesc}<span>...</span></p>
            <div>
        	<p>{props.volumeInfo.publisher}</p>
        	<p>{publishedYear}</p>
            </div>
            
        </div>
    )
// }

       
        
    
}
export default SearchResult