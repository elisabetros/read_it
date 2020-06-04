const router = require('express').Router();

const BookReview = require('../models/BookReview')
const LikedBook = require('../models/LikedBook')

router.post('/addBookToLibrary', async (req, res) => {
    const { bookID, title, author , img } = req.body
    console.log(bookID, title, author)
    if(!req.session.isLoggedIn){
        return res.status(500).send({error: 'You need to be logged in to add a book to your library'})
    }
    if(!bookID || !title || !author || !img ){
        return res.status(500).send({error: 'Missing fields'})
    }
    const alreadyAddedBook = await LikedBook.query().select().where({'user_id': req.session.user.id}).andWhere({'book_id': bookID})
    if(alreadyAddedBook[0]){
        return res.status(500).send({error: 'Book already in library'})
    }
    try{
        await LikedBook.query().insert({
            book_id : bookID,
            title,
            author,
            img, 
            user_id: req.session.user.id
        })
        return res.status(200).send({response: 'Book added to library'})
    }catch(err){
        if(err){ 
            console.log(err);
            return res.status(500).send({error: 'database error, could not add review'});
         }
    }  
})

router.post('/removeBookFromLibrary', async (req, res) => {
    if(!req.session.isLoggedIn){
        return res.status(500).send({error: 'You need to be logged in to remove a book from your library'})
    }
    const { likedBookID } = req.body
    console.log(likedBookID)
    if(!likedBookID){
        return res.status(500).send({error: 'no book ID'})
    }
    try{
        await LikedBook.query().delete().where({'id': likedBookID}).andWhere({'user_id': req.session.user.id})
        return res.status(200).send({response:'book removed from library'})
    }catch(err){
        if(err){
            console.log(err);
            return res.status(500).send({error: 'database error, could not add review'});
         }
        }
    })
    
router.post('/addReview', async (req, res) => {
    if(!req.session.isLoggedIn){
        return res.status(500).send({error: 'You need to be logged in to review a book'})
    }
    const { reviewText, reviewRating, reviewTitle, bookTitle, img, bookID } = req.body
    // console.log(req.body)
    if(!reviewText || !reviewRating || !reviewTitle || !bookTitle || !bookID){
        return res.status(500).send({error: 'missing fields'})
    }
    const alreadyReviewed = await BookReview.query().select().where({'book_id': bookID}).andWhere({'user_id': req.session.user.id})
    if(alreadyReviewed[0]){
        return res.send({error: 'Book already reviewed'})
    }
    try{
        const bookReview = await BookReview.query().insert({
            title: reviewTitle,
            book_title: bookTitle,
            book_id: bookID,
            rating: reviewRating,
            review: reviewText,
            img,
            user_id:req.session.user.id
        })
        return res.status(200).send(bookReview)
        
    }catch(err){
        if(err){
            console.log(err);
            return res.status(500).send({error: 'database error, could not add review'});
         }
    }
})

router.post('/deleteReview', async (req, res) => {
    const { id } = req.body
    if(!req.session.isLoggedIn){
        return res.status(500).send({error:'Log in to delete review'})
    }
    if(!id){
        return res.status(500).send({error: 'ID missing'})
    }
    try{    
        await BookReview.query().delete().where({id})
        return res.status(200).send({response: 'Review deleted'})
    }catch(err){ 
        if(err){
        console.log(err);
        return res.status(500).send({error: 'Database error, could not add review'});
     }
    }

})

router.post('/updateReview', async (req, res) => {
    if(!req.session.isLoggedIn){
        return res.status(500).send({error: 'You need to be logged in to update a review'})
    }
    // console.log(req.session.user)
    const { reviewID, newReviewTitle, newReviewText, newReviewRating } = req.body
    if(!reviewID || !newReviewTitle || !newReviewText || !newReviewRating){
        return res.status(500).send({error: 'missing fields'})
    }
    const bookReview = await BookReview.query().select().where({'user_id': req.session.user.id }).andWhere({'id':reviewID})
    console.log(bookReview)
    if(!bookReview[0]){
        return res.status(500).send({error: 'user did not review this book'})
    }
    try{
        await BookReview.query().findById(reviewID).patch({
            title: newReviewTitle,
            review: newReviewText,
            rating: newReviewRating
        })
        return res.status(200).send({reponse: 'review updated'})
    }catch(err){
        if(err){
            console.log(err);
            return res.status(500).send({error: 'database error, could not update review'});
         }
    }
})

router.get('/getUserReviewedBooks', async (req, res) => {
    if(!req.session.isLoggedIn){
        return res.status(500).send({error:'Please Login'})
    }
    try{
        const reviewedBooks = await BookReview.query().select().where({'user_id': req.session.user.id}).withGraphFetched('user')
        return res.status(200).send(reviewedBooks)
    }catch(err){
        if(err){
            console.log(err);
            return res.status(500).send({error: 'database error'});
        }
    }
})

router.get('/getBooksInLibrary', async (req, res) => {
    if(!req.session.isLoggedIn){
        return res.status(500).send({error: 'please login'})
    }
    try{
        const likedBooks = await LikedBook.query().select().where({'user_id': req.session.user.id})
        return res.status(200).send(likedBooks)
    }catch(err){
        if(err){
            console.log(err);
            return res.status(500).send({error: 'database error'});
         }
    }
})

router.get('/getSingleBookReviews/:id', async (req, res) => {
    const { id } = req.params
    try{
        const bookReviews = await BookReview.query().select().where({'book_id': id}).withGraphFetched('user')
        return res.status(200).send(bookReviews)
    }catch(err){
        if(err){
            console.log(err);
            return res.status(500).send({error: 'database error'});
         }
    }
})

router.get('/getReviews', async (req, res) => { 
    try{
        const bookReviews = await BookReview.query().select().withGraphFetched('user')
        return res.status(200).send(bookReviews)
    }catch(err){
        if(err){
            console.log(err);
            return res.status(500).send({error: 'database error'});
         }
    }
})
module.exports = router;