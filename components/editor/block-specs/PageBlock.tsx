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
            title: {
                default: 'undefined',
                type: 'string',
            },
        },
        content: 'none', // so that there cannot exist any user entered content in the block
    },
    {
        // client component
        render: (props) => {
            // real href will just be a whole new page, with its own unique address, no connection to the parent page url, safer
            const id = props.block.props.pageId;
            const title = props.block.props.title;
            const href = `/pages/${id}`;

            // debug
            // console.log(href);

            return (
                <>
                    <div className="flex w-full flex-row rounded p-0.5 transition duration-100 hover:bg-[#bdbdbd38]">
                        <HiDocumentText size={23} />
                        <Link href={href} className="grow">
                            <button className="w-full pl-1 text-left">{title}</button>
                        </Link>
                    </div>
                </>
            );
        },
    }
);
