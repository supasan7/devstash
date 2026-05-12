import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is not set");
}

const adapter = new PrismaNeon({ connectionString });
const prisma = new PrismaClient({ adapter });

const SYSTEM_ITEM_TYPES = [
  { id: "type_snippet", name: "Snippet", icon: "Braces", color: "text-sky-400" },
  { id: "type_prompt", name: "Prompt", icon: "Sparkles", color: "text-violet-400" },
  { id: "type_command", name: "Command", icon: "Terminal", color: "text-emerald-400" },
  { id: "type_note", name: "Note", icon: "StickyNote", color: "text-amber-400" },
  { id: "type_file", name: "File", icon: "Folder", color: "text-orange-400" },
  { id: "type_image", name: "Image", icon: "Image", color: "text-pink-400" },
  { id: "type_url", name: "URL", icon: "Link", color: "text-cyan-400" },
];

async function main() {
  for (const t of SYSTEM_ITEM_TYPES) {
    await prisma.itemType.upsert({
      where: { id: t.id },
      update: { name: t.name, icon: t.icon, color: t.color, isSystem: true },
      create: { ...t, isSystem: true },
    });
  }
  console.log(`Seeded ${SYSTEM_ITEM_TYPES.length} system item types`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
