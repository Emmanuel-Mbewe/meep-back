const express = require("express");
const app = express();
// require('../databases/db.js')
const mongoose = require('mongoose');
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");

const swaggerUI = require('swagger-ui-express');
const swaggerSpec = require("./swagger");

// Serve Swagger documentation
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec))

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const classRoutes = require("./routes/classRoutes");
const subjectRoutes = require("./routes/subjectRoutes");
const topicRoutes = require("./routes/topicRoutes");
const subtopicRoutes = require("./routes/subtopicRoutes");
const notesRoutes = require("./routes/notesRoutes");
const videoRoutes = require("./routes/videoRoutes");
const quizRoutes = require("./routes/quizRoutes");
const contentCreatorRoutes = require("./routes/contentCreatorRoutes");
const literacyRoutes = require("./routes/literacyRoutes");
const studentQuizRoutes = require("./routes/studentQuizRoutes");
const studentRoutes = require("./routes/studentRoutes");
const studentResponseRoutes = require("./routes/studentResponseRoutes");
const subtopicIntroNotesRoutes = require("./routes/subtopicIntroNotesRoutes");
const testPerformanceRoutes = require("./routes/testPerfomanceRoutes");
const testQuestionGradeRoutes = require("./routes/testQuestionGradeRoutes");
const testQuestionRoutes = require("./routes/testQuestionSchemaRoutes");
const testRoutes = require("./routes/testRoutes");

const tutorContactRoutes = require("./routes/contactsRoutes");
const customerFeedbackRoutes = require("./routes/customerFeedbackRoutes");
const tutorRoutes = require("./routes/tutorRoutes");
const tutorSubjectsRoutes = require("./routes/tutorSubjectsRoutes");

const notesCommentsRoutes = require("./routes/notesCommentRoutes");
const videoCommentRoutes = require("./routes/videoCommentRoutes");
const progressRoutes = require("./routes/progressRoutes");

//new imports
const ussdRoute = require("./routes/ussd");
const quizRouter = require('./routes/quiz');
const coursesRouter = require('./routes/courses');
const smsRouter = require('./routes/message');
const contentRouter = require('./routes/content');
const studentsRouter = require('./routes/students');
const pdfRoutes = require('./routes/documents');

const user = require('./routes/user');

dotenv.config();

const corsOption = {
  origin: true
}

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOption));

// progress routes
app.use("/api/v1/progress", progressRoutes);

// notes comment routes
app.use("/api/v1/notes/comment", notesCommentsRoutes);

// video comment routes
app.use("/api/v1/video/comment", videoCommentRoutes);

// tutor routes
app.use("/api/v1/tutor", tutorRoutes);

// tutor subject routes
app.use("/api/v1/tu/subjects", tutorSubjectsRoutes);

// tutor feedback routes
app.use("/api/v1/tut/feedback", customerFeedbackRoutes);

// tutor contacts routes
app.use("/api/v1/tuto/contacts", tutorContactRoutes);

// content creator routes
app.use("/api/v1/creator", contentCreatorRoutes);


// test routes
app.use("/api/v1/test", testRoutes);


// content creator routes
app.use("/api/v1/test_questions", testQuestionRoutes);

// routes for literacy content
app.use("/api/v1/literacy", literacyRoutes);

// student quiz routes
app.use("/api/v1/student_quiz", studentQuizRoutes);

// student entity routes
app.use("/api/v1/student", studentRoutes);

// student test responses routes
app.use("/api/v1/student_test_response", studentResponseRoutes);

// test question mark or grade routes
app.use("/api/v1/test_question_mark", testQuestionGradeRoutes);

// routes to get student overall score on a test
app.use("/api/v1/test_score", testPerformanceRoutes);

// auth
app.use("/api/v1/auth", authRoutes);

//auth route
app.use("/api/v1/auth", authRoutes);

//user route
app.use("/api/v1/user", userRoutes);

// class route
app.use("/api/v1/class", classRoutes);

// subject route
app.use("/api/v1/subject", subjectRoutes);

// topic route
app.use("/api/v1/topic", topicRoutes);

// sub-topic
app.use("/api/v1/subtopics", subtopicRoutes);

// create notes route
app.use("/api/v1/notes", notesRoutes);

// create subtopic into  notes route
app.use("/api/v1/subtopic_into_notes", subtopicIntroNotesRoutes);

// video routes
app.use("/api/v1/videos", videoRoutes);

// Quiz Routes
app.use("/api/v1/quizzes", quizRoutes);


//new routese
app.use("/", ussdRoute);
app.use("/api/quiz", quizRouter);
app.use("/api/courses", coursesRouter);
app.use("/api/message", smsRouter);
app.use("/api/content", contentRouter);
app.use("/api/subjects", contentRouter);
app.use("/api/students", studentsRouter);
app.use("/api/phone-numbers", studentsRouter);
app.use('/api/documents', pdfRoutes);
app.use('/api/login', user);



app.get("/", (req, res) => {
  res.send("App is now working");
});

// database connection
mongoose.set("strictQuery", false);

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('MongoDB connection is successful');
  } catch (error) {
    console.error('Connection error:', error);
  }
};

const port = 8000;

app.listen(port, () => {
  dbConnection()
  console.log("server started listening on port " + port);
});