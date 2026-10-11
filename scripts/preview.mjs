#!/usr/bin/env node
/**
 * Serves the built site the way the host does: /zenders answers with
 * dist/zenders/index.html, and an unknown address gets 404.html.
 *
 *   npm run build && npm run preview
 */
import { createServer } from 'node:http';
import { existsSync, readFileSync, statSync } from 'node:fs';
import { extname, join, normalize, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const DIST = resolve(fileURLToPath(new URL('../dist', import.meta.url)));
const PORT = Number(process.env.PORT) || 4173;
const TYPES = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.xml': 'application/xml', '.txt': 'text/plain',
  '.woff2': 'font/woff2', '.ico': 'image/x-icon', '.webp': 'image/webp',
};

createServer((req, res) => {
  const path = normalize(decodeURIComponent(new URL(req.url, 'http://x').pathname)).replace(/\/+$/, '');
  const base = join(DIST, path);
  const file = [base, join(base, 'index.html'), `${base}.html`].find(
    (f) => f.startsWith(DIST) && existsSync(f) && statSync(f).isFile()
  );
  const target = file || join(DIST, '404.html');
  res.writeHead(file ? 200 : 404, { 'Content-Type': TYPES[extname(target)] || 'application/octet-stream' });
  res.end(readFileSync(target));
}).listen(PORT, () => console.log(`GOTV preview: http://localhost:${PORT}`));
