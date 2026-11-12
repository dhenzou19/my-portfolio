import pkg from '@prisma/client';
const { PrismaClient } = pkg as any;
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import 'dotenv/config';

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Seeding portfolio data...');

  // 1. Clear old data (para walay duplicate)
  await prisma.project.deleteMany();
  await prisma.skill.deleteMany();

  // 2. Add your Projects
  await prisma.project.create({
    data: {
      title: 'Full-Stack E-Commerce Platform',
      description: 'A complete e-commerce app with guest cart, JWT authentication, and atomic stock transactions.',
      techStack: 'Next.js, TypeScript, Node.js, Express, Prisma, PostgreSQL, Docker',
      liveUrl: 'https://ecommerce-app-nine-lyart.vercel.app', // Paliti ni kung naa kay bag-ong URL
      repoUrl: 'https://github.com/dhenzou19/ecommerce-app',
      imageUrl: '/ecommerce-preview.jpg', // Pwede nimo butangan og picture unya
    },
  });

  await prisma.project.create({
    data: {
      title: 'Kicks (Sneaker Store)',
      description: 'A modern sneaker store showcasing a sleek UI and dynamic product rendering.',
      techStack: 'Next.js, Tailwind CSS, Node.js',
      liveUrl: null,
      repoUrl: null,
      imageUrl: '/kicks-preview.jpg',
    },
  });

  // 3. Add your Skills
  await prisma.skill.createMany({
    data: [
      { name: 'React & Next.js', category: 'Frontend' },
      { name: 'TypeScript', category: 'Frontend' },
      { name: 'Tailwind CSS', category: 'Frontend' },
      { name: 'Node.js & Express', category: 'Backend' },
      { name: 'Prisma ORM', category: 'Backend' },
      { name: 'PostgreSQL', category: 'Database' },
      { name: 'Docker', category: 'DevOps' },
      { name: 'Git & GitHub', category: 'DevOps' },
      { name: 'Vercel & Render', category: 'DevOps' },
    ],
  });

  console.log('✅ Seeding complete!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });