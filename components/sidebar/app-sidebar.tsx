'use client';

import * as React from 'react';

// import { NavFavorites } from '@/components/sidebar/nav-favorites-old';
import { NavMain } from '@/components/sidebar/nav-main';
import { NavSecondary } from '@/components/sidebar/nav-secondary';
import { NavFavorites } from '@/components/sidebar/nav-favorites';
import { TeamSwitcher } from '@/components/sidebar/team-switcher';
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

// This is sample data.
const data = {
    teams: [
        {
            name: 'Acme Inc',
            logo: <TerminalIcon />,
            plan: 'Enterprise',
        },
        {
            name: 'Acme Corp.',
            logo: <AudioLinesIcon />,
            plan: 'Startup',
        },
        {
            name: 'Evil Corp.',
            logo: <TerminalIcon />,
            plan: 'Free',
        },
    ],
    navMain: [
        {
            title: 'Search',
            url: '#',
            icon: <SearchIcon />,
        },
        {
            title: 'Ask AI',
            url: '#',
            icon: <SparklesIcon />,
        },
        {
            title: 'Home',
            url: '#',
            icon: <HomeIcon />,
            isActive: true,
        },
        {
            title: 'Inbox',
            url: '#',
            icon: <InboxIcon />,
            badge: '10',
        },
    ],
    navSecondary: [
        {
            title: 'Library',
            url: '/',
            icon: <LuLibraryBig />,
        },
        // {
        //     title: 'Settings',
        //     url: '#',
        //     icon: <Settings2Icon />,
        // },
        // {
        //     title: 'Templates',
        //     url: '#',
        //     icon: <BlocksIcon />,
        // },
        // {
        //     title: 'Trash',
        //     url: '#',
        //     icon: <Trash2Icon />,
        // },
        // {
        //     title: 'Help',
        //     url: '#',
        //     icon: <MessageCircleQuestionIcon />,
        // },
    ],
    favorites: [
        {
            name: 'Project Management & Task Tracking',
            url: '#',
            emoji: '📊',
        },
        {
            name: 'Family Recipe Collection & Meal Planning',
            url: '#',
            emoji: '🍳',
        },
        {
            name: 'Fitness Tracker & Workout Routines',
            url: '#',
            emoji: '💪',
        },
        {
            name: 'Book Notes & Reading List',
            url: '#',
            emoji: '📚',
        },
        {
            name: 'Sustainable Gardening Tips & Plant Care',
            url: '#',
            emoji: '🌱',
        },
        {
            name: 'Language Learning Progress & Resources',
            url: '#',
            emoji: '🗣️',
        },
        {
            name: 'Home Renovation Ideas & Budget Tracker',
            url: '#',
            emoji: '🏠',
        },
        {
            name: 'Personal Finance & Investment Portfolio',
            url: '#',
            emoji: '💰',
        },
        {
            name: 'Movie & TV Show Watchlist with Reviews',
            url: '#',
            emoji: '🎬',
        },
        {
            name: 'Daily Habit Tracker & Goal Setting',
            url: '#',
            emoji: '✅',
        },
    ],
    workspaces: [
        {
            name: 'Favorites',
            emoji: '🏠',
            pages: [
                // {
                //     name: 'Daily Journal & Reflection',
                //     url: '#',
                //     emoji: '📔',
                // },
                // {
                //     name: 'Health & Wellness Tracker',
                //     url: '#',
                //     emoji: '🍏',
                // },
                // {
                //     name: 'Personal Growth & Learning Goals',
                //     url: '#',
                //     emoji: '🌟',
                // },
            ],
        },
        // {
        //     name: 'Professional Development',
        //     emoji: '💼',
        //     pages: [
        //         {
        //             name: 'Career Objectives & Milestones',
        //             url: '#',
        //             emoji: '🎯',
        //         },
        //         {
        //             name: 'Skill Acquisition & Training Log',
        //             url: '#',
        //             emoji: '🧠',
        //         },
        //         {
        //             name: 'Networking Contacts & Events',
        //             url: '#',
        //             emoji: '🤝',
        //         },
        //     ],
        // },
        // {
        //     name: 'Creative Projects',
        //     emoji: '🎨',
        //     pages: [
        //         {
        //             name: 'Writing Ideas & Story Outlines',
        //             url: '#',
        //             emoji: '✍️',
        //         },
        //         {
        //             name: 'Art & Design Portfolio',
        //             url: '#',
        //             emoji: '🖼️',
        //         },
        //         {
        //             name: 'Music Composition & Practice Log',
        //             url: '#',
        //             emoji: '🎵',
        //         },
        //     ],
        // },
        // {
        //     name: 'Home Management',
        //     emoji: '🏡',
        //     pages: [
        //         {
        //             name: 'Household Budget & Expense Tracking',
        //             url: '#',
        //             emoji: '💰',
        //         },
        //         {
        //             name: 'Home Maintenance Schedule & Tasks',
        //             url: '#',
        //             emoji: '🔧',
        //         },
        //         {
        //             name: 'Family Calendar & Event Planning',
        //             url: '#',
        //             emoji: '📅',
        //         },
        //     ],
        // },
        // {
        //     name: 'Travel & Adventure',
        //     emoji: '🧳',
        //     pages: [
        //         {
        //             name: 'Trip Planning & Itineraries',
        //             url: '#',
        //             emoji: '🗺️',
        //         },
        //         {
        //             name: 'Travel Bucket List & Inspiration',
        //             url: '#',
        //             emoji: '🌎',
        //         },
        //         {
        //             name: 'Travel Journal & Photo Gallery',
        //             url: '#',
        //             emoji: '📸',
        //         },
        //     ],
        // },
    ],
};

type AppSidebarProps = React.ComponentProps<typeof Sidebar> & {
    setIsFTSMenuOpen: (value: boolean) => void;
    favoritePages: Page[];
};
export function AppSidebar({ setIsFTSMenuOpen, favoritePages, ...props }: AppSidebarProps) {
    return (
        <Sidebar className="border-r-0" {...props}>
            <SidebarHeader>
                <TeamSwitcher teams={data.teams} />
                <NavMain items={data.navMain} setIsFTSMenuOpen={setIsFTSMenuOpen} />
            </SidebarHeader>
            <SidebarContent>
                {/* <NavFavorites favorites={data.favorites} /> */}
                <NavFavorites favoritePages={favoritePages} />
                <NavSecondary items={data.navSecondary} className="" />
            </SidebarContent>
            <SidebarRail />
        </Sidebar>
    );
}
