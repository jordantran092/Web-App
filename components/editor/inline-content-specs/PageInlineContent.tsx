import { createReactInlineContentSpec } from '@blocknote/react';

export const createPageInlineContent = createReactInlineContentSpec(
    {
        type: 'pageInline',
        propSchema: {
            href: {
                default: undefined,
                type: 'string',
            },
        },
        content: 'styled',
    },
    {
        render: (props) => {},
        // <span style={{ backgroundColor: '#8400ff33' }}>@{props.inlineContent.props.user}</span>
    }
);
