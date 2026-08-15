'use server';

import { auth } from '@/lib/auth';
import * as PageService from '@/services/PageService';
import { PageCreateInput, PageUpdateInput } from '@/types/Page';
import { headers } from 'next/headers';
import { notFound, unauthorized } from 'next/navigation';

/* Controller-like methods */

export async function updatePage({ id, ...data }: PageUpdateInput) {
    // Check if any valid session / logged in
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    if (!session) return unauthorized(); // next.js treats this as unauthenticated / not logged in

    const page = await PageService.getPage(id, session);
    if (!page) {
        return notFound();
    }

    PageService.updatePage({ id, ...data }, session);
}

export async function getPage(id: string) {
    // Check if any valid session / logged in
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    if (!session) return unauthorized();

    return PageService.getPage(id, session);
}

export async function createPage({ parentPageId, ...data }: PageCreateInput) {
    // Check if any valid session / logged in
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    if (!session) return unauthorized();

    PageService.createPage({ parentPageId, ...data }, session);
}
