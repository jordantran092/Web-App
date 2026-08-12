'use server';

import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { forbidden, unauthorized } from 'next/navigation';
import * as AuthService from '@/services/AuthService';

export async function signUp(formData: FormData) {
    // Check if any valid session / logged in
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    if (session) return forbidden();

    // If not logged in, allow sign up
    AuthService.signUp(formData);
}

export async function signIn(formData: FormData) {
    // Check if any valid session / logged in
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    if (session) return forbidden();

    // If not logged in, allow sign in
    AuthService.signIn(formData);
}

export async function signOut() {
    // Check if any valid session / logged in
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    if (!session) return unauthorized();

    // If logged in, allow sign out
    AuthService.signOut();
}
