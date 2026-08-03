// lib/prisma.ts
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "@/app/generated/prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

const adapter = new PrismaBetterSqlite3({ url: process.env.DATABASE_URL });
export const prisma = globalForPrisma.prisma || new PrismaClient({adapter: adapter}); // passing in object that has property adapter using your adapter var
   

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;