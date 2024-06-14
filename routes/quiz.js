const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Questions = require('../models/Questions');
const Answer = require('../models/Answer');

// Create a new question with answers
router.post('/', async (req, res) => {
  const { text, answers, formId, courseId } = req.body;

  if (!mongoose.Types.ObjectId.isValid(formId) || !mongoose.Types.ObjectId.isValid(courseId)) {
    return res.status(400).send({ message: 'Invalid formId or courseId' });
  }

  try {
    const question = new Questions({ text, formId, courseId });
    await question.save();

    const answerDocuments = answers.map(answer => ({
      ...answer,
      questionId: question._id
    }));
    await Answer.insertMany(answerDocuments);

    res.status(201).send({ message: 'Question created successfully!' });
  } catch (error) {
    console.error('Error creating question:', error);
    res.status(500).send({ message: 'Error creating question', error: error.message });
  }
});

// Route to get all questions with their answers
router.get('/', async (req, res) => {
  try {
    const questions = await Questions.find().populate('answers').exec();
    res.status(200).json(questions);
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({ error: 'Failed to fetch questions' });
  }
});

// Route to get a specific question with its answers
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid question ID' });
  }

  try {
    const question = await Questions.findById(id).populate('answers').exec();

    if (!question) {
      return res.status(404).json({ error: 'Question not found' });
    }

    res.status(200).json(question);
  } catch (error) {
    console.error('Error fetching question:', error);
    res.status(500).json({ error: 'Failed to fetch question' });
  }
});

// Route to delete a question and its answers
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid question ID' });
  }

  try {
    const question = await Questions.findById(id);

    if (!question) {
      return res.status(404).json({ error: 'Question not found' });
    }

    await Answer.deleteMany({ questionId: id });
    await Questions.deleteOne({ _id: id });

    res.status(204).send();
  } catch (error) {
    console.error('Error deleting question:', error);
    res.status(500).json({ error: 'Failed to delete question' });
  }
});

// Route to update a question and its answers
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { text, answers } = req.body;

  if (!text || !answers) {
    return res.status(400).json({ error: 'Text and answers are required fields' });
  }

  if (answers.length !== 4) {
    return res.status(400).json({ error: 'Each question must have exactly 4 answers' });
  }

  const correctAnswers = answers.filter(answer => answer.isCorrect);
  if (correctAnswers.length !== 1) {
    return res.status(400).json({ error: 'Each question must have exactly one correct answer' });
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid question ID' });
  }

  try {
    const question = await Questions.findById(id);

    if (!question) {
      return res.status(404).json({ error: 'Question not found' });
    }

    question.text = text;
    await question.save();

    await Answer.deleteMany({ questionId: id });

    const answerDocuments = answers.map(answer => ({
      ...answer,
      questionId: question._id
    }));
    await Answer.insertMany(answerDocuments);

    res.status(200).json(question);
  } catch (error) {
    console.error('Error updating question:', error);
    res.status(500).json({ error: 'Failed to update question' });
  }
});

module.exports = router;
