/**
 * Static stand-in for the Wayfinder-generated `@/routes` module.
 *
 * The real one is generated from `routes/web.php` by the Wayfinder Vite plugin
 * and is gitignored, so it doesn't exist on a machine that has no PHP or
 * `vendor/` — which includes Vercel's builder. Aliasing it away also means the
 * static page can't accidentally link at a Laravel route that isn't deployed.
 *
 * Both app entry points live behind auth on the real site, and neither exists
 * here, so they resolve to the demo embedded in the page.
 */
const DEMO_ANCHOR = '#demo';

export const home = () => '/';
export const dashboard = () => DEMO_ANCHOR;
export const login = () => DEMO_ANCHOR;
