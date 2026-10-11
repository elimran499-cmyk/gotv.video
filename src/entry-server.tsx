import { renderToString } from 'react-dom/server';
import App from './App';
import { buildHead, headHtml } from './seo/head';
import { ROUTE_LANGS, Route, SITE_URL, absoluteUrl, allRoutes, matchRoute, routePath, translatePath } from './seo/routes';

/**
 * Draws every page ahead of time, so each address is a complete HTML page with
 * its own title, description and content. Used by scripts/prerender.mjs.
 */

const draw = (route: Route, path: string) => ({
  path,
  lang: route.lang,
  head: headHtml(buildHead(route)),
  html: renderToString(<App path={path} />),
  alternates: ROUTE_LANGS.map((lang) => ({ lang, url: absoluteUrl(translatePath(route, lang)) })),
  url: absoluteUrl(path),
});

export const siteUrl = SITE_URL;
export const pages = () => allRoutes().map((route) => draw(route, routePath(route)));
export const notFoundPage = () => draw(matchRoute('/404-not-found'), '/404-not-found');
