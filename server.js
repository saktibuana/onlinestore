import http from 'http';
import fs from 'fs';
import path from 'path';

const PORT = process.env.PORT || 3000;
const DIST_DIR = path.resolve(import.meta.dirname, 'dist');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
  // Akamai Edge CDN Headers
  res.setHeader('Edge-Control', 'cache-maxage=86400, stale-while-revalidate=604800');
  res.setHeader('Akamai-Cache-Status', 'HIT (CGK-Edge-Node-01)');
  res.setHeader('Akamai-Edge-Worker', 'v2.4.1-tokopedia-edge');
  res.setHeader('X-Akamai-Pragma', 'akamai-x-cache-on, akamai-x-cache-remote-on, akamai-x-check-cacheable, akamai-x-get-cache-key');
  res.setHeader('X-Akamai-Edge-Server', 'akamai-cgk-id.edgekey.net');
  res.setHeader('X-Edge-Origin', 'tokopedia-origin-jakarta');
  res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800');

  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  let pathname = parsedUrl.pathname;

  if (pathname === '/') pathname = '/index.html';

  let filePath = path.join(DIST_DIR, pathname);

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      // Fallback for HTML MPA routes
      if (!path.extname(pathname)) {
        const potentialHtml = filePath + '.html';
        if (fs.existsSync(potentialHtml)) {
          filePath = potentialHtml;
        } else {
          filePath = path.join(DIST_DIR, 'offline.html');
        }
      } else {
        res.statusCode = 404;
        res.end('Not Found');
        return;
      }
    }

    const ext = path.extname(filePath).toLowerCase();
    res.setHeader('Content-Type', MIME_TYPES[ext] || 'application/octet-stream');

    fs.createReadStream(filePath).pipe(res);
  });
});

server.listen(PORT, () => {
  console.log(`[Akamai Edge Server] Tokopedia MPA running on http://localhost:${PORT}`);
});
