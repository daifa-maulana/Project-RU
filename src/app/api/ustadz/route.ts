import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function GET(request: NextRequest) {
  try {
    const ustadz = await prisma.ustadz.findMany({
      include: {
        user: {
          select: {
            email: true,
            name: true,
          }
        },
      },
      orderBy: {
        namaLengkap: 'asc',
      },
    });

    return NextResponse.json(ustadz);
  } catch (error) {
    console.error('Error fetching ustadz:', error);
    return NextResponse.json({ error: 'Gagal mengambil data ustadz' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { nip, namaLengkap, email, password, noHp } = body;

    // 1. Create User first
    const hashedPassword = await bcrypt.hash(password || 'Ustadz@2026', 10);
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: namaLengkap,
        role: 'USTADZ',
      },
    });

    // 2. Create Ustadz linked to User
    const ustadz = await prisma.ustadz.create({
      data: {
        nip,
        namaLengkap,
        noHp,
        userId: user.id,
      },
    });

    return NextResponse.json(ustadz);
  } catch (error) {
    console.error('Error creating ustadz:', error);
    return NextResponse.json({ error: 'Gagal menambah data ustadz' }, { status: 500 });
  }
}
