const router = require('express').Router();

const BookReview = require('../models/BookReview')
const LikedBook = require('../models/LikedBook')

router.post('/addBookToLibrary', async (req, res) => {
    const { bookID, title, author  } = req.body
    console.log(bookID, title, author)
    if(!req.session.isLoggedIn){
        return res.status(500).send({error: 'You need to be logged in to add a book to your library'})
    }
    if(!bookID || !title || !author ){
        return res.status(500).send({error: 'Missing fields'})
    }
    const alreadyAddedBook = await LikedBook.query().select().where({'user_id': req.session.user.id}).andWhere({'id': bookID})
    if(alreadyAddedBook[0]){
        return res.status(500).send({error: 'Book already in library'})
    }
    await LikedBook.query().insert({
        id : bookID,
        title,
        author,
        user_id: req.session.user.id
    })
    return res.status(200).send({response: 'Book added to library'})
})


module.exports = router;