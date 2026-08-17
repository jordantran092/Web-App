import { SearchMenuOpenContext } from '@/components/Page';
import SearchCommand from '@/components/SearchCommand';
import {} from '@blocknote/core';
import { SideMenuExtension } from '@blocknote/core/extensions';
import { useBlockNoteEditor, useComponentsContext, useExtensionState } from '@blocknote/react';
import { ReactNode, useContext } from 'react';

export function MoveToItem(props: { children: ReactNode }) {
    const editor = useBlockNoteEditor();

    const Components = useComponentsContext()!;

    const block = useExtensionState(SideMenuExtension, {
        selector: (state) => state?.block,
    });

    const context = useContext(SearchMenuOpenContext);
    if (!context) {
        throw new Error('useContext not being used under proper provider');
    }

    if (!block) {
        return null;
    }

    return (
        <>
            <Components.Generic.Menu.Item
                onClick={() => {
                    context.setisSearchMenuOpen(true);
                }}>
                {props.children}
            </Components.Generic.Menu.Item>
        </>
    );
}
