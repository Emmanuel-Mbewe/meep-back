const express = require('express');
const { createCustomerFeedback, getAllCustomerFeedback, getCustomerFeedbackByTutorId, updateCustomerFeedbackById, deleteCustomerFeedbackById } = require('../Controlers/customerFeedbackController');
const router = express.Router();

router.post('/', createCustomerFeedback);
router.get('/', getAllCustomerFeedback);
router.get('/customer/:tutorId', getCustomerFeedbackByTutorId);  // Get feedback by tutor ID
router.get('/:id', getCustomerFeedbackByTutorId);
router.put('/:id', updateCustomerFeedbackById);
router.delete('/:id', deleteCustomerFeedbackById);

module.exports = router;
