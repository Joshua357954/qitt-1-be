
const express = require('express')
const router = express.Router()
const { registerUser, enrollUser } = require('../Controllers/AuthControllers')
// const { register, verifyUser,login } = require("../Controllers/AuthController.js")

router.post('/register', registerUser )

router.post('/enrollUser/:uid', enrollUser)

// router.post('/login', login )

// router.post('/verify/:userId', verifyUser )

module.exports = router