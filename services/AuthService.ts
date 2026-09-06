'use server';

import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { APIError, isAPIError } from 'better-auth/api';
import { ReadonlyHeaders } from 'next/dist/server/web/spec-extension/adapters/headers';

// export async function signUp(prevState: any, formData: FormData, currentHeaders: ReadonlyHeaders) {
//     const email = formData.get('email') as string;
//     const password = formData.get('password') as string;
//     const name = formData.get('name') as string;

//     try {
//         const result = await auth.api.signUpEmail({
//             body: {
//                 email,
//                 password,
//                 name,
//             },
//             headers: currentHeaders, // Guarantees nextCookies() works on Vercel
//         });

//         console.log('SIGNUP RESULT:', result);

//         return { statusCode: 200, redirectTo: '/' };
//     } catch (error) {
//         if (isAPIError(error)) {
//             // console.log('code: ' + error.statusCode);

//             // Return state info with status code
//             return { statusCode: error.statusCode };
//         }
//     }
// }

export async function signUp(prevState: any, formData: FormData, currentHeaders: ReadonlyHeaders) {
    console.log('=== SIGNUP START ===');

    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const name = formData.get('name') as string;

    console.log('SIGNUP EMAIL:', email);

    try {
        const result = await auth.api.signUpEmail({
            body: {
                email,
                password,
                name,
            },
            headers: currentHeaders,
        });

        console.log('=== SIGNUP SUCCESS ===');
        console.log('SIGNUP RESULT:', result);

        return {
            statusCode: 200,
            redirectTo: '/',
        };
    } catch (error) {
        console.error('=== SIGNUP ERROR ===');
        console.error(error);

        if (isAPIError(error)) {
            console.error('API ERROR:', error.statusCode, error.message);

            return {
                statusCode: error.statusCode,
            };
        }

        return {
            statusCode: 500,
        };
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

        return { statusCode: 200, redirectTo: '/' };
    } catch (error) {
        if (isAPIError(error)) {
            console.error('SIGNUP ERROR:', error);

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
