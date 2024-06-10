// Importing required modules
const express = require('express');
const multer  = require('multer');
const path = require('path');

// Setting up multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
});

const upload = multer({ storage: storage });

// Initializing express app
const app = express();

// Setting up static folder
app.use(express.static(path.join(__dirname, 'public')));

// Setting up routes
app.post('/upload', upload.array('files'), (req, res) => {
  // Files have been uploaded successfully
  res.send('Files uploaded successfully!');
});

// Starting server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
