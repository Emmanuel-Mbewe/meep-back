const express = require('express');
const { createTutor, getAllTutors, getTutorById, updateTutorById, deleteTutorById } = require('../Controlers/tutorController');
const router = express.Router();

router.post('/', createTutor);
router.get('/', getAllTutors);
router.get('/:id', getTutorById);
router.put('/:id', updateTutorById);
router.delete('/:id', deleteTutorById);

module.exports = router;
