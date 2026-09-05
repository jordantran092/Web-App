'use server';

import { Page } from '@/app/generated/prisma/client';
import { MyDefaultBlockSchema } from '@/components/editor/schema/CustomSchema';
import { auth } from '@/lib/auth';
import * as PageService from '@/services/PageService';
import { PageCreateInput, PageUpdateInput } from '@/types/Page';
import { EMPTY, NOT_FOUND } from '@/utils/app-constants';
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

    return await PageService.updatePage({ id, ...data }, session);
}

export async function getPage(id: string) {
    // Check if any valid session / logged in
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    if (!session) return unauthorized();

    return await PageService.getPage(id, session);
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

    return await PageService.findMany(session);
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

export async function getStarredPages(take?: number) {
    // Check if any valid session / logged in
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    if (!session) return unauthorized();

    return await PageService.getStarredPages(session, take);
}

export async function createNewPageInLibrary() {
    // Check if any valid session / logged in
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    if (!session) return unauthorized();

    const page = await PageService.createPage(
        {
            parentId: EMPTY,
            title: 'New page',
            user: session.user.id,
        },
        session
    );

    redirect(`/pages/${page.id}`); // Will actually do a router push because client component code is the caller and JS is active
}

export async function getPagesFromFullTextSearch(search: string, currentPageNum: number) {
    // Check if any valid session / logged in
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    if (!session) return unauthorized();

    return await PageService.getPagesFromFullTextSearch(session, search, currentPageNum);
}

export async function getHeadlinesFromFullTextSearchPages(pages: Page[], search: string) {
    // Check if any valid session / logged in
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    if (!session) return unauthorized();

    return await PageService.getHeadlinesFromFullTextSearchPages(pages, search);
}

export async function count() {
    // Check if any valid session / logged in
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    if (!session) return unauthorized();

    return await PageService.count();
}

export async function deletePage(id: string) {
    // Check if any valid session / logged in
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    if (!session) return unauthorized();

    await PageService.deletePage(session, id);
}
