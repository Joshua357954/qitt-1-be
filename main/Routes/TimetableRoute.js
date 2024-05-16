const express = require('express');
const router = express.Router();
const { getAllTimetables, getTimetableByDay } =  require('../Controllers/TimetableController.js')


router.get('/all/:departmentId/:yearId', getAllTimetables)

router.get('/:departmentId/:yearId/:day', getTimetableByDay)

module.exports = router;

