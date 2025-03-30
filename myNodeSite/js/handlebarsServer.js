const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');

const app = express();
const port = 1337;

// adjust rootDir to go up one level since server.js is inside js
const rootDir = path.join(__dirname, '..');
const publicDir = path.join(rootDir, 'public');

// set up Handlebars
app.engine('hbs', exphbs.engine({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: path.join(rootDir, 'views/layouts'),
    partialsDir: path.join(rootDir, 'views/partials')
}));
app.set('view engine', 'hbs');
app.set('views', path.join(rootDir, 'views'));

// serve static files
app.use(express.static(publicDir));
app.use('/css', express.static(path.join(rootDir, 'css')));
app.use('/images', express.static(path.join(rootDir, 'images')));
app.use('/js', express.static(path.join(rootDir, 'js')));

// define routes
app.get(['/', '/index'], (req, res) => {
    res.render('index');
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/added', (req, res) => {
    res.render('added');
});

app.get('/faq', (req, res) => {
    res.render('faq');
});

app.get('/faq.json', (req, res) => {
    res.sendFile(path.join(publicDir, 'faq.json'));
});

app.get('/sustainability.xml', (req, res) => {
    res.sendFile(path.join(publicDir, 'sustainability.xml'));
});

app.get('/reviews', (req, res) => {
    res.render('reviews');
});

// Wildcard route for 404 page
app.use((req, res) => {
    res.status(404).render('404');
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
