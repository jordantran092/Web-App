import { createReactBlockSpec } from '@blocknote/react';
import { defaultProps, Link } from '@blocknote/core';
import { MyStyleSchema } from '../schema/CustomSchema';
// import { PageInlineContent } from '@/types/blocknote';

import { CustomInlineContentFromConfig } from '@blocknote/core';
import { createPageInlineContent } from '@/components/editor/inline-content-specs/PageInlineContent';
// type PageInlineContent = CustomInlineContentFromConfig<
//     typeof createPageInlineContent.config,
//     MyStyleSchema
// >;

export const createPageBlock = createReactBlockSpec(
    {
        type: 'pageBlock',
        content: 'inline', // could technically go plain text like used in code blocks type of text, but inline to have more options in case
        propSchema: {
            // textAlignment: defaultProps.textAlignment,
            // textColor: defaultProps.textColor,
            // type: {
            //     default: 'warning',
            //     values: ['warning', 'error', 'info', 'success'],
            // },
            // empty for now, not sure yet
        },
    },
    {
        render: (props) => {
            // const alertType = alertTypes.find((a) => a.value === props.block.props.type)!;
            // const Icon = alertType.icon;

            /* This shows accessing inline content href works, so prob can make own custom inline object  */
            // const inlineItem = props.block.content[0]; // only 1 element, so obv idx 0

            // const linkItem = inlineItem as Link<MyStyleSchema>; // doesn't know its a Link, so cast it using your schema's style schema in terms of text styles which is not related to custom block page
            // console.log(linkItem.href);

            const inlineItem = props.block.content[0]; // only 1 element, so obv idx 0

            // check in case
            if (inlineItem && inlineItem.type === 'pageInline') {
                const linkItem = inlineItem as PageInlineContent; // doesn't know its a Link, so cast it using your schema's style schema in terms of text styles which is not related to custom block page
                console.log(linkItem.props.href);
            }

            return (
                <></>
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
