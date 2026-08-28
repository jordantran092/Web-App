'use server';

import { Session } from '@/lib/auth';
import { prisma } from '@/lib/prisma'; // single prisma client generated from the prisma.ts file
import { PageCreateInput, PageUpdateInput } from '@/types/Page';
import { Block } from '@blocknote/core/blocks';
import * as ERROR from '@/utils/app-constants';
import { forbidden, notFound } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { EMPTY, NOT_FOUND } from '@/utils/app-constants';
import { MyDefaultBlockSchema } from '@/components/editor/schema/CustomSchema';
import { Page } from '@/app/generated/prisma/client';
import { getText } from '@/utils/block-utils';

export async function updatePage({ id, ...data }: PageUpdateInput, session: Session) {
    if (!(await doesUserOwnPage(session, id))) {
        return forbidden();
    }

    const pageEntity = await prisma.page.update({
        where: { id },

        data, // since data param is same as data property name, use property shorthand as so. will also only comprise of fields entered, optional fields ignored
    });

    // force re-render page since changed it
    // revalidatePath(`/pages/${id}`);

    return pageEntity;
}

export async function getPage(id: string, session: Session) {
    if (!(await doesUserOwnPage(session, id))) {
        return forbidden();
    }

    // async function will wrap return in a promise again, so await here will be useless
    return prisma.page.findUnique({
        where: { id },
    });
}

export async function getContentOfPage(session: Session, id: string) {
    const page = await getPage(id, session);

    if (!page) {
        throw new Error(ERROR.NOT_FOUND);
    }

    let initialContent: Block[] = [];

    /* Business level authorization check to see if user owns this page */
    if (await doesUserOwnPage(session, id)) {
        // User is authorized

        /* Loading saved blocks */

        const blocks = page.blocks;

        // need initialContent prop as a Block[]. Null checking to avoid JSON parse gives error
        if (blocks) initialContent = JSON.parse(blocks) as Block[];
    } else {
        throw new Error(ERROR.UNAUTHORIZED);
    }

    return initialContent;
}

export async function createPage({ parentId, ...data }: PageCreateInput, session: Session) {
    if (parentId !== EMPTY && !(await doesUserOwnPage(session, parentId))) {
        return forbidden();
    }

    const savedPageEntity = await prisma.page.create({
        data: {
            favorite: data.favorite,
            title: data.title,
            blocks: data.blocks,
            parentId: parentId,

            // Need to fill in user. Page has to be connected to the user's id because they are related in the schema
            user: {
                connect: {
                    id: data.user, // id referred to here is the User entity
                },
            },
        },
    });

    // force re-render page since changed it
    // revalidatePath(`/pages/${parentId}`);

    return savedPageEntity;
}

export async function findMany(session: Session) {
    const userId = session.user.id;

    return prisma.page.findMany({
        where: {
            userId, // userId matches page and session
        },
    });
}

export async function renameTitleForParentOfThisPage(
    id: string,
    currentTitle: string,
    session: Session
) {
    if (!(await doesUserOwnPage(session, id))) {
        return forbidden();
    }

    const page = await getPage(id, session);

    if (!page) {
        throw Error(NOT_FOUND);
    }

    const parentId = page.parentId;

    // If page has a parent, if not it could be a root page which is fine
    if (parentId) {
        const parentPage = await getPage(parentId, session);

        // Shouldn't happen, but for type safety
        if (!parentPage || !parentPage.blocks)
            throw new Error('No parent page found or no parent page blocks found');

        // Must type correctly or else won't recognize pageBlock type
        const blocks = JSON.parse(parentPage.blocks) as Block<MyDefaultBlockSchema, any, any>[];

        let foundParentBlock = false;
        // We know it's a Block<MyDefaultBlockSchema, any, any>[] and specifically a page block which has no actual typescript type, so use any to make it simpler
        let block: any = null;
        let foundIdx = -1;
        for (let i = 0; !foundParentBlock && i < blocks.length; ++i) {
            block = blocks.at(i);
            foundParentBlock = block.props.pageId === id;
            foundIdx = i;
        }

        // Replace parentBlock at its index with the new block with new title
        const parentBlock = block as Block<MyDefaultBlockSchema, any, any>;

        // Must type correctly or else won't recognize pageBlock type
        const newParentBlock: Block<MyDefaultBlockSchema, any, any> = {
            id: parentBlock.id,
            type: 'pageBlock',
            props: {
                pageId: id,
                title: currentTitle,
            },
            content: undefined,
            children: parentBlock.children,
        };

        blocks[foundIdx] = newParentBlock;

        const pageEntity: PageUpdateInput = {
            id: parentId,
            blocks: JSON.stringify(blocks),
            textContent: getText(blocks),
        };

        updatePage(pageEntity, session);
    }
}

export async function getBreadcrumb(session: Session, id: string) {
    if (!(await doesUserOwnPage(session, id))) {
        return forbidden();
    }

    let currentPage = await getPage(id, session);
    if (!currentPage) return notFound(); // must make sure PageActions has await for this, to receive the notFound

    const breadcrumbArr: Page[] = [currentPage];
    let parentId = currentPage.parentId;
    while (parentId !== EMPTY) {
        currentPage = await getPage(parentId, session);
        if (!currentPage) return notFound(); // must make sure PageActions has await for this, to receive the notFound

        // addFirst so that root page first, ultimately
        breadcrumbArr.unshift(currentPage);

        parentId = currentPage.parentId;
    }

    return breadcrumbArr;
}

export async function getStarredPages(session: Session) {
    const userId = session.user.id;

    return prisma.page.findMany({
        where: {
            userId, // userId matches page and session
            favorite: true,
        },
    });
}

/* 

Helper Methods

*/

async function doesUserOwnPage(session: Session, id: string) {
    // Do not re-use getPage or else, self looping
    const page = await prisma.page.findUnique({
        where: { id },
    });

    const userId = session.user.id;

    return page?.userId == userId ? true : false;
}
