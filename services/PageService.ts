'use server';

import { Session } from '@/lib/auth';
import { prisma } from '@/lib/prisma'; // single prisma client generated from the prisma.ts file
import { PageUpdateInput } from '@/types/Page';
import { Block } from '@blocknote/core/blocks';
import * as ERROR from '@/utils/constants';
import { forbidden } from 'next/navigation';

export async function updatePage({ id, ...data }: PageUpdateInput, session: Session) {
    if (!(await doesUserOwnPage(session, id))) {
        return forbidden();
    }

    await prisma.page.update({
        where: { id },

        data, // since data param is same as data property name, use property shorthand as so. will also only comprise of fields entered, optional fields ignored
    });
}

export async function getPage(id: string) {
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
    const page = await getPage(id);

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

/* Helper Methods */

async function doesUserOwnPage(session: Session, id: string) {
    const page = await getPage(id);
    const userId = session.user.id;

    return page?.userId == userId ? true : false;
}
