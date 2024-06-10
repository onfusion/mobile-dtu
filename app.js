const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Set up multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Check if 'uploads' directory exists, create it if not
        const uploadDir = path.join(__dirname, 'uploads');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        }
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

// Initialize multer
const upload = multer({ storage: storage });

// Serve static files from the public folder
app.use(express.static('public'));

// Route for file upload
app.post('/upload', upload.array('files'), (req, res) => {
    res.status(200).send('Files uploaded successfully');
});

// Serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
