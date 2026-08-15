import { BlockNoteEditor } from '@blocknote/core';
import { filterSuggestionItems, insertOrUpdateBlockForSlashMenu } from '@blocknote/core/extensions';
import '@blocknote/core/fonts/inter.css';
import { BlockNoteView } from '@blocknote/mantine';
import '@blocknote/mantine/style.css';
import {
    DefaultReactSuggestionItem,
    getDefaultReactSlashMenuItems,
    SuggestionMenuController,
    useCreateBlockNote,
} from '@blocknote/react';
import { HiDocumentText } from 'react-icons/hi'; // Heroicons v1
import { MyBlockNoteEditor, schema } from '../schema/CustomSchema';

// Custom Slash Menu item to insert a block after the current one.
const pageItem = (editor: MyBlockNoteEditor) => ({
    title: 'Page',
    onItemClick: () =>
        // If the block containing the text caret is empty, `insertOrUpdateBlock`
        // changes its type to the provided block. Otherwise, it inserts the new
        // block below and moves the text caret to it.

        // insertOrUpdateBlockForSlashMenu(editor, {
        //     type: 'paragraph',
        //     content: [{ type: 'text', text: 'Hello World', styles: { bold: true } }],
        // }),
        insertOrUpdateBlockForSlashMenu(editor, {
            type: 'pageBlock',
            content: [
                {
                    type: 'pageInline',
                    content: 'New page',
                    props: {
                        href: '/',
                    },
                },
            ],
        }),

    //         insertOrUpdateBlockForSlashMenu(editor, {
    //     type: 'page',
    //     content: [
    //         {
    //             type: 'link',
    //             content: [
    //                 {
    //                     type: 'text',
    //                     text: 'New page',
    //                     styles: {},
    //                 },
    //             ],
    //             href: '/',
    //         },
    //     ],
    // }),

    //         insertOrUpdateBlockForSlashMenu(editor, {
    //     type: 'page',
    //     content: [
    //         {
    //             type: 'text',
    //             text: 'New page',
    //             styles: {},
    //         },
    //     ],
    // }),

    aliases: ['page'], // for user queries, e.g. /page
    group: 'Basic blocks',
    icon: <HiDocumentText size={18} />,
    subtext: 'Create new page',
});

// List containing all default Slash Menu Items, as well as our custom one.
export const getCustomSlashMenuItems = (
    editor: MyBlockNoteEditor
): DefaultReactSuggestionItem[] => {
    const items = getDefaultReactSlashMenuItems(editor);
    const index = items.findIndex((item) => item.title === 'Quote');
    // Essentially insert at index of Quote and push Quote and the rest to right
    items.splice(index, 0, pageItem(editor));

    return items;
};
