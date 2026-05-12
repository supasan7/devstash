# Current Feature

Prisma + Neon PostgreSQL Setup

## Status

Completed

## Goals

- Set up Prisma ORM (v7) with Neon PostgreSQL (serverless)
- Create initial schema based on data models in `@context/project-overview.md` (will evolve)
- Include NextAuth models (Account, Session, VerificationToken)
- Add appropriate indexes and cascade deletes
- Configure development and production database branches via `DATABASE_URL`
- Always use migrations (`prisma migrate dev`); never push directly unless specified

## Notes

- Use Prisma 7 — review the upgrade guide for breaking changes: https://www.prisma.io/docs/orm/more/upgrade-guides/upgrading-versions/upgrading-to-prisma-7
- Setup reference: https://www.prisma.io/docs/getting-started/prisma-orm/quickstart/prisma-postgres
- Dev branch lives in `DATABASE_URL`; production is a separate Neon branch
- Production deploys must run `prisma migrate deploy` before app start

## History

- Project setup and boilerplate cleanup
- Added mock data and dashboard screenshots
- Dashboard UI Phase 1: ShadCN init, /dashboard route, TopBar, dark mode, sidebar/main placeholders
- Dashboard UI Phase 2: collapsible sidebar with Types/Collections sections, favorites and all collections, user avatar area, mobile drawer with close button, TopBar logo alignment and toggle placement
- Dashboard UI Phase 3: main content area with 4 stats cards, Recent Collections grid, Pinned Items, and 10 Recent Items; colorful per-type icon palette shared by sidebar and dashboard
- Prisma 7 + Neon Postgres setup: `prisma-client` generator with output to `src/generated/prisma`, datasource URL moved to `prisma.config.ts`, `PrismaNeon` adapter singleton at `src/lib/prisma.ts`, schema with project models + NextAuth v5 (Auth.js) adapter models, initial migration applied to Neon dev branch, seed of 7 system ItemTypes, `scripts/test-db.ts` connection check, `db:studio`/`db:migrate`/`db:seed`/`db:test` npm scripts
