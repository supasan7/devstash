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

export const TYPE_ICON_MAP: Record<string, LucideIcon> = {
  type_snippet: Braces,
  type_prompt: Sparkles,
  type_command: Terminal,
  type_note: StickyNote,
  type_file: Folder,
  type_image: ImageIcon,
  type_url: LinkIcon,
};

export const TYPE_COLOR_MAP: Record<string, string> = {
  type_snippet: 'text-sky-400',
  type_prompt: 'text-violet-400',
  type_command: 'text-emerald-400',
  type_note: 'text-amber-400',
  type_file: 'text-orange-400',
  type_image: 'text-pink-400',
  type_url: 'text-cyan-400',
};

export function getTypeIcon(typeId: string): LucideIcon {
  return TYPE_ICON_MAP[typeId] ?? Folder;
}

export function getTypeColor(typeId: string): string {
  return TYPE_COLOR_MAP[typeId] ?? 'text-muted-foreground';
}
