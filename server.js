const http = require("http");
const fs = require("fs");
const path = require("path");

const port = Number(process.env.PORT || 4173);
const rootDir = __dirname;

const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".gif": "image/gif",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".webp": "image/webp",
};

function send(res, statusCode, content, contentType) {
  res.writeHead(statusCode, {
    "Cache-Control": "no-store",
    "Content-Type": contentType,
  });
  res.end(content);
}

const server = http.createServer((req, res) => {
  const requestPath = decodeURIComponent((req.url || "/").split("?")[0]);
  const normalizedPath = requestPath === "/" ? "/index.html" : requestPath;
  const filePath = path.normalize(path.join(rootDir, normalizedPath));

  if (!filePath.startsWith(rootDir)) {
    send(res, 403, "Forbidden", "text/plain; charset=utf-8");
    return;
  }

  fs.readFile(filePath, (error, fileBuffer) => {
    if (!error) {
      const ext = path.extname(filePath).toLowerCase();
      send(
        res,
        200,
        fileBuffer,
        mimeTypes[ext] || "application/octet-stream"
      );
      return;
    }

    if (error.code === "ENOENT") {
      fs.readFile(path.join(rootDir, "index.html"), (indexError, indexBuffer) => {
        if (indexError) {
          send(res, 500, "Unable to load index.html", "text/plain; charset=utf-8");
          return;
        }

        send(res, 200, indexBuffer, "text/html; charset=utf-8");
      });
      return;
    }

    send(res, 500, "Internal Server Error", "text/plain; charset=utf-8");
  });
});

server.listen(port, () => {
  console.log(`Sersmick Weather is running at http://localhost:${port}`);
});
