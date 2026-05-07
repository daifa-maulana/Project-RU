'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  GraduationCap, 
  Search, 
  Plus, 
  Pencil, 
  Trash2, 
  X, 
  Filter,
  Loader2,
  ChevronRight,
  MoreVertical,
  ArrowUpDown
} from 'lucide-react';

interface Santri {
  id: string;
  nis: string;
  namaLengkap: string;
  tempatLahir: string | null;
  tanggalLahir: string | null;
  alamat: string | null;
  kelas: {
    namaKelas: string;
  };
}

export default function SantriPage() {
  const [data, setData] = useState<Santri[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Santri | null>(null);
  
  // Form states (simplified for now)
  const [form, setForm] = useState({ 
    nis: '', 
    namaLengkap: '', 
    tempatLahir: '', 
    tanggalLahir: '', 
    alamat: '', 
    kelasId: '' 
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/santri');
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filtered = data.filter(s =>
    s.namaLengkap.toLowerCase().includes(search.toLowerCase()) ||
    s.nis.includes(search)
  );

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
      
      {/* Premium Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-[10px] font-black uppercase tracking-wider mb-2">
            <GraduationCap className="w-3 h-3" /> Manajemen Akademik
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Database Santri</h1>
          <p className="text-slate-500 font-medium italic">
            Total terdaftar: <span className="text-emerald-600 font-bold">{data.length} Santri</span>
          </p>
        </div>
        
        <div className="flex items-center gap-3">
           <Button onClick={() => setShowForm(true)} className="rounded-2xl px-8 py-6 bg-slate-900 hover:bg-emerald-600 text-white font-black shadow-xl shadow-slate-200 gap-2 transition-all">
              <Plus className="w-4 h-4" /> Tambah Santri Baru
           </Button>
        </div>
      </div>

      {/* Control Bar */}
      <div className="flex flex-col lg:flex-row gap-4 items-center bg-white p-4 rounded-[2.5rem] shadow-sm border border-slate-100">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            placeholder="Cari nama santri, NIS, atau alamat..." 
            className="w-full pl-14 pr-4 py-4 bg-slate-50 rounded-[1.5rem] border-none text-sm font-medium focus:ring-2 focus:ring-emerald-500/20 transition-all outline-none"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2 w-full lg:w-auto">
           <Button variant="outline" className="rounded-2xl h-14 px-6 gap-2 border-slate-100 font-bold text-slate-600 flex-1 lg:flex-none">
             <Filter className="w-4 h-4" /> Filter Kelas
           </Button>
           <Button variant="outline" className="rounded-2xl h-14 px-6 gap-2 border-slate-100 font-bold text-slate-600 flex-1 lg:flex-none">
             <ArrowUpDown className="w-4 h-4" /> Urutkan
           </Button>
        </div>
      </div>

      {/* Main Table Card */}
      <Card className="border-none shadow-2xl shadow-slate-200/50 rounded-[3rem] overflow-hidden bg-white">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 border-b border-slate-100">
                  <th className="px-8 py-6">Profil Santri</th>
                  <th className="px-8 py-6 hidden md:table-cell">NIS</th>
                  <th className="px-8 py-6">Kelas</th>
                  <th className="px-8 py-6 hidden lg:table-cell">Alamat</th>
                  <th className="px-8 py-6 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {loading ? (
                   <tr>
                      <td colSpan={5} className="py-20 text-center">
                         <Loader2 className="w-10 h-10 animate-spin text-emerald-600 mx-auto mb-4" />
                         <p className="text-slate-400 font-bold">Memuat data santri...</p>
                      </td>
                   </tr>
                ) : filtered.length > 0 ? (
                  filtered.map((s) => (
                    <tr key={s.id} className="group hover:bg-emerald-50/30 transition-colors">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                           <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center font-black text-slate-500 group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-inner">
                              {s.namaLengkap.charAt(0)}
                           </div>
                           <div>
                              <p className="font-black text-slate-800 text-sm">{s.namaLengkap}</p>
                              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{s.tempatLahir || 'Unknown'}</p>
                           </div>
                        </div>
                      </td>
                      <td className="px-8 py-6 hidden md:table-cell">
                         <span className="font-mono text-xs font-bold text-slate-500">{s.nis}</span>
                      </td>
                      <td className="px-8 py-6">
                         <span className="inline-flex px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-100">
                            {s.kelas.namaKelas}
                         </span>
                      </td>
                      <td className="px-8 py-6 hidden lg:table-cell">
                         <p className="text-xs text-slate-500 max-w-[200px] truncate">{s.alamat || '-'}</p>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                           <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all">
                              <Pencil className="w-4 h-4" />
                           </button>
                           <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all">
                              <Trash2 className="w-4 h-4" />
                           </button>
                           <button className="p-2 text-slate-400 hover:bg-slate-100 rounded-xl transition-all">
                              <MoreVertical className="w-4 h-4" />
                           </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                     <td colSpan={5} className="py-20 text-center">
                        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                           <Search className="w-8 h-8 text-slate-200" />
                        </div>
                        <p className="text-slate-400 font-bold">Tidak ada data yang ditemukan.</p>
                     </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
      
      {/* Form Dialog (Placeholder) */}
      {showForm && (
         <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300">
            <Card className="w-full max-w-2xl rounded-[3rem] shadow-2xl border-none">
               <CardHeader className="p-8 border-b border-slate-100 flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-xl font-black text-slate-900">Input Data Santri</CardTitle>
                    <p className="text-xs text-slate-500 mt-1">Lengkapi informasi untuk mendaftarkan santri baru.</p>
                  </div>
                  <button onClick={() => setShowForm(false)} className="w-10 h-10 rounded-full hover:bg-slate-100 flex items-center justify-center transition-colors">
                     <X className="w-5 h-5 text-slate-400" />
                  </button>
               </CardHeader>
               <CardContent className="p-8 space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                     <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Nomor Induk Santri (NIS)</Label>
                        <Input className="h-12 rounded-xl border-slate-100 bg-slate-50" placeholder="Contoh: 001" />
                     </div>
                     <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Pilih Kelas</Label>
                        <select className="w-full h-12 rounded-xl border-slate-100 bg-slate-50 px-3 text-sm font-medium">
                           <option>Kelas 3A</option>
                           <option>Kelas 2B</option>
                        </select>
                     </div>
                  </div>
                  <div className="space-y-2">
                     <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Nama Lengkap Santri</Label>
                     <Input className="h-12 rounded-xl border-slate-100 bg-slate-50" placeholder="Masukkan nama lengkap..." />
                  </div>
                  <div className="flex justify-end gap-3 pt-4">
                     <Button variant="outline" onClick={() => setShowForm(false)} className="rounded-2xl h-14 px-8 font-bold border-slate-200">Batalkan</Button>
                     <Button className="rounded-2xl h-14 px-10 font-black bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-100">Simpan Data</Button>
                  </div>
               </CardContent>
            </Card>
         </div>
      )}
    </div>
  );
}
