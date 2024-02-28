const express = require('express');
const { getUsers } = require('../Controllers/UserController.js');

const router = express.Router();


router.get('/getUsers/:department', getUsers);


module.exports = router;

