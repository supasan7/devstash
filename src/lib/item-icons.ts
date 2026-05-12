import {
  Braces,
  Sparkles,
  Terminal,
  StickyNote,
  Folder,
  Image as ImageIcon,
  Link as LinkIcon,
  type LucideIcon,
} from 'lucide-react';

const ICON_BY_TYPE: Record<string, LucideIcon> = {
  snippet: Braces,
  prompt: Sparkles,
  command: Terminal,
  note: StickyNote,
  file: Folder,
  image: ImageIcon,
  link: LinkIcon,
};

const TEXT_COLOR_BY_TYPE: Record<string, string> = {
  snippet: 'text-sky-400',
  prompt: 'text-violet-400',
  command: 'text-emerald-400',
  note: 'text-amber-400',
  file: 'text-orange-400',
  image: 'text-pink-400',
  link: 'text-cyan-400',
};

const BORDER_COLOR_BY_TYPE: Record<string, string> = {
  snippet: 'border-sky-400/40',
  prompt: 'border-violet-400/40',
  command: 'border-emerald-400/40',
  note: 'border-amber-400/40',
  file: 'border-orange-400/40',
  image: 'border-pink-400/40',
  link: 'border-cyan-400/40',
};

// Legacy aliases used by mock data (PinnedItems / RecentItems still read mock-data.ts)
const LEGACY_TO_NEW: Record<string, string> = {
  type_snippet: 'snippet',
  type_prompt: 'prompt',
  type_command: 'command',
  type_note: 'note',
  type_file: 'file',
  type_image: 'image',
  type_url: 'link',
};

function resolve(typeId: string): string {
  return LEGACY_TO_NEW[typeId] ?? typeId;
}

export function getTypeIcon(typeId: string): LucideIcon {
  return ICON_BY_TYPE[resolve(typeId)] ?? Folder;
}

export function getTypeColor(typeId: string): string {
  return TEXT_COLOR_BY_TYPE[resolve(typeId)] ?? 'text-muted-foreground';
}

export function getTypeBorderColor(typeId: string): string {
  return BORDER_COLOR_BY_TYPE[resolve(typeId)] ?? 'border-border';
}
