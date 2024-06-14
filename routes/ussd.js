const express = require("express");
const cors = require('cors');
const session = require("express-session");
const bodyParser = require('body-parser');
const router = express.Router();

// Models
const Student = require('../models/Student'); // Ensure these use Mongoose schemas
const Questions = require('../models/Questions');
const Form = require('../models/classModel');
const Course = require('../models/subjectModel');
const StudentScore = require('../models/StudentScore');

router.use(express.json()); // For parsing application/json
router.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

// Middleware
router.use(bodyParser.json());
router.use(cors());

// Configure session middleware
router.use(
  session({
    secret: 'secret', // Change this to a secure random string
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 120000 } // Set maximum session age to 120 seconds (120,000 milliseconds)
  })
);

// USSD endpoint for handling quiz interaction
router.post("/", async (req, res) => {
  try {
    const { phoneNumber, text } = req.body;
    let response = "";

    // Find existing Student based on phone number
    let existingStudent = await Student.findOne({ phoneNumber });

    // Find or create a StudentScore record for the session
    let studentScore;
    if (existingStudent) {
      studentScore = await StudentScore.findOneAndUpdate(
        { studentId: existingStudent._id, isCompleted: false },
        { $setOnInsert: { score: 0 } },
        { upsert: true, new: true }
      );
    }

    // Logic for handling Student interaction based on input
    if (!existingStudent) {
      // Student registration flow
      if (!text) {
        response = `CON Welcome to the MEEP Quiz!\nPlease select an option:\n1. Register\n2. Exit`;
      } else if (text === "1") {
        response = `CON Enter your 4 digit PIN:`;
      } else if (text === "2") {
        response = `END Goodbye!`;
      } else {
        response = `END Invalid option. Please try again.`;
      }
    } else {
      const inputArray = text.split('*');

      if (!text) {
        // Student login flow
        response = `CON Please enter your 4 digit PIN to login:`;
      } else if (inputArray.length === 1 && inputArray[0] === existingStudent.password) {
        // Class selection flow
        try {
          const forms = await Form.find();
          if (forms.length === 0) {
            response = `END There are no classes for now.`;
          } else {
            const formOptions = forms.map((form, index) => `${index + 1}. ${form.name}`).join('\n');
            response = `CON Welcome back! Please select your class:\n${formOptions}\n${forms.length + 1}. Back`;
          }
        } catch (error) {
          console.error('Error fetching forms:', error);
          response = `END Error fetching class options. Please try again later.`;
        }
      } else if (inputArray.length === 2) {
        const [pin, formIndex] = inputArray;
        if (pin === existingStudent.password) {
          try {
            const forms = await Form.find();
            const form = forms[formIndex - 1];
            if (form) {
              const courses = await Course.find();
              if (courses.length === 0) {
                response = `END No subjects available, come next time.`;
              } else {
                const courseOptions = courses.map((course, index) => `${index + 1}. ${course.name}`).join('\n');
                response = `CON Please select a course:\n${courseOptions}\n${courses.length + 1}. Back`;
              }
            } else {
              response = `END Invalid class selection. Please try again.`;
            }
          } catch (error) {
            console.error('Error fetching courses:', error);
            response = `END Error fetching course options. Please try again later.`;
          }
        } else {
          response = `END Invalid PIN. Please try again.`;
        }
      } else if (inputArray.length === 3) {
        const [pin, formIndex, courseIndex] = inputArray;
        if (pin === existingStudent.password) {
          try {
            const forms = await Form.find();
            const form = forms[formIndex - 1];
            const courses = await Course.find();
            const course = courses[courseIndex - 1];

            if (form && course) {
              const questions = await Questions.find({
                formId: form._id,
                courseId: course._id
              }).populate('answers');

              if (questions.length > 0) {
                const currentQuestionIndex = 0; // Start with the first question
                const question = questions[currentQuestionIndex];
                const options = question.answers.map((answer, index) => `${index + 1}. ${answer.text}`).join('\n');
                response = `CON ${question.text}\n${options}`;
              } else {
                response = `END There are no questions for ${form.name} as of now.`;
              }
            } else {
              response = `END Invalid form or course. Please try again.`;
            }
          } catch (error) {
            console.error('Error fetching questions:', error);
            response = `END There was an error fetching the questions. Please try again later.`;
          }
        } else {
          response = `END Invalid PIN. Please try again.`;
        }
      } else if (inputArray.length >= 4) {
        const [pin, formIndex, courseIndex, ...answerIndex] = inputArray;
        if (pin === existingStudent.password) {
          try {
            const forms = await Form.find();
            const form = forms[formIndex - 1];
            const courses = await Course.find();
            const course = courses[courseIndex - 1];

            if (form && course) {
              const questions = await Questions.find({
                formId: form._id,
                courseId: course._id
              }).populate('answers');

              if (questions.length > 0) {
                const currentQuestionIndex = answerIndex.length - 1; // Current question index should match the length of answers
                if (currentQuestionIndex < questions.length) {
                  const question = questions[currentQuestionIndex];
                  const options = question.answers.map((answer, index) => `${index + 1}. ${answer.text}`).join('\n');
                  const studentAnswerIndex = parseInt(answerIndex[answerIndex.length - 1], 10) - 1; // Convert to 0-based index
                  const studentAnswer = question.answers[studentAnswerIndex];
                  const correctAnswer = question.answers.find(answer => answer.isCorrect);

                  console.log(`Student Answer: ${studentAnswer && studentAnswer.text}`);
                  console.log(`Correct Answer: ${correctAnswer && correctAnswer.text}`);
                  console.log(`Is Correct: ${studentAnswer && studentAnswer.isCorrect}`);

                  if (studentAnswer && studentAnswer.isCorrect) {
                    // Increment score only if the answer is correct
                    studentScore.score++; // Increment score for correct answer
                    await studentScore.save(); // Save the updated score to the database
                    console.log(`Score updated to: ${studentScore.score}`);
                  } else {
                    // Log incorrect answer for debugging purposes
                    console.log(`Incorrect answer for question: ${question.text}`);
                  }

                  // Move to next question
                  const nextQuestionIndex = currentQuestionIndex + 1;
                  if (nextQuestionIndex < questions.length) {
                    const nextQuestion = questions[nextQuestionIndex];
                    const nextOptions = nextQuestion.answers.map((answer, index) => `${index + 1}. ${answer.text}`).join('\n');
                    response = `CON ${nextQuestion.text}\n${nextOptions}`;
                  } else {
                    // End of quiz, display final score
                    response = `END Quiz completed! Thank you for taking this quiz, your score is ${studentScore.score}/${questions.length}. See you next time.`;
                    studentScore.isCompleted = true; // Mark the quiz as completed
                    await studentScore.save(); // Save the completion status
                  }
                } else {
                  // End of quiz, display final score
                  response = `END Quiz completed! Thank you for taking this quiz, your score is ${studentScore.score}/${questions.length}. See you next time.`;
                  studentScore.isCompleted = true; // Mark the quiz as completed
                  await studentScore.save(); // Save the completion status
                }
              } else {
                response = `END There are no questions for ${form.name} as of now.`;
              }
            } else {
              response = `END Invalid form or course. Please try again.`;
            }
          } catch (error) {
            console.error('Error fetching questions:', error);
            response = `END There was an error fetching the questions. Please try again later.`;
          }
        } else {
          response = `END Invalid PIN. Please try again.`;
        }
      }
    }

    // If Student is not existing and the text exists and not 1 and not 2
    if (!existingStudent && text && text !== "1" && text !== "2") {
      // Create a new Student
      const newStudent = new Student({ phoneNumber, password: text });
      await newStudent.save();
      // Create a new StudentScore for the new Student
      const newStudentScore = new StudentScore({ studentId: newStudent._id });
      await newStudentScore.save();
      response = `END You have successfully registered!`;
    }

    res.set("Content-Type", "text/plain");
    res.send(response);
  } catch (error) {
    console.error('Error processing USSD request:', error);
    res.status(500).send('END An error occurred. Please try again later.');
  }
});

module.exports = router;
