import React, { useState, useEffect } from "react"
import axios from 'axios'

import isAuthorized from '../auth/isAuthorized'
import Review from '../components/Review'
import useForm from '../customHooks/useForm'

import { Link, useHistory } from "react-router-dom"
import { BsHeartFill, BsFillTrashFill, BsFillStarFill } from "react-icons/bs";
import '../css/profile.css'

import { makeStyles } from '@material-ui/styles'
import {
    Button,
    FormControl,
    Input,
    InputLabel
  } from '@material-ui/core';
import Loader from "../components/Loader"

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
    
    const [ booksInLibrary, setBooks ] = useState()
    const [ reviewedBooks, setReviewedBooks ] = useState()
    const [ edit, setEdit ] = useState(false)
    const [ deleteModel, setDeleteModel ] = useState(false)
    const [ loading, setLoading ] = useState(false)
    
    
    let history = useHistory()
    const classes = useStyles()
    const { values, errors, handleChange, handleSubmit } = useForm(updateUser, validate);
    
    
    function validate() {
        let errors = {};
        if(Object.keys(values).length === 0){
            // console.log('values empty')
          errors.newEmail = 'Please update at least one field';
          errors.newFirstname = 'Please update at least one field';
          errors.newLastname = 'Please update at least one field';
        } 
        return errors;
      }

      async function updateUser() {
          setLoading(true)
        try{
            const response = await axios.post('https://read-it-react.herokuapp.com/user/update', {
                newFirstname: values.newFirstname,
                newLastname: values.newLastname,
                newEmail: values.newEmail
            })
        console.log(response.data)
        props.onNotification(response.data.response)
        setLoading(false)
        setEdit(false)
        }catch(err){
            if(err){
                props.onError(err.response.data.error)                    
             }
        }
      }
   
    useEffect(() => {
        let isFetching = true
      
        const fetchBooksInLibrary = async () => {
            try{
                const response = await axios('https://read-it-react.herokuapp.com/getBooksInLibrary')
                console.log(response.data)
                if(isFetching){
                    setBooks(response.data)
                }
            }catch(err){
                if(err){
                    props.onError(err.response.data.error)
                 }
            }
           
        }
        const fetchReviewedBooks = async () => {
            try{
                const response = await axios('https://read-it-react.herokuapp.com/getUserReviewedBooks')
                console.log(response.data)
                if(isFetching){
                    setReviewedBooks(response.data)
                }
            }catch(err){
                if(err){
                    props.onError(err.response.data.error)
                 }
            }
           
        }
        if(props.isAuthorized){
            fetchBooksInLibrary()
            fetchReviewedBooks()
        }
       
        return () => isFetching = false
    },[props.isAuthorized])

  
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
                    onClick={deleteAccount}>{!loading? 'Delete': '..Loading'}</Button> 
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
        setLoading(true)
        try{
            const response =  await axios.delete('https://read-it-react.herokuapp.com/user/deleteAccount')
        console.log(response.data)
        props.onNotification(response.data.response)
        setLoading(false)
            history.push('/read_it/')
        }catch(err){
            if(err){
                props.onError(err.response.data.error)
                
             }
        }
       
    }


    const handleClick = async (id) => {
        console.log('remove from library', id)
        try{
            const response = await axios.post('https://read-it-react.herokuapp.com/removeBookFromLibrary', {likedBookID: id})
            console.log(response.data)
            console.log(booksInLibrary)
            const newBooksInLibrary = booksInLibrary.filter(book=> book.book_id !== id)
            setBooks(newBooksInLibrary)
        }catch(err){
            if(err){
                props.onError(err.response.data.error)
            }
        }       
    }

    const handleDeleteReview = async (id) => {
        try{
        const response =  await axios.post('https://read-it-react.herokuapp.com/deleteReview', {id})
        console.log(response.data)
        props.onNotification(response.data.response)
        const newReviewedBooks = reviewedBooks.filter(review => review.id !== id)
        setReviewedBooks(newReviewedBooks)
            
        }catch(err){
            if(err){
                props.onError(err.response.data.error)                
             }
        }
    }
    if(!props.isAuthorized){
         return (<div className="notAuthorized">
            <h1>Log in to view your profile</h1>
            <Link to="/read_it/login"> Login</Link></div>)
    }
    return(
        <div className="profile">
       {/* {loading? <Loader /> : null} */}
        <div>            
            <h2>Your Library</h2>
            <div className="library">
            {booksInLibrary?
                booksInLibrary.map(book => {
                    return (<div className='book' key={book.id} >
                            <BsHeartFill className="heartIcon" onClick={()=>handleClick(book.book_id)}/>
                            <img src={book.img} alt="Book cover"/>
                            <h3>{book.title}</h3>
                            <h4>{book.author}</h4>
                            <Link to={"/read_it/reviewbook/"+book.book_id}>Review Book</Link>
                        </div>)
                })
                :<div>
                    <h2>There appears to be nothing in your library</h2>
                    <Link to="/">Browse Books</Link>
                </div>}
            </div>
        </div>
        <div className="userReviews">
                <h2>Your Reviews</h2>
                {reviewedBooks?
                reviewedBooks.map(review => {
                    return <Review {...review} onDelete={handleDeleteReview}/>
                })
                :null}
                
        </div>
        
        <button className={edit? 'shown editBtn': 'editBtn'} onClick={() => edit? setEdit(false): setEdit(true)}>Edit your information</button>
        <form className={edit? 'showForm editForm' :'editForm'}>
            <h3>Update your information</h3>
             <FormControl margin="normal" fullWidth>
                <InputLabel htmlFor="newFirstname">Firstname</InputLabel>
                <Input name="newFirstname" type="text" id="newFirstname"  onChange={handleChange}/>
                {errors.newFirstname && (
                    <p className="help is-danger">{errors.newFirstname}</p>
                  )}
          </FormControl> 
           <FormControl margin="normal" fullWidth>
                <InputLabel htmlFor="newLastname">Lastname</InputLabel>
                <Input name="newLastname" type="text" id="newLastname"  onChange={handleChange}/>
                {errors.newLastname && (
                    <p className="help is-danger">{errors.newLastname}</p>
                  )}
          </FormControl> 
            <FormControl margin="normal" fullWidth>
               <InputLabel htmlFor="newEmail">Email</InputLabel>
                <Input name="newEmail" type="text" id="newEmail"  onChange={handleChange}/>
                {errors.newEmail && (
                    <p className="help is-danger">{errors.newEmail}</p>
                  )}
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
            onClick={handleSubmit}>{!loading? 'Submit Changes': '...Loading'}</Button> 
         </form>
         <div className="dltBtn btn" onClick={() => setDeleteModel(true)}><BsFillTrashFill />Delete Account</div>
         {deleteModel? showDeleteModel(): null}
        </div>
    )

}
export default isAuthorized(Profile)