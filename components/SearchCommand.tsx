'use client';

import * as React from 'react';
import * as PageActions from '@/actions/PageActions';

import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command';
import { SearchMenuOpenContext } from './Page';
import { HiDocumentText } from 'react-icons/hi';
import { RefObject, useEffect } from 'react';
import { CommandLoading } from 'cmdk';
import { Page } from '@/app/generated/prisma/client';
import { Block } from '@blocknote/core/blocks';
import { PageUpdateInput } from '@/types/Page';
import { useBlockNoteEditor } from '@blocknote/react';
import { schema } from '@/components/editor/schema/CustomSchema';

export default function SearchCommand() {
    const context = React.useContext(SearchMenuOpenContext);
    if (!context) {
        throw new Error('useContext not being used under proper provider');
    }

    const [loading, setLoading] = React.useState(false);
    const [items, setItems] = React.useState<Page[]>([]);
    const [search, setSearch] = React.useState('');

    const editor = context.editorRef.current;

    // Must do client-side data fetching after this component loads because pages have to be dynamically rendered based on user input
    useEffect(() => {
        async function getItems() {
            setLoading(true);
            const pageArr = await PageActions.findMany();
            setItems(pageArr);

            //debug
            // const items = ['hello', 'two'];
            // setItems(items);
            // console.log('get pages');

            setLoading(false);
        }

        // Only pull pages when open dialog, not when page loads, and makes sure all pages loaded are latest
        if (context.isSearchMenuOpen) {
            getItems();
        }
    }, [context.isSearchMenuOpen]);

    const cmdItemsArr = items.map((item, index) => {
        const title = item.title;

        return (
            <CommandItem
                key={index}
                value={title + index} // Has to be unique values for each CommandItem or else, run into styling conflicts
                onSelect={() => {
                    // Get current saved blocks and then push the selected block into that, and then update the selected page with these new blocks

                    const blocks = JSON.parse(item.blocks) as Block<any, any, any>[]; // BOOKMARK23849823489234

                    const selectedBlock = context.selectedBlockRef.current;
                    if (selectedBlock) {
                        blocks.push(selectedBlock);
                        context.selectedBlockRef.current = null; // reset selected block in case

                        const newBlocks = JSON.stringify(blocks);
                        const pageEntity: PageUpdateInput = {
                            id: item.id, // the selected page's id
                            blocks: newBlocks,
                        };
                        PageActions.updatePage(pageEntity);

                        /* Remove selected block from parent page and update parent page. Use editor instance because it contains the client side blocks which is most up to date compared to DB blocks version */

                        // use editor instance, remove it, and then update parent page by getting its id

                        editor?.removeBlocks([selectedBlock]); // can pass in a Block object

                        const newBlocksParent = JSON.stringify(editor?.document);
                        const pageEntityParent: PageUpdateInput = {
                            id: item.id, // the selected page's id
                            blocks: newBlocksParent,
                        };
                        PageActions.updatePage(pageEntityParent);
                    }
                }}>
                <HiDocumentText size={23} />
                <span>{title}</span>
            </CommandItem>
        );
    });

    return (
        <div className="flex flex-col gap-4">
            <CommandDialog
                open={context.isSearchMenuOpen}
                onOpenChange={context.setisSearchMenuOpen}>
                <Command>
                    <CommandInput
                        placeholder="Move to..."
                        value={search}
                        onValueChange={setSearch}
                    />
                    <CommandList>
                        <CommandEmpty>No results found.</CommandEmpty>

                        <CommandGroup heading="Pages">
                            {/* <CommandItem>
                                    <InboxIcon />
                                    <span>Inbox</span>
                                    <CommandShortcut>⌘I</CommandShortcut>
                                </CommandItem> */}
                            {loading && <CommandLoading>Fetching (fix me)…</CommandLoading>}

                            {cmdItemsArr}

                            <CommandItem>
                                <HiDocumentText size={23} />
                                <span>Placeholder page</span>
                            </CommandItem>
                        </CommandGroup>
                    </CommandList>
                </Command>
            </CommandDialog>
        </div>
    );
}
