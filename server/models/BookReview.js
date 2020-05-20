 const { Model } = require('objection');

class BookReview extends Model {
    static get tableName(){
        return "bookReview";
    }
   static get idColumn(){
       return 'id';
   }
}

module.exports = BookReview;