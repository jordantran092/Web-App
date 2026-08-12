'use server';

import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export async function signUp(formData: FormData) {
    // Check if any valid session / logged in
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    // If not logged in, allow sign up
    if (!session) {
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        const name = formData.get('name') as string;

        await auth.api.signUpEmail({
            body: {
                email,
                password,
                name,
            },
        });

        redirect('/');
    }
}

export async function signIn(formData: FormData) {
    // Check if any valid session / logged in
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    // If not logged in, allow sign in
    if (!session) {
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        await auth.api.signInEmail({
            body: {
                email,
                password,
            },
        });

        redirect('/');
    }
}

export async function signOut() {
    // Check if any valid session / logged in
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    // If logged in, allow sign out
    if (session) {
        auth.api.signOut({
            headers: await headers(), // to provide header data which will be used to help server know which user to invalidate their session, this server action is like an API endpoint that when called involves an HTTP incoming request that contains authorization headers, retrieved by this nextjs function
        });

        redirect('/');
    }
}
