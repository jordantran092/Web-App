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
import { MyDefaultBlockSchema, schema } from '@/components/editor/schema/CustomSchema';
import LoadingSpinner from './LoadingSpinner';

type SearchCommandProps = {
    id: string;
};
export default function SearchCommand({ id }: SearchCommandProps) {
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
                    // Get current saved blocks of selected page and then push the selected block into that, and then update the selected page with these new blocks

                    let blocks: Block<MyDefaultBlockSchema, any, any>[] = []; // current saved blocks of selected page

                    if (item.blocks) {
                        blocks = JSON.parse(item.blocks) as Block<MyDefaultBlockSchema, any, any>[];
                    }

                    const selectedBlock = context.selectedBlockRef.current;
                    // Must check if selectedBlock is non-empty to avoid re-trying action after successful action
                    if (selectedBlock) {
                        blocks.push(selectedBlock);
                        context.selectedBlockRef.current = null; // Must reset to avoid re-trying action after successful action
                        context.setisSearchMenuOpen(false); // close dialog

                        const newBlocks = JSON.stringify(blocks);
                        const destinationPageEntity: PageUpdateInput = {
                            // the selected page

                            id: item.id, // the selected page's id
                            blocks: newBlocks,
                        };
                        PageActions.updatePage(destinationPageEntity);

                        /* If block is a page block, update parent page id of the selected page block */
                        if (selectedBlock.type === 'pageBlock') {
                            const selectedBlockPageEntity: PageUpdateInput = {
                                id: selectedBlock.props.pageId,
                                parentId: item.id,
                            };
                            PageActions.updatePage(selectedBlockPageEntity);
                        }

                        /* Remove selected block from parent page and update parent page. Use editor instance because it contains the client side blocks which is most up to date compared to DB blocks version */

                        editor?.removeBlocks([selectedBlock]); // can pass in a Block object

                        const newBlocksParent = JSON.stringify(editor?.document);
                        const pageEntityParent: PageUpdateInput = {
                            id: id, // the selected page's id
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
                            {loading && (
                                <CommandLoading className="my-2 pl-2">
                                    <LoadingSpinner />
                                </CommandLoading>
                            )}

                            {cmdItemsArr}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </CommandDialog>
        </div>
    );
}
