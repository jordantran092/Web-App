import { useCallback, useEffect, useRef } from 'react';
import { PageUpdateInput } from '@/types/Page';
import { updatePage } from '@/actions/PageActions';

type UseEditorSaveGuardParams = {
    id: string;
    setIsSaving: (value: boolean) => void;
    isSaving: boolean;
    isSavingTimerOn: boolean;
    setIsSavingTimerOn: (value: boolean) => void;
};

// Hook that provides a stable keyboard shortcut handler which uses refs
// internally to avoid stale closure reads of isSaving/isSavingTimerOn.
export default function useEditorSaveGuard({
    id,
    setIsSaving,
    isSaving,
    isSavingTimerOn,
    setIsSavingTimerOn,
}: UseEditorSaveGuardParams) {
    const isSavingRef = useRef(isSaving);
    const isSavingTimerOnRef = useRef(isSavingTimerOn);

    // Keep refs in sync with incoming prop state (for external updates)
    useEffect(() => {
        isSavingRef.current = isSaving;
    }, [isSaving]);

    useEffect(() => {
        isSavingTimerOnRef.current = isSavingTimerOn;
    }, [isSavingTimerOn]);

    // Returns a handler suitable for BlockNote keyboardShortcuts, e.g.:
    // { 'Mod-s': saveShortcutHandler }
    const getSaveShortcutHandler = useCallback(() => {
        return ({ editor }: { editor: any }) => {
            // Read/writes to refs are synchronous and avoid stale closures.
            if (!(isSavingRef.current || isSavingTimerOnRef.current)) {
                const savedBlocks = JSON.stringify(editor.document);

                const pageEntity: PageUpdateInput = {
                    id: id,
                    blocks: savedBlocks,
                };

                // update refs immediately so any subsequent fast events see the in-flight save
                isSavingRef.current = true;
                isSavingTimerOnRef.current = true;

                // still update parent state for UI
                setIsSaving(true);
                setIsSavingTimerOn(true);

                updatePage(pageEntity)
                    .then((_) => {
                        // clear ref + parent state when done
                        isSavingRef.current = false;
                        setIsSaving(false);
                    })
                    .catch((error) => {
                        console.log('Error: Page updated failed. ' + error);
                    });

                console.log('saving!');
            } else {
                console.log('already saving!');
            }

            return true; // indicate the shortcut was handled
        };
    }, [id, setIsSaving, setIsSavingTimerOn]);

    return { getSaveShortcutHandler };
}
