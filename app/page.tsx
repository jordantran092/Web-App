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

export default async function Home() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) redirect('/signin');

    /* Core logic */

    let items: Page[] = [];

    // Call service because on server side
    items = await PageService.findMany(session);

    return (
        <>
            {/* placeholder for now, sidebar impl could change this */}
            <Menubar modal={false} className="border-none">
                <HiOutlineMenu size={23} />

                {/* temp logout */}
                {session && (
                    <form action={AuthActions.signOut}>
                        <button>Log Out</button>
                    </form>
                )}
            </Menubar>

            {/* min-h-svh to stretch it vertically fully & avoid mobile viewport address bar weirdness scrolling */}
            <div className="mx-22 mt-15 min-h-svh">
                <Library items={items}></Library>
            </div>
        </>
    );
}
