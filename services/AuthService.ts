'use server';

import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { APIError, isAPIError } from 'better-auth/api';

export async function signUp(prevState: any, formData: FormData) {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const name = formData.get('name') as string;

    try {
        await auth.api.signUpEmail({
            body: {
                email,
                password,
                name,
            },
        });

        return { statusCode: 200 };
    } catch (error) {
        if (isAPIError(error)) {
            // console.log('code: ' + error.statusCode);
            return { statusCode: error.statusCode };
        }
    }
}

export async function signIn(prevState: any, formData: FormData) {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
        await auth.api.signInEmail({
            body: {
                email,
                password,
            },
        });

        return { statusCode: 200 };
    } catch (error) {
        if (isAPIError(error)) {
            return { statusCode: error.statusCode };
        }
    }
}

export async function signOut() {
    auth.api.signOut({
        headers: await headers(), // to provide header data which will be used to help server know which user to invalidate their session, this server action is like an API endpoint that when called involves an HTTP incoming request that contains authorization headers, retrieved by this nextjs function
    });

    redirect('/');
}
/* Helper Methods */
