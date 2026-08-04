import { Editor } from "@/components/DynamicEditor";


type PageProps = {
    params: Promise<{ id: string }>;
}

export default async function Page({ params } : PageProps) {

    const {id} = await params;


    /*

    get the relevant page object with id, access blocks, and convert that string into block array

    For loading initial content, seems like we have map the json into array of block objects. That’s similar to object mapper, find that kind of library, don’t think should do it manually

    */

    return (
        <Editor id={id}/>   
    );
}