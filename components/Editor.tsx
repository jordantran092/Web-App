

import { useCreateBlockNote, useEditorChange } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
// Default styles for the mantine editor
import "@blocknote/mantine/style.css";
// Include the included Inter font
import "@blocknote/core/fonts/inter.css";




import { Block, createExtension } from "@blocknote/core";
import { PageUpdateInput } from "@/types/Page";
import { updatePage } from "@/actions/PageActions";
import "@/styles.css";


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




    // Render the editor
    // For responsiveness, mobile screens take full width hence no breakpoint
    return <BlockNoteView editor={editor} theme={"dark"} className="md:mx-32 xl:mx-70" />; 
}