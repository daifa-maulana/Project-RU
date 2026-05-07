import { BookOpen, MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-2 font-bold text-xl text-white mb-4">
            <BookOpen className="w-6 h-6 text-emerald-500" />
            <span>Raudhlatul Ulum</span>
          </div>
          <p className="text-sm text-slate-400 mb-6">
            Mencetak generasi penghafal Al-Qur'an yang berakhlak mulia, berwawasan global, dan bermanfaat bagi umat.
          </p>
        </div>
        <div>
          <h3 className="font-semibold text-white mb-4">Hubungi Kami</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-500" />
              <span>Jl. Pesantren No. 1, Bandung, Jawa Barat</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-emerald-500" />
              <span>+62 812-3456-7890</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-emerald-500" />
              <span>info@raudhlatululum.com</span>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-white mb-4">Akses Portal</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/login" className="hover:text-emerald-400 transition-colors">Login Admin & Ustadz</a></li>
            <li><a href="/login" className="hover:text-emerald-400 transition-colors">Login Wali Santri</a></li>
            <li><a href="/pendaftaran" className="hover:text-emerald-400 transition-colors">Informasi Pendaftaran</a></li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-12 pt-8 border-t border-slate-800 text-sm text-center text-slate-500">
        &copy; {new Date().getFullYear()} Pondok Pesantren Tahfidz Raudhlatul Ulum. All rights reserved.
      </div>
    </footer>
  );
}
