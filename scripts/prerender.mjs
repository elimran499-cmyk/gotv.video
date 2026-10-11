#!/usr/bin/env node
/**
 * Turns the built app into one finished HTML file per page (33 of them: 11
 * pages in Dutch, German and English), and writes sitemap.xml and robots.txt.
 * Runs as the last step of `npm run build`; needs no browser.
 */
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = resolve(fileURLToPath(new URL('..', import.meta.url)));
const DIST = join(ROOT, 'dist');
const SSR = join(ROOT, 'dist-ssr');

const { pages, notFoundPage, siteUrl } = await import(pathToFileURL(join(SSR, 'entry-server.js')).href);
const template = readFileSync(join(DIST, 'index.html'), 'utf8');
for (const marker of ['<!--seo-head-->', '<div id="root"></div>', '<html lang="nl"']) {
  if (!template.includes(marker)) throw new Error(`index.html is missing ${marker}`);
}

const fill = (page) =>
  template
    .replace('<html lang="nl"', `<html lang="${page.lang}"`)
    .replace('<!--seo-head-->', page.head)
    .replace('<div id="root"></div>', `<div id="root">${page.html}</div>`);

const all = pages();
for (const page of all) {
  const file = page.path === '/' ? join(DIST, 'index.html') : join(DIST, page.path, 'index.html');
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, fill(page));
}
writeFileSync(join(DIST, '404.html'), fill(notFoundPage()));

const today = new Date().toISOString().slice(0, 10);
const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
  ...all.map((page) =>
    [
      '  <url>',
      `    <loc>${page.url}</loc>`,
      `    <lastmod>${today}</lastmod>`,
      ...page.alternates.map((a) => `    <xhtml:link rel="alternate" hreflang="${a.lang}" href="${a.url}" />`),
      `    <xhtml:link rel="alternate" hreflang="x-default" href="${page.alternates[0].url}" />`,
      '  </url>',
    ].join('\n')
  ),
  '</urlset>',
  '',
].join('\n');
writeFileSync(join(DIST, 'sitemap.xml'), sitemap);
writeFileSync(join(DIST, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`);

rmSync(SSR, { recursive: true, force: true });
console.log(`Pre-rendered ${all.length} pages, sitemap.xml and robots.txt for ${siteUrl}`);
