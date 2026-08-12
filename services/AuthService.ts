'use server';

import { auth, Session } from '@/lib/auth';
import { prisma } from '@/lib/prisma'; // single prisma client generated from the prisma.ts file
import { PageUpdateInput } from '@/types/Page';
import { Block } from '@blocknote/core/blocks';
import * as ERROR from '@/utils/constants';
import { forbidden, redirect, unauthorized } from 'next/navigation';

export async function signUp(formData: FormData) {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const name = formData.get('name') as string;

    await auth.api.signUpEmail({
        body: {
            email,
            password,
            name,
        },
    });

    redirect('/');
}

/* Helper Methods */
