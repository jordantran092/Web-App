'use client';

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuAction,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import { ChevronRightIcon, PlusIcon, MoreHorizontalIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { Page } from '@/app/generated/prisma/client';
import Link from 'next/link';
import { HiDocumentText } from 'react-icons/hi';

type FavoritesProps = {
    favoritePages: Page[];
};

export function NavFavorites({ favoritePages }: FavoritesProps) {
    const itemsArr = favoritePages.map((item, index) => {
        const title = item.title;

        return (
            <SidebarMenuSubItem key={index}>
                <SidebarMenuSubButton render={<Link href={`/pages/${item.id}`} />}>
                    <HiDocumentText size={23} />
                    <p className="mt-0.5">{title}</p>
                </SidebarMenuSubButton>
            </SidebarMenuSubItem>
        );
    });

    return (
        <SidebarGroup>
            {/* <SidebarGroupLabel>...</SidebarGroupLabel> */}
            <SidebarGroupContent>
                <SidebarMenu>
                    <Collapsible>
                        <SidebarMenuItem>
                            <SidebarMenuButton //#7d7a75
                                render={<CollapsibleTrigger />}
                                className="left-2 text-[#8f8b85] hover:text-white/70 data-open:rotate-90">
                                <ChevronRightIcon className="" />
                                <span className="">Favorites</span>
                            </SidebarMenuButton>
                            {/* <SidebarMenuAction showOnHover>
                                <PlusIcon />
                            </SidebarMenuAction> */}
                            <CollapsibleContent>
                                <SidebarMenuSub>
                                    {/* Load favorite pages paginated*/}
                                    {itemsArr}

                                    {/* More button */}
                                    <SidebarMenuItem>
                                        <SidebarMenuButton
                                            className="text-sidebar-foreground/70"
                                            render={<Link href={`/`} />}>
                                            <MoreHorizontalIcon />
                                            <span>More</span>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                </SidebarMenuSub>
                            </CollapsibleContent>
                        </SidebarMenuItem>
                    </Collapsible>
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
}
