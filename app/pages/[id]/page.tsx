import * as PageService from '@/services/PageService';
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
    let initialContent: Block[] = [];
    try {
        initialContent = await PageService.getContentOfPage(session, id);
    } catch (error: any) {
        if (error.message === 'NOT_FOUND' || error.message === 'UNAUTHORIZED') {
            console.log(error.message);
            return notFound();
        }
    }

    return (
        <>
            <Page id={id} initialContent={initialContent} />
        </>
    );
}
