import * as AuthActions from '@/actions/AuthActions';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';

import Image from 'next/image';
import { HiOutlineMenu, HiOutlineStar } from 'react-icons/hi';
import { Menubar } from '@/components/ui/menubar';
import * as PageService from '@/services/PageService';
import { Page } from './generated/prisma/client';

import Library from '@/components/library/Library';
import { MAX_FAVORITE_PAGES_SIDEBAR } from '@/utils/app-constants';
import { SidebarTrigger } from '@/components/ui/sidebar';

export default async function Home() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) redirect('/signin');

    /* Core logic */

    let items: Page[] = [];

    // Can call service layer because on server side
    items = await PageService.findMany(session);

    const favoritePages = await PageService.getStarredPages(session, MAX_FAVORITE_PAGES_SIDEBAR);

    return (
        <>
            {/* placeholder for now, sidebar impl could change this */}
            {/* <Menubar modal={false} className="border-none">
                <HiOutlineMenu size={23} />

      
                {session && (
                    <form action={AuthActions.signOut}>
                        <button>Log Out</button>
                    </form>
                )}
            </Menubar> */}

            <Library
                items={items}
                favoritePages={favoritePages}
                userName={session.user.name}></Library>
        </>
    );
}
