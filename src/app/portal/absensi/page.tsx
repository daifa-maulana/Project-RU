import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarCheck } from 'lucide-react';

const absensiData = [
  { tanggal: '06 Mei 2026', hari: 'Selasa', status: 'HADIR', keterangan: '' },
  { tanggal: '05 Mei 2026', hari: 'Senin', status: 'HADIR', keterangan: '' },
  { tanggal: '04 Mei 2026', hari: 'Minggu', status: 'IZIN', keterangan: 'Acara keluarga' },
  { tanggal: '03 Mei 2026', hari: 'Sabtu', status: 'HADIR', keterangan: '' },
  { tanggal: '02 Mei 2026', hari: 'Jum\'at', status: 'HADIR', keterangan: '' },
  { tanggal: '01 Mei 2026', hari: 'Kamis', status: 'HADIR', keterangan: '' },
  { tanggal: '30 Apr 2026', hari: 'Rabu', status: 'SAKIT', keterangan: 'Demam' },
  { tanggal: '29 Apr 2026', hari: 'Selasa', status: 'HADIR', keterangan: '' },
  { tanggal: '28 Apr 2026', hari: 'Senin', status: 'HADIR', keterangan: '' },
  { tanggal: '27 Apr 2026', hari: 'Minggu', status: 'HADIR', keterangan: '' },
];

const statusStyle: Record<string, { bg: string; dot: string; label: string }> = {
  HADIR: { bg: 'bg-emerald-100 text-emerald-700', dot: 'bg-emerald-500', label: 'Hadir' },
  SAKIT: { bg: 'bg-amber-100 text-amber-700', dot: 'bg-amber-500', label: 'Sakit' },
  IZIN: { bg: 'bg-blue-100 text-blue-700', dot: 'bg-blue-500', label: 'Izin' },
  ALFA: { bg: 'bg-red-100 text-red-700', dot: 'bg-red-500', label: 'Alfa' },
};

export default function AbsensiPortalPage() {
  const hadir = absensiData.filter(a => a.status === 'HADIR').length;
  const total = absensiData.length;
  const persentase = Math.round((hadir / total) * 100);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          <CalendarCheck className="text-teal-600" /> Riwayat Absensi
        </h1>
        <p className="text-slate-500 text-sm mt-1">Rekam kehadiran putra/putri Anda di kelas tahfidz (hanya baca)</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Hadir', count: absensiData.filter(a => a.status === 'HADIR').length, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Sakit', count: absensiData.filter(a => a.status === 'SAKIT').length, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'Izin', count: absensiData.filter(a => a.status === 'IZIN').length, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Alfa', count: absensiData.filter(a => a.status === 'ALFA').length, color: 'text-red-600', bg: 'bg-red-50' },
        ].map(item => (
          <Card key={item.label} className="border-none shadow-sm rounded-2xl">
            <CardContent className={`p-5 ${item.bg} rounded-2xl`}>
              <p className={`text-3xl font-bold ${item.color}`}>{item.count}</p>
              <p className="text-slate-600 text-xs mt-1">{item.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Persentase */}
      <Card className="border-none shadow-sm rounded-2xl">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-semibold text-slate-700">Persentase Kehadiran</p>
            <p className="text-lg font-bold text-teal-600">{persentase}%</p>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-teal-500 to-teal-600 h-3 rounded-full transition-all"
              style={{ width: `${persentase}%` }}
            />
          </div>
          <p className="text-xs text-slate-400 mt-2">{hadir} dari {total} hari hadir</p>
        </CardContent>
      </Card>

      {/* Detail Table */}
      <Card className="border-none shadow-sm rounded-2xl">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-slate-800">Riwayat Kehadiran Detail</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {absensiData.map((a, i) => {
              const style = statusStyle[a.status];
              return (
                <div key={i} className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors">
                  <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${style.dot}`} />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-800">{a.hari}, {a.tanggal}</p>
                    {a.keterangan && <p className="text-xs text-slate-400">{a.keterangan}</p>}
                  </div>
                  <span className={`px-3 py-0.5 rounded-full text-xs font-semibold ${style.bg}`}>
                    {style.label}
                  </span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
