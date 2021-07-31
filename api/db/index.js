const Sequelize = require("sequelize");

const client = new Sequelize("postgres://postgres:postgres@localhost/omdb", {
  logging: false,
  dialect: "postgres"
})

module.exports = client;