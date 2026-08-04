"use server";

import { prisma } from "@/lib/prisma";

export async function updatePage(id: string, blocks: string) {
    await prisma.page.update({
        where: { id }, 

        data: {
            blocks: blocks,
        },

    });
}