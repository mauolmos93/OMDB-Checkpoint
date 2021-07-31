const express = require("express")
const { getUsers, getSelfFavoriteMovies, postFavoriteMovie, deleteFavoriteMovie, getFavoriteMovies, getSelf } = require("../controllers")
const checkLogIn = require("../middlewares/auth")
const router = express.Router()

//------------------------ GET ------------------------//
router.get('/', checkLogIn, getUsers)
router.get('/me', checkLogIn, getSelf)
router.get('/favorites', checkLogIn, getSelfFavoriteMovies)
router.get('/:userId/favorites', checkLogIn, getFavoriteMovies)

//------------------------ POST ------------------------//
router.post('/favorites', checkLogIn, postFavoriteMovie)

//------------------------ DELETE ------------------------//
router.delete('/favorites/:imdbID', checkLogIn, deleteFavoriteMovie)

module.exports = router