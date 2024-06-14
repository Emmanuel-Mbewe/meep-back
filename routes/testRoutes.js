const express = require('express');
const { createTest, getAllTests, getTestById, updateTestById, deleteTestById } = require('../Controlers/testController');
const router = express.Router();


// Define routes
router.post('/', createTest);
router.get('/', getAllTests);
router.get('/:id', getTestById);
router.put('/:id', updateTestById);
router.delete('/:id', deleteTestById);

module.exports = router;
