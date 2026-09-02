// becomes client side as it is used by dynamiceditor component

import {
    SideMenuController,
    SuggestionMenuController,
    useCreateBlockNote,
    useEditorChange,
} from '@blocknote/react';
import { BlockNoteView } from '@blocknote/mantine';
// Default styles for the mantine editor
import '@blocknote/mantine/style.css';
// Include the included Inter font
import '@blocknote/core/fonts/inter.css';
// import '@/app/globals.css';

import {
    Block,
    BlockNoteSchema,
    createExtension,
    filterSuggestionItems,
    StyledText,
} from '@blocknote/core';
import { PageUpdateInput } from '@/types/Page';
import * as PageActions from '@/actions/PageActions';
import { useContext, useEffect, useRef } from 'react';

import { MyDefaultBlockSchema, MyStyleSchema, schema } from './schema/CustomSchema';
import { CustomSideMenu } from './side-menu/CustomSideMenu';
import { SearchMenuOpenContext } from '../pages/Page';
import { getText } from '@/utils/block-utils';
import { getCustomSlashMenuItems } from './slash-menu/CustomSlashMenuItems';

type EditorProps = {
    id: string;
    initialContent?: Block<MyDefaultBlockSchema, any, any>[];
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
    const confirmSearchTimerRef = useRef<NodeJS.Timeout>(null);
    const confirmSearchTimerDoneRef = useRef(true);
    const autosaveSetupDoneRef = useRef(false);

    // Create a new editor instance
    const editor = useCreateBlockNote({
        schema,

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
                            const pageEntity: PageUpdateInput = {
                                id: id,
                                blocks: JSON.stringify(editor.document),
                                textContent: editor._tiptapEditor
                                    .getText()
                                    .replace(/\s+/g, ' ')
                                    .trim(), // to get only text content, multi spaces removed so words still stay separate
                            };

                            // update refs immediately so any subsequent fast events see the in-flight save
                            isSavingRef.current = true;
                            isSavingTimerOnRef.current = true;

                            // still update parent state for UI
                            // console.log('timer: ' + isSavingTimerOn);
                            setIsSaving(true);
                            setIsSavingTimerOn(true);

                            PageActions.updatePage(pageEntity)
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

                            // debug
                            // console.log('saving!');
                        } else {
                            // debug
                            // console.log('already saving!');
                        }

                        return true; // tell BlockNote the shortcut was handled, so that browser does not try to handle it with default response
                    },
                },
            }),
        ],
    });

    // Keep refs in sync with incoming prop state even though handler does too in a diff way (in case for other external updates when parent component passes in new props e.g. maybe autosave)
    useEffect(() => {
        isSavingRef.current = isSaving;
    }, [isSaving]);

    useEffect(() => {
        isSavingTimerOnRef.current = isSavingTimerOn;
    }, [isSavingTimerOn]);

    useEffect(() => {
        const cleanupOnChange = editor.onChange((editor) => {
            // autosaveSetupDoneRef: To only save after the onchange listener is created, basically to avoid auto saving when component mounts/page is opened for first time

            if (autosaveSetupDoneRef.current) {
                if (!confirmSearchTimerDoneRef.current) {
                    if (confirmSearchTimerRef.current) clearTimeout(confirmSearchTimerRef.current);
                }

                // Set a timer
                confirmSearchTimerDoneRef.current = false;
                confirmSearchTimerRef.current = setTimeout(() => {
                    // Save page
                    const pageEntity: PageUpdateInput = {
                        id: id,
                        blocks: JSON.stringify(editor.document),
                        textContent: editor._tiptapEditor.getText().replace(/\s+/g, ' ').trim(), // to get only text content, multi spaces removed so words still stay separate
                    };
                    PageActions.updatePage(pageEntity);

                    confirmSearchTimerDoneRef.current = true;
                }, 2000);
            }
        });

        autosaveSetupDoneRef.current = true;

        return () => {
            // Cleanup function to clear the timer if component unmounts
            // clearTimeout is a closure on timer, so timer will still live on until cleanup function finishes
            if (confirmSearchTimerRef.current) {
                clearTimeout(confirmSearchTimerRef.current);
            }

            cleanupOnChange();
        };
    }, [editor]); // When editor changes, after a fast refresh during dev. Avoids stale listener on old editor during development only.

    const context = useContext(SearchMenuOpenContext);
    if (!context) {
        throw new Error('useContext not being used under proper provider');
    }
    // context becomes the object of type SearchMenuOpenContextType, with all the proeprties e.g. editorRef. Then access editorRef.
    context.editorRef.current = editor;

    // Render the editor
    // For responsiveness, mobile screens take full width hence no breakpoint
    return (
        <BlockNoteView
            className="mt-10 md:mx-32 md:mt-20 xl:mx-70 2xl:mx-132 2xl:mt-36"
            editor={editor}
            theme={'dark'}
            slashMenu={false} // Seems like have to have this if want custom slash menu
        >
            <SuggestionMenuController
                triggerCharacter={'/'} // to make queries to find item in menu
                // Replaces the default Slash Menu items with our custom ones.
                getItems={async (query) =>
                    filterSuggestionItems(getCustomSlashMenuItems(editor, id), query)
                }
            />
            <SideMenuController sideMenu={CustomSideMenu} />
        </BlockNoteView>
    );
}
