"use server";

import { PageUpdateInput } from "@/app/generated/prisma/models/Page";
import { prisma } from "@/lib/prisma";


// export async function updatePage(id: string, blocks: string) {
export async function updatePage(pageEntity: PageUpdateInput) {

    const id: string = pageEntity.id?

    const blocks: string = pageEntity.blocks?

    

    await prisma.page.update({
        where: { id }, 

        data: {
            blocks: blocks,
        },

    });
}