'use server';

import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { forbidden, redirect, unauthorized } from 'next/navigation';
import * as AuthService from '@/services/AuthService';

export async function signUp(prevState: any, formData: FormData) {
    const currentHeaders = await headers(); // Extract headers safely up top

    // Check if any valid session / logged in
    const session = await auth.api.getSession({
        headers: currentHeaders,
    });
    if (session) return forbidden();

    // If not logged in, allow sign up
    const state = await AuthService.signUp(prevState, formData, currentHeaders);

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
