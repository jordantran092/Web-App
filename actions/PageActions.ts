"use server";


import * as PageService from "@/services/PageService";
import { PageUpdateInput } from "@/types/Page";



// Controller method for updating page
export async function updatePage({ id, ...data } : PageUpdateInput) {
    
    // auth for later

    PageService.updatePage( {id, ...data} );
    
}

export async function getPage(id: string) {
    
    // auth for later

    return PageService.getPage(id);
    
}