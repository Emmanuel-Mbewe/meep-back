const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const config = require('../config/config.json')[process.env.NODE_ENV || 'development'];
const db = {};

// Connect to MongoDB using Mongoose
mongoose.connect(config.database, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to ' + config.database);
});

mongoose.connection.on('error', (err) => {
  console.log('Mongoose connection error: ' + err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

// Read all model files and initialize them
fs.readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file.slice(-3) === '.js'
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file));
    db[model.modelName] = model;
  });

module.exports = db;
