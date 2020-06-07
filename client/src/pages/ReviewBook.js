import React, { useState, useEffect } from "react";
import isAuthorized from "../auth/isAuthorized";
import { Link, useParams  } from "react-router-dom";
import  '../css/reviewBook.css'
import useForm from "../customHooks/useForm";
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
      marginTop: theme.spacing * 3,
      justifySelf: 'center',
      color:'white',
      maxHeight: '40px'
    },
  }));


const ReviewBook = (props) => {
    
    const classes = useStyles()
    const { values, errors, handleChange, handleSubmit } = useForm(reviewBook, validate);

    const [ book, setBook ] = useState()

   let { id }= useParams()
   
    function validate() {
        let errors = {};
        if (!values.title) {
          errors.title = 'A title is required';
        } 
        if(!values.review){
          errors.review = 'A review is required'
        }
        if(!values.rating){
          errors.rating = 'Please rate the book on the scale 0 to 5'
        }       
        return errors;
      }
    
    async function reviewBook() {
        // console.log(values)
        try{
            await axios.post('https://read-it-react.herokuapp.com/addReview', {
            reviewText: values.review, 
            reviewRating: values.rating,
            bookID:id,
            reviewTitle: values.title,
            bookTitle: book.volumeInfo.title,
            img: book.volumeInfo.imageLinks.smallThumbnail
        })
        props.onNotification('Review successfully posted')
                props.history.push('/read_it/reviews')
        }catch(err){
            if(err){
                props.onError(err.response.data.error)
             }
        }
    }

    useEffect(() => {
        let isFetching = true
        const fetchBook = async () => {
          
            const response = await axios(`https://www.googleapis.com/books/v1/volumes/${id}`, {withCredentials:false})
            console.log(response.data)
            if(isFetching){
                setBook(response.data)
            }
        }

        fetchBook()
        return () => isFetching = false
    },[id])

    if(!id){
        return (
            props.history.push('/read_it/profile')
        )
    }

    if(!props.isAuthorized){
        // props.history.push('/read_it/')
    }
    if(book){
        
    return (
        <>
        <Link to="/read_it/profile">Back to Profile</Link>
        
        <div className="reviewForm">
      
            <h1>Create Review of {book.volumeInfo.title}</h1>
        
            <img src={book.volumeInfo.imageLinks.smallThumbnail} alt={book.volumeInfo.title + 'cover image'}/>
        
            <form>
            <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="title">Title of Review</InputLabel>
                <Input name="title" type="text" id="title" onChange={handleChange}/>
                {errors.title && (
                    <p className="help is-danger">{errors.title}</p>
                  )}
          </FormControl>
            <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="rating">Rating</InputLabel>
                <Input name="rating" type="number" id="rating" onChange={handleChange}/>
                {errors.rating && (
                    <p className="help is-danger">{errors.rating}</p>
                  )}
          </FormControl>
            <FormControl margin="normal" required fullWidth>
                {/* <InputLabel htmlFor="review">Review</InputLabel> */}
                <TextField required id="standard-textarea" name="review" label="Review" multiline onChange={handleChange}/>
                {errors.review && (
                    <p className="help is-danger">{errors.review}</p>
                  )}
          </FormControl>          
            <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
             onClick={handleSubmit}>Submit Review</Button>
        </form>
      
        </div>
        </>
    )
    }else{
        return <h1>Review</h1>
    }
}

export default isAuthorized(ReviewBook)