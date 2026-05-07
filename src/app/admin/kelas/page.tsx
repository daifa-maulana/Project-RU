'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Plus, Pencil, Trash2, X } from 'lucide-react';

type Kelas = { id: string; namaKelas: string; tingkat: string; ustadz: string; jumlahSantri: number };

const initialData: Kelas[] = [
  { id: '1', namaKelas: 'Kelas 1A', tingkat: 'Tahap 1', ustadz: 'Ust. Ahmad Syafi\'i', jumlahSantri: 20 },
  { id: '2', namaKelas: 'Kelas 2B', tingkat: 'Tahap 2', ustadz: 'Ust. Hasan Bashri', jumlahSantri: 18 },
  { id: '3', namaKelas: 'Kelas 3A', tingkat: 'Tahap 3', ustadz: 'Ust. Umar Abdullah', jumlahSantri: 22 },
];

export default function KelasPage() {
  const [data, setData] = useState<Kelas[]>(initialData);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Kelas | null>(null);
  const [form, setForm] = useState({ namaKelas: '', tingkat: '', ustadz: '' });

  const openAdd = () => { setEditing(null); setForm({ namaKelas: '', tingkat: '', ustadz: '' }); setShowForm(true); };
  const openEdit = (k: Kelas) => { setEditing(k); setForm({ namaKelas: k.namaKelas, tingkat: k.tingkat, ustadz: k.ustadz }); setShowForm(true); };

  const handleSave = () => {
    if (!form.namaKelas) return;
    if (editing) {
      setData(data.map(k => k.id === editing.id ? { ...editing, ...form } : k));
    } else {
      setData([...data, { ...form, id: Date.now().toString(), jumlahSantri: 0 }]);
    }
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <BookOpen className="text-emerald-600" /> Data Kelas
          </h1>
          <p className="text-slate-500 text-sm mt-1">Kelola kelas dan pengampu ustadz</p>
        </div>
        <Button onClick={openAdd} className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl gap-2">
          <Plus className="w-4 h-4" /> Tambah Kelas
        </Button>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md rounded-2xl shadow-2xl">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <CardTitle>{editing ? 'Edit Kelas' : 'Tambah Kelas'}</CardTitle>
              <button onClick={() => setShowForm(false)}><X className="w-5 h-5 text-slate-400" /></button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <Label>Nama Kelas</Label>
                <Input placeholder="Kelas 1A" value={form.namaKelas} onChange={e => setForm({ ...form, namaKelas: e.target.value })} className="rounded-xl" />
              </div>
              <div className="space-y-1">
                <Label>Tingkat</Label>
                <Input placeholder="Tahap 1" value={form.tingkat} onChange={e => setForm({ ...form, tingkat: e.target.value })} className="rounded-xl" />
              </div>
              <div className="space-y-1">
                <Label>Wali Kelas (Ustadz)</Label>
                <Input placeholder="Ust. Ahmad Syafi'i" value={form.ustadz} onChange={e => setForm({ ...form, ustadz: e.target.value })} className="rounded-xl" />
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <Button variant="outline" onClick={() => setShowForm(false)} className="rounded-xl">Batal</Button>
                <Button onClick={handleSave} className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl">Simpan</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map(k => (
          <Card key={k.id} className="border-none shadow-sm rounded-2xl hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-emerald-600" />
                </div>
                <div className="flex gap-2">
                  <button onClick={() => openEdit(k)} className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-lg"><Pencil className="w-3.5 h-3.5" /></button>
                  <button onClick={() => setData(data.filter(x => x.id !== k.id))} className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
              </div>
              <h3 className="font-bold text-slate-900 text-lg">{k.namaKelas}</h3>
              <p className="text-slate-500 text-sm">{k.tingkat}</p>
              <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-sm">
                <span className="text-slate-500">{k.ustadz}</span>
                <span className="font-semibold text-emerald-600">{k.jumlahSantri} santri</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
