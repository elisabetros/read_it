import React, { useState, useEffect } from "react"
import axios from 'axios'
import isAuthorized from '../auth/isAuthorized'
import Error from '../components/Error'
import { Link } from "react-router-dom"
import { AiFillHeart } from "react-icons/ai";
import profileCSS from '../css/profile.css'

const Profile = (props) => {
    const [ error, setError ] = useState()
    const [ booksInLibrary, setBooks ] = useState()

    console.log(props)

    useEffect(() => {
        let isFetching = true
        if(!props.isAuthorized){
            setError('Log in to view your profile')     
        }else{
            setError('')
        }
        const fetchBooksInLibrary = async () => {
            const response = await axios('http://localhost/getBooksInLibrary')
            console.log(response.data)
            if(isFetching){
                setBooks(response.data)
            }
        }
   

    // TODO?: add rotue to review book
    // TODO: add route to update book review
    // TODO: add option to update profile
    // TODO add option to delete profile

        fetchBooksInLibrary()
        return () => isFetching = false
    },[props.isAuthorized])

    const handleClick = async (id) => {
        console.log('remove from library', id)
        const response = await axios.post('http://localhost/removeBookFromLibrary', {likedBookID: id})
        console.log(response.data)
        if(response.data.error){
            setError(response.data.error)
            setTimeout(() => {
                setError('')
            }, 4000)
        }else{
            console.log('TODO: fetch again')
        }
    }
    if(error){
        return (<div><Error message={error}/><Link to="/login"> Login</Link></div>)
    }
    return(
        <div className="profile">
        <h1>Profile</h1>
        <div>
            <h2>Your Library</h2>
            <div className="library">
            {booksInLibrary?
                booksInLibrary.map(book => {
                    return (<div className='book' key={book.id} >
                            <AiFillHeart className="heartIcon" onClick={()=>handleClick(book.id)}/>
                            <img src={book.img}/>
                            <h3>{book.title}</h3>
                            <h4>{book.author}</h4>
                            <Link to={"/reviewbook/"+book.book_id}>Review Book</Link>
                        </div>)
                })
                :null}
            </div>
        </div>
        </div>
    )

}
export default isAuthorized(Profile)