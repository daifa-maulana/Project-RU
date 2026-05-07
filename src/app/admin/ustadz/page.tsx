'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Users, 
  Search, 
  Plus, 
  Pencil, 
  Trash2, 
  X, 
  Loader2,
  Mail,
  Phone,
  ShieldCheck,
  MoreHorizontal
} from 'lucide-react';

interface Ustadz {
  id: string;
  nip: string | null;
  namaLengkap: string;
  noHp: string | null;
  user: {
    email: string;
  };
}

export default function UstadzPage() {
  const [data, setData] = useState<Ustadz[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Create a specific API route or use a general one
      const res = await fetch('/api/ustadz'); // I'll need to create this API route
      if (!res.ok) {
        // Mock data fallback for now if API not yet ready
        setData([
          { id: '1', nip: 'U001', namaLengkap: "Ust. Ahmad Syafi'i", noHp: '081234567890', user: { email: 'syafii@raudhlatululum.com' } }
        ]);
      } else {
        const json = await res.json();
        setData(json);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filtered = data.filter(u =>
    u.namaLengkap.toLowerCase().includes(search.toLowerCase()) || 
    (u.nip && u.nip.includes(search))
  );

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
      
      {/* Premium Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-[10px] font-black uppercase tracking-wider mb-2">
            <ShieldCheck className="w-3 h-3" /> Staf Pengajar
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Database Ustadz</h1>
          <p className="text-slate-500 font-medium italic">
            Pengelola akademik dan pembimbing tahfidz pesantren.
          </p>
        </div>
        
        <div className="flex items-center gap-3">
           <Button onClick={() => setShowForm(true)} className="rounded-2xl px-8 py-6 bg-slate-900 hover:bg-blue-600 text-white font-black shadow-xl shadow-slate-200 gap-2 transition-all">
              <Plus className="w-4 h-4" /> Daftarkan Ustadz
           </Button>
        </div>
      </div>

      {/* Grid of Ustadz Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         {/* Search Card */}
         <Card className="col-span-full border-none shadow-sm rounded-[2rem] bg-white p-2">
            <div className="relative">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input 
                placeholder="Cari nama ustadz atau NIP..." 
                className="w-full pl-16 pr-6 py-5 bg-transparent rounded-[1.5rem] border-none text-sm font-bold text-slate-800 focus:outline-none transition-all"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
         </Card>

         {loading ? (
            <div className="col-span-full py-20 text-center">
               <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto" />
            </div>
         ) : filtered.length > 0 ? (
           filtered.map((u) => (
              <Card key={u.id} className="border-none shadow-sm hover:shadow-xl transition-all rounded-[2.5rem] overflow-hidden bg-white group border border-slate-50">
                 <CardContent className="p-8">
                    <div className="flex items-start justify-between mb-6">
                       <div className="w-16 h-16 rounded-[1.5rem] bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 shadow-inner font-black text-xl">
                          {u.namaLengkap.charAt(0)}
                       </div>
                       <button className="p-2 text-slate-300 hover:text-slate-600">
                          <MoreHorizontal className="w-5 h-5" />
                       </button>
                    </div>
                    
                    <div className="space-y-1">
                       <h3 className="text-xl font-black text-slate-900">{u.namaLengkap}</h3>
                       <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em]">{u.nip || 'NIP Belum Diatur'}</p>
                    </div>

                    <div className="mt-8 space-y-3">
                       <div className="flex items-center gap-3 text-slate-500">
                          <div className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center">
                             <Mail className="w-3.5 h-3.5" />
                          </div>
                          <span className="text-xs font-medium">{u.user.email}</span>
                       </div>
                       <div className="flex items-center gap-3 text-slate-500">
                          <div className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center">
                             <Phone className="w-3.5 h-3.5" />
                          </div>
                          <span className="text-xs font-medium">{u.noHp || '-'}</span>
                       </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-slate-50 flex gap-2">
                       <Button variant="outline" className="flex-1 rounded-xl h-11 border-slate-100 text-xs font-bold text-slate-600 gap-2 hover:bg-blue-50 hover:text-blue-600 transition-all">
                          <Pencil className="w-3.5 h-3.5" /> Edit
                       </Button>
                       <Button variant="outline" className="rounded-xl h-11 border-slate-100 text-red-400 hover:bg-red-50 hover:text-red-600 transition-all px-3">
                          <Trash2 className="w-3.5 h-3.5" />
                       </Button>
                    </div>
                 </CardContent>
              </Card>
           ))
         ) : (
           <div className="col-span-full py-20 text-center">
              <p className="text-slate-400 font-bold">Tidak ada data ustadz yang ditemukan.</p>
           </div>
         )}
      </div>

      {/* Simple Form Modal (Placeholder) */}
      {showForm && (
         <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300">
            <Card className="w-full max-w-lg rounded-[3rem] shadow-2xl border-none">
               <CardHeader className="p-8 border-b border-slate-100 flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-xl font-black text-slate-900">Input Data Ustadz</CardTitle>
                    <p className="text-xs text-slate-500 mt-1">Daftarkan akun ustadz baru ke sistem.</p>
                  </div>
                  <button onClick={() => setShowForm(false)} className="w-10 h-10 rounded-full hover:bg-slate-100 flex items-center justify-center transition-colors">
                     <X className="w-5 h-5 text-slate-400" />
                  </button>
               </CardHeader>
               <CardContent className="p-8 space-y-6">
                  <div className="space-y-2">
                     <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Nama Lengkap & Gelar</Label>
                     <Input className="h-12 rounded-xl border-slate-100 bg-slate-50" placeholder="Contoh: Ust. Hasan Bashri" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                     <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">NIP</Label>
                        <Input className="h-12 rounded-xl border-slate-100 bg-slate-50" placeholder="U00x" />
                     </div>
                     <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Nomor HP</Label>
                        <Input className="h-12 rounded-xl border-slate-100 bg-slate-50" placeholder="08xxxxxxxx" />
                     </div>
                  </div>
                  <div className="space-y-2">
                     <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Email Login</Label>
                     <Input className="h-12 rounded-xl border-slate-100 bg-slate-50" type="email" placeholder="ustadz@raudhlatululum.com" />
                  </div>
                  <div className="flex justify-end gap-3 pt-4">
                     <Button variant="outline" onClick={() => setShowForm(false)} className="rounded-2xl h-14 px-8 font-bold border-slate-200">Batal</Button>
                     <Button className="rounded-2xl h-14 px-10 font-black bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-100">Simpan Akun</Button>
                  </div>
               </CardContent>
            </Card>
         </div>
      )}
    </div>
  );
}
