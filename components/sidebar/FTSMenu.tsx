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
import { RefObject, useEffect, useRef, useState } from 'react';
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
import Link from 'next/link';

type FTSMenuProps = {
    isFTSMenuOpen: boolean;
    setIsFTSMenuOpen: (value: boolean) => void;
};
export default function FTSMenu({ isFTSMenuOpen, setIsFTSMenuOpen }: FTSMenuProps) {
    const [loading, setLoading] = useState(false);
    const [items, setItems] = useState<Page[]>([]);
    const itemsRef = useRef<Page[]>([]);
    const [itemsHeadline, setItemsHeadline] = useState<string[]>([]);
    const itemsHeadlineRef = useRef<string[]>([]);
    const [search, setSearch] = useState('');
    const confirmSearchTimerRef = useRef<NodeJS.Timeout>(null);
    const confirmSearchTimerDoneRef = useRef(true);
    const [isAtBottomOfMenu, setIsAtBottomOfMenu] = useState(false);
    const isAtBottomOfMenuRef = useRef(false);
    const currentPageNumRef = useRef(1);
    const totalPagesInDBRef = useRef(-1);

    // Must do client-side data fetching after this component loads because pages have to be dynamically rendered based on user input
    useEffect(() => {
        async function getItems() {
            setLoading(true);

            currentPageNumRef.current = 1; // reset current page num because new search/query
            const pageArr = await PageActions.getPagesFromFullTextSearch(
                search,
                currentPageNumRef.current
            );
            setItems(pageArr);

            const itemsHeadlineArr = await PageActions.getHeadlinesFromFullTextSearchPages(
                pageArr,
                search
            );
            setItemsHeadline(itemsHeadlineArr);

            setLoading(false);
        }

        // Only pull pages when search input is non empty
        if (search !== '') {
            /*

            If timer is not done, then clear old timer and set a new timer

            If timer is done/not running, then still set a new timer as if everything is fresh

            Once timer done, then actually make DB query for FTS search

            All to avoid querying every single search input change, better to query once user has finished typing for some time

            */

            if (!confirmSearchTimerDoneRef.current) {
                if (confirmSearchTimerRef.current) clearTimeout(confirmSearchTimerRef.current);
            }

            // Set a timer
            confirmSearchTimerDoneRef.current = false;
            confirmSearchTimerRef.current = setTimeout(() => {
                getItems();
                confirmSearchTimerDoneRef.current = true;
            }, 500);
        } else {
            setItems([]);
        }

        // Cleanup function to clear the timer if component unmounts
        // clearTimeout is a closure on timer, so timer will still live on until cleanup function finishes
        return () => {
            if (confirmSearchTimerRef.current) clearTimeout(confirmSearchTimerRef.current);
        };
    }, [search]);

    useEffect(() => {
        async function getNewItems() {
            setLoading(true);
            const newPageArr = await PageActions.getPagesFromFullTextSearch(
                search,
                ++currentPageNumRef.current // increment value, THEN use result as argument
            );

            const prevPageArr = itemsRef.current;
            const finalPageArr = [...prevPageArr, ...newPageArr]; // Append to current items
            setItems(finalPageArr);
            itemsRef.current = finalPageArr; // immediately keep in sync to be safer instead of wait for use effect which can be useful if source of change is outside of function

            // Get headlines of only the new pages
            const itemsHeadlineArr = await PageActions.getHeadlinesFromFullTextSearchPages(
                newPageArr,
                search
            );
            setItemsHeadline([...itemsHeadlineRef.current, ...itemsHeadlineArr]);
            itemsHeadlineRef.current = itemsHeadlineArr;

            setLoading(false);
        }

        // Only get new items if switched from false to true, and there are more pages to load
        if (isAtBottomOfMenuRef.current && itemsRef.current.length < totalPagesInDBRef.current) {
            getNewItems();
        }
    }, [isAtBottomOfMenu]); // cannot use ref for dependency because this dependency is only checked during re-render, ref change doesn't trigger re-render

    // Keep items useState var in sync with ref
    useEffect(() => {
        itemsRef.current = items;
    }, [items]);

    // Keep items useState var in sync with ref
    useEffect(() => {
        itemsHeadlineRef.current = itemsHeadline;
    }, [itemsHeadline]);

    // Get num of pages only when open menu, that seems like a point to get accurate count
    useEffect(() => {
        async function count() {
            totalPagesInDBRef.current = await PageActions.count();
        }

        if (isFTSMenuOpen) {
            count();
        }
    }, [isFTSMenuOpen]);

    // Map each item in the array data pulled from DB, into command items, to render
    const cmdItemsArr = items.map((item, index) => {
        const title = item.title;

        // Only use if defined
        let headline = itemsHeadline.at(index);
        if (!headline) headline = '';

        return (
            <Link href={`/pages/${item.id}`} target="_blank" key={index}>
                <CommandItem
                    value={title + index} // Has to be unique values for each CommandItem or else, run into styling conflicts
                >
                    <div className="flex flex-col">
                        <div className="flex gap-2">
                            <HiDocumentText className="size-5" />
                            <span className="text-[0.9rem]">{title}</span>
                        </div>
                        <p
                            className="mt-3 text-xs text-gray-300 [&_b]:text-blue-500" // since the highlighted words use <b> tags, target them to style
                            dangerouslySetInnerHTML={{ __html: headline }}></p>
                    </div>
                </CommandItem>
            </Link>
        );
    });

    const handleScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        const target = e.currentTarget;

        const threshold = 0.25; // Threshold to be more lenient instead of 0
        const isAtBottom =
            target.scrollHeight - target.clientHeight - target.scrollTop <= threshold;

        if (isAtBottom) {
            isAtBottomOfMenuRef.current = true;
        } else {
            isAtBottomOfMenuRef.current = false;
        }
        setIsAtBottomOfMenu(isAtBottomOfMenuRef.current);
    };

    return (
        <div className="flex flex-col gap-4">
            <CommandDialog
                open={isFTSMenuOpen}
                onOpenChange={setIsFTSMenuOpen}
                // This affects dialog content component inside, which affects sizing of whole menu itself
                // Make height and width bigger than defaults. Max width so that on smaller viewports, it doesn't overflow, max is 90% of vw
                className="h-125! w-175! max-w-[90vw]!">
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

                    {/* Make the height of command list of pages align with the whole menu properly with h-full, override max-h default with none */}
                    <CommandList className="h-full max-h-none" onScroll={handleScroll}>
                        <CommandEmpty className="pt-6 pb-4">No results found</CommandEmpty>

                        {loading && (
                            // flex to center the spinner vert and horizontally, respectively
                            <div className="flex items-center justify-center">
                                <CommandLoading className="my-2 pl-2">
                                    <LoadingSpinner />
                                </CommandLoading>
                            </div>
                        )}

                        {cmdItemsArr.length > 0 && (
                            <CommandGroup heading="Pages">{cmdItemsArr}</CommandGroup>
                        )}
                    </CommandList>
                </Command>
            </CommandDialog>
        </div>
    );
}
