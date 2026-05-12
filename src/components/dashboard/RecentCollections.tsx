import Link from 'next/link';
import { getRecentCollections } from '@/lib/db/collections';
import CollectionCard from './CollectionCard';

export default async function RecentCollections() {
  const collections = await getRecentCollections(undefined, 6);

  return (
    <section>
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">Collections</h2>
        <Link
          href="/collections"
          className="text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          View all
        </Link>
      </div>
      {collections.length === 0 ? (
        <p className="text-xs text-muted-foreground">No collections yet.</p>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {collections.map((c) => (
            <CollectionCard
              key={c.id}
              id={c.id}
              name={c.name}
              description={c.description}
              itemCount={c.itemCount}
              isFavorite={c.isFavorite}
              typeIds={c.typeIds}
              mostUsedTypeId={c.mostUsedTypeId}
            />
          ))}
        </div>
      )}
    </section>
  );
}
