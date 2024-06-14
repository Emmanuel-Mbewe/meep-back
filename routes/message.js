const express = require('express');
const Message = require('../models/Message');
const router = express.Router();

// Define routes
router.use(express.json());

// Save message
router.post('/', async (req, res) => {
  try {
    const { text, numbers, from } = req.body;
    const message = new Message({ text, numbers, from, sentAt: new Date() });
    await message.save();
    res.status(201).json({ message: 'Message saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to save message' });
  }
});

// Retrieve messages
router.get('/', async (req, res) => {
  try {
    const messages = await Message.find().sort({ sentAt: -1 });
    res.json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve messages' });
  }
});

// Delete message by ID
router.delete('/:id', async (req, res) => {
  try {
    const messageId = req.params.id;
    const deletedMessage = await Message.findByIdAndDelete(messageId);
    if (!deletedMessage) {
      return res.status(404).json({ error: 'Message not found' });
    }
    res.json({ message: 'Message deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete message' });
  }
});

module.exports = router;
