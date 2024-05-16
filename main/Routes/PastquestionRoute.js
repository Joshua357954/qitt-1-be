const express = require('express');
const router = express.Router();

const { startQuiz, submitQuizAnswers} = require('../Controllers/PastquestionController.js')

router.get('/startQuiz/:subject/:numberOfQuestions', startQuiz)
router.post('/submitQuizAnswers', submitQuizAnswers)

module.exports = router