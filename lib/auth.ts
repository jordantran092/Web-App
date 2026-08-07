import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

import { prisma } from "@/lib/prisma"; // single prisma client you generated

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "sqlite", 
    }),

    // our chosen auth option
    emailAndPassword: { 
        enabled: true, 
    }, 
});