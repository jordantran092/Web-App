'use server';

import { MyDefaultBlockSchema } from '@/components/editor/schema/CustomSchema';
import { auth } from '@/lib/auth';
import * as PageService from '@/services/PageService';
import { PageCreateInput, PageUpdateInput } from '@/types/Page';
import { NOT_FOUND } from '@/utils/constants';
import { Block } from '@blocknote/core/blocks';
import { headers } from 'next/headers';
import { notFound, redirect, unauthorized } from 'next/navigation';

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

export async function createPage({ parentId, ...data }: PageCreateInput) {
    // Check if any valid session / logged in
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    if (!session) return unauthorized();

    return await PageService.createPage({ parentId, ...data }, session);
}

export async function findMany() {
    // Check if any valid session / logged in
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    if (!session) return unauthorized();

    return PageService.findMany(session);
}

export async function renameTitleForParentOfThisPage(id: string, currentTitle: string) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    if (!session) return unauthorized();

    return await PageService.renameTitleForParentOfThisPage(id, currentTitle, session);
}

export async function getBreadcrumb(id: string) {
    // Check if any valid session / logged in
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    if (!session) return unauthorized();

    return await PageService.getBreadcrumb(session, id);
}

export async function getStarredPages() {
    // Check if any valid session / logged in
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    if (!session) return unauthorized();

    return await PageService.getStarredPages(session);
}

export async function createNewPageInLibrary() {
    // Check if any valid session / logged in
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    if (!session) return unauthorized();

    const page = await PageService.createPage(
        {
            parentId: 'null',
            title: 'New page',
            user: session.user.id,
        },
        session
    );

    redirect(`/pages/${page.id}`);
}
