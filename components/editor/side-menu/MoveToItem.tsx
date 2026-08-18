import { SearchMenuOpenContext } from '@/components/Page';
import {} from '@blocknote/core';
import { SideMenuExtension } from '@blocknote/core/extensions';
import { useBlockNoteEditor, useComponentsContext, useExtensionState } from '@blocknote/react';
import { ReactNode, useContext } from 'react';

export function MoveToItem(props: { children: ReactNode }) {
    // const editor = useBlockNoteEditor();

    const Components = useComponentsContext()!;

    // Get blocked selected
    const block = useExtensionState(SideMenuExtension, {
        selector: (state) => state?.block,
    });

    if (!block) {
        return null;
    }

    const context = useContext(SearchMenuOpenContext);
    if (!context) {
        throw new Error('useContext not being used under proper provider');
    }

    return (
        <>
            <Components.Generic.Menu.Item
                onClick={() => {
                    context.setisSearchMenuOpen(true);

                    context.selectedBlockRef.current = block;
                }}>
                {props.children}
            </Components.Generic.Menu.Item>
        </>
    );
}
