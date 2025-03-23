const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const port = 1337;
const rootDir = path.resolve(__dirname,'..');
function serveStaticFile(filePath, res) {
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end("Internal Server Error");
            console.error(`Error reading file: ${filePath}\n`, err);
            return;
        }

        // determine content type
        const ext = path.extname(filePath).toLowerCase();
        let contentType = 'text/plain';

        if (ext === '.html') {
            contentType = 'text/html';
        } else if (ext === '.css') {
            contentType = 'text/css';
        } else if (ext === '.js') {
            contentType = 'application/javascript';
        } else if (['.png', '.jpg', '.jpeg', '.gif', '.svg'].includes(ext)) {
            contentType = `image/${ext.substring(1)}`;
        }else if (ext === '.json') {
            contentType = 'application/json';
        } else if (ext === '.xml') {
            contentType = 'application/xml';
        }

        res.writeHead(200, { 'Content-Type': contentType });
        res.end(data);
    });
}

const server = http.createServer((req, res) => {
    let urlPath = req.url.split('?')[0].replace(/\/$/, '').toLowerCase();

    let filePath = '';
    //serve all files
    if (urlPath === '' || urlPath.startsWith('/index')) {
        filePath = 'public/index.html';
    } else if (urlPath.startsWith('/404')) {
        filePath = 'public/404.html';
    } else if (urlPath.startsWith('/about')) {
        filePath = 'public/about.html';
    }else if (urlPath.startsWith('/added')) {
        filePath = 'public/added.html';
    }else if (urlPath.startsWith('/faq.html')) {
        filePath = 'public/faq.html';
    }else if(urlPath.startsWith('/faq.json')){
        filePath = 'public/faq.json';
    }else if(urlPath.startsWith('/sustainability.xml')){
        filePath = 'public/sustainability.xml'
    }else if (urlPath.startsWith('/reviews')) {
        filePath = 'public/reviews.html';
    }else if (urlPath.startsWith('/css/')) {
        filePath = path.join(rootDir, urlPath);
    } else if (urlPath.startsWith('/images/')) {
        filePath = path.join(rootDir, urlPath);
    }else if(urlPath.startsWith('/js/')){
        filePath = 'js/scripts.js';
    //no files found
    }else{
        filePath = 'public/404.html';
    }
    // check if the file exists before serving
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            // if file does not exist, send 404 page
            serveStaticFile('public/404.html', res, 404);
        } else {
            // serve the requested file
            serveStaticFile(filePath, res);
        }
    });
});

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});