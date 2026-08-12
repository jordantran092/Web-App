import * as PageService from '@/services/PageService';
import Page from '@/components/Page';
import { auth } from '@/lib/auth';
import { Block } from '@blocknote/core/blocks';
import { headers } from 'next/headers';
import { notFound } from 'next/navigation';
import * as ERROR from '@/utils/constants';

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

    // Check if page exist as early as possible to avoid going deeper
    const { id } = await params;
    const page = await PageService.getPage(id);
    if (!page) {
        return notFound();
    }

    let initialContent: Block[] = [];
    try {
        initialContent = await PageService.getContentOfPage(session, id);
    } catch (error: any) {
        if (error.message === ERROR.UNAUTHORIZED) {
            return notFound();
        }
    }

    return (
        <>
            <Page id={id} initialContent={initialContent} />
        </>
    );
}
