const express = require('express');
const { createTestPerfomance, getAllTestPerfomances, getTestPerfomanceById, updateTestPerfomanceById, deleteTestPerfomanceById, getOverallPerformanceForStudent, getStudentTestPerformance } = require('../Controlers/testPerfomanceController');
const router = express.Router();

// Define routes
router.post('/', createTestPerfomance);
router.get('/', getAllTestPerfomances);
router.get('/:id', getTestPerfomanceById);
router.put('/:id', updateTestPerfomanceById);
router.delete('/:id', deleteTestPerfomanceById);
router.get('/student/:studentId', getOverallPerformanceForStudent);
// Route to get student answers and calculate performance for a specific test
router.get('/student/:studentId/test/:testId', getStudentTestPerformance);

module.exports = router;
