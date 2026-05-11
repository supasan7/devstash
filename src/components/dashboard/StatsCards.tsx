import { FileText, FolderOpen, Star, Heart } from 'lucide-react';
import { mockItems, mockCollections } from '@/lib/mock-data';

interface StatCardProps {
  label: string;
  value: number;
  icon: React.ReactNode;
}

function StatCard({ label, value, icon }: StatCardProps) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-border bg-card p-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground truncate">{label}</p>
        <p className="text-2xl font-semibold text-foreground leading-tight">{value}</p>
      </div>
    </div>
  );
}

export default function StatsCards() {
  const itemCount = mockItems.length;
  const collectionCount = mockCollections.length;
  const favoriteItems = mockItems.filter((i) => i.isFavorite).length;
  const favoriteCollections = mockCollections.filter((c) => c.isFavorite).length;

  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      <StatCard label="Items" value={itemCount} icon={<FileText className="h-5 w-5" />} />
      <StatCard
        label="Collections"
        value={collectionCount}
        icon={<FolderOpen className="h-5 w-5" />}
      />
      <StatCard
        label="Favorite items"
        value={favoriteItems}
        icon={<Star className="h-5 w-5" />}
      />
      <StatCard
        label="Favorite collections"
        value={favoriteCollections}
        icon={<Heart className="h-5 w-5" />}
      />
    </div>
  );
}
