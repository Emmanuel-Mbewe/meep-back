// routes/notesRoutes.js
const express = require('express');
const { createLiteracy, getAllLiteracies, getLiteracyById, 
    updateLiteracyById, deleteLiteracyById} = require('../Controlers/literacyController');

const router = express.Router();

router.post('/', createLiteracy);
router.get('/', getAllLiteracies);
router.get('/:id', getLiteracyById);
// router.get('/username/:username', getStudentByUsername);
router.put('/:id', updateLiteracyById);
router.delete('/:id', deleteLiteracyById);

module.exports = router;
