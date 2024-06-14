// routes/courses.js
const express = require('express');
const Course = require('../models/Course'); // Assuming you have defined a Mongoose model for Course
const router = express.Router();

// Get all courses
router.get('/', async (req, res) => {
  try {
    console.log('Fetching courses');
    const courses = await Course.find(); // Use Mongoose's find method
    console.log('courses fetched:', courses); // Log fetched courses
    res.json(courses);
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ error: 'Error fetching courses' });
  }
});

// Post a new course
router.post('/', async (req, res) => {
  const { name } = req.body;
  try {
    const course = new Course({ name }); // Create a new instance of the Course model
    await course.save(); // Save the new course to the database
    console.log('Course created:', course); // Log created course
    res.status(201).json(course);
  } catch (error) {
    console.error('Error creating course:', error);
    res.status(500).json({ error: 'Error creating course' });
  }
});

module.exports = router;
