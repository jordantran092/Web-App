import { insertOrUpdateBlockForSlashMenu } from '@blocknote/core/extensions';
import '@blocknote/core/fonts/inter.css';
import '@blocknote/mantine/style.css';
import { DefaultReactSuggestionItem, getDefaultReactSlashMenuItems } from '@blocknote/react';
import { HiDocumentText } from 'react-icons/hi'; // Heroicons v1
import { MyBlockNoteEditor } from '../schema/CustomSchema';
import * as PageActions from '@/actions/PageActions';
import * as AuthActions from '@/actions/AuthActions';

import { PageCreateInput, PageUpdateInput } from '@/types/Page';

// Custom Slash Menu item to insert a block after the current one.
const pageItem = (editor: MyBlockNoteEditor, id: string) => ({
    title: 'Page',
    onItemClick: async () => {
        // If the block containing the text caret is empty, `insertOrUpdateBlock`
        // changes its type to the provided block. Otherwise, it inserts the new
        // block below and moves the text caret to it.

        const userId = await AuthActions.getSessionUserId();

        const pageEntity: PageCreateInput = {
            title: 'New page',
            user: userId,
            parentPageId: id,
        };

        const savedPageEntity = await PageActions.createPage(pageEntity);

        insertOrUpdateBlockForSlashMenu(editor, {
            type: 'pageBlock',
            props: {
                pageId: `${savedPageEntity.id}`,
                title: `${savedPageEntity.title}`,
            },
        });

        // Update parent page since changed content
        const savedBlocks = JSON.stringify(editor.document);

        const parentPageEntity: PageUpdateInput = {
            id: id,
            blocks: savedBlocks,
        };

        PageActions.updatePage(parentPageEntity);
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
