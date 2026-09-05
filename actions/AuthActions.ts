'use server';

import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { forbidden, redirect, unauthorized } from 'next/navigation';
import * as AuthService from '@/services/AuthService';

export async function signUp(prevState: any, formData: FormData) {
    // Check if any valid session / logged in
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    if (session) return forbidden();

    // If not logged in, allow sign up
    const state = await AuthService.signUp(prevState, formData);

    if (state?.statusCode === 200) redirect('/'); // If don't check state now, then it will be returned into the state for the useActionState of the form which won't trigger redirect

    return state;
}

export async function signIn(prevState: any, formData: FormData) {
    // Check if any valid session / logged in
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    if (session) return forbidden();

    // If not logged in, allow sign in
    const state = await AuthService.signIn(prevState, formData);

    if (state?.statusCode === 200) redirect('/');

    return state;
}

export async function signOut() {
    // Check if any valid session / logged in
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    if (!session) return unauthorized();

    // If logged in, allow sign out
    await AuthService.signOut();
}

export async function getSessionUserId() {
    // Check if any valid session / logged in
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    if (!session) return unauthorized();

    return session.user.id;
}
