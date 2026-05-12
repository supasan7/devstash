import { prisma } from "@/lib/prisma";

const DEMO_USER_ID = "user_demo";

export type RecentCollection = {
  id: string;
  name: string;
  description: string | null;
  isFavorite: boolean;
  itemCount: number;
  typeIds: string[];
  mostUsedTypeId: string | null;
};

export async function getRecentCollections(
  userId: string = DEMO_USER_ID,
  limit = 6,
): Promise<RecentCollection[]> {
  const collections = await prisma.collection.findMany({
    where: { userId },
    orderBy: { updatedAt: "desc" },
    take: limit,
    select: {
      id: true,
      name: true,
      description: true,
      isFavorite: true,
      _count: { select: { items: true } },
    },
  });

  if (collections.length === 0) return [];

  const collectionIds = collections.map((c) => c.id);
  const typeCounts = await prisma.item.groupBy({
    by: ["collectionId", "typeId"],
    where: { userId, collectionId: { in: collectionIds } },
    _count: { _all: true },
  });

  const byCollection = new Map<string, { typeId: string; count: number }[]>();
  for (const row of typeCounts) {
    if (!row.collectionId) continue;
    const arr = byCollection.get(row.collectionId) ?? [];
    arr.push({ typeId: row.typeId, count: row._count._all });
    byCollection.set(row.collectionId, arr);
  }

  return collections.map((c) => {
    const typeRows = (byCollection.get(c.id) ?? []).sort((a, b) => {
      if (b.count !== a.count) return b.count - a.count;
      return a.typeId.localeCompare(b.typeId);
    });
    return {
      id: c.id,
      name: c.name,
      description: c.description,
      isFavorite: c.isFavorite,
      itemCount: c._count.items,
      typeIds: typeRows.map((r) => r.typeId),
      mostUsedTypeId: typeRows[0]?.typeId ?? null,
    };
  });
}
