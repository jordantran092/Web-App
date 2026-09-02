'use client';

import * as React from 'react';

// import { NavFavorites } from '@/components/sidebar/nav-favorites-old';
import { NavMain } from '@/components/sidebar/nav-main';
import { NavSecondary } from '@/components/sidebar/nav-secondary';
import { NavFavorites } from '@/components/sidebar/nav-favorites';
import { AccountTab } from '@/components/sidebar/account-tab';
import { Sidebar, SidebarContent, SidebarHeader, SidebarRail } from '@/components/ui/sidebar';
import {
    TerminalIcon,
    AudioLinesIcon,
    SearchIcon,
    SparklesIcon,
    HomeIcon,
    InboxIcon,
    CalendarIcon,
    Settings2Icon,
    BlocksIcon,
    Trash2Icon,
    MessageCircleQuestionIcon,
} from 'lucide-react';
import { Page } from '@/app/generated/prisma/client';
import { LuLibraryBig } from 'react-icons/lu';

const data = {
    navMain: [
        {
            title: 'Search',
            url: '',
            icon: <SearchIcon />,
        },
    ],
    navSecondary: [
        {
            title: 'Library',
            url: '/',
            icon: <LuLibraryBig />,
        },
    ],
};

type AppSidebarProps = React.ComponentProps<typeof Sidebar> & {
    setIsFTSMenuOpen: (value: boolean) => void;
    favoritePages: Page[];
    userName: string;
};
export function AppSidebar({
    setIsFTSMenuOpen,
    favoritePages,
    userName,
    ...props
}: AppSidebarProps) {
    return (
        <Sidebar className="border-r-0" {...props}>
            <SidebarHeader>
                <AccountTab userName={userName} />
                <NavMain items={data.navMain} setIsFTSMenuOpen={setIsFTSMenuOpen} />
            </SidebarHeader>
            <SidebarContent>
                <NavFavorites favoritePages={favoritePages} />
                <NavSecondary items={data.navSecondary} className="" />
            </SidebarContent>
            <SidebarRail />
        </Sidebar>
    );
}
