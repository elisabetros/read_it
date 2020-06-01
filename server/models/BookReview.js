 const { Model } = require('objection');

class BookReview extends Model {
    static get tableName(){
        return "bookReview";
    }
   static get idColumn(){
       return 'id';
   }
static get relationMappings() {
    return {
        user: {
            relation: Model.HasOneRelation,
            modelClass: `${__dirname}/User.js`,
            join: {
                from: 'bookReview.user_id',
                to: 'user.id',
            },
        }
    };
}
}
module.exports = BookReview;