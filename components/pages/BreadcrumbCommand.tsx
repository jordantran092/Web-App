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
import { BsArrowReturnRight } from 'react-icons/bs';
import { RefObject, useEffect } from 'react';
import { CommandLoading } from 'cmdk';
import { Page } from '@/app/generated/prisma/client';
import { Block } from '@blocknote/core/blocks';
import { PageUpdateInput } from '@/types/Page';
import { useBlockNoteEditor } from '@blocknote/react';
import { MyDefaultBlockSchema, schema } from '@/components/editor/schema/CustomSchema';
import LoadingSpinner from '../LoadingSpinner';
import { useRouter } from 'next/navigation';

type BreadcrumbCommandProps = {
    isBreadcrumbMenuOpen: boolean;
    setisBreadcrumbMenuOpen: (value: boolean) => void;
    id: string;
};
export default function BreadcrumbCommand({
    isBreadcrumbMenuOpen,
    setisBreadcrumbMenuOpen,
    id,
}: BreadcrumbCommandProps) {
    const [loading, setLoading] = React.useState(false);
    const [items, setItems] = React.useState<Page[]>([]);
    const router = useRouter(); // access to next.js navigation controls

    // Must do client-side data fetching after this component loads because pages have to be dynamically rendered based on user input
    useEffect(() => {
        async function getItems() {
            setLoading(true);
            const pageArr = await PageActions.getBreadcrumb(id);
            setItems(pageArr);

            setLoading(false);
        }

        // Only pull pages when open dialog, not when page loads, and makes sure all pages loaded are latest
        if (isBreadcrumbMenuOpen) {
            getItems();
        }
    }, [isBreadcrumbMenuOpen]);

    // Map each item in the array data pulled from DB, into command items, to render
    const cmdItemsArr = items.map((item, index) => {
        const title = item.title;

        return (
            <CommandItem
                key={index}
                value={title + index} // Has to be unique values for each CommandItem or else, run into styling conflicts

                onSelect={() => {
                    router.push(`/pages/${item.id}`);
                }}>
                {index !== 0 && <BsArrowReturnRight className="size-4" />}
                <HiDocumentText size={23} />
                <span>{title}</span>
            </CommandItem>
        );
    });

    return (
        <div className="flex flex-col gap-4">
            <CommandDialog open={isBreadcrumbMenuOpen} onOpenChange={setisBreadcrumbMenuOpen}>
                <Command>
                    <CommandList>
                        <CommandEmpty>No results found.</CommandEmpty>

                        <CommandGroup
                            heading="Breadcrumb"
                            className="mt-1 text-center **:[[cmdk-group-heading]]:text-base!">
                            {loading && (
                                <CommandLoading className="my-2 pl-2">
                                    <LoadingSpinner />
                                </CommandLoading>
                            )}
                            <div className="mt-4">{cmdItemsArr}</div>
                        </CommandGroup>
                    </CommandList>
                </Command>
            </CommandDialog>
        </div>
    );
}
