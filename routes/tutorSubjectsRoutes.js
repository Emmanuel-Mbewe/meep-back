const express = require('express');
const router = express.Router();
const { createTutorSubject, getAllTutorSubjects, getTutorSubjectsByTutorId, updateTutorSubjectById, deleteTutorSubjectById } = require('../Controlers/tutorSubjectsController');

router.post('/',createTutorSubject);
router.get('/',getAllTutorSubjects);
router.get('/tutor/:tutorId',getTutorSubjectsByTutorId);  // Get subjects by tutor ID
router.get('/:id',getTutorSubjectsByTutorId);
router.put('/:id',updateTutorSubjectById);
router.delete('/:id',deleteTutorSubjectById);

module.exports = router;
