const S = require("sequelize");
const db = require("../db");

class Movies extends S.Model {}

Movies.init({
  userId: {
    type: S.INTEGER,
  },
  imdbID: {
    type: S.STRING,
    allowNull: false,
  },
  Title: {
    type: S.STRING,
    allowNull: false,
  },
  Year: {
    type: S.STRING,
    allowNull: false,
  },
  Rated: {
    type: S.STRING,
    allowNull: false,
  },
  Runtime: {
    type: S.STRING,
    allowNull: false,
  },
  Director: {
    type: S.STRING,
    allowNull: false,
  },
  Actors: {
    type: S.STRING,
    allowNull: false,
  },
  Plot: {
    type: S.TEXT,
    allowNull: false,
  },
  Poster: {
    type: S.STRING,
    allowNull: false,
  },
}, {sequelize: db, modelName: "movies", timestamps: false})

module.exports = Movies