# Current Feature

Seed Sample Data

## Status

Completed

## Goals

Overwrite `prisma/seed.ts` to populate the database with realistic sample data for development and demos, per `@context/features/seed-spec.md`.

- **Demo user**: `demo@devstash.io` / `Demo User`, password `12345678` hashed with bcryptjs (12 rounds), `isPro: false`, `emailVerified: now`
- **7 system ItemTypes** (replace existing seed): snippet/prompt/command/note/file/image/link with Lucide icon names and the hex colors specified in the spec (all `isSystem: true`)
- **5 Collections owned by the demo user, with items**:
  - **React Patterns** — 3 TypeScript snippets (custom hooks, component patterns, utility functions)
  - **AI Workflows** — 3 prompts (code review, documentation generation, refactoring assistance)
  - **DevOps** — 1 snippet, 1 command, 2 links (real URLs)
  - **Terminal Commands** — 4 commands (git, docker, process management, package managers)
  - **Design Resources** — 4 links to real URLs (CSS/Tailwind, component libraries, design systems, icon libraries)
- Seed must remain idempotent — safe to re-run

## Notes

- Hex colors replace the Tailwind class strings used in the prior seed; `src/lib/item-icons.ts` (UI map) may need to be revisited so the dashboard still renders correctly with the new type IDs and colors
- Type IDs in the spec are lowercase (`snippet`, `link`, etc.) — different from previous IDs (`type_snippet`, `type_url`); choose a stable ID scheme and update any UI references consistently
- bcryptjs is a new dependency
- Spec: `@context/features/seed-spec.md`

## History

- Project setup and boilerplate cleanup
- Added mock data and dashboard screenshots
- Dashboard UI Phase 1: ShadCN init, /dashboard route, TopBar, dark mode, sidebar/main placeholders
- Dashboard UI Phase 2: collapsible sidebar with Types/Collections sections, favorites and all collections, user avatar area, mobile drawer with close button, TopBar logo alignment and toggle placement
- Dashboard UI Phase 3: main content area with 4 stats cards, Recent Collections grid, Pinned Items, and 10 Recent Items; colorful per-type icon palette shared by sidebar and dashboard
- Prisma 7 + Neon Postgres setup: `prisma-client` generator with output to `src/generated/prisma`, datasource URL moved to `prisma.config.ts`, `PrismaNeon` adapter singleton at `src/lib/prisma.ts`, schema with project models + NextAuth v5 (Auth.js) adapter models, initial migration applied to Neon dev branch, seed of 7 system ItemTypes, `scripts/test-db.ts` connection check, `db:studio`/`db:migrate`/`db:seed`/`db:test` npm scripts
- Seed sample data: rewrote `prisma/seed.ts` with bcryptjs-hashed demo user (`demo@devstash.io`), 7 system ItemTypes per spec (lowercase IDs, Lucide icon names, hex colors), 5 collections (React Patterns, AI Workflows, DevOps, Terminal Commands, Design Resources) with 18 items total; cleans up old `type_*` system types; fully idempotent via upsert by stable IDs
