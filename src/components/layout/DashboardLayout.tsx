'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import TopBar from './TopBar';
import Sidebar from './Sidebar';
import { Sheet, SheetContent } from '@/components/ui/sheet';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [desktopOpen, setDesktopOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleToggle = () => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      setMobileOpen((o) => !o);
    } else {
      setDesktopOpen((o) => !o);
    }
  };

  return (
    <div className="flex h-screen flex-col">
      <TopBar onToggleSidebar={handleToggle} />
      <div className="flex flex-1 overflow-hidden">
        {/* Desktop: inline collapsible sidebar */}
        <aside
          className={cn(
            'hidden md:flex flex-col shrink-0 border-r border-sidebar-border bg-sidebar overflow-hidden transition-[width] duration-200 ease-in-out',
            desktopOpen ? 'w-60' : 'w-0'
          )}
        >
          <Sidebar />
        </aside>

        {/* Mobile: Sheet drawer */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetContent
            side="left"
            showCloseButton={false}
            className="w-60 p-0 bg-sidebar border-sidebar-border md:hidden"
          >
            <Sidebar onClose={() => setMobileOpen(false)} />
          </SheetContent>
        </Sheet>

        <main className="flex-1 overflow-auto bg-background p-6">{children}</main>
      </div>
    </div>
  );
}
