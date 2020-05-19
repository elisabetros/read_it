import React, { useState } from "react"
import axios from 'axios'
import SearchResult from '../components/SearchResult'
import formCss from '../css/form.css'


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

    return(
        <>
        <h1>Search for Books</h1>
        <form>
            <input type="text" placeholder="Search by book title" onChange={(e)=>setSearchString(e.target.value)}/>
            <button onClick={(e)=> handleSearch(e)} disabled={validateForm()}>Search</button>
        </form>
        {searchResults?
            searchResults.map(result=> {
                return <SearchResult {...result.volumeInfo} />
            })
        : null}
            {/* <SearchResults results={searchResults} /> */}
            
        
        </>
    )
}

export default Search


