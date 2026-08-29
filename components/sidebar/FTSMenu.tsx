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
import { Input } from '../ui/input';
import { SearchIcon } from 'lucide-react';

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

        // Only pull pages when search input changes, and do not fetch when ''
        if (search !== '') {
            getItems();
        } else {
            setItems([]);
        }
    }, [search]);

    // Map each item in the array data pulled from DB, into command items, to render
    const cmdItemsArr = items.map((item, index) => {
        const title = item.title;

        return (
            <CommandItem
                key={index}
                value={title + index} // Has to be unique values for each CommandItem or else, run into styling conflicts
                // onSelect={() => {
                //     //router push new tab
                // }}
            >
                <HiDocumentText size={23} />
                <span>{title}</span>
            </CommandItem>
        );
    });

    // console.log(items);
    console.log(cmdItemsArr);

    return (
        <div className="flex flex-col gap-4">
            <CommandDialog open={isFTSMenuOpen} onOpenChange={setIsFTSMenuOpen}>
                <Command>
                    <div className="mx-1 mt-1 flex h-8 min-w-0 gap-2 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40">
                        <SearchIcon className="mt-0.5 size-4 shrink-0 opacity-50" />
                        <input
                            // removes default CSS outline when focus/click on input
                            className="w-full focus:outline-none"
                            placeholder="Search..."

                            value={search}
                            onChange={(e) => {
                                setSearch(e.currentTarget.value);
                            }}
                        />
                    </div>

                    <CommandList>
                        <CommandEmpty>No results found. </CommandEmpty>

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
