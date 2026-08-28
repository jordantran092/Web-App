import { MyDefaultBlockSchema, MyStyleSchema } from '@/components/editor/schema/CustomSchema';
import { StyledText } from '@blocknote/core';
import { Block } from '@blocknote/core/blocks';

/* Pre-order traversal recursive method to get text from the all blocks  */
export function getText(blocks: Block<MyDefaultBlockSchema, any, any>[]) {
    const result = { value: '' };

    blocks.forEach((block: Block<MyDefaultBlockSchema, any, any>) => {
        getTextHelper(block, result);
    });

    return result.value;
}

export function getTextHelper(
    block: Block<MyDefaultBlockSchema, any, any>,
    result: { value: string }
) {
    // one step to take. add parent block to text result
    addBlockTextToResult(block, result);

    // do it for the children
    block.children.forEach((childBlock: Block<MyDefaultBlockSchema, any, any>) => {
        getTextHelper(childBlock, result);
    });
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
