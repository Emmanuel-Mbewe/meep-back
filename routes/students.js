const express = require('express');
const router = express.Router();
const Student = require('../models/Student'); // Ensure the correct path to your Student model

// Route to fetch phone numbers
router.get('/', async (req, res) => {
  try {
    const students = await Student.find({}, { phoneNumber: 1, _id: 0 }); // Fetch only the phone numbers
    const phoneNumbers = students.map(student => student.phoneNumber);
    res.json(phoneNumbers);
  } catch (error) {
    console.error('Error fetching phone numbers:', error);
    res.status(500).json({ error: 'An error occurred while fetching phone numbers' });
  }
});

// Route to get the count of student phone numbers
router.get('/count', async (req, res) => {
  try {
    const studentCount = await Student.countDocuments();
    res.json({ count: studentCount });
  } catch (error) {
    console.error('Error fetching student count:', error);
    res.status(500).json({ error: 'An error occurred while fetching student count' });
  }
});

module.exports = router;
