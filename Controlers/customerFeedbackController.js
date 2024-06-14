const CustomerFeedback = require('../models/customerFeedback');

// Create a new customer feedback
const createCustomerFeedback = async (req, res) => {
    try {
        const newCustomerFeedback = await CustomerFeedback.create(req.body);
        res.status(201).json(newCustomerFeedback);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all customer feedback
const getAllCustomerFeedback = async (req, res) => {
    try {
        const customerFeedback = await CustomerFeedback.find().populate('tutor');
        res.status(200).json(customerFeedback);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get customer feedback by tutor ID
const getCustomerFeedbackByTutorId = async (req, res) => {
    try {
        const customerFeedback = await CustomerFeedback.find({ tutor: req.params.tutorId }).populate('tutor');
        if (!customerFeedback) {
            return res.status(404).json({ message: 'Customer feedback not found' });
        }
        res.status(200).json(customerFeedback);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update customer feedback by ID
const updateCustomerFeedbackById = async (req, res) => {
    try {
        const updatedCustomerFeedback = await CustomerFeedback.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedCustomerFeedback) {
            return res.status(404).json({ message: 'Customer feedback not found' });
        }
        res.status(200).json(updatedCustomerFeedback);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete customer feedback by ID
const deleteCustomerFeedbackById = async (req, res) => {
    try {
        const deletedCustomerFeedback = await CustomerFeedback.findByIdAndDelete(req.params.id);
        if (!deletedCustomerFeedback) {
            return res.status(404).json({ message: 'Customer feedback not found' });
        }
        res.status(200).json(deletedCustomerFeedback);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createCustomerFeedback,
    getAllCustomerFeedback,
    getCustomerFeedbackByTutorId,
    updateCustomerFeedbackById,
    deleteCustomerFeedbackById,
};
