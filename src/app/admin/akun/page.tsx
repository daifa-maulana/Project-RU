'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UserCog, Plus, X, Eye, EyeOff, Copy, Check } from 'lucide-react';

type Akun = {
  id: string;
  namaSantri: string;
  nisSantri: string;
  namaWali: string;
  email: string;
  role: string;
  dibuat: string;
};

const initialAkun: Akun[] = [
  { id: '1', namaSantri: 'Ahmad Fauzan', nisSantri: '001', namaWali: 'Bpk. Fauzi Rahmad', email: 'fauzi@gmail.com', role: 'ORANG_TUA', dibuat: '2026-01-10' },
  { id: '2', namaSantri: 'Zaky Ramadhan', nisSantri: '003', namaWali: 'Ibu Siti Rahmah', email: 'siti.rahmah@gmail.com', role: 'ORANG_TUA', dibuat: '2026-01-12' },
];

export default function AkunPage() {
  const [akun, setAkun] = useState<Akun[]>(initialAkun);
  const [showForm, setShowForm] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({ namaSantri: '', nisSantri: '', namaWali: '', email: '', password: '' });
  const [generatedPass] = useState(() => `RU${Math.random().toString(36).slice(-6).toUpperCase()}`);

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedPass);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = () => {
    if (!form.email || !form.namaSantri) return;
    setAkun([...akun, { ...form, id: Date.now().toString(), role: 'ORANG_TUA', dibuat: new Date().toISOString().slice(0, 10) }]);
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <UserCog className="text-emerald-600" /> Manajemen Akun Wali
          </h1>
          <p className="text-slate-500 text-sm mt-1">Generate dan kelola akun login orang tua/wali santri</p>
        </div>
        <Button onClick={() => setShowForm(true)} className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl gap-2">
          <Plus className="w-4 h-4" /> Buat Akun Wali
        </Button>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <Card className="w-full max-w-lg rounded-2xl shadow-2xl">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <CardTitle>Buat Akun Wali Santri</CardTitle>
              <button onClick={() => setShowForm(false)}><X className="w-5 h-5 text-slate-400" /></button>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Generated password info */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
                <p className="text-xs text-emerald-700 font-medium mb-2">Password yang akan di-generate:</p>
                <div className="flex items-center gap-2">
                  <code className="flex-1 bg-white border border-emerald-200 rounded-lg px-3 py-2 text-sm font-mono text-emerald-800">
                    {showPass ? generatedPass : '••••••••'}
                  </code>
                  <button onClick={() => setShowPass(!showPass)} className="p-2 text-slate-400 hover:text-slate-600">
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                  <button onClick={handleCopy} className="p-2 text-emerald-600 hover:bg-emerald-100 rounded-lg">
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                <p className="text-xs text-emerald-600 mt-2">Catat dan berikan password ini ke orang tua santri.</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label>Nama Santri</Label>
                  <Input placeholder="Ahmad Fauzan" value={form.namaSantri} onChange={e => setForm({ ...form, namaSantri: e.target.value })} className="rounded-xl" />
                </div>
                <div className="space-y-1">
                  <Label>NIS Santri</Label>
                  <Input placeholder="001" value={form.nisSantri} onChange={e => setForm({ ...form, nisSantri: e.target.value })} className="rounded-xl" />
                </div>
              </div>
              <div className="space-y-1">
                <Label>Nama Wali</Label>
                <Input placeholder="Bpk. Ahmad" value={form.namaWali} onChange={e => setForm({ ...form, namaWali: e.target.value })} className="rounded-xl" />
              </div>
              <div className="space-y-1">
                <Label>Email Wali</Label>
                <Input type="email" placeholder="wali@gmail.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="rounded-xl" />
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <Button variant="outline" onClick={() => setShowForm(false)} className="rounded-xl">Batal</Button>
                <Button onClick={handleSave} className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl">Buat Akun</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <Card className="border-none shadow-sm rounded-2xl">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-slate-800">Daftar Akun Wali Aktif</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="text-left py-3 px-2 text-slate-500 font-medium">Wali / Email</th>
                  <th className="text-left py-3 px-2 text-slate-500 font-medium">Santri</th>
                  <th className="text-left py-3 px-2 text-slate-500 font-medium hidden md:table-cell">NIS</th>
                  <th className="text-left py-3 px-2 text-slate-500 font-medium hidden lg:table-cell">Dibuat</th>
                  <th className="text-left py-3 px-2 text-slate-500 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {akun.map(a => (
                  <tr key={a.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-2">
                      <p className="font-semibold text-slate-800">{a.namaWali}</p>
                      <p className="text-slate-400 text-xs">{a.email}</p>
                    </td>
                    <td className="py-3 px-2 text-slate-700">{a.namaSantri}</td>
                    <td className="py-3 px-2 text-slate-500 text-xs hidden md:table-cell">{a.nisSantri}</td>
                    <td className="py-3 px-2 text-slate-500 text-xs hidden lg:table-cell">{a.dibuat}</td>
                    <td className="py-3 px-2">
                      <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-medium">Aktif</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
