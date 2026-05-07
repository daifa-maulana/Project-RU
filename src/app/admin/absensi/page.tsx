'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  CalendarCheck, 
  Save, 
  Loader2, 
  CheckCircle2, 
  Info, 
  Search, 
  ChevronRight,
  Filter,
  Check,
  X,
  Clock,
  AlertCircle
} from 'lucide-react';
import { format } from 'date-fns';
import { id as localeId } from 'date-fns/locale';

type Status = 'HADIR' | 'SAKIT' | 'IZIN' | 'ALFA';

interface Santri {
  id: string;
  nis: string;
  namaLengkap: string;
  kelas: {
    namaKelas: string;
  };
  status?: Status;
}

const statusConfig: Record<Status, { label: string; color: string; bg: string; icon: any; border: string }> = {
  HADIR: { label: 'Hadir', color: 'text-emerald-700', bg: 'bg-emerald-50', icon: Check, border: 'border-emerald-200' },
  SAKIT: { label: 'Sakit', color: 'text-amber-700', bg: 'bg-amber-50', icon: AlertCircle, border: 'border-amber-200' },
  IZIN: { label: 'Izin', color: 'text-blue-700', bg: 'bg-blue-50', icon: Clock, border: 'border-blue-200' },
  ALFA: { label: 'Alfa', color: 'text-red-700', bg: 'bg-red-50', icon: X, border: 'border-red-200' },
};

export default function AbsensiPage() {
  const [tanggal, setTanggal] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [santriList, setSantriList] = useState<Santri[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetchSantri();
  }, []);

  const fetchSantri = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/santri');
      const data = await res.json();
      setSantriList(data.map((s: any) => ({ ...s, status: 'HADIR' })));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const setStatus = (id: string, status: Status) => {
    setSantriList(prev => prev.map(s => s.id === id ? { ...s, status } : s));
    setSaved(false);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/absensi', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ santriList, tanggal }),
      });
      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  const filteredSantri = santriList.filter(s => 
    s.namaLengkap.toLowerCase().includes(search.toLowerCase()) || 
    s.nis.includes(search)
  );

  const stats = {
    HADIR: santriList.filter(s => s.status === 'HADIR').length,
    SAKIT: santriList.filter(s => s.status === 'SAKIT').length,
    IZIN: santriList.filter(s => s.status === 'IZIN').length,
    ALFA: santriList.filter(s => s.status === 'ALFA').length,
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700 pb-20">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-[10px] font-bold uppercase tracking-wider mb-2">
            <CalendarCheck className="w-3 h-3" /> Rekap Kehadiran
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Absensi Harian</h1>
          <p className="text-slate-500 font-medium italic">
            Semua perubahan akan langsung disinkronkan ke Dashboard Wali Santri.
          </p>
        </div>
        
        <div className="flex items-center gap-3 bg-white p-2 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100">
          <input
            type="date"
            value={tanggal}
            onChange={e => { setTanggal(e.target.value); setSaved(false); }}
            className="bg-transparent px-4 py-2 text-sm font-bold text-slate-700 focus:outline-none"
          />
          <Button 
            onClick={handleSave} 
            disabled={saving || loading}
            className={`rounded-2xl px-8 py-6 font-black transition-all gap-2 text-sm shadow-lg ${
              saved ? 'bg-emerald-500 text-white' : 'bg-slate-900 hover:bg-emerald-600 text-white'
            }`}
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : saved ? <CheckCircle2 className="w-4 h-4" /> : <Save className="w-4 h-4" />}
            {saving ? 'Proses...' : saved ? 'Berhasil!' : 'Simpan Absensi'}
          </Button>
        </div>
      </div>

      {/* Stats Dashboard */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {(Object.keys(statusConfig) as Status[]).map(key => {
          const Icon = statusConfig[key].icon;
          return (
            <div key={key} className={`p-6 rounded-[2rem] border ${statusConfig[key].border} ${statusConfig[key].bg} transition-all`}>
              <div className="flex items-center justify-between mb-2">
                <p className={`text-[10px] font-black uppercase tracking-widest ${statusConfig[key].color}`}>{statusConfig[key].label}</p>
                <Icon className={`w-4 h-4 ${statusConfig[key].color}`} />
              </div>
              <p className={`text-3xl font-black ${statusConfig[key].color}`}>{stats[key]}</p>
            </div>
          );
        })}
      </div>

      {/* Control Bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-center bg-white p-4 rounded-3xl shadow-sm border border-slate-100">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            placeholder="Cari nama santri atau NIS..." 
            className="w-full pl-12 pr-4 py-3 bg-slate-50 rounded-2xl border-none text-sm font-medium focus:ring-2 focus:ring-emerald-500/20 transition-all outline-none"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <Button variant="outline" className="rounded-2xl h-12 gap-2 border-slate-200 font-bold text-slate-600 w-full sm:w-auto">
          <Filter className="w-4 h-4" /> Semua Kelas
        </Button>
      </div>

      {/* Santri List Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {loading ? (
          <div className="col-span-full py-20 text-center space-y-4">
            <Loader2 className="w-12 h-12 animate-spin text-emerald-600 mx-auto" />
            <p className="text-slate-500 font-bold tracking-tight">Menyiapkan Daftar Santri...</p>
          </div>
        ) : filteredSantri.length > 0 ? (
          filteredSantri.map((s) => (
            <div key={s.id} className="bg-white p-5 rounded-[2rem] shadow-sm border border-slate-50 group hover:border-emerald-200 hover:shadow-md transition-all flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center font-black text-[10px] shadow-lg shadow-slate-200">
                  {s.nis}
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-sm">{s.namaLengkap}</h3>
                  <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">{s.kelas.namaKelas}</p>
                </div>
              </div>

              <div className="flex gap-1">
                {(Object.keys(statusConfig) as Status[]).map(opt => (
                  <button
                    key={opt}
                    onClick={() => setStatus(s.id, opt)}
                    title={statusConfig[opt].label}
                    className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all border ${
                      s.status === opt 
                        ? `${statusConfig[opt].bg} ${statusConfig[opt].color} ${statusConfig[opt].border} scale-110 shadow-sm` 
                        : 'bg-slate-50 border-transparent text-slate-300 hover:text-slate-500 hover:bg-slate-100'
                    }`}
                  >
                    <span className="text-[10px] font-black">{opt[0]}</span>
                  </button>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-20 text-center">
             <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-slate-200" />
             </div>
             <p className="text-slate-400 font-bold">Tidak ada santri yang cocok.</p>
          </div>
        )}
      </div>

      {/* Guide Card */}
      <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
          <div className="w-16 h-16 bg-emerald-500/20 rounded-2xl flex items-center justify-center text-emerald-400 shrink-0 border border-emerald-500/30">
            <Info className="w-8 h-8" />
          </div>
          <div className="space-y-2 text-center md:text-left">
            <h4 className="text-lg font-black tracking-tight">Sistem Sinkronisasi Aktif</h4>
            <p className="text-slate-400 text-xs leading-relaxed max-w-2xl">
              Data absensi yang Anda simpan akan secara otomatis muncul di halaman laporan bulanan dan aplikasi wali santri. Pastikan data sudah benar sebelum menekan tombol simpan.
            </p>
          </div>
          <div className="md:ml-auto">
             <Button variant="link" className="text-emerald-400 font-black text-xs hover:text-emerald-300 gap-2">
                Lihat Rekap Bulanan <ChevronRight className="w-4 h-4" />
             </Button>
          </div>
        </div>
        <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl" />
      </div>
    </div>
  );
}
