import { Clock } from 'lucide-react';
import { mockItems } from '@/lib/mock-data';
import ItemCard from './ItemCard';

export default function RecentItems() {
  const items = [...mockItems]
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 10);

  return (
    <section>
      <div className="mb-3 flex items-center gap-2">
        <Clock className="h-4 w-4 text-muted-foreground" />
        <h2 className="text-lg font-semibold text-foreground">Recent</h2>
      </div>
      <div className="space-y-2">
        {items.map((item) => (
          <ItemCard
            key={item.id}
            id={item.id}
            title={item.title}
            description={item.description}
            typeId={item.typeId}
            tags={item.tags}
            isFavorite={item.isFavorite}
            isPinned={item.isPinned}
            updatedAt={item.updatedAt}
          />
        ))}
      </div>
    </section>
  );
}
