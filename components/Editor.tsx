"use client";

import { useCreateBlockNote, useEditorChange } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
// Default styles for the mantine editor
import "@blocknote/mantine/style.css";
// Include the included Inter font
import "@blocknote/core/fonts/inter.css";


import { updatePage } from "@/actions/actions";
import { Block, createExtension } from "@blocknote/core";


type EditorProps = {
    id: string,
    initialContent?: Block<any, any, any>[],
}

export default function Editor({id, initialContent} : EditorProps) {
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

                        updatePage(id, savedBlocks);
                        

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