'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { BookOpen, LayoutDashboard, CalendarCheck, BookMarked, LogOut, ChevronRight } from 'lucide-react';

const navItems = [
  { href: '/portal/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/portal/hafalan', label: 'Progres Hafalan', icon: BookMarked },
  { href: '/portal/absensi', label: 'Riwayat Absensi', icon: CalendarCheck },
];

export default function PortalSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
  };

  return (
    <aside className="hidden md:flex flex-col w-64 bg-gradient-to-b from-teal-700 to-teal-900 min-h-screen fixed left-0 top-0">
      <div className="flex items-center gap-3 px-6 py-5 border-b border-teal-600/50">
        <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center">
          <BookOpen className="w-5 h-5 text-white" />
        </div>
        <div>
          <p className="text-white font-bold text-sm leading-tight">Raudhlatul Ulum</p>
          <p className="text-teal-200 text-xs">Portal Wali Santri</p>
        </div>
      </div>
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;
          return (
            <Link key={item.href} href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${active ? 'bg-white/20 text-white' : 'text-teal-100 hover:bg-white/10 hover:text-white'}`}>
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span className="flex-1">{item.label}</span>
              {active && <ChevronRight className="w-3 h-3 opacity-70" />}
            </Link>
          );
        })}
      </nav>
      <div className="px-3 py-4 border-t border-teal-600/50">
        <button onClick={handleLogout}
          className="flex w-full items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-teal-100 hover:bg-red-500/20 hover:text-red-200 transition-all">
          <LogOut className="w-4 h-4" />
          <span>Keluar</span>
        </button>
      </div>
    </aside>
  );
}
