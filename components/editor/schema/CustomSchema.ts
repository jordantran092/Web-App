import { BlockNoteSchema, defaultInlineContentSpecs } from '@blocknote/core';
import { createPageBlock } from '../block-specs/PageBlock';
// import { createPageInlineContent } from '../inline-content-specs/PageInlineContent';

// Our schema with block specs, which contain the configs and implementations for
// blocks that we want our editor to use.
export const schema = BlockNoteSchema.create().extend({
    blockSpecs: {
        // Creates an instance of the Page block and adds it to the schema.
        pageBlock: createPageBlock(),
    },

    // obsolete for now
    // inlineContentSpecs: {
    //     // Adds all default inline content.
    //     ...defaultInlineContentSpecs,
    //     // Adds Page inline content style
    //     pageInline: createPageInlineContent,
    // },
});

// Since have custom schema, must have custom type for BlockNoteEditor when use this type directly in code. Or else type errors (https://www.blocknotejs.org/docs/features/custom-schemas#usage-with-typescript). Could override the default types, but that is an experimental feature
export type MyBlockNoteEditor = typeof schema.BlockNoteEditor;
// export type MyStyleSchema = typeof schema.styleSchema;
