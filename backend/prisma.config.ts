import 'dotenv/config';
import { defineConfig } from '@prisma/config';

export default defineConfig({
  datasource: {
    url: process.env.DATABASE_URL!,  // <-- Gibutangan og !
  },
  migrations: {
    seed: 'ts-node --esm prisma/seed.ts',
  },
});