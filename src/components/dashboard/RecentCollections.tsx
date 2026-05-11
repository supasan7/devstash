import Link from 'next/link';
import { mockCollections } from '@/lib/mock-data';
import CollectionCard from './CollectionCard';

export default function RecentCollections() {
  const collections = mockCollections.slice(0, 6);

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
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {collections.map((c) => (
          <CollectionCard
            key={c.id}
            id={c.id}
            name={c.name}
            description={c.description}
            itemCount={c.itemCount}
            isFavorite={c.isFavorite}
          />
        ))}
      </div>
    </section>
  );
}
