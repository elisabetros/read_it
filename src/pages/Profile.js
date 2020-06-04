import React, { useState, useEffect } from "react"
import axios from 'axios'

import isAuthorized from '../auth/isAuthorized'
import Error from '../components/Error'
import Notification from '../components/Notification'
import { Link, useHistory } from "react-router-dom"
import { BsHeartFill, BsPencilSquare, BsFillTrashFill } from "react-icons/bs";
import profileCSS from '../css/profile.css'

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

const Profile = (props) => {
    const classes = useStyles()

    const [ error, setError ] = useState()
    const [ notification, setNotification ] = useState()
    const [ booksInLibrary, setBooks ] = useState()
    const [ reviewedBooks, setReviewedBooks ] = useState()
    const [ edit, setEdit ] = useState(false)
    const [ newFirstname, setNewFirstname ] = useState()
    const [ newLastname, setNewLastname ] = useState()
    const [ newEmail, setNewEmail ] = useState()

    const [ newReviewRating, setNewReviewRating] = useState()
    const [ newReviewTitle, setNewReviewTitle] = useState()
    const [ newReviewText, setNewReviewText] = useState()

    const [ deleteModel, setDeleteModel ] = useState(false)
    const [ editModel, setEditModel ] = useState(false)

    let history = useHistory()
    
    console.log(props)

    const clearError = () => {
        setTimeout(() => {
            setError('')
        }, 3000)
    }

    useEffect(() => {
        let isFetching = true
      
        const fetchBooksInLibrary = async () => {
            try{
                const response = await axios('http://localhost/getBooksInLibrary')
                console.log(response.data)
                if(isFetching){
                    setBooks(response.data)
                }
            }catch(err){
                if(err){
                    setError(err.response.data.error)
                 }
            }
           
        }
        const fetchReviewedBooks = async () => {
            try{
                const response = await axios('http://localhost/getUserReviewedBooks')
                console.log(response.data)
                if(isFetching){
                    setReviewedBooks(response.data)
                }
            }catch(err){
                if(err){
                    setError(err.response.data.error)
                 }
            }
           
        }

        fetchBooksInLibrary()
        fetchReviewedBooks()
        return () => isFetching = false
    },[props.isAuthorized])

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log('submit profile changes')
        if(!newEmail || !newFirstname || !newLastname){
            setError('Please fill out information you would like changed')
            clearError()
        }
        if(newEmail || newFirstname || newLastname){
            try{
                const response = await axios.post('http://localhost/user/update', {
                    newFirstname,
                    newLastname,
                    newFirstname
                })
            console.log(response.data)
            setNotification(response.data.response)
            setEdit(false)
            }catch(err){
                if(err){
                    setError(err.response.data.error)
                    clearError()
                 }
            }
           
       

        }
    }
    const showDeleteModel = () => {
        console.log('delete')
        return(
            <div className="model">
                <div className="model-content">
                <h2>Are you sure you want to delete your account?</h2>
                <p>This action cannot be reversed</p>
                 <Button type="submit"
                    fullWidth
                    variant="contained"
                    className={classes.delete}  
                    onClick={deleteAccount}>Delete</Button> 
                <Button type="submit"
                    fullWidth
                    color="secondary"
                    variant="contained"
                    className={classes.submit}  
                    onClick={()=>setDeleteModel(false)}>Cancel</Button>
                </div>
            </div>
        )
    }
    
    const deleteAccount = async () => {
        try{
            const response =  await axios.delete('http://localhost/user/deleteAccount')
        console.log(response.data)
        setNotification(response.data.response)
        setTimeout(() => {
            history.push('/')
        },3000)
        }catch(err){
            if(err){
                setError(err.response.data.error)
                clearError()
             }
        }
       
    }
    const showEditModel = (id) => {
        const review = reviewedBooks.find(review => review.id === id)
        console.log(review)
        return(<div className="model">
            <div className="model-content">
            <span className="btn" onClick={() => setEditModel(false)}>X</span>
            <h3>Edit Your Review</h3>
            <FormControl margin="normal"  fullWidth>
                <InputLabel htmlFor="title">Title of Review</InputLabel>
                <Input name="title" type="text"
                defaultValue={review.title} 
                 id="title" 
                 onChange={(e) => setNewReviewTitle(e.target.value)}/>
          </FormControl>
            <FormControl margin="normal"  fullWidth>
                <InputLabel htmlFor="rating">Rating</InputLabel>
                <Input name="rating" type="number" 
                defaultValue={review.rating}
                id="rating" 
                onChange={(e) => setNewReviewRating(e.target.value)}/>
          </FormControl>
            <FormControl margin="normal"  fullWidth>
                <TextField 
                    id="standard-textarea"
                    defaultValue={review.review}
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
    const handleEditReview = () => {
        console.log('edit review')
    }
    const handleClick = async (id) => {
        console.log('remove from library', id)
        try{
            const response = await axios.post('http://localhost/removeBookFromLibrary', {likedBookID: id})
            console.log(response.data)
            console.log('TODO: fetch again')
        }catch(err){
            if(err){
                setError(err.response.data.error)
                clearError()
             }
        }
       
      
    }
    if(!props.isAuthorized){
         return (<div className="notAuthorized">
            <h1>Log in to view your profile</h1>
            <Link to="/login"> Login</Link></div>)
    }
    return(
        <div className="profile">
        <div className={error? 'show errorWrapper': 'errorWrapper'}>
            <Error error={error} />
        </div>
        <div className={notification? 'show notificationWrapper': 'notificationWrapper'}>
            <Notification notification={notification} />
        </div>
       
        <div>            
            <h2>Your Library</h2>
            <div className="library">
            {booksInLibrary?
                booksInLibrary.map(book => {
                    return (<div className='book' key={book.id} >
                            <BsHeartFill className="heartIcon" onClick={()=>handleClick(book.id)}/>
                            <img src={book.img}/>
                            <h3>{book.title}</h3>
                            <h4>{book.author}</h4>
                            <Link to={"/reviewbook/"+book.book_id}>Review Book</Link>
                        </div>)
                })
                :<div>
                    <h2>There appears to be nothing in your library</h2>
                    <Link to="L">Browse Book</Link>
                </div>}
            </div>
        </div>
        <div className="userReviews">
                <h2>Your Reviews</h2>
                {reviewedBooks?
                reviewedBooks.map(review => {
                    return(
                        <div className="review" key={review.id}>
                            <div className="btn" onClick={(e) => setEditModel(review.id)}><BsPencilSquare/>Edit Review</div>                    
                            <img src={review.img}/>
                        <div>
                            <h5>{review.book_title}</h5>
                            <p>Review by {review.user.first_name} {review.user.last_name}</p>
                        </div>
                        <h3>{review.title}</h3>
                        <p>{review.review}</p>
                        </div>
                    )
                })
                :null}
                {editModel? showEditModel(editModel) :null}
        </div>
        
        <button className={edit? 'shown editBtn': 'editBtn'} onClick={() => edit? setEdit(false): setEdit(true)}>Edit your information</button>
        <form className={edit? 'showForm editForm' :'editForm'}>
            <h3>Update your information</h3>
             <FormControl margin="normal"  fullWidth>
                <InputLabel htmlFor="newFirstname">Firstname</InputLabel>
                <Input name="newFirstname" type="text" id="newFirstname"  onChange={(e) => setNewFirstname(e.target.value)}/>
          </FormControl> 
           <FormControl margin="normal"  fullWidth>
                <InputLabel htmlFor="newLastname">Lastname</InputLabel>
                <Input name="newLastname" type="text" id="newLastname"  onChange={(e) => setNewLastname(e.target.value)}/>
          </FormControl> 
            <FormControl margin="normal"  fullWidth>
               <InputLabel htmlFor="newEmail">Email</InputLabel>
                <Input name="newEmail" type="text" id="newEmail"  onChange={(e) => setNewEmail(e.target.value)}/>
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
            onClick={(e) => handleSubmit(e)}>Submit Changes</Button> 
         </form>
         <div className="dltBtn btn" onClick={() => setDeleteModel(true)}><BsFillTrashFill />Delete Account</div>
         {deleteModel? showDeleteModel(): null}
        </div>
    )

}
export default isAuthorized(Profile)