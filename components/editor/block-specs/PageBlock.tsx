import { createReactBlockSpec } from '@blocknote/react';
import { defaultProps } from '@blocknote/core';
// import { PageInlineContent } from '@/types/blocknote';

import { CustomInlineContentFromConfig } from '@blocknote/core';
import Link from 'next/link';
import { HiDocumentText } from 'react-icons/hi'; // Heroicons v1
import * as PageActions from '@/actions/PageActions';

export const createPageBlock = createReactBlockSpec(
    {
        type: 'pageBlock',
        propSchema: {
            // props of a page block when instantiating a page block
            pageId: {
                default: 'undefined',
                type: 'string',
            },
        },
        content: 'none', // so that there cannot exist any user entered content in the block
    },
    {
        // client component
        render: (props) => {
            // const alertType = alertTypes.find((a) => a.value === props.block.props.type)!;
            // const Icon = alertType.icon;

            // real href will just be a whole new page, with its own unique address, no connection to the parent page url, safer
            const id = props.block.props.pageId;
            const href = `/pages/${id}`;
            const pageEntity = await PageActions.getPage(id);

            // debug
            // console.log(href);

            return (
                <>
                    <div className="flex w-full flex-row">
                        <HiDocumentText size={23} />
                        <Link href={href} className="grow">
                            <button className="w-full border text-left">{pageEntity?.title}</button>
                        </Link>
                    </div>
                </>
                // <div className={'alert'} data-alert-type={props.block.props.type}>
                //     {/*Icon which opens a menu to choose the Alert type*/}
                //     <Menu withinPortal={false}>
                //         <Menu.Target>
                //             <div className={'alert-icon-wrapper'} contentEditable={false}>
                //                 <Icon
                //                     className={'alert-icon'}
                //                     data-alert-icon-type={props.block.props.type}
                //                     size={32}
                //                 />
                //             </div>
                //         </Menu.Target>
                //         {/*Dropdown to change the Alert type*/}
                //         <Menu.Dropdown>
                //             <Menu.Label>Alert Type</Menu.Label>
                //             <Menu.Divider />
                //             {alertTypes.map((type) => {
                //                 const ItemIcon = type.icon;
                //                 return (
                //                     <Menu.Item
                //                         key={type.value}
                //                         leftSection={
                //                             <ItemIcon
                //                                 className={'alert-icon'}
                //                                 data-alert-icon-type={type.value}
                //                             />
                //                         }
                //                         onClick={() =>
                //                             props.editor.updateBlock(props.block, {
                //                                 type: 'alert',
                //                                 props: { type: type.value },
                //                             })
                //                         }>
                //                         {type.title}
                //                     </Menu.Item>
                //                 );
                //             })}
                //         </Menu.Dropdown>
                //     </Menu>
                //     {/*Rich text field for user to type in*/}
                //     <div className={'inline-content'} ref={props.contentRef} />
                // </div>
            );
        },
    }
);
