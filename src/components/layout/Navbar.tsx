import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { BookOpen } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-emerald-800">
          <BookOpen className="w-6 h-6" />
          <span>Raudhlatul Ulum</span>
        </Link>
        <div className="hidden md:flex gap-8 text-sm font-medium text-slate-600">
          <Link href="#profil" className="hover:text-emerald-600 transition-colors">Profil</Link>
          <Link href="#program" className="hover:text-emerald-600 transition-colors">Program Tahfidz</Link>
          <Link href="#fasilitas" className="hover:text-emerald-600 transition-colors">Fasilitas</Link>
        </div>
        <div className="flex gap-3">
          <Link href="/login">
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full px-6 shadow-md shadow-emerald-200">
              Portal Admin & Wali
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
