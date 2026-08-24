'use client';

import { Page } from '@/app/generated/prisma/client';
import { HiDocumentText } from 'react-icons/hi';
import { useRouter } from 'next/navigation';

type WorkspacePagesProps = {
    items: Page[];
};
export default function WorkspacePages({ items }: WorkspacePagesProps) {
    const router = useRouter(); // access to next.js navigation controls

    // Map each item in the array data pulled from DB, into command items, to render
    const itemsArr = items.map((item, index) => {
        const title = item.title;

        return (
            <li
                key={index}
                value={title + index} // Has to be unique values for each CommandItem or else, run into styling conflicts
                className="border-t-2"

                onClick={() => {
                    router.push(`/pages/${item.id}`);
                }}>
                <HiDocumentText size={23} />
                <span>{title}</span>
            </li>
        );
    });

    return itemsArr;
}
