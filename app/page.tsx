import * as AuthActions from '@/actions/AuthActions';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';

import Image from 'next/image';
import { HiOutlineMenu } from 'react-icons/hi';
import { Menubar } from '@/components/ui/menubar';
import * as PageService from '@/services/PageService';
import { Page } from './generated/prisma/client';

import WorkspacePages from '@/components/WorkspacePages';

export default async function Home() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) redirect('/signin');

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
            <div className="min-h-svh">
                <p>Workspace</p>
                <div className="flex gap-x-16">
                    <button className="border">Starred</button>
                    <button className="border">+ New</button>
                </div>
                <p>Name</p>
                <WorkspacePages items={items}></WorkspacePages>
            </div>
        </>
    );
}
