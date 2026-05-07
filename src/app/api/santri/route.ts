import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const kelasId = searchParams.get('kelasId');

    const santri = await prisma.santri.findMany({
      where: kelasId ? { kelasId } : {},
      include: {
        kelas: true,
      },
      orderBy: {
        namaLengkap: 'asc',
      },
    });

    return NextResponse.json(santri);
  } catch (error) {
    console.error('Error fetching santri:', error);
    return NextResponse.json({ error: 'Gagal mengambil data santri' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { nis, namaLengkap, email, password, kelasId } = body;

    // 1. Create User first
    const hashedPassword = await bcrypt.hash(password || 'Santri@2026', 10);
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: namaLengkap,
        role: 'PARENT', // In this system, Santri login usually means Parent login
      },
    });

    // 2. Create Santri linked to User
    const santri = await prisma.santri.create({
      data: {
        nis,
        namaLengkap,
        userId: user.id,
        kelasId: kelasId || (await prisma.kelas.findFirst())?.id,
      },
    });

    return NextResponse.json(santri);
  } catch (error) {
    console.error('Error creating santri:', error);
    return NextResponse.json({ error: 'Gagal menambah data santri' }, { status: 500 });
  }
}
