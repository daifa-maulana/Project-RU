import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import bcrypt from 'bcryptjs';
import 'dotenv/config';

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Seeding database...');

  // Create Admin user
  const adminPass = bcrypt.hashSync('Admin@2026', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@raudhlatululum.com' },
    update: {},
    create: {
      name: 'Super Admin',
      email: 'admin@raudhlatululum.com',
      password: adminPass,
      role: 'ADMIN',
    },
  });
  console.log('✅ Admin created:', admin.email);

  // Create Kelas
  const kelas1 = await prisma.kelas.upsert({
    where: { id: 'kelas-1a' },
    update: {},
    create: { id: 'kelas-1a', namaKelas: 'Kelas 1A', tingkat: 'Tahap 1' },
  });
  const kelas2 = await prisma.kelas.upsert({
    where: { id: 'kelas-2b' },
    update: {},
    create: { id: 'kelas-2b', namaKelas: 'Kelas 2B', tingkat: 'Tahap 2' },
  });
  const kelas3 = await prisma.kelas.upsert({
    where: { id: 'kelas-3a' },
    update: {},
    create: { id: 'kelas-3a', namaKelas: 'Kelas 3A', tingkat: 'Tahap 3' },
  });
  console.log('✅ Kelas created');

  // Create Ustadz user
  const ustadzPass = bcrypt.hashSync('Ustadz@2026', 10);
  const ustadzUser = await prisma.user.upsert({
    where: { email: 'syafii@raudhlatululum.com' },
    update: {},
    create: {
      name: "Ust. Ahmad Syafi'i",
      email: 'syafii@raudhlatululum.com',
      password: ustadzPass,
      role: 'USTADZ',
    },
  });
  const ustadz = await prisma.ustadz.upsert({
    where: { userId: ustadzUser.id },
    update: {},
    create: {
      userId: ustadzUser.id,
      nip: 'U001',
      namaLengkap: "Ust. Ahmad Syafi'i",
      noHp: '081234567890',
    },
  });
  console.log('✅ Ustadz created:', ustadzUser.email);

  // Create Orang Tua user
  const ortuPass = bcrypt.hashSync('OrangTua@2026', 10);
  const ortu = await prisma.user.upsert({
    where: { email: 'fauzi@gmail.com' },
    update: {},
    create: {
      name: 'Bpk. Fauzi Rahmad',
      email: 'fauzi@gmail.com',
      password: ortuPass,
      role: 'ORANG_TUA',
    },
  });
  console.log('✅ Orang Tua created:', ortu.email);

  // Create Santri
  const santri = await prisma.santri.upsert({
    where: { nis: '001' },
    update: {},
    create: {
      nis: '001',
      namaLengkap: 'Ahmad Fauzan',
      tempatLahir: 'Bandung',
      tanggalLahir: new Date('2012-05-10'),
      alamat: 'Jl. Mawar No. 1, Bandung',
      kelasId: kelas3.id,
      orangTuaId: ortu.id,
    },
  });
  console.log('✅ Santri created:', santri.namaLengkap);

  // Create sample Absensi
  await prisma.absensi.createMany({
    data: [
      { santriId: santri.id, tanggal: new Date('2026-05-06'), status: 'HADIR' },
      { santriId: santri.id, tanggal: new Date('2026-05-05'), status: 'HADIR' },
      { santriId: santri.id, tanggal: new Date('2026-05-04'), status: 'IZIN', keterangan: 'Acara keluarga' },
    ],
    skipDuplicates: true,
  });
  console.log('✅ Absensi seeded');

  // Create sample Jurnal Tahfidz
  await prisma.jurnalTahfidz.createMany({
    data: [
      {
        santriId: santri.id,
        ustadzId: ustadz.id,
        tanggal: new Date('2026-05-06'),
        jenisSetoran: 'ZIYADAH',
        namaSurah: 'Al-Baqarah',
        ayatMulai: 21,
        ayatSelesai: 40,
        predikatTajwid: 'A',
        catatan: 'Sangat lancar',
      },
      {
        santriId: santri.id,
        ustadzId: ustadz.id,
        tanggal: new Date('2026-05-05'),
        jenisSetoran: 'MURAJAAH',
        namaSurah: 'Al-Fatihah',
        ayatMulai: 1,
        ayatSelesai: 7,
        predikatTajwid: 'A',
        catatan: '',
      },
    ],
    skipDuplicates: true,
  });
  console.log('✅ Jurnal Tahfidz seeded');

  console.log('\n🎉 Seeding selesai!');
  console.log('─────────────────────────────────');
  console.log('Akun yang tersedia:');
  console.log('  Admin    : admin@raudhlatululum.com  | Admin@2026');
  console.log('  Ustadz   : syafii@raudhlatululum.com | Ustadz@2026');
  console.log('  Orang Tua: fauzi@gmail.com           | OrangTua@2026');
  console.log('─────────────────────────────────');
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
