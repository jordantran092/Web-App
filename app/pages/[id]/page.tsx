
import * as PageActions from "@/actions/PageActions";
import Page from "@/components/Page";
import { Block } from "@blocknote/core/blocks";


type PagesProps = {
    // the params from the browser url, in this case corresponds to the page id
    params: Promise<{ id: string }>;
}

export default async function Pages({ params } : PagesProps) {
    
    

    const {id} = await params;


    /* Loading saved blocks */
    const page = await PageActions.getPage(id);

    let initialContent: Block[] = [];

    if(page) {
        const blocks = page.blocks;
        // need initialContent prop as a Block[]
        initialContent = JSON.parse(blocks) as Block[];
    }



    return (
        <>
            <Page id={id} initialContent={initialContent}/>
        </>
        
    );
}