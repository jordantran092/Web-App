"use client";

import { useCreateBlockNote, useEditorChange } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";

// Default styles for the mantine editor
import "@blocknote/mantine/style.css";
// Include the included Inter font
import "@blocknote/core/fonts/inter.css";
import { prisma } from "@/lib/prisma";
import { updatePage } from "@/actions/actions";

export default function Editor() {
    // Create a new editor instance
    const editor = useCreateBlockNote();


    useEditorChange(async (editor) => {
        // The current document content as a string
        const savedBlocks = JSON.stringify(editor.document);

        // storeToDB(savedBlocks);
        /*
        
        putting arrow function to be async for now

        temp for now, just testing out saving. may do like a delayed save for better performance

        */

        updatePage(savedBlocks);

        



    }, editor);


    // Render the editor
    return <BlockNoteView editor={editor} />;
}