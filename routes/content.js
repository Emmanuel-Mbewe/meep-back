// server.js
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const Content = require('../models/Content');

const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

router.post('/', upload.fields([{ name: 'image' }, { name: 'video' }]), async (req, res) => {
  try {
    const { subject, topic, sub_topic, text } = req.body;
    const image = req.files['image'][0].path;
    const video = req.files['video'] ? req.files['video'][0].path : null;

    const newContent = new Content({ subject, topic, sub_topic, text, image, video });
    await newContent.save();

    res.status(201).json({ message: 'Content uploaded successfully!' });
  } catch (error) {
    console.error('Error uploading content:', error);
    res.status(500).json({ message: 'Failed to upload content' });
  }
});

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Route to fetch all content
router.get('/', async (req, res) => {
  try {
    const contents = await Content.find();
    res.json(contents);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching content' });
  }
});

// Route to add new content
router.post('/', upload.fields([{ name: 'image' }, { name: 'video' }]), async (req, res) => {
  try {
    const { subject, topic, sub_topic, text } = req.body;
    const imagePath = req.files['image'][0].path;
    const videoPath = req.files['video'] ? req.files['video'][0].path : null;

    const newContent = new Content({ subject, topic, sub_topic, text, imagePath, videoPath });
    await newContent.save();

    res.status(201).json({ message: 'Content uploaded successfully!' });
  } catch (error) {
    console.error('Error uploading content:', error);
    res.status(500).json({ message: 'Failed to upload content' });
  }
});

// Route to update content
router.put('/:id', upload.fields([{ name: 'image' }, { name: 'video' }]), async (req, res) => {
  try {
    const { id } = req.params;
    const { subject, topic, sub_topic, text } = req.body;
    const content = await Content.findById(id);

    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }

    content.subject = subject;
    content.topic = topic;
    content.sub_topic = sub_topic;
    content.text = text;

    if (req.files['image']) {
      content.imagePath = req.files['image'][0].path;
    }
    if (req.files['video']) {
      content.videoPath = req.files['video'][0].path;
    }

    await content.save();

    res.json({ message: 'Content updated successfully!' });
  } catch (error) {
    console.error('Error updating content:', error);
    res.status(500).json({ message: 'Failed to update content' });
  }
});

// Route to delete content
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Content.findByIdAndDelete(id);
    res.json({ message: 'Content deleted successfully!' });
  } catch (error) {
    console.error('Error deleting content:', error);
    res.status(500).json({ message: 'Failed to delete content' });
  }
});

// Route to get the count of videos
router.get('/videos/count', async (req, res) => {
  try {
    const videoCount = await Content.countDocuments({ videoPath: { $exists: true, $ne: null } });
    res.json({ count: videoCount });
  } catch (error) {
    console.error('Error fetching video count:', error);
    res.status(500).json({ message: 'Failed to fetch video count' });
  }
});

module.exports = router;

