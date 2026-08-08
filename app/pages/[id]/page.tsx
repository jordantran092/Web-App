
import * as PageActions from "@/actions/PageActions";
import Page from "@/components/Page";
import { auth } from "@/lib/auth";
import { Block } from "@blocknote/core/blocks";
import { headers } from "next/headers";
import { notFound } from "next/navigation";


type PagesProps = {
    // the params from the browser url, in this case corresponds to the page id
    params: Promise<{ id: string }>;
}

export default async function Pages({ params } : PagesProps) {
    

    const {id} = await params;
    const page = await PageActions.getPage(id);


    if(page) {
    
        
        /* Auth Check to see if user owns this page */
        const session = await auth.api.getSession({
            headers: await headers(),
        });


        if(session) {

            const userId = session.user.id;
    
            if(page.userId == userId) {

                /* Loading saved blocks */
            
        
                let initialContent: Block[] = [];
        
                
                const blocks = page.blocks; //fixme SADF82349823984
                // need initialContent prop as a Block[]
                initialContent = JSON.parse(blocks) as Block[];
            
        
        
        
                return (
                    <>
                        <Page id={id} initialContent={initialContent}/>
                    </>
                    
                );
            }
    
        }

    }


    
    return (
        notFound()
    );


   
}