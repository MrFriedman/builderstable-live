/**
 * Build config for the static, backend-free landing page.
 *
 * `vite.config.ts` builds the Laravel app: it needs the Blade runtime for
 * asset injection and the Wayfinder plugin reads `routes/web.php` through PHP.
 * Neither is available on a static host, so the landing page gets its own
 * config that compiles the same components with the server-dependent imports
 * aliased to static stubs. See `landing/inertia-static.tsx`.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig, type Plugin } from 'vite';

const root = path.dirname(fileURLToPath(import.meta.url));

/**
 * `public/` also holds `index.php` and the Laravel app's compiled bundle in
 * `build/`, neither of which belongs on the static site — so the files the two
 * builds share are copied by name rather than by pointing `publicDir` at the
 * whole directory.
 */
const SHARED_PUBLIC_FILES = [
    'apple-touch-icon.png',
    'favicon-32x32.png',
    'favicon.ico',
    'favicon.svg',
    'robots.txt',
];

function sharedPublicFiles(): Plugin {
    return {
        name: 'landing-shared-public-files',
        apply: 'build',
        generateBundle() {
            for (const name of SHARED_PUBLIC_FILES) {
                this.emitFile({
                    type: 'asset',
                    fileName: name,
                    source: fs.readFileSync(path.join(root, 'public', name)),
                });
            }
        },
    };
}

export default defineConfig({
    root: path.join(root, 'landing'),
    publicDir: false,
    plugins: [react(), tailwindcss(), sharedPublicFiles()],
    resolve: {
        // Anchored and ordered most-specific first: '@/routes/trips' has to win
        // over '@/routes', and neither may be shadowed by the catch-all. That
        // last one matches '@/' rather than '@' so npm scopes such as
        // '@radix-ui/react-slot' aren't rewritten into resources/js.
        alias: [
            {
                find: /^@inertiajs\/react$/,
                replacement: path.join(root, 'landing/inertia-static.tsx'),
            },
            {
                find: /^@\/routes\/trips$/,
                replacement: path.join(root, 'landing/routes-trips.ts'),
            },
            {
                find: /^@\/routes$/,
                replacement: path.join(root, 'landing/routes.ts'),
            },
            {
                find: /^@\//,
                replacement: `${path.join(root, 'resources/js')}/`,
            },
        ],
    },
    build: {
        outDir: path.join(root, 'dist-landing'),
        emptyOutDir: true,
    },
});
