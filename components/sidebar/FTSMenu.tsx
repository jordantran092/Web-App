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
import { SearchMenuOpenContext } from '../pages/Page';
import { HiDocumentText } from 'react-icons/hi';
import { RefObject, useEffect } from 'react';
import { CommandLoading } from 'cmdk';
import { Page } from '@/app/generated/prisma/client';
import { Block } from '@blocknote/core/blocks';
import { PageUpdateInput } from '@/types/Page';
import { useBlockNoteEditor } from '@blocknote/react';
import {
    MyDefaultBlockSchema,
    MyInlineContentSchema,
    MyStyleSchema,
    schema,
} from '@/components/editor/schema/CustomSchema';
import LoadingSpinner from '../LoadingSpinner';
import { StyledText } from '@blocknote/core';
import { getText } from '@/utils/block-utils';

type FTSMenuProps = {
    isFTSMenuOpen: boolean;
    setIsFTSMenuOpen: (value: boolean) => void;
};
export default function FTSMenu({ isFTSMenuOpen, setIsFTSMenuOpen }: FTSMenuProps) {
    // const context = React.useContext(SearchMenuOpenContext);
    // if (!context) {
    //     throw new Error('useContext not being used under proper provider');
    // }

    const [loading, setLoading] = React.useState(false);
    const [items, setItems] = React.useState<Page[]>([]);
    const [search, setSearch] = React.useState('');

    // const editor = context.editorRef.current;

    // Must do client-side data fetching after this component loads because pages have to be dynamically rendered based on user input
    useEffect(() => {
        async function getItems() {
            setLoading(true);
            const pageArr = await PageActions.getPagesFromFullTextSearch(search);
            setItems(pageArr);

            setLoading(false);
        }

        // Only pull pages when search input changes
        if (search) {
            getItems();
        }
    }, [search]);

    // Map each item in the array data pulled from DB, into command items, to render
    const cmdItemsArr = items.map((item, index) => {
        const title = item.title;

        return (
            <CommandItem
                key={index}
                value={title + index} // Has to be unique values for each CommandItem or else, run into styling conflicts
                onSelect={() => {
                    //router push new tab
                }}>
                <HiDocumentText size={23} />
                <span>{title}</span>
            </CommandItem>
        );
    });

    return (
        <div className="flex flex-col gap-4">
            <CommandDialog open={isFTSMenuOpen} onOpenChange={setIsFTSMenuOpen}>
                <Command>
                    <CommandInput
                        placeholder="Search..."
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
