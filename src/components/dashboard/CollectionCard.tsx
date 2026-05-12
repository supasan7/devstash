import Link from 'next/link';
import { Star } from 'lucide-react';
import { getTypeIcon, getTypeColor, getTypeBorderColor } from '@/lib/item-icons';

interface CollectionCardProps {
  id: string;
  name: string;
  description?: string | null;
  itemCount: number;
  isFavorite: boolean;
  typeIds: string[];
  mostUsedTypeId: string | null;
}

export default function CollectionCard({
  id,
  name,
  description,
  itemCount,
  isFavorite,
  typeIds,
  mostUsedTypeId,
}: CollectionCardProps) {
  const borderClass = mostUsedTypeId ? getTypeBorderColor(mostUsedTypeId) : 'border-border';
  const visibleTypeIds = typeIds.slice(0, 5);

  return (
    <Link
      href={`/collections/${id}`}
      className={`group flex flex-col rounded-lg border ${borderClass} bg-card p-4 transition-colors hover:bg-accent/40`}
    >
      <div className="min-w-0">
        <div className="flex items-center gap-1.5">
          <h3 className="truncate text-sm font-semibold text-foreground">{name}</h3>
          {isFavorite && (
            <Star className="h-3.5 w-3.5 shrink-0 fill-yellow-400 text-yellow-400" />
          )}
        </div>
        <p className="mt-0.5 text-xs text-muted-foreground">
          {itemCount} {itemCount === 1 ? 'item' : 'items'}
        </p>
      </div>

      {description && (
        <p className="mt-3 line-clamp-2 text-xs text-muted-foreground">{description}</p>
      )}

      {visibleTypeIds.length > 0 && (
        <div className="mt-3 flex items-center gap-1.5">
          {visibleTypeIds.map((typeId) => {
            const Icon = getTypeIcon(typeId);
            return <Icon key={typeId} className={`h-3.5 w-3.5 ${getTypeColor(typeId)}`} />;
          })}
        </div>
      )}
    </Link>
  );
}
