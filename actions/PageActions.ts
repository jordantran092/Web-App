'use server';

import { auth } from '@/lib/auth';
import * as PageService from '@/services/PageService';
import { PageUpdateInput } from '@/types/Page';
import { headers } from 'next/headers';
import { notFound, unauthorized } from 'next/navigation';

// Controller method for updating page
export async function updatePage({ id, ...data }: PageUpdateInput) {
    // Check if any valid session / logged in
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    if (!session) return unauthorized(); // next.js treats this as unauthenticated / not logged in

    const page = await PageService.getPage(id);
    if (!page) {
        return notFound();
    }

    PageService.updatePage({ id, ...data }, session);
}

export async function getPage(id: string) {
    // auth for later

    return PageService.getPage(id);
}
