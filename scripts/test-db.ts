import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is not set");
}

const adapter = new PrismaNeon({ connectionString });
const prisma = new PrismaClient({ adapter });

function hr(title: string) {
  console.log(`\n── ${title} ${"─".repeat(Math.max(0, 60 - title.length))}`);
}

async function main() {
  console.log("Connecting to database...");
  const [{ now }] = await prisma.$queryRaw<{ now: Date }[]>`SELECT NOW() as now`;
  console.log(`Connected. Server time: ${now.toISOString()}`);

  hr("Row counts");
  console.log({
    users: await prisma.user.count(),
    itemTypes: await prisma.itemType.count(),
    items: await prisma.item.count(),
    collections: await prisma.collection.count(),
    tags: await prisma.tag.count(),
  });

  hr("System item types");
  const systemTypes = await prisma.itemType.findMany({
    where: { isSystem: true },
    orderBy: { name: "asc" },
    select: { id: true, name: true, icon: true, color: true },
  });
  for (const t of systemTypes) {
    console.log(`  · ${t.name.padEnd(8)} id=${t.id.padEnd(8)} icon=${(t.icon ?? "").padEnd(12)} color=${t.color}`);
  }

  hr("Demo user");
  const demo = await prisma.user.findUnique({
    where: { email: "demo@devstash.io" },
    select: {
      id: true,
      email: true,
      name: true,
      isPro: true,
      emailVerified: true,
      password: true,
      _count: { select: { items: true, collections: true } },
    },
  });
  if (!demo) {
    console.log("  (not found — run `npm run db:seed`)");
  } else {
    console.log(`  id:             ${demo.id}`);
    console.log(`  email:          ${demo.email}`);
    console.log(`  name:           ${demo.name}`);
    console.log(`  isPro:          ${demo.isPro}`);
    console.log(`  emailVerified:  ${demo.emailVerified?.toISOString() ?? "—"}`);
    console.log(`  password hash:  ${demo.password ? `${demo.password.slice(0, 20)}… (bcrypt)` : "—"}`);
    console.log(`  items:          ${demo._count.items}`);
    console.log(`  collections:    ${demo._count.collections}`);
  }

  hr("Collections & items");
  const collections = await prisma.collection.findMany({
    orderBy: { name: "asc" },
    include: {
      items: {
        orderBy: { title: "asc" },
        select: { id: true, title: true, typeId: true, url: true },
      },
    },
  });
  for (const c of collections) {
    console.log(`\n  ▸ ${c.name}  (${c.items.length} items)`);
    console.log(`    ${c.description ?? ""}`);
    for (const it of c.items) {
      const suffix = it.url ? `  → ${it.url}` : "";
      console.log(`      · [${it.typeId.padEnd(7)}] ${it.title}${suffix}`);
    }
  }

  hr("Sanity checks");
  const orphanItems = await prisma.item.count({ where: { collectionId: null } });
  const itemsWithoutType = await prisma.item.findMany({
    where: { typeId: { notIn: systemTypes.map((t) => t.id) } },
    select: { id: true, title: true, typeId: true },
  });
  console.log(`  items without collection: ${orphanItems}`);
  console.log(`  items with unknown typeId: ${itemsWithoutType.length}`);
  if (itemsWithoutType.length) console.log(itemsWithoutType);

  const ok = demo && orphanItems === 0 && itemsWithoutType.length === 0;
  console.log(`\n${ok ? "✓ All checks passed" : "✗ Issues found above"}`);
  if (!ok) process.exit(1);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
