import { prisma } from '@/lib/prisma';
import crypto from 'node:crypto';

export async function GET() {
    try {
        const u = new URL(process.env.DATABASE_URL!);

        console.log({
            host: u.hostname,
            user: u.username,
            db: u.pathname,
            hasPassword: !!u.password,
            passwordLength: u.password.length,
        });

        const value = process.env.DATABASE_URL ?? '';

        console.log('NEXT DATABASE_URL FINGERPRINT:', {
            exists: !!value,
            length: value.length,
            sha256: crypto.createHash('sha256').update(value).digest('hex'),
        });

        const result = await prisma.$queryRaw<{ current_user: string; current_database: string }[]>`
            SELECT current_user, current_database()
        `;

        return Response.json({
            success: true,
            result,
        });
    } catch (error) {
        console.error('PRISMA TEST FAILED:', error);

        return Response.json(
            {
                success: false,
                error: String(error),
            },
            { status: 500 }
        );
    }
}

// import crypto from 'node:crypto';

// export async function GET() {
//     const value = process.env.DATABASE_URL ?? '';

//     return Response.json({
//         exists: !!value,
//         length: value.length,
//         sha256: crypto.createHash('sha256').update(value).digest('hex'),
//     });
// }
