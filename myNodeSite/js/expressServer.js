const express = require('express');
const path = require('path');

const app = express();
const port = 1337;

// adjust rootDir to go up one level since server.js is inside js
const rootDir = path.join(__dirname, '..');
const publicDir = path.join(rootDir, 'public');

// serve static files
app.use(express.static(publicDir));
app.use('/css', express.static(path.join(rootDir, 'css')));
app.use('/images', express.static(path.join(rootDir, 'images')));
app.use('/js', express.static(path.join(rootDir, 'js')));

// Define routes
app.get(['/', '/index'], (req, res) => {
    res.sendFile(path.join(publicDir, 'index.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(publicDir, 'about.html'));
});

app.get('/added', (req, res) => {
    res.sendFile(path.join(publicDir, 'added.html'));
});

app.get('/faq.html', (req, res) => {
    res.sendFile(path.join(publicDir, 'faq.html'));
});

app.get('/faq.json', (req, res) => {
    res.sendFile(path.join(publicDir, 'faq.json'));
});

app.get('/sustainability.xml', (req, res) => {
    res.sendFile(path.join(publicDir, 'sustainability.xml'));
});

app.get('/reviews', (req, res) => {
    res.sendFile(path.join(publicDir, 'reviews.html'));
});

// Wildcard route for 404 page
app.use((req, res) => {
    res.status(404).sendFile(path.join(publicDir, '404.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
