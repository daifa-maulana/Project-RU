'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  FileText, 
  Download, 
  Award, 
  BookMarked, 
  Search, 
  Filter, 
  ChevronRight,
  Printer,
  ShieldCheck,
  Star,
  PieChart,
  Loader2
} from 'lucide-react';
import { format } from 'date-fns';
import { id as localeId } from 'date-fns/locale';

interface Santri {
  id: string;
  nis: string;
  namaLengkap: string;
}

const semesterList = ['Ganjil 2025/2026', 'Genap 2025/2026', 'Ganjil 2024/2025'];

const rekapData = [
  { surah: 'Al-Fatihah', ayat: '1-7', juzKe: 1, totalSetoran: 12, predikat: 'A', selesai: true },
  { surah: 'Al-Baqarah', ayat: '1-141', juzKe: 1, totalSetoran: 32, predikat: 'A', selesai: true },
  { surah: 'Al-Baqarah', ayat: '142-286', juzKe: 2, totalSetoran: 28, predikat: 'B', selesai: true },
  { surah: 'Ali Imran', ayat: '1-91', juzKe: 3, totalSetoran: 18, predikat: 'A', selesai: false },
];

const predikatColor: Record<string, string> = {
  A: 'bg-emerald-100 text-emerald-700',
  B: 'bg-blue-100 text-blue-700',
  C: 'bg-amber-100 text-amber-700',
  D: 'bg-red-100 text-red-700',
};

export default function RekapPage() {
  const [santriList, setSantriList] = useState<Santri[]>([]);
  const [selectedSantri, setSelectedSantri] = useState<Santri | null>(null);
  const [selectedSemester, setSelectedSemester] = useState(semesterList[0]);
  const [loading, setLoading] = useState(true);
  const [printing, setPrinting] = useState(false);

  useEffect(() => {
    fetchSantri();
  }, []);

  const fetchSantri = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/santri');
      const data = await res.json();
      setSantriList(data);
      if (data.length > 0) setSelectedSantri(data[0]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    setPrinting(true);
    setTimeout(() => {
      window.print();
      setPrinting(false);
    }, 500);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700 pb-20">
      
      {/* Premium Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-[10px] font-black uppercase tracking-wider mb-2">
            <Award className="w-3 h-3" /> Sertifikasi Tahfidz
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Rekapitulasi & Ijazah</h1>
          <p className="text-slate-500 font-medium italic">
            Evaluasi perkembangan hafalan dan penerbitan dokumen resmi.
          </p>
        </div>
        
        <div className="flex items-center gap-3">
           <Button onClick={handlePrint} disabled={printing} className="rounded-2xl px-8 py-6 bg-slate-900 hover:bg-emerald-600 text-white font-black shadow-xl shadow-slate-200 gap-2 transition-all">
              {printing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Printer className="w-4 h-4" />}
              Cetak Ijazah Digital
           </Button>
        </div>
      </div>

      {/* Control Bar */}
      <Card className="border-none shadow-sm rounded-[2.5rem] bg-white p-6 border border-slate-100">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Pilih Santri</label>
              <select 
                value={selectedSantri?.id} 
                onChange={e => setSelectedSantri(santriList.find(s => s.id === e.target.value) || null)}
                className="w-full h-14 bg-slate-50 border-none rounded-2xl px-4 text-sm font-black text-slate-700 focus:ring-2 focus:ring-emerald-500/20 outline-none"
              >
                {santriList.map(s => <option key={s.id} value={s.id}>{s.namaLengkap}</option>)}
              </select>
           </div>
           <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Semester Akademik</label>
              <select 
                value={selectedSemester} 
                onChange={e => setSelectedSemester(e.target.value)}
                className="w-full h-14 bg-slate-50 border-none rounded-2xl px-4 text-sm font-black text-slate-700 focus:ring-2 focus:ring-emerald-500/20 outline-none"
              >
                {semesterList.map(s => <option key={s}>{s}</option>)}
              </select>
           </div>
        </div>
      </Card>

      {/* Summary Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {[
          { label: 'Juz Selesai', value: '2.5', icon: BookMarked, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Total Ayat', value: '432', icon: Star, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'Total Setoran', value: '90', icon: PieChart, color: 'text-blue-600', bg: 'bg-blue-50' },
        ].map(item => {
           const Icon = item.icon;
           return (
            <div key={item.label} className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 flex items-center gap-5">
              <div className={`w-12 h-12 ${item.bg} ${item.color} rounded-2xl flex items-center justify-center`}>
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-3xl font-black text-slate-900 tracking-tighter">{item.value}</p>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.label}</p>
              </div>
            </div>
           )
        })}
      </div>

      {/* Detailed Table */}
      <Card className="border-none shadow-2xl shadow-slate-200/40 rounded-[3rem] overflow-hidden bg-white border border-slate-100">
        <CardHeader className="bg-slate-50/50 border-b border-slate-100 p-8">
          <CardTitle className="text-lg font-black text-slate-800 flex items-center gap-3">
            <div className="p-2 bg-emerald-100 rounded-lg">
               <FileText className="w-4 h-4 text-emerald-700" />
            </div>
            Detail Rekapitulasi: {selectedSantri?.namaLengkap}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 bg-slate-50/30">
                  <th className="px-8 py-5">Nama Surah</th>
                  <th className="px-8 py-5">Target Ayat</th>
                  <th className="px-8 py-5 text-center">Juz</th>
                  <th className="px-8 py-5 text-center">Setoran</th>
                  <th className="px-8 py-5 text-center">Predikat</th>
                  <th className="px-8 py-5 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {rekapData.map((r, i) => (
                  <tr key={i} className="group hover:bg-slate-50/50 transition-colors">
                    <td className="px-8 py-5">
                       <p className="font-black text-slate-800 text-sm">{r.surah}</p>
                    </td>
                    <td className="px-8 py-5">
                       <span className="text-xs font-bold text-slate-500">{r.ayat}</span>
                    </td>
                    <td className="px-8 py-5 text-center font-bold text-slate-600 text-xs">Juz {r.juzKe}</td>
                    <td className="px-8 py-5 text-center text-xs font-black text-slate-400">{r.totalSetoran}x</td>
                    <td className="px-8 py-5 text-center">
                       <span className={`inline-flex w-8 h-8 items-center justify-center rounded-xl text-xs font-black ${predikatColor[r.predikat]}`}>
                          {r.predikat}
                       </span>
                    </td>
                    <td className="px-8 py-5 text-right">
                       <span className={`px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-wider ${r.selesai ? 'bg-emerald-500 text-white' : 'bg-amber-100 text-amber-700'}`}>
                          {r.selesai ? 'Lulus' : 'Dalam Proses'}
                       </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Digital Ijazah Preview */}
      <div id="ijazah-print" className="animate-in fade-in duration-1000">
         <div className="relative p-12 md:p-20 bg-white rounded-[4rem] shadow-2xl border-[12px] border-emerald-50/50 overflow-hidden">
            {/* Background Ornaments */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                 style={{ backgroundImage: 'radial-gradient(#065f46 2px, transparent 2px)', backgroundSize: '30px 30px' }} />
            <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-100/30 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-emerald-100/30 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl" />
            
            <div className="relative z-10 text-center space-y-12">
               {/* Logo & Header */}
               <div className="space-y-4 border-b-2 border-emerald-900/10 pb-10">
                  <div className="w-20 h-20 bg-emerald-900 rounded-[2rem] mx-auto flex items-center justify-center shadow-xl shadow-emerald-200">
                     <ShieldCheck className="w-10 h-10 text-white" />
                  </div>
                  <div className="space-y-1">
                     <h2 className="text-xl font-black text-emerald-900 uppercase tracking-[0.3em]">Ijazah Tahfidz Al-Qur'an</h2>
                     <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">Raudhlatul Ulum</h1>
                     <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.5em] mt-2">Bandung, Jawa Barat, Indonesia</p>
                  </div>
               </div>

               {/* Content */}
               <div className="space-y-8 py-10">
                  <p className="text-slate-500 font-serif italic text-lg">Dengan ini menyatakan bahwa santri:</p>
                  <div className="space-y-2">
                     <h3 className="text-5xl font-black text-slate-900 underline decoration-emerald-500 decoration-8 underline-offset-8">{selectedSantri?.namaLengkap}</h3>
                     <p className="text-sm font-bold text-slate-400 mt-6 uppercase tracking-widest">NIS: {selectedSantri?.nis}</p>
                  </div>
                  <div className="max-w-xl mx-auto py-8 px-10 bg-emerald-50 rounded-[2.5rem] border border-emerald-100">
                     <p className="text-emerald-900 font-medium leading-relaxed">
                        Telah berhasil menyelesaikan hafalan sebanyak <strong className="font-black text-2xl px-2">2.5 JUZ</strong> 
                        pada periode akademik <span className="font-bold underline">{selectedSemester}</span> dengan predikat yang sangat baik.
                     </p>
                  </div>
               </div>

               {/* Footer / Signatures */}
               <div className="flex flex-col md:flex-row justify-between items-end gap-12 pt-10 px-10">
                  <div className="text-left space-y-2">
                     <div className="w-32 h-32 bg-slate-50 rounded-3xl flex items-center justify-center border-2 border-dashed border-slate-200 text-slate-300 font-bold text-[10px] uppercase">QR Code / Cap</div>
                     <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest">ID: {selectedSantri?.id.slice(0, 12)}</p>
                  </div>
                  <div className="text-right space-y-1">
                     <p className="text-xs font-bold text-slate-400 mb-16">Bandung, {format(new Date(), 'dd MMMM yyyy', { locale: localeId })}</p>
                     <p className="text-xl font-black text-slate-900 underline">Ust. Ahmad Syafi'i</p>
                     <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Kepala Program Tahfidz</p>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
