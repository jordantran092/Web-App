// import 'dotenv/config';
// import { PrismaPg } from '@prisma/adapter-pg';
// import { PrismaClient } from './app/generated/prisma/client';

// console.log('DATABASE_URL exists:', !!process.env.DATABASE_URL);

// const adapter = new PrismaPg({
//     connectionString: process.env.DATABASE_URL,
//     ssl: {
//         rejectUnauthorized: false,
//     },
// });

// const prisma = new PrismaClient({ adapter });

// try {
//     console.log('CONNECTING WITH PRISMA...');

//     const result = await prisma.$queryRaw`
//         SELECT current_user, current_database()
//     `;

//     console.log('PRISMA CONNECTED!');
//     console.log(result);
// } catch (error) {
//     console.error('PRISMA CONNECTION FAILED');
//     console.error(error);
// } finally {
//     await prisma.$disconnect();
// }

import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from './app/generated/prisma/client';

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL!,
    ssl: {
        rejectUnauthorized: false,
    },
});

const prisma = new PrismaClient({ adapter });

try {
    console.log('CONNECTING WITH PRISMA...');

    const result = await prisma.$queryRaw<{ current_user: string; current_database: string }[]>`
        SELECT current_user, current_database()
    `;

    console.log('PRISMA CONNECTED!');
    console.log(result);
} catch (error) {
    console.error('PRISMA FAILED!');
    console.error(error);
} finally {
    await prisma.$disconnect();
}
