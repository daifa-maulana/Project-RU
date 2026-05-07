'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  BookOpen,
  LayoutDashboard,
  Users,
  GraduationCap,
  CalendarCheck,
  BookMarked,
  UserCog,
  FileText,
  Menu,
  X,
  LogOut,
  ChevronRight,
} from 'lucide-react';

const navItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: ['ADMIN', 'USTADZ'] },
  { href: '/admin/santri', label: 'Data Santri', icon: GraduationCap, roles: ['ADMIN'] },
  { href: '/admin/ustadz', label: 'Data Ustadz', icon: Users, roles: ['ADMIN'] },
  { href: '/admin/kelas', label: 'Data Kelas', icon: BookOpen, roles: ['ADMIN'] },
  { href: '/admin/absensi', label: 'Absensi Harian', icon: CalendarCheck, roles: ['ADMIN', 'USTADZ'] },
  { href: '/admin/jurnal', label: 'Jurnal Tahfidz', icon: BookMarked, roles: ['ADMIN', 'USTADZ'] },
  { href: '/admin/akun', label: 'Manajemen Akun', icon: UserCog, roles: ['ADMIN'] },
  { href: '/admin/rekap', label: 'Rekap & Ijazah', icon: FileText, roles: ['ADMIN', 'USTADZ'] },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    // Simple way to get role from cookie for client-side filtering
    const cookies = document.cookie.split('; ');
    const roleCookie = cookies.find(row => row.startsWith('auth-role='));
    if (roleCookie) {
      setRole(roleCookie.split('=')[1]);
    }
  }, []);

  const filteredItems = navItems.filter(item => !role || item.roles.includes(role));

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-emerald-700/50">
        <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center">
          <BookOpen className="w-5 h-5 text-white" />
        </div>
        <div>
          <p className="text-white font-bold text-sm leading-tight">Raudhlatul Ulum</p>
          <p className="text-emerald-200 text-xs">Panel Admin</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {filteredItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group ${
                active
                  ? 'bg-white/20 text-white shadow-sm'
                  : 'text-emerald-100 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span className="flex-1">{item.label}</span>
              {active && <ChevronRight className="w-3 h-3 opacity-70" />}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="px-3 py-4 border-t border-emerald-700/50">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-emerald-100 hover:bg-red-500/20 hover:text-red-200 transition-all"
        >
          <LogOut className="w-4 h-4" />
          <span>Keluar</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile hamburger */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-emerald-700 text-white rounded-xl shadow-lg"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 z-30 bg-black/50"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile sidebar */}
      <aside
        className={`md:hidden fixed inset-y-0 left-0 z-40 w-64 bg-gradient-to-b from-emerald-800 to-emerald-900 transform transition-transform duration-300 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <SidebarContent />
      </aside>

      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-gradient-to-b from-emerald-800 to-emerald-900 min-h-screen fixed left-0 top-0">
        <SidebarContent />
      </aside>
    </>
  );
}
