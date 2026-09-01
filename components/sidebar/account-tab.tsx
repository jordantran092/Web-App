'use client';

import * as React from 'react';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { ChevronDownIcon, User } from 'lucide-react';
import * as AuthActions from '@/actions/AuthActions';
import { HiLogout } from 'react-icons/hi';

type AccountTabProps = {
    userName: string;
};
export function AccountTab({ userName }: AccountTabProps) {
    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger
                        render={<SidebarMenuButton className="mt-2 w-fit px-1.5" />}>
                        <div className="flex aspect-square size-5 items-center justify-center rounded-md">
                            <User />
                        </div>
                        <span className="ml-2 truncate font-medium">{userName}'s X</span>
                        <ChevronDownIcon className="opacity-50" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-64 rounded-lg"
                        align="start"
                        side="bottom"
                        sideOffset={4}>
                        {/* <DropdownMenuSeparator /> */}
                        <DropdownMenuGroup>
                            <DropdownMenuItem className="gap-2 p-2" onClick={AuthActions.signOut}>
                                {/* <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                                    <PlusIcon className="size-4" />
                                </div> */}
                                <div className="flex gap-2 font-medium text-muted-foreground">
                                    <HiLogout className="mt-0.5"></HiLogout>
                                    Log out
                                </div>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}
