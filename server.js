const http = require("http");
const fs = require("fs");
const path = require("path");

const port = 3000;
const host = "127.0.0.1";
const publicDir = __dirname;

const contentTypes = {
    ".html": "text/html; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".js": "application/javascript; charset=utf-8"
};

const server = http.createServer((req, res) => {
    const requestedPath = req.url === "/" ? "/index.html" : req.url;
    const filePath = path.join(publicDir, requestedPath);

    if (!filePath.startsWith(publicDir)) {
        res.writeHead(403);
        res.end("Forbidden");
        return;
    }

    fs.readFile(filePath, (error, content) => {
        if (error) {
            res.writeHead(404);
            res.end("Not found");
            return;
        }

        const extension = path.extname(filePath);
        res.writeHead(200, { "Content-Type": contentTypes[extension] || "text/plain" });
        res.end(content);
    });
});

server.listen(port, host, () => {
    console.log(`Resume Score Checker running at http://${host}:${port}`);
});
