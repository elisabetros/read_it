import React, { useState } from "react";
import searchResultcss from '../css/searchResults.css'
import { AiOutlineHeart } from "react-icons/ai";

const SearchResult = (props) => {
   const [ searchResults, setSearchResults] = useState(props)
// console.log(props)
// console.log(props.hasOwnProperty('authors'))
let authors = null;
let publishedYear;
let shortenedDesc;
const shortenDesc = (text,max) => {
    return text && text.length > max ? text.slice(0,max).split(' ').slice(0, -1).join(' ') : text
}

if(props.hasOwnProperty('publishedYear')){
    publishedYear = props.publishedDate.slice(0,4)
}
if(props.hasOwnProperty('description')){
    shortenedDesc = shortenDesc(props.description, 150)
}
if(props.hasOwnProperty('authors')){
    authors = props.authors.map(author => {
            return author
        })
    }

    


    return(
        <div className="searchResult" >
            <img src={props.imageLinks.thumbnail} />
        <AiOutlineHeart className="heartIcon"/>
            <h3>{props.title}</h3>
            <div className="authors">
            {authors? authors.map((author, index) => {
                // console.log(author)
                return <h4 key={author+index}> By: {author}</h4>
            }) : null }
            </div>
            <p>{shortenedDesc}<span>...</span></p>
            <div>
        	<p>{props.publisher}</p>
        	<p>{publishedYear}</p>
            </div>
            
        </div>
    )
// }

       
        
    
}
export default SearchResult