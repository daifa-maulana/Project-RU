'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  BookMarked, 
  Plus, 
  Search, 
  Loader2, 
  CheckCircle2, 
  ChevronRight, 
  BookOpen,
  Sparkles,
  History,
  Info,
  Calendar
} from 'lucide-react';
import { format } from 'date-fns';
import { id as localeId } from 'date-fns/locale';

interface Santri {
  id: string;
  nis: string;
  namaLengkap: string;
  kelas: {
    namaKelas: string;
  };
}

export default function JurnalTahfidzPage() {
  const [santriList, setSantriList] = useState<Santri[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedSantri, setSelectedSantri] = useState<Santri | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // Form states
  const [jenis, setJenis] = useState<'ZIYADAH' | 'MURAJAAH'>('ZIYADAH');
  const [surah, setSurah] = useState('');
  const [ayatMulai, setAyatMulai] = useState('');
  const [ayatSelesai, setAyatSelesai] = useState('');
  const [predikat, setPredikat] = useState('A');
  const [catatan, setCatatan] = useState('');

  useEffect(() => {
    fetchSantri();
  }, []);

  const fetchSantri = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/santri');
      const data = await res.json();
      setSantriList(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const filteredSantri = santriList.filter(s => 
    s.namaLengkap.toLowerCase().includes(search.toLowerCase()) || 
    s.nis.includes(search)
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSantri) return;
    setSaving(true);
    try {
      const res = await fetch('/api/jurnal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          santriId: selectedSantri.id,
          ustadzId: 'system-user', // In prod, get from session
          tanggal: new Date().toISOString(),
          jenisSetoran: jenis,
          namaSurah: surah,
          ayatMulai,
          ayatSelesai,
          predikatTajwid: predikat,
          catatan,
        }),
      });
      
      if (res.ok) {
        setSaved(true);
        // Reset form but keep santri for potentially more entries
        setSurah('');
        setAyatMulai('');
        setAyatSelesai('');
        setCatatan('');
        setTimeout(() => setSaved(false), 3000);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700 pb-20">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-[10px] font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3 h-3" /> Akademik Tahfidz
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Jurnal Hafalan</h1>
          <p className="text-slate-500 font-medium italic">
            Catat progress hafalan santri untuk laporan berkala wali murid.
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <Button variant="outline" className="rounded-2xl h-14 px-6 border-slate-200 font-bold text-slate-600 gap-2">
            <History className="w-4 h-4" /> Riwayat Setoran
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Selection Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="border-none shadow-xl shadow-slate-200/50 rounded-[2.5rem] overflow-hidden bg-white border border-slate-100">
            <CardHeader className="pb-4">
              <CardTitle className="text-sm font-black text-slate-800 flex items-center gap-2">
                <div className="w-8 h-8 bg-slate-900 text-white rounded-xl flex items-center justify-center font-black text-[10px]">1</div>
                Pilih Santri
              </CardTitle>
              <div className="relative mt-4">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input 
                  placeholder="Cari nama atau NIS..." 
                  className="pl-12 pr-4 py-6 rounded-2xl border-slate-200 bg-slate-50 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all font-medium"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="max-h-[500px] overflow-y-auto divide-y divide-slate-50">
                {loading ? (
                  <div className="p-20 text-center">
                    <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto" />
                  </div>
                ) : filteredSantri.map(s => (
                  <button
                    key={s.id}
                    onClick={() => setSelectedSantri(s)}
                    className={`w-full flex items-center gap-4 px-6 py-5 transition-all text-left group ${
                      selectedSantri?.id === s.id ? 'bg-blue-600' : 'hover:bg-blue-50/50'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black text-[10px] transition-all shadow-inner ${
                      selectedSantri?.id === s.id ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500 group-hover:bg-blue-100 group-hover:text-blue-700'
                    }`}>
                      {s.nis}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-black truncate transition-colors ${selectedSantri?.id === s.id ? 'text-white' : 'text-slate-800'}`}>
                        {s.namaLengkap}
                      </p>
                      <p className={`text-[9px] font-bold uppercase tracking-widest transition-colors ${selectedSantri?.id === s.id ? 'text-blue-100' : 'text-slate-400'}`}>
                        {s.kelas.namaKelas}
                      </p>
                    </div>
                    {selectedSantri?.id === s.id && <ChevronRight className="w-4 h-4 text-white animate-in slide-in-from-left-2" />}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Input Form Area */}
        <div className="lg:col-span-8">
          <Card className="border-none shadow-2xl shadow-slate-200/40 rounded-[3rem] overflow-hidden bg-white border border-slate-100 min-h-[600px]">
             {!selectedSantri ? (
                <div className="h-full min-h-[600px] flex flex-col items-center justify-center text-center space-y-6 px-12">
                   <div className="w-24 h-24 bg-blue-50 rounded-[2rem] flex items-center justify-center text-blue-300 relative">
                      <BookOpen className="w-10 h-10" />
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg animate-bounce">
                         <span className="text-[10px] font-black text-blue-600">?</span>
                      </div>
                   </div>
                   <div>
                      <h3 className="text-xl font-black text-slate-900">Belum Ada Santri Terpilih</h3>
                      <p className="text-slate-400 text-sm mt-2 max-w-xs mx-auto">Silakan pilih salah satu santri di sebelah kiri untuk mulai mencatat jurnal hafalan.</p>
                   </div>
                </div>
             ) : (
                <div className="animate-in fade-in zoom-in-95 duration-500">
                  <div className="p-8 md:p-12 border-b border-slate-50 bg-slate-50/30 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-6">
                       <div className="w-20 h-20 bg-slate-900 text-white rounded-[2rem] flex items-center justify-center font-black text-xl shadow-2xl shadow-slate-300">
                          {selectedSantri.nis}
                       </div>
                       <div>
                          <h2 className="text-2xl font-black text-slate-900 tracking-tight">{selectedSantri.namaLengkap}</h2>
                          <div className="flex items-center gap-2 mt-1">
                             <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-[10px] font-black uppercase tracking-widest">{selectedSantri.kelas.namaKelas}</span>
                             <span className="text-[10px] font-bold text-slate-400 italic">ID: {selectedSantri.id.slice(0, 8)}</span>
                          </div>
                       </div>
                    </div>
                    <div className="flex items-center gap-3 px-6 py-3 bg-white rounded-2xl shadow-sm border border-slate-100">
                       <Calendar className="w-4 h-4 text-blue-500" />
                       <span className="text-sm font-black text-slate-700">{format(new Date(), 'EEEE, dd MMM', { locale: localeId })}</span>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="p-8 md:p-12 space-y-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                       {/* Left Input Group */}
                       <div className="space-y-8">
                          <div className="space-y-4">
                            <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Jenis Setoran</Label>
                            <div className="flex gap-3">
                              {(['ZIYADAH', 'MURAJAAH'] as const).map(opt => (
                                <button
                                  key={opt}
                                  type="button"
                                  onClick={() => setJenis(opt)}
                                  className={`flex-1 py-4 rounded-2xl text-xs font-black transition-all border-2 ${
                                    jenis === opt 
                                      ? 'bg-blue-600 text-white border-blue-600 shadow-xl shadow-blue-200' 
                                      : 'bg-white border-slate-100 text-slate-400 hover:border-blue-200 hover:text-blue-500'
                                  }`}
                                >
                                  {opt}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div className="space-y-4">
                            <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Nama Surah</Label>
                            <Input 
                              placeholder="Ketik nama surah..." 
                              required
                              className="h-14 rounded-2xl border-slate-100 bg-slate-50 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all font-bold text-slate-800"
                              value={surah}
                              onChange={e => setSurah(e.target.value)}
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-4">
                              <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Ayat Mulai</Label>
                              <Input 
                                type="number" 
                                placeholder="0" 
                                required
                                className="h-14 rounded-2xl border-slate-100 bg-slate-50 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-bold"
                                value={ayatMulai}
                                onChange={e => setAyatMulai(e.target.value)}
                              />
                            </div>
                            <div className="space-y-4">
                              <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Ayat Selesai</Label>
                              <Input 
                                type="number" 
                                placeholder="0" 
                                required
                                className="h-14 rounded-2xl border-slate-100 bg-slate-50 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-bold"
                                value={ayatSelesai}
                                onChange={e => setAyatSelesai(e.target.value)}
                              />
                            </div>
                          </div>
                       </div>

                       {/* Right Input Group */}
                       <div className="space-y-8">
                          <div className="space-y-4">
                            <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Kualitas Tajwid / Kelancaran</Label>
                            <div className="grid grid-cols-4 gap-2">
                               {['A', 'B', 'C', 'D'].map(p => (
                                  <button
                                    key={p}
                                    type="button"
                                    onClick={() => setPredikat(p)}
                                    className={`h-14 rounded-2xl font-black text-sm transition-all border-2 ${
                                      predikat === p 
                                        ? 'bg-emerald-500 text-white border-emerald-500 shadow-lg shadow-emerald-100' 
                                        : 'bg-white border-slate-50 text-slate-400 hover:bg-slate-50'
                                    }`}
                                  >
                                    {p}
                                  </button>
                               ))}
                            </div>
                          </div>

                          <div className="space-y-4">
                            <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Catatan Khusus (Optional)</Label>
                            <textarea 
                              placeholder="Tambahkan catatan jika ada..." 
                              rows={4}
                              className="w-full p-6 rounded-3xl border-slate-100 bg-slate-50 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all font-medium text-sm text-slate-800 resize-none"
                              value={catatan}
                              onChange={e => setCatatan(e.target.value)}
                            />
                          </div>

                          <div className="pt-6">
                            <Button 
                              type="submit" 
                              disabled={saving}
                              className={`w-full h-16 rounded-[2rem] font-black transition-all gap-3 text-sm shadow-2xl ${
                                saved ? 'bg-emerald-500 text-white' : 'bg-slate-900 hover:bg-blue-600 text-white'
                              }`}
                            >
                              {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : saved ? <CheckCircle2 className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                              {saving ? 'Menyimpan...' : saved ? 'Berhasil Disimpan!' : 'Simpan Jurnal Tahfidz'}
                            </Button>
                          </div>
                       </div>
                    </div>
                  </form>
                </div>
             )}
          </Card>
          
          <div className="mt-8 bg-white p-6 rounded-3xl shadow-sm border border-slate-50 flex items-center gap-6">
             <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 shrink-0">
                <Info className="w-6 h-6" />
             </div>
             <p className="text-xs text-slate-500 leading-relaxed">
                <strong>Informasi:</strong> Jurnal hafalan ini akan otomatis terakumulasi ke dalam sistem rekapitulasi ijazah dan dapat langsung dilihat oleh orang tua santri melalui portal mereka.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
}
