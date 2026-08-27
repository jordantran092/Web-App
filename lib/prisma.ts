// lib/prisma.ts
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@/app/generated/prisma/client'; // default path

const globalForPrisma = global as unknown as { prisma: PrismaClient };

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
    throw new Error('DATABASE_URL is not set');
}

const adapter = new PrismaPg({
    connectionString: databaseUrl,
});
export const prisma = globalForPrisma.prisma || new PrismaClient({ adapter: adapter }); // passing in object that has property adapter using your adapter var

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
