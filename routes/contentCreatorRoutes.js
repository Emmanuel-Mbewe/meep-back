// routes/notesRoutes.js
const express = require('express');
const { createContentCreator, getAllContentCreators, getContentCreatorById, 
    updateContentCreatorById, deleteContentCreatorById} = require('../Controlers/contentCreatorController');

const router = express.Router();

router.post('/', createContentCreator);
router.get('/', getAllContentCreators);
router.get('/:id', getContentCreatorById);
// router.get('/username/:username', getStudentByUsername);
router.put('/:id', updateContentCreatorById);
router.delete('/:id', deleteContentCreatorById);

module.exports = router;
