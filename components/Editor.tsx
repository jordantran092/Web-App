"use client";

import { useCreateBlockNote, useEditorChange } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";

// Default styles for the mantine editor
import "@blocknote/mantine/style.css";
// Include the included Inter font
import "@blocknote/core/fonts/inter.css";

export default function Editor() {
    // Create a new editor instance
    const editor = useCreateBlockNote();


    useEditorChange((editor) => {
        // The current document content as a string
        const savedBlocks = JSON.stringify(editor.document);

        // storeToDB(savedBlocks);
    }, editor);


    // Render the editor
    return <BlockNoteView editor={editor} />;
}