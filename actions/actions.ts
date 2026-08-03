"use server";

import { prisma } from "@/lib/prisma";

export async function updatePage(blocks: string) {
    await prisma.page.update({
        where: { id: ("one") }, // temp. just { id } when use params

        data: {
            blocks: blocks,
        },

    });
}