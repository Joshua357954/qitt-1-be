
const express = require('express')
const router = express.Router()

const { getAssignmentsByYear } = require('../Controllers/AssignmentController.js')


// Assignments by year route
router.get('/:department/:year', getAssignmentsByYear);




module.exports = router









