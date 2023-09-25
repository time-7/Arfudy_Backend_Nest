import { config } from 'dotenv';
import { PrismaClient } from '@prisma/client';

config({ path: '.env', override: true });

const prisma = new PrismaClient();

function getDatabaseUrlForTesting() {
  if (!(process.env.DATABASE_URL && process.env.DATABASE_TEST_URL)) {
    throw new Error('Please provider a DATABASE_URL environment variable');
  }

  const url = process.env.DATABASE_TEST_URL;

  return url.toString();
}

beforeAll(async () => {
  const databaseURL = getDatabaseUrlForTesting();

  process.env.DATABASE_URL = databaseURL;
});

afterAll(async () => {
  await prisma.product.deleteMany();
  await prisma.$disconnect();
});
