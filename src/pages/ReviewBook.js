import React, { useState, useEffect } from "react";
import isAuthorized from "../auth/isAuthorized";
import Error from '../components/Error'
import { Link, Redirect, useParams  } from "react-router-dom";
import reviewBookCss from '../css/reviewBook.css'
import Notification from '../components/Notification'

import axios from 'axios'

import { makeStyles } from '@material-ui/styles'
import {
    Button,
    FormControl,
    Input,
    InputLabel,
    TextField
  } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
     submit: {
      marginTop: theme.spacing.unit * 3,
      justifySelf: 'center',
      color:'white',
      maxHeight: '40px'
    },
  }));


const ReviewBook = (props) => {

    const classes = useStyles()

    const [ book, setBook ] = useState()
    const [ reviewText, setReviewText ] = useState()
    const [ reviewTitle, setReviewTitle ] = useState()
    const [ reviewRating, setReviewRating ] = useState()
    const [ error, setError ] = useState()
    const [ notification, setNotification ] = useState()

   let { id }= useParams()
    // console.log(id)


    useEffect(() => {
        let isFetching = true
        const fetchBook = async () => {
          
            const response = await axios(`https://www.googleapis.com/books/v1/volumes/${id}`)
            console.log(response.data)
            if(isFetching){
                setBook(response.data)
            }
        }

        fetchBook()
        return () => isFetching = false
    },[])

    const handleClick = async (e) => {
        e.preventDefault()
        console.log('submit review')
        const response = await axios.post('http://localhost/addReview', {
            reviewText, 
            reviewRating,
            bookID:id,
            reviewTitle,
            bookTitle: book.volumeInfo.title,
            img: book.volumeInfo.imageLinks.smallThumbnail
        })
        if(response.data.error){
            setError(response.data.error)
            setTimeout(() => {
                setError('')
            },3000)
        }else{
            setNotification('Review successfully posted')
            setTimeout(() => {
                props.history.push('/reviews')
            },3000)
        }
    }

    if(!id){
        return (
            props.history.push('/profile')
        )
    }

    if(!props.isAuthorized){
        return(
            <div className="notAuthorized">
                <h1>Please login to review this book</h1>
                <Link to="login">Login</Link>
            </div>
            )
    }
    if(book){
        
    return (
        <>
        <Link to="/profile">Back to Profile</Link>
        <div className={error? 'show errorWrapper': 'errorWrapper'}>
            <Error error={error} />
        </div>
        <div className={notification? 'show notificationWrapper': 'notificationWrapper'}>
            <Notification notification={notification} />
        </div>
        <div className="reviewForm">
      
            <h1>Create Review of {book.volumeInfo.title}</h1>
        
            <img src={book.volumeInfo.imageLinks.smallThumbnail} alt={book.volumeInfo.title + 'cover image'}/>
        
            <form>
            <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="title">Title of Review</InputLabel>
                <Input name="title" type="text" id="title" onChange={(e) => setReviewTitle(e.target.value)}/>
          </FormControl>
            <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="rating">Rating</InputLabel>
                <Input name="rating" type="number" id="rating" onChange={(e) => setReviewRating(e.target.value)}/>
          </FormControl>
            <FormControl margin="normal" required fullWidth>
                {/* <InputLabel htmlFor="review">Review</InputLabel> */}
                <TextField required
          id="standard-textarea"
          label="Review"
          multiline
  onChange={(e) => setReviewText(e.target.value)}/>
          </FormControl>
          
            <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
             onClick={(e) => handleClick(e)}>Submit Review</Button>
        </form>
      
        </div>
        </>
    )
    }else{
        return <h1>Review</h1>
    }
}

export default isAuthorized(ReviewBook)