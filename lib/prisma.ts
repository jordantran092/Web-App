// lib/prisma.ts
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@/app/generated/prisma/client'; // default path

const globalForPrisma = global as unknown as { prisma: PrismaClient };

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
    throw new Error('DATABASE_URL is not set');
}

let adapter;
if (databaseUrl === 'postgresql://postgres:postgres@localhost:5432/myapp') {
    // Localhost doesn't need SSL, else error

    adapter = new PrismaPg({
        connectionString: databaseUrl,
    });
} else {
    adapter = new PrismaPg({
        connectionString: databaseUrl,

        // Prisma 7, SSL certificate behavior. To use SSL encryption between database and application, but not to verify that the server's SSL certificate is trusted. Lightsail requires SSL. Need ssl else will get denied access to database error
        ssl: {
            rejectUnauthorized: false,
        },
    });
}

// const adapter = new PrismaPg({
//     connectionString: databaseUrl,

//     // Prisma 7, SSL certificate behavior. To use SSL encryption between database and application, but not to verify that the server's SSL certificate is trusted. Lightsail requires SSL. Need ssl else will get denied access to database error
//     ssl: {
//         rejectUnauthorized: false,
//     },
// });

export const prisma = globalForPrisma.prisma || new PrismaClient({ adapter: adapter }); // passing in object that has property adapter using your adapter var

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
