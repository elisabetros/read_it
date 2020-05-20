const { Model } = require('objection');

class LikedBook extends Model {
    static get tableName(){
        return "likedBook";
    }
   static get idColumn(){
       return 'id';
   }
}

module.exports = LikedBook;