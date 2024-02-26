

//Quiz Data
const quizData = require('../Utils/GES103PastQuestion.json'); 

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

  // Shuffle quiz questions
  const shuffledQuizData = shuffleArray(quizData.questions);

  // Take only the specified number of questions
  const selectedQuestions = shuffledQuizData.slice(0, numberOfQuestions);

  res.json({
    questions: selectedQuestions,
  });

};

// Controller to submit answers
function submitQuizAnswers (req, res)  {
    const { totalQuestions, answers:userAnswers } = req.body;
    //   { id:1,answer: 'ball' }
    //   const correctAnswers = quizData.questions.map(question => question.correct_answer)



  // Compare user answers with correct answers
  const results = Object.keys(userAnswers).map((qid,index) => {
    const question = quizData.questions.find(data => data.id == qid)

    console.log(question)
    return {
            question: index + 1,
            userAnswers: userAnswers[qid],
            correctAnswer: question.correct_answer, 
            isCorrect: userAnswers[qid] == question.correct_answer
        }
  })


//   const results = userAnswers.map((answer, index) => ({
//     question: index + 1,  
//     userAnswer: answer,
//     correctAnswer: correctAnswers[index],
//     isCorrect: answer === correctAnswers[index],
//   }));

  // Calculate score
  const score = results.reduce((total, result) => total + (result.isCorrect ? 1 : 0), 0);
 
  console.log({results, score, answeredQuestions: Object.keys(userAnswers).length, totalQuestions })
  res.json({results, score, answeredQuestions: Object.keys(userAnswers).length, totalQuestions })

};

module.exports = {
    startQuiz,
    submitQuizAnswers
}
