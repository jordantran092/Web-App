

import { useCreateBlockNote, useEditorChange } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
// Default styles for the mantine editor
import "@blocknote/mantine/style.css";
// Include the included Inter font
import "@blocknote/core/fonts/inter.css";



import { Block, createExtension } from "@blocknote/core";
import { PageUpdateInput } from "@/types/Page";
import { updatePage } from "@/actions/PageActions";


type EditorProps = {
    id: string,
    initialContent?: Block<any, any, any>[],
    setIsSaving: (value: boolean) => void;
}

export default function Editor({id, initialContent, setIsSaving} : EditorProps) {
    // Create a new editor instance
    const editor = useCreateBlockNote({

        initialContent,

        extensions: [
            // Add extensions here:
            createExtension({
                key: "saveKeyShortcut",

                // expects an object of a key value pair, key is the shortcut, value is the arrow function
                keyboardShortcuts: {
                    "Mod-s": ({ editor }) => {
                        //debug
                        // console.log("Saved page");

                        const savedBlocks = JSON.stringify(editor.document);

                        
                        const pageEntity: PageUpdateInput = {
                            id: id,
                            blocks: savedBlocks,
                        };

                        
                        setIsSaving(true);
                        updatePage(pageEntity)
                            .then(_ => {
                                setIsSaving(false);
                            })
                            .catch((error) => {
                                console.log("Error: Page updated failed. " + error);
                            })
                        

                        return true; // tell BlockNote the shortcut was handled, so that browser does not try to handle it with default response
                    },
                },
            })
        ],
    });




    // useEditorChange((editor) => {
    //     // The current document content as a string
    //     const savedBlocks = JSON.stringify(editor.document);

    //     // storeToDB(savedBlocks);
    //     /*
        
    //     putting arrow function to be async for now

    //     temp for now, just testing out saving. may do like a delayed save for better performance

    //     */

    //     // updatePage(savedBlocks);



    // }, editor);


    // Render the editor
    return <BlockNoteView editor={editor} />;
}