const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname)));

// Handle contact form submissions
app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;
    
    // Here you would typically:
    // 1. Validate the input
    // 2. Store in a database
    // 3. Send confirmation emails
    // For now, we'll just log it and send a success response
    
    console.log('Contact form submission:', {
        name,
        email,
        message,
        timestamp: new Date().toISOString()
    });
    
    res.json({
        success: true,
        message: 'Thank you for your message! We will get back to you soon.'
    });
});

// Create images directory
const fs = require('fs');
const imagesDir = path.join(__dirname, 'images');

if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir);
    console.log('Created images directory');
}

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    console.log('\nTo start using the website:');
    console.log('1. Install dependencies: npm install');
    console.log('2. Add images to the "images" folder:');
    console.log('   - hero.jpg');
    console.log('   - consultation.jpg');
    console.log('   - pharmacy.jpg');
    console.log('   - records.jpg');
    console.log('   - about.jpg');
    console.log('3. Start the server: node server.js');
    console.log('4. Open http://localhost:3000 in your browser');
});
