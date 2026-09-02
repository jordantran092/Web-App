// import { SearchMenuOpenContext } from '@/components/Page';
import { Block } from '@blocknote/core';
import { SideMenuExtension } from '@blocknote/core/extensions';
import { useBlockNoteEditor, useComponentsContext, useExtensionState } from '@blocknote/react';
import { ReactNode, useContext } from 'react';
import { MyDefaultBlockSchema, schema } from '../schema/CustomSchema';
import * as PageActions from '@/actions/PageActions';
import { PageUpdateInput } from '@/types/Page';
import { SearchMenuOpenContext } from '@/components/pages/Page';

export function DeleteItem(props: { children: ReactNode }) {
    const editor = useBlockNoteEditor(schema);

    const Components = useComponentsContext()!;

    // Get blocked selected
    const block = useExtensionState(SideMenuExtension, {
        selector: (state) => state?.block,
    }) as Block<MyDefaultBlockSchema, any, any>;

    if (!block) {
        return null;
    }

    const context = useContext(SearchMenuOpenContext);
    if (!context) {
        throw new Error('useContext not being used under proper provider');
    }

    const id = context.id;

    return (
        <>
            <Components.Generic.Menu.Item
                onClick={() => {
                    editor.removeBlocks([block]);

                    if (block.type === 'pageBlock') {
                        PageActions.deletePage(block.props.pageId);
                    }

                    const pageEntity: PageUpdateInput = {
                        id,
                        blocks: JSON.stringify(editor.document),
                        textContent: editor._tiptapEditor.getText().replace(/\s+/g, ' ').trim(),
                    };

                    PageActions.updatePage(pageEntity);
                }}>
                {props.children}
            </Components.Generic.Menu.Item>
        </>
    );
}
