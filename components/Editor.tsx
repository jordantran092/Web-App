// client side as used by dynamiceditor component

import { useCreateBlockNote, useEditorChange } from '@blocknote/react';
import { BlockNoteView } from '@blocknote/mantine';
// Default styles for the mantine editor
import '@blocknote/mantine/style.css';
// Include the included Inter font
import '@blocknote/core/fonts/inter.css';

import { Block, createExtension } from '@blocknote/core';
import { PageUpdateInput } from '@/types/Page';
import { updatePage } from '@/actions/PageActions';
import { useEffect, useRef } from 'react';

type EditorProps = {
    id: string;
    initialContent?: Block<any, any, any>[];
    setIsSaving: (value: boolean) => void;
    isSaving: boolean;
    isSavingTimerOn: boolean;
    setIsSavingTimerOn: (value: boolean) => void;
};

export default function Editor({
    id,
    initialContent,
    setIsSaving,
    isSaving,
    isSavingTimerOn,
    setIsSavingTimerOn,
}: EditorProps) {
    /*

    Stale closure with the `'Mod-s': ({ editor }) => {` closure captures isSaving, etc. at that time, never re-built from BlockNote, so it doesn't get updated. Basically call by value with a variable value, instead of call by value with a reference (useRef) so you can access updated values

    Still need state (e.g. isSaving) to trigger re-render

    */
    const isSavingRef = useRef(isSaving);
    const isSavingTimerOnRef = useRef(isSavingTimerOn);

    // Keep refs in sync with incoming prop state even though handler does too in a diff way (in case for other external updates when parent component passes in new props e.g. maybe autosave)
    useEffect(() => {
        isSavingRef.current = isSaving;
    }, [isSaving]);

    useEffect(() => {
        isSavingTimerOnRef.current = isSavingTimerOn;
    }, [isSavingTimerOn]);

    // Create a new editor instance
    const editor = useCreateBlockNote({
        initialContent,

        extensions: [
            // Add extensions here:
            createExtension({
                key: 'saveKeyShortcut',

                // expects an object of a key value pair, key is the shortcut, value is the arrow function
                keyboardShortcuts: {
                    'Mod-s': ({ editor }) => {
                        // do not allow saving if already in process of saving to avoid any desync of values
                        if (!(isSavingRef.current || isSavingTimerOnRef.current)) {
                            const savedBlocks = JSON.stringify(editor.document);

                            const pageEntity: PageUpdateInput = {
                                id: id,
                                blocks: savedBlocks,
                            };

                            // update refs immediately so any subsequent fast events see the in-flight save
                            isSavingRef.current = true;
                            isSavingTimerOnRef.current = true;

                            // still update parent state for UI
                            // console.log('timer: ' + isSavingTimerOn);
                            setIsSaving(true);
                            setIsSavingTimerOn(true);

                            updatePage(pageEntity)
                                // catch to handle error first so it doesn't propgate further
                                .catch((error) => {
                                    console.log('Error: Page updated failed. ' + error);
                                })
                                // regardless of fail or success update, make sure variables are reset
                                .finally(() => {
                                    // clear ref + parent state when done
                                    isSavingRef.current = false;
                                    setIsSaving(false);
                                });

                            console.log('saving!');
                        } else {
                            // debug
                            console.log('already saving!');
                        }

                        return true; // tell BlockNote the shortcut was handled, so that browser does not try to handle it with default response
                    },
                },
            }),
        ],
    });

    // Render the editor
    // For responsiveness, mobile screens take full width hence no breakpoint
    return (
        <BlockNoteView
            editor={editor}
            theme={'dark'}
            className="mt-10 md:mx-32 md:mt-20 xl:mx-70 2xl:mx-132 2xl:mt-36"
        />
    );
}
