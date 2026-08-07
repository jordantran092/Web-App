"use server";


import { prisma } from "@/lib/prisma"; // single prisma client generated from the prisma.ts file
import { PageUpdateInput } from "@/types/Page";



export async function updatePage({ id, ...data } : PageUpdateInput) {
    
    await prisma.page.update({
        where: { id }, 

        data // since data param is same as data property name, use property shorthand as so. will also only comprise of fields entered, optional fields ignored

    });
}


export async function getPage(id: string) {
    
    // async function will wrap return in a promise again, so await here will be useless
    return prisma.page.findUnique({
        where: { id }, 

    });
}