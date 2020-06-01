import React, { useState } from "react"
import axios from 'axios'
import SearchResult from '../components/SearchResult'
import formCss from '../css/form.css'
import searchResultcss from '../css/searchResults.css'

import Error from '../components/Error'


import apiCred from '../config/api'

const Search = () => {
    const [searchString, setSearchString] = useState()
    const [error, setError] = useState()
    const [searchResults, setSearchResults] = useState()

    const validateForm = () => {
        if(!searchString){
            return true
        }else{
            return false
        }
    }

    const handleSearch = async (e) => {
        e.preventDefault()
        const response = await axios(`https://www.googleapis.com/books/v1/volumes?q=${searchString}&keys:${apiCred.key}`)
        console.log(response.data)
        const bookArray = response.data.items
        bookArray.map(bookInfo => {
            let book = bookInfo.volumeInfo
            console.log(book)
            return book
        })
        setSearchResults(bookArray)
    }
const handleError = (data) => {
    setError(data)
    setTimeout(()=> {
        setError('')
    },3000)
}
// TODO add review book button
// TODO if user has liked book make heart filled 

    return(
        <>
        <h1>Search for Books</h1>
        <div className={error ? 'show errorWrapper':'errorWrapper'}>
         <Error error={error} />
        </div>
        <form>
            <input type="text" placeholder="Search by book title" onChange={(e)=>setSearchString(e.target.value)}/>
            <button onClick={(e)=> handleSearch(e)} disabled={validateForm()}>Search</button>
        </form>
        <div className="searchResultContainer">
        {searchResults?
            searchResults.map(result=> {
                return <SearchResult {...result} key={result.volumeInfo.title+result.volumeInfo.id} error={handleError}/>
            })
        : null}
        </div>
           
            
        
        </>
    )
}

export default Search


