import * as AuthActions from '@/actions/AuthActions';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

import Image from 'next/image';

export default async function Home() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    return (
        <>
            {/* temp logout */}

            {/* if session is not null */}
            {session && (
                <form action={AuthActions.signOut}>
                    <button>Log Out</button>
                </form>
            )}
        </>
    );
}
