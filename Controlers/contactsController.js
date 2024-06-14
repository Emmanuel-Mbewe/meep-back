const Contacts = require('../models/contactsModel');

// Create a new contact
const createContact = async (req, res) => {
    try {
        const newContact = await Contacts.create(req.body);
        res.status(201).json(newContact);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all contacts
const getAllContacts = async (req, res) => {
    try {
        const contacts = await Contacts.find().populate('tutor');
        res.status(200).json(contacts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get contacts by tutor ID
const getContactsByTutorId = async (req, res) => {
    try {
        const contacts = await Contacts.find({ tutor: req.params.tutorId }).populate('tutor');
        if (!contacts) {
            return res.status(404).json({ message: 'Contacts not found' });
        }
        res.status(200).json(contacts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update contact by ID
const updateContactById = async (req, res) => {
    try {
        const updatedContact = await Contacts.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedContact) {
            return res.status(404).json({ message: 'Contact not found' });
        }
        res.status(200).json(updatedContact);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete contact by ID
const deleteContactById = async (req, res) => {
    try {
        const deletedContact = await Contacts.findByIdAndDelete(req.params.id);
        if (!deletedContact) {
            return res.status(404).json({ message: 'Contact not found' });
        }
        res.status(200).json(deletedContact);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createContact,
    getAllContacts,
    getContactsByTutorId,
    updateContactById,
    deleteContactById,
};
