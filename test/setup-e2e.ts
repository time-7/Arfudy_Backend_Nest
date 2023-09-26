import { config } from 'dotenv';
import { PrismaClient } from '@prisma/client';

config({ path: '.env', override: true });

function getDatabaseUrlForTesting() {
  if (!(process.env.DATABASE_URL && process.env.DATABASE_TEST_URL)) {
    throw new Error(
      'Please provider a DATABASE_URL and DATABASE_TEST_URL environment variable',
    );
  }

  return process.env.DATABASE_TEST_URL;
}

beforeAll(async () => {
  process.env.DATABASE_URL = getDatabaseUrlForTesting();
});

const prisma = new PrismaClient({
  datasourceUrl: process.env.DATABASE_TEST_URL,
});

afterAll(async () => {
  await prisma.product.deleteMany();
  await prisma.$disconnect();
});
