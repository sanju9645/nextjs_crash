<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog into the Dev Event Next.js App Router project (v16.2.4). Here is a summary of all changes made:

- **`instrumentation-client.ts`** (new): Initializes PostHog client-side using the `posthog-js` SDK. Uses a reverse proxy (`/ingest`), enables automatic exception capture, and turns on debug mode in development.
- **`next.config.ts`**: Added `/ingest` reverse proxy rewrites routing to `https://us.i.posthog.com` and `https://us-assets.i.posthog.com`, plus `skipTrailingSlashRedirect: true`.
- **`.env.local`**: Added `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` and `NEXT_PUBLIC_POSTHOG_HOST` environment variables.
- **`components/ExploreBtn.tsx`**: Added `posthog.capture('explore_events_clicked')` on button click — tracks the top of the event discovery funnel.
- **`components/EventCard.tsx`**: Added `'use client'` directive and `posthog.capture('event_card_clicked', { event_title, event_slug, event_location, event_date })` on card click — tracks which events users engage with.
- **`components/Navbar.tsx`**: Added `'use client'` directive and `posthog.capture('nav_link_clicked', { destination })` on each nav link — tracks navigation patterns across Home, Events, and About.

## Events instrumented

| Event Name | Description | File |
|---|---|---|
| `explore_events_clicked` | User clicked the 'Explore Events' CTA button on the homepage hero section | `components/ExploreBtn.tsx` |
| `event_card_clicked` | User clicked on an event card to view event details | `components/EventCard.tsx` |
| `nav_link_clicked` | User clicked a navigation link in the top navbar | `components/Navbar.tsx` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- **Dashboard — Analytics basics**: https://us.posthog.com/project/407496/dashboard/1538102
- **Explore Events Button Clicks** (trend): https://us.posthog.com/project/407496/insights/fNKlWbYO
- **Event Card Clicks Over Time** (trend): https://us.posthog.com/project/407496/insights/NIiePpkK
- **Top Clicked Events** (breakdown by event title): https://us.posthog.com/project/407496/insights/2XJAMXTZ
- **Navigation Link Usage** (breakdown by destination): https://us.posthog.com/project/407496/insights/CBwYtKfI
- **Discovery Funnel: Explore to Event Click** (conversion funnel): https://us.posthog.com/project/407496/insights/ksCZUe5K

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
