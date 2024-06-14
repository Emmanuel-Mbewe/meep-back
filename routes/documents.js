const express = require('express');
const router = express.Router();
const Document = require('../models/Document');
const { PDFDocument } = require('pdf-lib');
const multer = require('multer');
const storage = multer.memoryStorage();
const uploads = multer({ storage: storage });

// Route to fetch all documents
router.get('/', async (req, res) => {
  try {
    const documents = await Document.find(); // Use Mongoose's find method
    res.json(documents);
  } catch (err) {
    console.error('Error fetching documents:', err);
    res.status(500).json({ error: 'Failed to fetch documents' });
  }
});

// Route to download a specific PDF
router.get('/:id/download', async (req, res) => {
  try {
    const pdf = await Document.findById(req.params.id); // Use Mongoose's findById method
    if (!pdf) {
      return res.status(404).json({ error: 'PDF not found' });
    }
    // Set response headers
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=${pdf.fileName}`);

    // Send the PDF content
    res.send(pdf.content);
  } catch (err) {
    console.error('Error fetching PDF:', err);
    res.status(500).json({ error: 'Failed to fetch PDF' });
  }
});

// Route to upload a PDF
router.post('/upload', uploads.single('pdf'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    const { originalname, buffer } = req.file; // Get the original name and content buffer from the uploaded file
    const document = new Document({
      fileName: originalname,
      content: buffer // Assuming you have a 'content' attribute in your Document model
    });
    await document.save(); // Save the document to the database
    return res.status(201).json({ message: 'PDF uploaded successfully', document });
  } catch (error) {
    console.error('Error uploading PDF:', error);
    return res.status(500).json({ error: 'Failed to upload PDF' });
  }
});

// Route to fetch count of documents
router.get('/count', async (req, res) => {
  try {
    const documentCount = await Document.countDocuments(); // Use Mongoose's countDocuments method
    res.json({ count: documentCount });
  } catch (error) {
    console.error('Error fetching document count:', error);
    res.status(500).json({ error: 'Failed to fetch document count' });
  }
});

module.exports = router;
