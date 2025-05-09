const express = require('express')

const {loginUser, signupUser} = require('../controller/userController')

const router = express.Router()

router.post('/login', loginUser)  // login route
router.post('/signup', signupUser) // signup route

module.exports = router