import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { santriList, tanggal } = data;

    if (!santriList || !tanggal) {
      return NextResponse.json({ error: 'Data tidak lengkap' }, { status: 400 });
    }

    // Create multiple absensi records
    const records = santriList.map((s: any) => ({
      santriId: s.id,
      tanggal: new Date(tanggal),
      status: s.status,
    }));

    // For simplicity, we'll use a transaction to create multiple
    await prisma.absensi.createMany({
      data: records,
      skipDuplicates: true,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving absensi:', error);
    return NextResponse.json({ error: 'Gagal menyimpan absensi' }, { status: 500 });
  }
}
