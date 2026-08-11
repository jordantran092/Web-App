import * as PageActions from '@/actions/PageActions';
import Page from '@/components/Page';
import { auth } from '@/lib/auth';
import { Block } from '@blocknote/core/blocks';
import { headers } from 'next/headers';
import { notFound } from 'next/navigation';

type PagesProps = {
    // the params from the browser url, in this case corresponds to the page id
    params: Promise<{ id: string }>;
};

export default async function Pages({ params }: PagesProps) {
    // Check if any valid session / logged in
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    // Not logged in to any account / no session
    if (!session) return notFound();

    const { id } = await params;
    const page = await PageActions.getPage(id);

    if (!page) return notFound();

    /* Auth Check to see if user owns this page */

    const userId = session.user.id;

    if (page.userId == userId) {
        // User is authenticated

        /* Loading saved blocks */

        let initialContent: Block[] = [];

        const blocks = page.blocks;

        // need initialContent prop as a Block[]. Null checking to avoid JSON parse gives error
        if (blocks) initialContent = JSON.parse(blocks) as Block[];

        return (
            <>
                <Page id={id} initialContent={initialContent} />
            </>
        );
    }
}
