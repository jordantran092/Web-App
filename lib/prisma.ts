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

    // Prisma 7, SSL certificate behavior. tells the PostgreSQL client to use SSL encryption, but not to verify that the server's SSL certificate is trusted. Lightsail requires SSL. Or else will get denied access to database error
    ssl: {
        rejectUnauthorized: false,
    },
});
export const prisma = globalForPrisma.prisma || new PrismaClient({ adapter: adapter }); // passing in object that has property adapter using your adapter var

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
