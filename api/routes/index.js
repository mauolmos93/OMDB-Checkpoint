const express = require("express")
const router = express.Router()
const userRoutes = require("./users")
const loginRoutes = require("./login")
const registerRoutes = require("./register")

// Acá ya estoy parado en '/api'
router.use('/users', userRoutes)
router.use('/login', loginRoutes)
router.use('/register', registerRoutes)

module.exports = router