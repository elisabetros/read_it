import React, { useState } from "react";
import { BsFillStarFill, BsPencilSquare } from 'react-icons/bs'
import { Link } from "react-router-dom";
import isAuthorized from "../auth/isAuthorized";

import axios from 'axios';

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
     color:'white'
   },
   delete: {
       backgroundColor: 'rgb(61, 60, 60)',
       color:'white'
   }
 }));

const Review = (props) => {

    const classes = useStyles()

    const [ newReviewRating, setNewReviewRating] = useState(props.rating)
    const [ newReviewTitle, setNewReviewTitle] = useState(props.title)
    const [ newReviewText, setNewReviewText] = useState(props.review)    
    const [ editModel, setEditModel ] = useState(false)


    const showEditModel = (id) => {
        // const review = reviewedBooks.find(review => review.id === id)
        console.log(props)
        return(<div className="model">
            <div className="model-content">
            <span className="btn" onClick={() => setEditModel(false)}>X</span>
            <h3>Edit Your Review</h3>
            <FormControl margin="normal"  fullWidth>
                <InputLabel htmlFor="title">Title of Review</InputLabel>
                <Input name="title" type="text"
                defaultValue={props.title} 
                 id="title" 
                 onChange={(e) => setNewReviewTitle(e.target.value)}/>
          </FormControl>
            <FormControl margin="normal"  fullWidth>
                <InputLabel htmlFor="rating">Rating</InputLabel>
                <Input name="rating" type="number" 
                defaultValue={props.rating}
                id="rating" 
                onChange={(e) => setNewReviewRating(e.target.value)}/>
          </FormControl>
            <FormControl margin="normal"  fullWidth>
                <TextField 
                    id="standard-textarea"
                    defaultValue={props.review}
                    label="Review"
                    multiline
  onChange={(e) => setNewReviewText(e.target.value)}/>
          </FormControl>
          
            <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
             onClick={(e) => handleEditReview(e)}>Submit Changes</Button>
            </div>
        </div>)
    }

    const handleEditReview = async () => {
        if(newReviewRating || newReviewText || newReviewTitle){
            try{
                const response = await axios.post('http://localhost/updateReview',{
                    reviewID:props.id,
                     newReviewTitle, 
                     newReviewText,
                     newReviewRating
                })
                console.log(response.data)
                setEditModel(false)
            }catch(err){
                if(err){
                    console.log(err)

        }
        }
    }
}

    const checkUser = () => {
        if(props.userID === props.user_id){
            return   <div className="btn" onClick={(e) => setEditModel(props.id)}><BsPencilSquare/>Edit Review</div>
        }
    }

    console.log(props)
    const showRating = () => {
        let ratingArray = []
        for(let i= 0; i< parseInt(props.rating); i++){
            ratingArray.push(<BsFillStarFill key={i}/>)
        }
        return ratingArray
    }
      return(
        // {props.review?
        <>
        {editModel? showEditModel(editModel) :null}
         <div className="review" key={props.id}>
             <div className="link-editBtn">
             <Link to={"bookdetail/"+props.book_id}>About {props.book_title}</Link>
             {checkUser()}
             </div>
            <div className="pub-authors"> 
                <div>
                <h5>{props.book_title}</h5>
                <p>Review by {props.user.first_name} {props.user.last_name}</p>
                </div>
                 <div className="rating"> {showRating()}</div>
            </div>
            <img src={props.img} alt="book cover"/>
            <h3>{props.title}</h3>
            <p>{props.review}</p>
        </div>
        </>
    )
}

export default isAuthorized(Review)