import Link from 'next/link';
import { Pin, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getTypeIcon, getTypeColor } from '@/lib/item-icons';

interface ItemCardProps {
  id: string;
  title: string;
  description?: string;
  typeId: string;
  tags: string[];
  isFavorite: boolean;
  isPinned: boolean;
  updatedAt: string;
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export default function ItemCard({
  id,
  title,
  description,
  typeId,
  tags,
  isFavorite,
  isPinned,
  updatedAt,
}: ItemCardProps) {
  const Icon = getTypeIcon(typeId);
  const color = getTypeColor(typeId);

  return (
    <Link
      href={`/items/${id}`}
      className="flex items-start gap-3 rounded-lg border border-border bg-card p-4 transition-colors hover:bg-accent/40"
    >
      <div className={cn('flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-muted', color)}>
        <Icon className="h-4 w-4" />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <h3 className="truncate text-sm font-semibold text-foreground">{title}</h3>
          {isPinned && <Pin className="h-3 w-3 shrink-0 text-muted-foreground" />}
          {isFavorite && (
            <Star className="h-3.5 w-3.5 shrink-0 fill-yellow-400 text-yellow-400" />
          )}
        </div>
        {description && (
          <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">{description}</p>
        )}
        {tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <span className="shrink-0 text-xs text-muted-foreground">{formatDate(updatedAt)}</span>
    </Link>
  );
}
