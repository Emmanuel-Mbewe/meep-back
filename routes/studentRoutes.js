// routes/studentroutes.js
const express = require('express');
const { createStudent, getAllStudents, getStudentById, getStudentByUsername,deleteStudentById,  updateStudentById} = require('../Controlers/studentController');

const router = express.Router();

router.post('/', createStudent);
router.get('/', getAllStudents);
router.get('/:id', getStudentById);
router.get('/username/:username', getStudentByUsername);
router.put('/:id', updateStudentById);
router.delete('/:id', deleteStudentById);

module.exports = router;
