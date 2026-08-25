'use client';

import { Page } from '@/app/generated/prisma/client';
import { HiOutlineStar, HiStar } from 'react-icons/hi';
import LibraryPages from './LibraryPages';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import * as PageActions from '@/actions/PageActions';
import { Button, buttonVariants } from '../ui/button';
import { cn } from '@/lib/utils';

type LibraryProps = {
    items: Page[];
};

const TABS = {
    ALL: 'All',
    FAVORITE: 'Favorite',
    RECENT: 'Recent',
};

export default function Library({ items }: LibraryProps) {
    const [currentItems, setItems] = useState<Page[]>(items);
    const [currentTab, setCurrentTab] = useState(TABS.ALL);

    // Must do client-side data fetching after this component loads because pages have to be dynamically rendered based on user input
    useEffect(() => {
        async function getFavoriteItems() {
            const pageArr = await PageActions.getStarredPages();
            setItems(pageArr);
        }

        async function getAllItems() {
            const pageArr = await PageActions.findMany();
            setItems(pageArr);
        }

        // Only pull pages when selected tab
        if (currentTab === TABS.ALL) {
            getAllItems();
        } else if (currentTab === TABS.FAVORITE) {
            getFavoriteItems();
        }
    }, [currentTab]);

    return (
        <>
            <div className="flex justify-between">
                <p className="text-4xl font-bold">Library</p>
                <Button className="my-3 p-3" onClick={() => PageActions.createNewPageInLibrary()}>
                    New page
                </Button>
            </div>

            {/* Tabs */}
            {/* <div className="mt-10">
                <button
                    className="flex rounded-sm p-1 text-lg transition duration-50 hover:bg-[#bdbdbd38]"
                    onClick={() => setIsFavorite(true)}>
                
                    <HiOutlineStar size={25} />
                    Favorite
                </button>
            </div> */}

            <div className="mt-7 flex gap-5">
                <label>
                    {/* if don't add checked, then will allow multiple to be selected at once */}
                    <input
                        type="radio"
                        onChange={(e) => {
                            setCurrentTab(e.currentTarget.value);
                        }}
                        value={TABS.ALL}
                        /*
                        Sr-only hides an element visually while keeping it fully accessible to screen readers

                        peer used to style the immediately following span button sibling based on this checked state

                        */
                        className="peer sr-only"
                        checked={currentTab === TABS.ALL}></input>

                    <span
                        className={cn(
                            buttonVariants({ variant: 'ghost' }),
                            'peer-checked:bg-[#bdbdbd33] hover:bg-[#bdbdbd4d]!'
                            // Hover will make it lighter this time
                        )}>
                        All
                    </span>
                    {/* block cursor-pointer rounded-lg border px-4 py-2 peer-checked:bg-blue-500 peer-checked:text-white */}
                </label>

                <label>
                    {/* if don't add checked, then will allow multiple to be selected at once */}
                    <input
                        type="radio"
                        onChange={(e) => {
                            setCurrentTab(e.currentTarget.value);
                        }}
                        value={TABS.FAVORITE}
                        /*
                        Sr-only hides an element visually while keeping it fully accessible to screen readers

                        peer used to style the immediately following span button sibling based on this checked state

                        */
                        className="peer sr-only"
                        checked={currentTab === TABS.FAVORITE}></input>

                    <span
                        className={cn(
                            buttonVariants({ variant: 'ghost' }),
                            'peer-checked:bg-[#bdbdbd33] hover:bg-[#bdbdbd4d]!'
                        )}>
                        <HiStar size={25} /> Starred
                    </span>
                </label>

                {/* <label
                    className={cn(
                        buttonVariants({ variant: 'default' }),
                        'bg-neutral-800! text-white! hover:bg-neutral-800/80!'
                    )}>
                    
                    <input
                        type="radio"
                        onChange={(e) => {
                            setCurrentTab(e.currentTarget.value);
                        }}
                        value={TABS.RECENT}
                        className=""
                        checked={currentTab === TABS.RECENT}></input>
                    Recent
                </label> */}
            </div>

            <div className="mt-10">
                <LibraryPages items={currentItems}></LibraryPages>
            </div>
        </>
    );
}
