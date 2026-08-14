'use client';

import dynamic from 'next/dynamic';

export const Editor = dynamic(() => import('./Editor'), { ssr: false }); // mainly to turn off SSR because block note is a client slide component, via dynamic imports
