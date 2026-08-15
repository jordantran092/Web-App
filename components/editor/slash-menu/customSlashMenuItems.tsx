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
import * as PageActions from '@/actions/PageActions';

import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { PageCreateInput } from '@/types/Page';
import { unauthorized } from 'next/navigation';

// Custom Slash Menu item to insert a block after the current one.
const pageItem = (editor: MyBlockNoteEditor, id: string) => ({
    title: 'Page',
    onItemClick: async () => {
        // If the block containing the text caret is empty, `insertOrUpdateBlock`
        // changes its type to the provided block. Otherwise, it inserts the new
        // block below and moves the text caret to it.

        // SADF23493249823 convert to server action?
        const session = await auth.api.getSession({
            headers: await headers(),
        });
        if (!session) return unauthorized();

        const pageEntity: PageCreateInput = {
            title: 'New page',
            user: session?.user.id,
            parentPageId: id,
        };

        PageActions.createPage(pageEntity);

        insertOrUpdateBlockForSlashMenu(editor, {
            type: 'pageBlock',
            props: {
                href: '/fafafa', // real href will just be a whole new page, with its own unique address, no connection to the parent page url
            },
        });
    },

    aliases: ['page'], // for user queries, e.g. /page
    group: 'Basic blocks',
    icon: <HiDocumentText size={18} />,
    subtext: 'Create new page',
});

// List containing all default Slash Menu Items, as well as our custom one.
export const getCustomSlashMenuItems = (
    editor: MyBlockNoteEditor,
    id: string
): DefaultReactSuggestionItem[] => {
    const items = getDefaultReactSlashMenuItems(editor);
    const index = items.findIndex((item) => item.title === 'Quote');
    // Essentially insert at index of Quote and push Quote and the rest to right
    items.splice(index, 0, pageItem(editor, id));

    return items;
};
