
exports.up = function(knex) {
  return knex.schema
  .createTable('user', (table) => {
    table.increments('id').primary()
    table.string('email').notNullable()
    table.string('first_name')
    table.string('last_name')
    table.string('password').notNullable()    
    table.string('token')
    table.string('token_exp_date')
    table.timestamp('created_at').defaultTo(knex.fn.now())
})
.createTable('likedBook', (table) => {
    table.increments('id').primary()
    table.string('book_id').notNullable()
    table.string('title').notNullable()
    table.string('author')
    table.string('img').notNullable()
    table.integer('user_id').notNullable().unsigned()
    table.foreign('user_id').references('user.id')
})  
.createTable('bookReview', (table) => {
    table.increments('id').primary()
    table.string('book_id').notNullable()
    table.string('title').notNullable()
    table.string('book_title').notNullable()
    table.string('author').notNullable()
    table.string('img').notNullable()
    table.text('review').notNullable()
    table.integer('rating').notNullable()
    table.integer('user_id').notNullable().unsigned()
    table.foreign('user_id').references('user.id')
})
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('likedBook')
    .dropTableIfExists('bookReview')
    .dropTableIfExists('user')
};
