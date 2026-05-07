import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import 'dotenv/config';

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🧹 Clearing database...');

  // Delete in order to respect foreign key constraints
  await prisma.jurnalTahfidz.deleteMany({});
  console.log('✅ Jurnal Tahfidz cleared');

  await prisma.absensi.deleteMany({});
  console.log('✅ Absensi cleared');

  await prisma.santri.deleteMany({});
  console.log('✅ Santri cleared');

  await prisma.ustadz.deleteMany({});
  console.log('✅ Ustadz cleared');

  await prisma.kelas.deleteMany({});
  console.log('✅ Kelas cleared');

  await prisma.user.deleteMany({});
  console.log('✅ Users cleared');

  console.log('\n✨ Database is now empty and ready for deployment!');
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
