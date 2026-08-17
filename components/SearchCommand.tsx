'use client';

import * as React from 'react';

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
import { useEffect } from 'react';
import { CommandLoading } from 'cmdk';

export default function CommandManyItems() {
    const context = React.useContext(SearchMenuOpenContext);
    if (!context) {
        throw new Error('useContext not being used under proper provider');
    }

    const [loading, setLoading] = React.useState(false);
    const [items, setItems] = React.useState<string[]>([]);
    const [search, setSearch] = React.useState('');

    // Must do client-side data fetching after this component loads because pages have to be dynamically rendered based on user input
    useEffect(() => {
        async function getItems() {
            setLoading(true);
            // const res = await api.get('/dictionary');
            // setItems(res);

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

    const listItemsArr = items.map((item, index) => (
        <CommandItem
            key={index}
            value={item} // Have `value` match the item var content in case it changes
            onSelect={() => {
                // items[index].charAt(0);
            }}>
            <HiDocumentText size={23} />
            <span>{item}</span>
        </CommandItem>
    ));

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

                            {listItemsArr}

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
