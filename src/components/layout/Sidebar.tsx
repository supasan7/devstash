'use client';

import Link from 'next/link';
import {
  Braces,
  Sparkles,
  Terminal,
  StickyNote,
  Folder,
  Image,
  Link as LinkIcon,
  Star,
  Settings,
  ChevronDown,
  X,
  type LucideIcon,
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { mockUser, mockItemTypes, mockCollections } from '@/lib/mock-data';

const ICON_MAP: Record<string, LucideIcon> = {
  code: Braces,
  sparkles: Sparkles,
  terminal: Terminal,
  'file-text': StickyNote,
  folder: Folder,
  image: Image,
  link: LinkIcon,
};

interface CollapsibleSectionProps {
  open: boolean;
  children: React.ReactNode;
}

function CollapsibleSection({ open, children }: CollapsibleSectionProps) {
  return (
    <div
      className={cn(
        'grid transition-[grid-template-rows,opacity] duration-200 ease-in-out',
        open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
      )}
    >
      <div className="overflow-hidden">{children}</div>
    </div>
  );
}

interface SidebarProps {
  onClose?: () => void;
}

export default function Sidebar({ onClose }: SidebarProps) {
  const [typesOpen, setTypesOpen] = useState(true);
  const [collectionsOpen, setCollectionsOpen] = useState(true);

  const favoriteCollections = mockCollections.filter((c) => c.isFavorite);
  const otherCollections = mockCollections.filter((c) => !c.isFavorite);

  const userInitials = mockUser.name
    .split(' ')
    .map((n) => n[0])
    .join('');

  return (
    <div className="flex h-full flex-col overflow-hidden">
      {onClose && (
        <div className="flex items-center justify-end border-b border-sidebar-border px-3 py-2">
          <button
            onClick={onClose}
            aria-label="Close sidebar"
            className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {/* Types section */}
        <div>
          <button
            onClick={() => setTypesOpen((o) => !o)}
            className="flex w-full items-center justify-between rounded-md px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
          >
            Types
            <ChevronDown
              className={cn(
                'h-3.5 w-3.5 transition-transform duration-200',
                !typesOpen && '-rotate-90'
              )}
            />
          </button>
          <CollapsibleSection open={typesOpen}>
            <nav className="mt-1 space-y-0.5 pb-1">
              {mockItemTypes.map((type) => {
                const Icon = ICON_MAP[type.icon] ?? Folder;
                const slug = type.name.toLowerCase();
                return (
                  <Link
                    key={type.id}
                    href={`/items/${slug}`}
                    className="flex items-center gap-2.5 rounded-md px-2 py-1.5 text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors group"
                  >
                    <Icon className="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-sidebar-accent-foreground" />
                    <span className="flex-1">{type.name}</span>
                    <span className="text-xs text-muted-foreground">{type.count}</span>
                  </Link>
                );
              })}
            </nav>
          </CollapsibleSection>
        </div>

        {/* Divider */}
        <div className="h-px bg-sidebar-border my-2" />

        {/* Collections section */}
        <div>
          <button
            onClick={() => setCollectionsOpen((o) => !o)}
            className="flex w-full items-center justify-between rounded-md px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
          >
            Collections
            <ChevronDown
              className={cn(
                'h-3.5 w-3.5 transition-transform duration-200',
                !collectionsOpen && '-rotate-90'
              )}
            />
          </button>
          <CollapsibleSection open={collectionsOpen}>
            <div className="space-y-3 pb-1">
              {/* Favorites */}
              {favoriteCollections.length > 0 && (
                <div>
                  <p className="px-2 py-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                    Favorites
                  </p>
                  <nav className="space-y-0.5">
                    {favoriteCollections.map((col) => (
                      <Link
                        key={col.id}
                        href={`/collections/${col.id}`}
                        className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors group"
                      >
                        <Folder className="h-3.5 w-3.5 shrink-0 text-muted-foreground group-hover:text-sidebar-accent-foreground" />
                        <span className="flex-1 truncate">{col.name}</span>
                        <Star className="h-3.5 w-3.5 shrink-0 fill-yellow-400 text-yellow-400" />
                      </Link>
                    ))}
                  </nav>
                </div>
              )}

              {/* All Collections */}
              {otherCollections.length > 0 && (
                <div>
                  <p className="px-2 py-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                    All Collections
                  </p>
                  <nav className="space-y-0.5">
                    {otherCollections.map((col) => (
                      <Link
                        key={col.id}
                        href={`/collections/${col.id}`}
                        className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors group"
                      >
                        <Folder className="h-3.5 w-3.5 shrink-0 text-muted-foreground group-hover:text-sidebar-accent-foreground" />
                        <span className="flex-1 truncate">{col.name}</span>
                        <span className="text-xs text-muted-foreground">{col.itemCount}</span>
                      </Link>
                    ))}
                  </nav>
                </div>
              )}
            </div>
          </CollapsibleSection>
        </div>
      </div>

      {/* User avatar area */}
      <div className="border-t border-sidebar-border p-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sidebar-primary text-sidebar-primary-foreground text-xs font-bold">
            {userInitials}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-sidebar-foreground truncate">{mockUser.name}</p>
            <p className="text-xs text-muted-foreground truncate">{mockUser.email}</p>
          </div>
          <button className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors">
            <Settings className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
