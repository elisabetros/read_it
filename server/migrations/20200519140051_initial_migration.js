
exports.up = function(knex) {
  return knex.schema
  .createTable('user', (table) => {
    table.increments('id').primary()
    table.string('email').notNullable()
    table.string('first_name')
    table.string('last_name')
    table.string('password').notNullable()    
    table.string('token')
    table.timestamp('created_at').defaultTo(knex.fn.now())
})
.createTable('likedBook', (table) => {
    table.increments('id').primary()
    table.string('title').notNullable()
    table.string('author').notNullable()
    table.integer('user_id').notNullable().unsigned()
    table.foreign('user_id').references('user.id')
})  
.createTable('bookReview', (table) => {
    table.increments('id').primary()
    table.string('title').notNullable()
    table.string('book_title').notNullable()
    table.text('review').notNullable()
    table.string('rating').notNullable()
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
