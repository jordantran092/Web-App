import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { prisma } from '@/lib/prisma'; // single prisma client you generated
import { nextCookies } from 'better-auth/next-js';

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: 'postgresql',
    }),

    // our chosen auth option
    emailAndPassword: {
        enabled: true,
    },

    // Ensure this relies precisely on the environment variable we added
    baseURL: process.env.BETTER_AUTH_URL,

    trustedOrigins: ['https://minto-jt.vercel.app', 'http://localhost:3000'],

    plugins: [nextCookies()], // this makes sure cookies are being updated properly when doing auth. also make sure this is the last plugin in the array
});

export type Session = typeof auth.$Infer.Session;
