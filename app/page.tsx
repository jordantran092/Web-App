import * as AuthActions from '@/actions/AuthActions';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';

import Image from 'next/image';

export default async function Home() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        redirect('/signin');
    }

    return (
        <>
            {/* temp logout */}
            {session && (
                <form action={AuthActions.signOut}>
                    <button>Log Out</button>
                </form>
            )}
        </>
    );
}
