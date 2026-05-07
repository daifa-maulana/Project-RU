'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  GraduationCap, 
  Users, 
  CalendarCheck, 
  BookMarked, 
  TrendingUp, 
  Award, 
  ArrowRight,
  PlusCircle,
  FileText,
  UserCheck,
  Bell,
  Calendar,
  ChevronRight,
  Clock,
  Sparkles,
  PieChart
} from 'lucide-react';
import Link from 'next/link';

const stats = [
  { title: 'Total Santri', value: '128', icon: GraduationCap, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { title: 'Total Ustadz', value: '12', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
  { title: 'Kehadiran Hari Ini', value: '115', icon: CalendarCheck, color: 'text-teal-600', bg: 'bg-teal-50' },
  { title: 'Setoran Bulan Ini', value: '432', icon: BookMarked, color: 'text-violet-600', bg: 'bg-violet-50' },
];

const recentSetoran = [
  { nama: 'Ahmad Fauzan', surah: 'Al-Baqarah', ayat: '1-20', jenis: 'Ziyadah', predikat: 'A', time: '10 menit yang lalu' },
  { nama: 'Muhammad Rizki', surah: 'Ali Imran', ayat: '10-25', jenis: 'Muraja\'ah', predikat: 'B', time: '1 jam yang lalu' },
  { nama: 'Zaky Ramadhan', surah: 'An-Nisa', ayat: '1-15', jenis: 'Ziyadah', predikat: 'A', time: '3 jam yang lalu' },
];

const activities = [
  { user: 'Ust. Syafi\'i', action: 'Mengabsen Kelas 3A', time: '08:00', type: 'absensi' },
  { user: 'Admin', action: 'Menambah Santri Baru', time: 'Yesterday', type: 'system' },
  { user: 'Ust. Mansur', action: 'Validasi Ijazah', time: 'Yesterday', type: 'rekap' },
];

const predikatColor: Record<string, string> = {
  A: 'bg-emerald-100 text-emerald-700',
  B: 'bg-blue-100 text-blue-700',
  C: 'bg-amber-100 text-amber-700',
  D: 'bg-red-100 text-red-700',
};

export default function AdminDashboard() {
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const cookies = document.cookie.split('; ');
    const roleCookie = cookies.find(row => row.startsWith('auth-role='));
    if (roleCookie) {
      setRole(roleCookie.split('=')[1]);
    }
  }, []);

  const isUstadz = role === 'USTADZ';

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header with Welcome Message */}
      <div className="relative overflow-hidden bg-gradient-to-r from-emerald-800 to-emerald-600 rounded-3xl p-8 text-white shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full w-fit backdrop-blur-sm border border-white/10">
              <Sparkles className="w-3 h-3 text-emerald-200" />
              <span className="text-[10px] font-bold uppercase tracking-wider">Pusat Informasi Raudhlatul Ulum</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              Assalamu'alaikum, {isUstadz ? 'Ustadz' : 'Administrator'}
            </h1>
            <p className="text-emerald-100/80 max-w-xl">
              Sistem sudah tersinkronisasi. Semua perubahan data akan langsung terlihat oleh Wali Santri dan Staf Pengajar lainnya.
            </p>
          </div>
          <div className="flex -space-x-3 overflow-hidden">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="inline-block h-12 w-12 rounded-full ring-4 ring-emerald-700 bg-emerald-100 flex items-center justify-center text-emerald-800 font-bold text-xs">
                U{i}
              </div>
            ))}
            <div className="flex items-center justify-center h-12 w-12 rounded-full ring-4 ring-emerald-700 bg-emerald-900 text-[10px] font-bold">+12</div>
          </div>
        </div>
        {/* Decorative Circles */}
        <div className="absolute -right-10 -top-10 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute -left-10 -bottom-10 w-48 h-48 bg-emerald-900/20 rounded-full blur-2xl" />
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        {/* Left Column: Stats & Actions */}
        <div className="xl:col-span-3 space-y-8">
          
          {/* Quick Actions Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link href="/admin/absensi" className="group">
              <Card className="border-none shadow-sm hover:shadow-xl hover:shadow-emerald-100 transition-all hover:-translate-y-2 bg-white overflow-hidden relative">
                <CardContent className="p-6">
                  <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-500 shadow-inner">
                    <UserCheck className="w-7 h-7" />
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-lg">Absensi Harian</h3>
                  <p className="text-slate-500 text-sm mt-1">Kelola kehadiran santri per kelas secara cepat.</p>
                  <div className="mt-6 flex items-center text-emerald-600 font-bold text-xs">
                    Mulai Mengabsen <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-2 transition-transform" />
                  </div>
                </CardContent>
                <div className="absolute bottom-0 left-0 h-1 bg-emerald-500 w-0 group-hover:w-full transition-all duration-500" />
              </Card>
            </Link>

            <Link href="/admin/jurnal" className="group">
              <Card className="border-none shadow-sm hover:shadow-xl hover:shadow-blue-100 transition-all hover:-translate-y-2 bg-white overflow-hidden relative">
                <CardContent className="p-6">
                  <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 shadow-inner">
                    <BookMarked className="w-7 h-7" />
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-lg">Input Hafalan</h3>
                  <p className="text-slate-500 text-sm mt-1">Catat kemajuan Ziyadah dan Muraja'ah santri.</p>
                  <div className="mt-6 flex items-center text-blue-600 font-bold text-xs">
                    Input Setoran <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-2 transition-transform" />
                  </div>
                </CardContent>
                <div className="absolute bottom-0 left-0 h-1 bg-blue-500 w-0 group-hover:w-full transition-all duration-500" />
              </Card>
            </Link>

            <Link href="/admin/rekap" className="group">
              <Card className="border-none shadow-sm hover:shadow-xl hover:shadow-amber-100 transition-all hover:-translate-y-2 bg-white overflow-hidden relative">
                <CardContent className="p-6">
                  <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-amber-600 group-hover:text-white transition-all duration-500 shadow-inner">
                    <PieChart className="w-7 h-7" />
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-lg">Rekap & Analisa</h3>
                  <p className="text-slate-500 text-sm mt-1">Laporan perkembangan dan cetak ijazah digital.</p>
                  <div className="mt-6 flex items-center text-amber-600 font-bold text-xs">
                    Lihat Laporan <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-2 transition-transform" />
                  </div>
                </CardContent>
                <div className="absolute bottom-0 left-0 h-1 bg-amber-500 w-0 group-hover:w-full transition-all duration-500" />
              </Card>
            </Link>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.title} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:border-emerald-200 transition-colors">
                  <div className={`w-10 h-10 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center mb-3`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <p className="text-2xl font-black text-slate-900">{stat.value}</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{stat.title}</p>
                </div>
              );
            })}
          </div>

          {/* Recent Activity Table */}
          <Card className="border-none shadow-sm rounded-[2rem] overflow-hidden bg-white">
            <CardHeader className="bg-slate-50/50 border-b border-slate-100 px-8 py-6 flex flex-row items-center justify-between">
              <CardTitle className="text-lg font-black text-slate-800 flex items-center gap-3">
                <div className="p-2 bg-emerald-100 rounded-lg">
                  <Clock className="w-4 h-4 text-emerald-700" />
                </div>
                Log Setoran Terakhir
              </CardTitle>
              <Link href="/admin/jurnal" className="text-xs font-bold text-emerald-600 hover:underline">Semua Riwayat</Link>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 bg-slate-50/30">
                      <th className="px-8 py-4">Santri</th>
                      <th className="px-8 py-4">Hafalan</th>
                      <th className="px-8 py-4 text-center">Status</th>
                      <th className="px-8 py-4 text-right">Waktu</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {recentSetoran.map((item, i) => (
                      <tr key={i} className="group hover:bg-slate-50/50 transition-colors">
                        <td className="px-8 py-5">
                          <p className="font-bold text-slate-800 text-sm">{item.nama}</p>
                        </td>
                        <td className="px-8 py-5">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-medium text-slate-600">{item.surah}</span>
                            <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded uppercase">{item.jenis}</span>
                          </div>
                        </td>
                        <td className="px-8 py-5 text-center">
                          <span className={`inline-flex w-8 h-8 items-center justify-center rounded-xl text-xs font-black ${predikatColor[item.predikat]}`}>
                            {item.predikat}
                          </span>
                        </td>
                        <td className="px-8 py-5 text-right">
                          <span className="text-[10px] font-bold text-slate-400">{item.time}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Widgets */}
        <div className="space-y-8">
          {/* Notification Widget */}
          <Card className="border-none shadow-sm rounded-3xl bg-white overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-black text-slate-800 flex items-center gap-2">
                <Bell className="w-4 h-4 text-red-500" />
                Pemberitahuan
              </CardTitle>
            </CardHeader>
            <CardContent className="px-6 pb-6">
              <div className="space-y-4">
                <div className="p-4 bg-red-50 rounded-2xl border border-red-100 flex gap-3">
                  <div className="w-8 h-8 bg-red-500 rounded-full shrink-0 flex items-center justify-center text-white">
                    <span className="text-[10px] font-bold">!</span>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-red-900 leading-snug">Rapat Bulanan Pengajar</p>
                    <p className="text-[10px] text-red-700/70">Pukul 14:00 di Aula Utama</p>
                  </div>
                </div>
                <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 flex gap-3">
                  <div className="w-8 h-8 bg-emerald-500 rounded-full shrink-0 flex items-center justify-center text-white">
                    <Calendar className="w-3 h-3" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-emerald-900 leading-snug">Penerimaan Santri Baru</p>
                    <p className="text-[10px] text-emerald-700/70">Dibuka s/d 12 Mei 2026</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Agenda Widget */}
          <Card className="border-none shadow-sm rounded-3xl bg-slate-900 text-white overflow-hidden relative">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-black flex items-center gap-2">
                <Calendar className="w-4 h-4 text-emerald-400" />
                Agenda Mendatang
              </CardTitle>
            </CardHeader>
            <CardContent className="px-6 pb-6">
              <div className="space-y-4 relative z-10">
                {activities.map((act, i) => (
                  <div key={i} className="flex items-start gap-3 border-l-2 border-emerald-500/30 pl-4 py-1">
                    <div className="space-y-1">
                      <p className="text-xs font-bold text-emerald-400">{act.time}</p>
                      <p className="text-[10px] font-medium text-slate-300">{act.action}</p>
                      <p className="text-[9px] text-slate-500 uppercase font-black tracking-widest">{act.user}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Calendar className="w-20 h-20" />
              </div>
            </CardContent>
          </Card>

          {/* Birthdays or Small Wins */}
          <Card className="border-none shadow-sm rounded-3xl bg-white overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                  <Award className="w-5 h-5 text-amber-600" />
                </div>
                <p className="font-black text-slate-800 text-sm">Santri Berprestasi</p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-emerald-600 text-white rounded-lg flex items-center justify-center font-bold text-[10px]">AF</div>
                    <div>
                      <p className="font-bold text-xs text-slate-800">Ahmad Fauzan</p>
                      <p className="text-[9px] text-slate-500">Target Hafalan Terlampaui</p>
                    </div>
                  </div>
                  <ChevronRight className="w-3 h-3 text-slate-300" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
