import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { santriId, ustadzId, tanggal, jenisSetoran, namaSurah, ayatMulai, ayatSelesai, predikatTajwid, catatan } = data;

    if (!santriId || !namaSurah) {
      return NextResponse.json({ error: 'Data tidak lengkap' }, { status: 400 });
    }

    // Fallback: Find the first ustadz if none provided or invalid
    let finalUstadzId = ustadzId;
    if (!ustadzId || ustadzId === 'system-user') {
      const firstUstadz = await prisma.ustadz.findFirst();
      if (!firstUstadz) {
        return NextResponse.json({ error: 'Tidak ada ustadz terdaftar di database' }, { status: 400 });
      }
      finalUstadzId = firstUstadz.id;
    }

    const jurnal = await prisma.jurnalTahfidz.create({
      data: {
        santriId,
        ustadzId: finalUstadzId,
        tanggal: new Date(tanggal),
        jenisSetoran,
        namaSurah,
        ayatMulai: parseInt(ayatMulai),
        ayatSelesai: parseInt(ayatSelesai),
        predikatTajwid,
        catatan,
      },
    });

    return NextResponse.json(jurnal);
  } catch (error) {
    console.error('Error saving jurnal:', error);
    return NextResponse.json({ error: 'Gagal menyimpan jurnal tahfidz: ' + (error instanceof Error ? error.message : 'Unknown error') }, { status: 500 });
  }
}
