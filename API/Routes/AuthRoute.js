const express = require('express')
const router = express.Router()
const { register, verifyUser,login } = require("../Controllers/AuthController.js")

router.post('/register', register )

router.post('/login', login )

router.post('/verify/:userId', verifyUser )

module.exports = router