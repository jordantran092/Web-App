import { Editor } from "@/components/DynamicEditor";

import * as PageActions from "@/actions/PageActions";
import { Block } from "@blocknote/core";
import type { Page } from "@/app/generated/prisma/client";


type PageProps = {
    // the params from the browser url, in this case corresponds to the page id
    params: Promise<{ id: string }>;
}

export default async function Page({ params } : PageProps) {

    const {id} = await params;


    /*

    get the relevant page object with id, access blocks, and convert that string into block array

    For loading initial content, seems like we have map the json into array of block objects. That’s similar to object mapper, find that kind of library, don’t think should do it manually

    */

    const page = await PageActions.getPage(id);



    let initialContent: Block[] = [];

    if(page) {
        const blocks = page.blocks;
        initialContent = JSON.parse(blocks) as Block[];
    }



    return (
        <Editor id={id} initialContent={initialContent}/>   
    );
}