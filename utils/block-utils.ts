import { MyDefaultBlockSchema, MyStyleSchema } from '@/components/editor/schema/CustomSchema';
import { StyledText } from '@blocknote/core';
import { Block } from '@blocknote/core/blocks';

// turn into recursion later
export function getText(blocks: Block<MyDefaultBlockSchema, any, any>[]) {
    const result = { value: '' };

    blocks.forEach((block: Block<MyDefaultBlockSchema, any, any>) => {
        // if (block.content && block.content) {
        //     // if inlinecontent[] and plaincontent[], only content type of array
        //     if (Array.isArray(block.content)) {
        //         block.content.forEach((contentObj) => {
        //             if (contentObj.type === 'text') {
        //                 result = result + ` ${(contentObj as StyledText<MyStyleSchema>).text}`;
        //             }
        //         });
        //     }
        // }
        addBlockTextToResult(block, result);

        block.children.forEach((block: Block<MyDefaultBlockSchema, any, any>) => {
            addBlockTextToResult(block, result);
            // if (block.content && block.content) {
            //     // if inlinecontent[] and plaincontent[], only content type of array
            //     if (Array.isArray(block.content)) {
            //         block.content.forEach((contentObj) => {
            //             if (contentObj.type === 'text') {
            //                 result = result + ` ${(contentObj as StyledText<MyStyleSchema>).text}`;
            //             }
            //         });
            //     }
            // }
        });
    });

    return result.value;
}

/* Helper Method for getText */
function addBlockTextToResult(
    block: Block<MyDefaultBlockSchema, any, any>,
    result: { value: string }
) {
    if (block.content) {
        // if inlinecontent[] and plaincontent[], only content type of array
        if (Array.isArray(block.content)) {
            block.content.forEach((contentObj) => {
                if (contentObj.type === 'text') {
                    result.value += `${(contentObj as any).text} `;
                }
            });
        }
    }
}
