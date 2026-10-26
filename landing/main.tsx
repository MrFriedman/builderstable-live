/**
 * Entry point for the static landing build.
 *
 * The Laravel app boots through `resources/js/app.tsx`, which hands control to
 * `createInertiaApp` and lets the server pick the page component. There is no
 * server here, and only one page, so this mounts it directly.
 */
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Welcome from '@/pages/welcome';
import './app.css';

const root = document.getElementById('app');

if (!root) {
    throw new Error('Missing #app mount point in index.html.');
}

createRoot(root).render(
    <StrictMode>
        <Welcome />
    </StrictMode>,
);
