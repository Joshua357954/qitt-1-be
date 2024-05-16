const express = require('express');
const { getUsers } = require('../Controllers/UserController.js');
const { getUser } = require('../Controllers/UserControllers.js');

const router = express.Router();


router.get('/getUsers/:department', getUsers);
router.get('/getUser/:uid', getUser)


module.exports = router;

