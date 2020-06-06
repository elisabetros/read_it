import React, { useState, useEffect } from "react";
import axios from "axios";
import reviewCSS from '../css/review.css'
import Review from "../components/Review";

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

export default function Reviews(props) {

    const classes = useStyles()

    const [ reviews, setReviews ] = useState()
    const [ searchStr, setSearchStr ] = useState()
    const [ clearSearch, setClearSearch ] = useState(false)

    useEffect(() => {
        let isFetching = true
        const fetchReviews = async () => {
            try{
                const response = await axios('http://localhost/getReviews')
                console.log(response.data)
                if(isFetching){
                    setReviews(response.data)
                }
            }catch(err){
                if(err){
                    props.onError(err.response.data.error)
                 }
            }
           
        } 
        fetchReviews()
        return () => isFetching= false
    },[props, clearSearch])

    const handleSubmit = (e) => {
        e.preventDefault()
        if(searchStr){
           const matches = reviews.filter(review => {
               console.log(review)
            if(review.book_title.toLowerCase().includes(searchStr.toLowerCase()) 
            || review.user.first_name.toLowerCase().includes(searchStr.toLowerCase()) 
            || review.user.last_name.toLowerCase().includes(searchStr.toLowerCase()) ){
                return review
            }
        })
        console.log(matches.length)
        if(matches.length === 0){
            console.log(matches)
            props.onError('No reviews match your search')
            return
        }else{
            setReviews(matches)

        }
        }
    }

    return(
        <div className="reviewsWrapper">
            <h1>Reviews</h1>
                {searchStr? <div className="clearBtn btn" onClick={() => setClearSearch(true)}>Clear Search</div>:null}
            <form className="searchForm">
                <FormControl margin="normal" fullWidth>
                    <InputLabel htmlFor="searchStr">Search for Reviews</InputLabel>
                    <Input name="searchStr" type="text" id="searchStr"  onChange={(e) => setSearchStr(e.target.value)}/>
                </FormControl>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="secondary"
                    className={classes.submit}
                    onClick={(e)=> handleSubmit(e)}
                    >Search</Button>
            </form>
            {reviews ? 
            reviews.map(review => {
                return <Review {...review} key={review.id}/>                
            })
        : null}
        
        </div>
    )
}
