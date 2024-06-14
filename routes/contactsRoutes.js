const express = require('express');
const { createContact, getAllContacts, getContactsByTutorId, updateContactById, deleteContactById } = require('../Controlers/contactsController');
const router = express.Router();

router.post('/', createContact);
router.get('/', getAllContacts);
router.get('/tutor/:tutorId', getContactsByTutorId);  // Get contacts by tutor ID
router.get('/:id', getContactsByTutorId);
router.put('/:id', updateContactById);
router.delete('/:id', deleteContactById);

module.exports = router;
