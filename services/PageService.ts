'use server';

import { Session } from '@/lib/auth';
import { prisma } from '@/lib/prisma'; // single prisma client generated from the prisma.ts file
import { PageCreateInput, PageUpdateInput } from '@/types/Page';
import { Block } from '@blocknote/core/blocks';
import * as ERROR from '@/utils/constants';
import { forbidden } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export async function updatePage({ id, ...data }: PageUpdateInput, session: Session) {
    if (!(await doesUserOwnPage(session, id))) {
        return forbidden();
    }

    await prisma.page.update({
        where: { id },

        data, // since data param is same as data property name, use property shorthand as so. will also only comprise of fields entered, optional fields ignored
    });
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

// export async function isPageExist(id: string) {
//     const page = await getPage(id);

//     return page ? true : false;
// }

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

export async function createPage({ parentPageId, ...data }: PageCreateInput, session: Session) {
    if (!(await doesUserOwnPage(session, parentPageId))) {
        return forbidden();
    }

    const savedPageEntity = await prisma.page.create({
        data: {
            favorite: data.favorite,
            title: data.title,
            blocks: data.blocks,

            // Need to fill in user. Page has to be connected to the current authorized user's id because they are related in the schema
            user: {
                connect: {
                    id: session.user.id,
                },
            },
        },
    });

    // force re-render page since changed it
    revalidatePath(`/pages/${savedPageEntity.id}`);

    return savedPageEntity;
}

/* Helper Methods */

async function doesUserOwnPage(session: Session, id: string) {
    // Do not re-use getPage or else, self looping
    const page = await prisma.page.findUnique({
        where: { id },
    });

    const userId = session.user.id;

    return page?.userId == userId ? true : false;
}
