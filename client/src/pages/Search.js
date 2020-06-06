import React, { useState, useEffect } from "react"
import axios from 'axios'
import SearchResult from '../components/SearchResult'
import isAuthorized from '../auth/isAuthorized'
import  '../css/form.css'
import '../css/searchResults.css'

import apiCred from '../config/api'

import { makeStyles } from '@material-ui/styles'
import {
    Button,
    FormControl,
    Input,
    InputLabel
  } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
     submit: {
      marginTop: theme.spacing * 3,
      justifySelf: 'center',
      color:'white'
    },
  }));

const Search = (props) => {

    const classes = useStyles()

    const [ searchString, setSearchString ] = useState()
    const [ searchResults, setSearchResults ] = useState()
    const [ likedBooks, setLikedBooks ] = useState('')

    const validateForm = () => {
        if(!searchString){
            return true
        }else{
            return false
        }
    }

    const handleSearch = async (e) => {
        e.preventDefault()
        try{
            const response = await axios(`https://www.googleapis.com/books/v1/volumes?q=${searchString}&keys:${apiCred.key}`,  {
            withCredentials: false })
        console.log(response.data)
        const bookArray = response.data.items
        bookArray.map(bookInfo => {
            let book = bookInfo.volumeInfo
            console.log(book)
            return book
        })
        setSearchResults(bookArray)
        }catch(err){
            if(err){
                props.onError(err.response.data.error)
             }
        }
        
    }

    const handleError = (data) => {
        props.onError(data)
    }
    const handleNotification = (data) => {
        props.onNotification(data)
    }

    useEffect(() => {
        const fetchLikedBooks = async () => {
            try{
                const response = await axios('https://read-it-react.herokuapp.com/getBooksInLibrary')
            // console.log(response.data)
                setLikedBooks(response.data)
            
            }catch(err){
                if(err){
                    props.onError(err.response.data.error)
                 }
            }
            
        }
        
       if(props.isAuthorized){
        fetchLikedBooks()
       } 
    },[props.isAuthorized])
// TODO add review book button
// TODO if user has liked book make heart filled 

    return(
        <>
        <h1>Search for Books</h1>
        <form className="searchForm">
            <FormControl margin="normal"  fullWidth>
            <InputLabel htmlFor="search">Search by Book Title</InputLabel>
            <Input name="search" type="text" id="search" autoComplete="search" onChange={(e) => setSearchString(e.target.value)}/>
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit} onClick={(e)=> handleSearch(e)} >Search</Button>
        </form>
        <div className="searchResultContainer">
        {searchResults?
            searchResults.map(result=> {
                return <SearchResult {...result} key={result.volumeInfo.title+result.volumeInfo.id} disabled={validateForm} error={handleError} notification={handleNotification} likedBooks={likedBooks}/>
            })
        : null}
        </div>
           
            
        
        </>
    )
}

export default isAuthorized(Search)


