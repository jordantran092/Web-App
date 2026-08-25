'use client';

import { Page } from '@/app/generated/prisma/client';
import { HiOutlineStar } from 'react-icons/hi';
import LibraryPages from './LibraryPages';
import { useEffect, useRef, useState } from 'react';
import * as PageActions from '@/actions/PageActions';

type LibraryProps = {
    items: Page[];
};
export default function Library({ items }: LibraryProps) {
    const [currentItems, setItems] = useState<Page[]>(items);
    const [isStarred, setIsStarred] = useState(false);
    const isStarredRef = useRef(false);

    // Must do client-side data fetching after this component loads because pages have to be dynamically rendered based on user input
    useEffect(() => {
        async function getStarredItems() {
            const pageArr = await PageActions.getStarredPages();
            setItems(pageArr);
        }

        // Only pull pages when select starred
        if (isStarred) {
            getStarredItems();
            isStarredRef = true;
        }
    }, [isStarred]);

    return (
        <>
            <div className="flex justify-between">
                <p className="text-4xl font-bold">Library</p>
                <button className="">+ New</button>
            </div>

            {/* Tabs */}
            <div className="mt-10">
                <button
                    className="flex rounded-sm p-1 text-lg transition duration-50 hover:bg-[#bdbdbd38]"
                    onClick={() => setIsStarred(true)}>
                    {' '}
                    {/* ASDF2392384923894234 */}
                    <HiOutlineStar size={25} />
                    Starred
                </button>
            </div>

            <div className="mt-10">
                <LibraryPages items={currentItems}></LibraryPages>
            </div>
        </>
    );
}
