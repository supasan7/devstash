# Current Feature

Dashboard Collections from Database

## Status

Completed

## Goals

Replace the mock "Recent Collections" data on the dashboard with real data from the Neon DB via Prisma. Layout/design stays as-is (6 recent-collection cards). Items under each collection are out of scope for this pass. Spec: `@context/features/dashboard-collections-spec.md`.

- Create `src/lib/db/collections.ts` with data-fetching functions (e.g., `getRecentCollections(userId, limit)`) that return collections plus the type breakdown needed by the UI
- Fetch directly in the dashboard server component (no client fetch, no Server Action)
- Card border color is derived from the **most-used content type** in that collection (tie-break: most recently used)
- Card shows **small icons for every distinct type** present in that collection
- Update the stats line on each card to reflect real numbers from the DB
- Keep the existing visual design — reference `@context/screenshots/dashboard-ui-main.png`
- Stop reading collection data from `@src/lib/mock-data.ts` in the dashboard (mock file can stay for now; only the dashboard switches over)

## Notes

- Demo user (`demo@devstash.io`, id `user_demo`) is the only seeded user — fetch by that id for now until auth lands
- System ItemType IDs in DB are lowercase (`snippet`, `prompt`, …). The existing UI map at `src/lib/item-icons.ts` keys off the old `type_*` IDs and uses Tailwind class colors, while the DB stores hex (`#3b82f6`, …) — the icon/color resolver needs to be updated (or replaced) to match DB type IDs and hex colors
- Type breakdown per collection should ideally be a single grouped query (or a Prisma `groupBy`) rather than fanning out N+1 queries per card
- "Recent" means ordered by `updatedAt` desc; 6 cards max per the existing UI

## History

- Project setup and boilerplate cleanup
- Added mock data and dashboard screenshots
- Dashboard UI Phase 1: ShadCN init, /dashboard route, TopBar, dark mode, sidebar/main placeholders
- Dashboard UI Phase 2: collapsible sidebar with Types/Collections sections, favorites and all collections, user avatar area, mobile drawer with close button, TopBar logo alignment and toggle placement
- Dashboard UI Phase 3: main content area with 4 stats cards, Recent Collections grid, Pinned Items, and 10 Recent Items; colorful per-type icon palette shared by sidebar and dashboard
- Prisma 7 + Neon Postgres setup: `prisma-client` generator with output to `src/generated/prisma`, datasource URL moved to `prisma.config.ts`, `PrismaNeon` adapter singleton at `src/lib/prisma.ts`, schema with project models + NextAuth v5 (Auth.js) adapter models, initial migration applied to Neon dev branch, seed of 7 system ItemTypes, `scripts/test-db.ts` connection check, `db:studio`/`db:migrate`/`db:seed`/`db:test` npm scripts
- Seed sample data: rewrote `prisma/seed.ts` with bcryptjs-hashed demo user (`demo@devstash.io`), 7 system ItemTypes per spec (lowercase IDs, Lucide icon names, hex colors), 5 collections (React Patterns, AI Workflows, DevOps, Terminal Commands, Design Resources) with 18 items total; cleans up old `type_*` system types; fully idempotent via upsert by stable IDs; expanded `scripts/test-db.ts` with nested item display and sanity checks
- Dashboard collections from DB: new `src/lib/db/collections.ts` exposes `getRecentCollections(userId, limit)` using `findMany` + `groupBy` to get collections plus per-type counts in two queries; `RecentCollections` is now an async server component fetching the demo user's 6 most-recent collections from Neon; `CollectionCard` takes `typeIds`/`mostUsedTypeId` props and renders a border tinted by the most-used type via a new `getTypeBorderColor` helper; `item-icons.ts` rekeyed to DB type IDs with legacy `type_*` aliases so the still-mock PinnedItems/RecentItems continue to render correctly
