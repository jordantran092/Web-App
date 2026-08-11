import { useCreateBlockNote, useEditorChange } from '@blocknote/react';
import { BlockNoteView } from '@blocknote/mantine';
// Default styles for the mantine editor
import '@blocknote/mantine/style.css';
// Include the included Inter font
import '@blocknote/core/fonts/inter.css';

import { Block, createExtension } from '@blocknote/core';
import { PageUpdateInput } from '@/types/Page';
import { updatePage } from '@/actions/PageActions';

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
                        if (!(isSaving || isSavingTimerOn)) {
                            const savedBlocks = JSON.stringify(editor.document);

                            const pageEntity: PageUpdateInput = {
                                id: id,
                                blocks: savedBlocks,
                            };

                            console.log('timer: ' + isSavingTimerOn);
                            setIsSaving(true);
                            setIsSavingTimerOn(true);
                            updatePage(pageEntity)
                                .then((_) => {
                                    setIsSaving(false);
                                })
                                .catch((error) => {
                                    console.log('Error: Page updated failed. ' + error);
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

//-----
import { useCallback, useEffect, useRef } from 'react';
import { PageUpdateInput } from '@/types/Page';
import { updatePage } from '@/actions/PageActions';

type UseEditorSaveGuardParams = {
    id: string;
    setIsSaving: (value: boolean) => void;
    isSaving: boolean;
    isSavingTimerOn: boolean;
    setIsSavingTimerOn: (value: boolean) => void;
};

// Hook that provides a stable keyboard shortcut handler which uses refs
// internally to avoid stale closure reads of isSaving/isSavingTimerOn.
export default function useEditorSaveGuard({
    id,
    setIsSaving,
    isSaving,
    isSavingTimerOn,
    setIsSavingTimerOn,
}: UseEditorSaveGuardParams) {
    const isSavingRef = useRef(isSaving);
    const isSavingTimerOnRef = useRef(isSavingTimerOn);

    // Keep refs in sync with incoming prop state (for external updates)
    useEffect(() => {
        isSavingRef.current = isSaving;
    }, [isSaving]);

    useEffect(() => {
        isSavingTimerOnRef.current = isSavingTimerOn;
    }, [isSavingTimerOn]);

    // Returns a handler suitable for BlockNote keyboardShortcuts, e.g.:
    // { 'Mod-s': saveShortcutHandler }
    const getSaveShortcutHandler = useCallback(() => {
        return ({ editor }: { editor: any }) => {
            // Read/writes to refs are synchronous and avoid stale closures.
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
                setIsSaving(true);
                setIsSavingTimerOn(true);

                updatePage(pageEntity)
                    .then((_) => {
                        // clear ref + parent state when done
                        isSavingRef.current = false;
                        setIsSaving(false);
                    })
                    .catch((error) => {
                        console.log('Error: Page updated failed. ' + error);
                    });

                console.log('saving!');
            } else {
                console.log('already saving!');
            }

            return true; // indicate the shortcut was handled
        };
    }, [id, setIsSaving, setIsSavingTimerOn]);

    return { getSaveShortcutHandler };
}
