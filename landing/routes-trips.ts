/**
 * Static stand-in for the Wayfinder-generated `@/routes/trips` module. See
 * `routes.ts` in this directory for why these are stubbed.
 *
 * `share` is a public route on the real site, but it still reads a seeded
 * traveler out of the database, so the static build points it at the on-page
 * demo — which shows the same traveler-side states it would have illustrated.
 */
export const share = (_shareCode: string) => '#demo';
