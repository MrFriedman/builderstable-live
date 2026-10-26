/**
 * Static stand-ins for the handful of Inertia APIs the landing page touches.
 *
 * The marketing page is the one screen in this app with no server state —
 * every call time, traveler and avatar in it comes from `mock-content.ts`. That
 * makes it deployable as a plain static bundle with no PHP runtime, except that
 * the shared components still import `Link`, `usePage` and `Head` from Inertia,
 * and those expect a server-rendered page object that will never arrive.
 * `vite.landing.config.ts` aliases `@inertiajs/react` to this file so they
 * resolve to no-server equivalents instead.
 *
 * Keep this surface minimal. If a component added to the landing tree needs
 * more of Inertia than what's here, that's a sign it reads real backend state
 * and doesn't belong on the static page.
 */
import type { ComponentProps, ReactNode } from 'react';

/** Mirrors the shape of Inertia's `href`: a URL string or a route definition. */
export type Href = string | { url: string };

export type InertiaLinkProps = Omit<ComponentProps<'a'>, 'href'> & {
    href: Href;
};

/**
 * Inertia's `Link` intercepts clicks and turns them into XHR visits. Degrading
 * it to a plain anchor is both what a static page can support and what the
 * landing's in-page `#demo` navigation wants anyway — a real anchor gets
 * native hash scrolling for free.
 */
export function Link({ href, ...props }: InertiaLinkProps) {
    return <a href={typeof href === 'string' ? href : href.url} {...props} />;
}

/**
 * The page's title and description are fixed, so `index.html` carries them as
 * real markup where crawlers see them without executing JS. That leaves
 * nothing for `Head` to do.
 */
export function Head(_props: { title?: string; children?: ReactNode }) {
    return null;
}

/**
 * The landing CTAs branch on `auth.user` only to decide between "send them to
 * sign in first" and "send them straight to the demo". There is no sign-in on
 * the static build, and the demo it would gate is embedded in the page itself,
 * so the second branch is the correct one — this stub is how it gets selected.
 * It is never rendered as a user; nothing on the landing page reads a field.
 */
const SIGNED_IN_STUB = { id: 0, name: 'Demo', email: 'demo@tellme.app' };

const STATIC_PAGE = {
    component: 'welcome',
    url: '/',
    version: null,
    props: {
        name: 'TellMe',
        sidebarOpen: false,
        auth: { user: SIGNED_IN_STUB },
    },
};

export function usePage() {
    return STATIC_PAGE;
}
