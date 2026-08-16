'use client'; // because need stateful variable

type PageProps = {
    id: string;
    initialContent: Block[];
};

import { Block } from '@blocknote/core/blocks';
import { useEffect, useState } from 'react';
import SavingIndicator from './SavingIndicator';
import { Editor } from '@/components/editor/DynamicEditor';
import { useRouter } from 'next/navigation';

// Need Page component to share isSaving stateful variable with navbar and editor
export default function Page({ id, initialContent }: PageProps) {
    // need state variable here in this parent component so that it can be shared between navbar and editor to handle saving indicator
    const [isSaving, setIsSaving] = useState(false);
    const [isSavingTimerOn, setIsSavingTimerOn] = useState(false);
    const router = useRouter(); // access to next.js navigation controls

    // Refresh page on mount (e.g. when come back to page) so that new data is loaded, otherwise it will reload the old page data
    useEffect(() => {
        router.refresh();
    }, []);

    return (
        <>
            {(isSaving || isSavingTimerOn) && (
                <SavingIndicator setIsSavingTimerOn={setIsSavingTimerOn} />
            )}

            {/* since Page has `use client`, then Editor will be made sure it's client side, thus don't need to put `use client` in Editor or else nextjs will think setIsSaving will be assigned to some server side value from a server component, thus needing it to be serializable. but that's not our case */}
            <Editor
                id={id}

                // if initialContent is non empty, will return as an object with initialContent: initialContent , otherwise will return as empty object. the spread operator will spread the object into a prop because in the context of props, if non empty
                {...(initialContent.length > 0 ? { initialContent } : {})}

                setIsSaving={setIsSaving}

                isSaving={isSaving}

                isSavingTimerOn={isSavingTimerOn}

                setIsSavingTimerOn={setIsSavingTimerOn}
            />
        </>
    );
}
