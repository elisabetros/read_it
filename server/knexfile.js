// Update with your config settings.
const credentials = require("./config/dbcredentials")
const knexSnakeCaseMapper = require('objection').snakeCaseMappers;


module.exports = {
  development: {
    client: 'mysql',
    connection: {
      database: credentials.database,
      user:     credentials.user,
      password: credentials.password
    }
  },
  ...knexSnakeCaseMapper()
};
console.log(module.exports.development.connection.database)