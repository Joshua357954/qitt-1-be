
const GES101 = require('../Utils/ges101.json')
const GES103 = require('../Utils/ges103.json')
const CSC280 = require('../Utils/csc280.json')
const CSC288 = require('../Utils/csc288.json')

//Quiz Data
const quizData = {
                  'ges101': GES101,
                  'ges103': GES103,
                  'csc280': CSC280,
                  'csc288': CSC288,
                } 

// Function to shuffle an array
function shuffleArray(array) {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

// Controller to start quiz questions

async function startQuiz (req, res)  {
  const { subject, numberOfQuestions } = req.params;
  console.log('Subject : ',subject)

  // Shuffle quiz questions
  const shuffledQuizData = shuffleArray(quizData[subject].questions);

  // Take only the specified number of questions
  const selectedQuestions = shuffledQuizData.slice(0, numberOfQuestions);

  res.json({
    questions: selectedQuestions,
  });

};

// Controller to submit answers
function submitQuizAnswers (req, res)  {
  const { subject, totalQuestions, answers:userAnswers } = req.body;

  // Compare user answers with correct answers
  const results = Object.keys(userAnswers).map((qid,index) => {
    const question = quizData[subject].questions.find(data => data.id == qid)

    console.log(question)
    return {
            question_no: index + 1,
            question:question.question,
            userAnswers: userAnswers[qid],
            correctAnswer: question.correct_answer, 
            isCorrect: userAnswers[qid] == question.correct_answer
        }
  })

  // Calculate score
  const score = results.reduce((total, result) => total + (result.isCorrect ? 1 : 0), 0);
 
  console.log({results, score, answeredQuestions: Object.keys(userAnswers).length, totalQuestions })
  res.json({results, score, answeredQuestions: Object.keys(userAnswers).length, totalQuestions })

};

module.exports = {
    startQuiz,
    submitQuizAnswers
}
