'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  BookMarked, 
  CalendarCheck, 
  Award, 
  TrendingUp, 
  ChevronRight,
  Heart,
  Star,
  Clock,
  MessageSquare,
  ShieldCheck,
  Zap,
  Loader2
} from 'lucide-react';
import Link from 'next/link';

interface SantriData {
  id: string;
  nis: string;
  namaLengkap: string;
  kelas: {
    namaKelas: string;
  };
  jurnalTahfidz: any[];
  absensi: any[];
}

const statusColor: Record<string, string> = {
  HADIR: 'text-emerald-500 bg-emerald-50 border-emerald-100',
  SAKIT: 'text-amber-500 bg-amber-50 border-amber-100',
  IZIN: 'text-blue-500 bg-blue-50 border-blue-100',
  ALFA: 'text-red-500 bg-red-50 border-red-100',
};

export default function PortalDashboard() {
  const [data, setData] = useState<SantriData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchChildData();
  }, []);

  const fetchChildData = async () => {
    setLoading(true);
    try {
      // For demo, we fetch the first santri as the "child"
      const res = await fetch('/api/santri');
      const santris = await res.json();
      if (santris.length > 0) {
        // Fetch detailed data for this santri (we need an API for this or use client filtering)
        // For now, we take the basic data and add some mock journals if empty
        const child = santris[0];
        setData(child);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="h-[80vh] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-12 h-12 animate-spin text-teal-600" />
        <p className="text-slate-400 font-bold animate-pulse">Menghubungkan ke Database...</p>
      </div>
    );
  }

  const child = data || {
    namaLengkap: 'Ahmad Fauzan',
    nis: '001',
    kelas: { namaKelas: 'Kelas 3A' },
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 pb-20">
      
      {/* Premium Parent Welcome Hero */}
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-emerald-600 rounded-[3rem] blur-2xl opacity-20 group-hover:opacity-30 transition-opacity" />
        <Card className="border-none bg-gradient-to-br from-teal-800 via-teal-900 to-slate-900 text-white rounded-[3rem] overflow-hidden shadow-2xl relative">
          <CardContent className="p-8 md:p-12">
             <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="relative">
                   <div className="w-28 h-28 md:w-36 md:h-36 rounded-[2.5rem] bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center p-2">
                      <div className="w-full h-full rounded-[2rem] bg-gradient-to-tr from-emerald-400 to-teal-300 flex items-center justify-center text-teal-900 text-4xl font-black shadow-inner">
                         {child.namaLengkap.charAt(0)}
                      </div>
                   </div>
                   <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-emerald-500 rounded-2xl flex items-center justify-center border-4 border-teal-900 shadow-lg">
                      <ShieldCheck className="w-5 h-5 text-white" />
                   </div>
                </div>

                <div className="flex-1 text-center md:text-left space-y-3">
                   <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full border border-white/5 backdrop-blur-sm">
                      <Zap className="w-3 h-3 text-emerald-400 fill-emerald-400" />
                      <span className="text-[10px] font-black tracking-[0.2em] uppercase">Status Aktif: Santri Tahfidz</span>
                   </div>
                   <h1 className="text-4xl md:text-5xl font-black tracking-tight">{child.namaLengkap}</h1>
                   <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4">
                      <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-2xl border border-white/5">
                         <Star className="w-4 h-4 text-amber-400" />
                         <span className="text-xs font-bold">NIS: {child.nis}</span>
                      </div>
                      <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-2xl border border-white/5">
                         <BookMarked className="w-4 h-4 text-emerald-400" />
                         <span className="text-xs font-bold">{(child as any).kelas?.namaKelas || 'Kelas -'}</span>
                      </div>
                   </div>
                </div>
             </div>
          </CardContent>
          <div className="absolute top-0 right-0 p-8 opacity-10">
             <Heart className="w-32 h-32 rotate-12" />
          </div>
        </Card>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Hafalan Selesai', value: '2.5', sub: 'Juz', icon: BookMarked, color: 'text-teal-600', bg: 'bg-teal-50' },
          { label: 'Total Setoran', value: '92', sub: 'Kali', icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Persen Kehadiran', value: '94', sub: '%', icon: CalendarCheck, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Peringkat Kelas', value: '3', sub: 'Besar', icon: Award, color: 'text-amber-600', bg: 'bg-amber-50' },
        ].map(item => {
          const Icon = item.icon;
          return (
            <Card key={item.label} className="border-none shadow-sm rounded-[2rem] bg-white hover:shadow-xl hover:-translate-y-1 transition-all group overflow-hidden">
              <CardContent className="p-6 relative">
                <div className={`w-12 h-12 ${item.bg} ${item.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex items-baseline gap-1">
                   <p className="text-3xl font-black text-slate-900 tracking-tighter">{item.value}</p>
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.sub}</p>
                </div>
                <p className="text-[10px] font-bold text-slate-500 mt-1 uppercase tracking-wider">{item.label}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Progress Timeline */}
        <Card className="lg:col-span-7 border-none shadow-sm rounded-[2.5rem] bg-white overflow-hidden">
          <CardHeader className="bg-slate-50/50 border-b border-slate-100 p-8">
            <CardTitle className="text-lg font-black text-slate-800 flex items-center gap-3">
              <div className="w-10 h-10 bg-teal-100 rounded-xl flex items-center justify-center">
                 <BookMarked className="w-5 h-5 text-teal-600" />
              </div>
              Kemajuan Hafalan Terakhir
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="space-y-6">
              {[
                { surah: 'Al-Fatihah', selesai: true, predikat: 'A', tanggal: '01 Mei' },
                { surah: 'Al-Baqarah (1-141)', selesai: true, predikat: 'A', tanggal: '04 Mei' },
                { surah: 'Al-Baqarah (142-286)', selesai: true, predikat: 'B', tanggal: '06 Mei' },
                { surah: 'Ali Imran (1-91)', selesai: false, predikat: '-', tanggal: 'On Progress' },
              ].map((h, i) => (
                <div key={i} className="relative pl-10 group">
                  {i !== 3 && <div className="absolute left-[19px] top-10 bottom-[-24px] w-0.5 bg-slate-100" />}
                  <div className={`absolute left-0 top-1 w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                    h.selesai ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-100' : 'bg-slate-100 text-slate-400'
                  }`}>
                    {h.selesai ? <ShieldCheck className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
                  </div>
                  <div className="p-5 rounded-2xl bg-slate-50/50 border border-transparent hover:border-slate-100 hover:bg-white hover:shadow-sm transition-all">
                    <div className="flex items-center justify-between mb-2">
                       <h4 className="text-sm font-black text-slate-800">{h.surah}</h4>
                       <span className="text-[10px] font-bold text-slate-400 uppercase">{h.tanggal}</span>
                    </div>
                    {h.selesai && (
                       <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded-md text-[9px] font-black tracking-widest uppercase bg-emerald-100 text-emerald-700">Predikat: {h.predikat}</span>
                          <div className="h-1 bg-slate-200 flex-1 rounded-full overflow-hidden">
                             <div className="h-full bg-emerald-500 w-full" />
                          </div>
                       </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8">
               <Button className="w-full h-14 rounded-2xl bg-slate-900 hover:bg-teal-600 text-white font-bold gap-2 transition-all">
                  Lihat Riwayat Lengkap <ChevronRight className="w-4 h-4" />
               </Button>
            </div>
          </CardContent>
        </Card>

        {/* Attendance Sidebar */}
        <div className="lg:col-span-5 space-y-8">
           <Card className="border-none shadow-sm rounded-[2.5rem] bg-white overflow-hidden">
              <CardHeader className="bg-slate-50/50 border-b border-slate-100 p-8">
                <CardTitle className="text-base font-black text-slate-800 flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                    <CalendarCheck className="w-5 h-5 text-blue-600" />
                  </div>
                  Riwayat Kehadiran
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-3">
                  {[
                    { tanggal: '06 Mei 2026', status: 'HADIR', ket: 'Tepat Waktu' },
                    { tanggal: '05 Mei 2026', status: 'HADIR', ket: 'Tepat Waktu' },
                    { tanggal: '04 Mei 2026', status: 'IZIN', ket: 'Acara Keluarga' },
                  ].map((a, i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-2xl border border-slate-50 bg-slate-50/30">
                      <div>
                        <p className="text-xs font-black text-slate-800">{a.tanggal}</p>
                        <p className="text-[10px] text-slate-400 font-medium">{a.ket}</p>
                      </div>
                      <span className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider border ${statusColor[a.status]}`}>
                        {a.status}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
           </Card>

           <Card className="border-none shadow-sm rounded-[2.5rem] bg-gradient-to-br from-teal-50 to-emerald-50 border border-teal-100 overflow-hidden">
              <CardContent className="p-8">
                 <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-teal-600 rounded-2xl flex items-center justify-center shadow-lg shadow-teal-100">
                       <MessageSquare className="w-6 h-6 text-white" />
                    </div>
                    <div>
                       <p className="text-[10px] font-black text-teal-600 uppercase tracking-widest">Pesan Ustadz</p>
                       <p className="text-sm font-black text-slate-800">Ust. Ahmad Syafi'i</p>
                    </div>
                 </div>
                 <p className="text-xs text-slate-600 leading-relaxed italic">
                    "Alhamdulillah, perkembangan hafalan ananda menunjukkan peningkatan signifikan. Tajwidnya sudah mulai konsisten."
                 </p>
              </CardContent>
           </Card>
        </div>
      </div>
    </div>
  );
}
