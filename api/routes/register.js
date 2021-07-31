const express = require("express")
const { postRegisterUser } = require("../controllers")
const router = express.Router()

//------------------------ POST ------------------------//
router.post('/', postRegisterUser)

module.exports = router