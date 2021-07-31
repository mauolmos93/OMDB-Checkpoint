const Users = require("./users")
const Movies = require("./movies")

Users.hasMany(Movies, {as: "favoriteMovies", foreignKey: "userId"})

module.exports = {Users, Movies}