import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookMarked } from 'lucide-react';

const hafalanData = [
  { tanggal: '06 Mei 2026', surah: 'Al-Baqarah', ayat: '21-40', jenis: 'ZIYADAH', predikat: 'A', catatan: 'Sangat lancar' },
  { tanggal: '05 Mei 2026', surah: 'Al-Baqarah', ayat: '1-20', jenis: 'MURAJAAH', predikat: 'A', catatan: '' },
  { tanggal: '03 Mei 2026', surah: 'Al-Fatihah', ayat: '1-7', jenis: 'MURAJAAH', predikat: 'A', catatan: 'Hafalan sangat baik' },
  { tanggal: '02 Mei 2026', surah: 'Al-Baqarah', ayat: '1-10', jenis: 'ZIYADAH', predikat: 'B', catatan: 'Perhatikan mad thabi\'i' },
  { tanggal: '30 Apr 2026', surah: 'Al-Fatihah', ayat: '1-7', jenis: 'ZIYADAH', predikat: 'A', catatan: '' },
];

const predikatColor: Record<string, string> = {
  A: 'bg-emerald-100 text-emerald-700',
  B: 'bg-blue-100 text-blue-700',
  C: 'bg-amber-100 text-amber-700',
  D: 'bg-red-100 text-red-700',
};

export default function HafalanPage() {
  const totalZiyadah = hafalanData.filter(h => h.jenis === 'ZIYADAH').length;
  const totalMurajaah = hafalanData.filter(h => h.jenis === 'MURAJAAH').length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          <BookMarked className="text-teal-600" /> Progres Hafalan
        </h1>
        <p className="text-slate-500 text-sm mt-1">Riwayat setoran hafalan putra/putri Anda (hanya baca)</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="border-none shadow-sm rounded-2xl">
          <CardContent className="p-5 text-center">
            <p className="text-3xl font-bold text-teal-600">{hafalanData.length}</p>
            <p className="text-slate-500 text-xs mt-1">Total Setoran</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm rounded-2xl">
          <CardContent className="p-5 text-center">
            <p className="text-3xl font-bold text-emerald-600">{totalZiyadah}</p>
            <p className="text-slate-500 text-xs mt-1">Ziyadah</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm rounded-2xl">
          <CardContent className="p-5 text-center">
            <p className="text-3xl font-bold text-blue-600">{totalMurajaah}</p>
            <p className="text-slate-500 text-xs mt-1">Muraja'ah</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-none shadow-sm rounded-2xl">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-slate-800">Riwayat Setoran Lengkap</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {hafalanData.map((h, i) => (
              <div key={i} className="p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <p className="font-semibold text-slate-800">{h.surah} <span className="text-slate-400 font-normal text-sm">ayat {h.ayat}</span></p>
                    <p className="text-slate-400 text-xs mt-0.5">{h.tanggal}</p>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${h.jenis === 'ZIYADAH' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'}`}>
                      {h.jenis === 'ZIYADAH' ? 'Ziyadah' : "Muraja'ah"}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${predikatColor[h.predikat]}`}>
                      {h.predikat}
                    </span>
                  </div>
                </div>
                {h.catatan && (
                  <p className="text-sm text-slate-500 bg-white rounded-lg px-3 py-2 border border-slate-100">
                    💬 {h.catatan}
                  </p>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
