// /*
//  * Experimental!
//  * You can use a file like this (blocknote.d.ts) to automatically override types with your custom schema.
//  * This way, you can just use types like `PartialBlock`, `Block`, `BlockNoteEditor` and they'll automatically
//  * use the types from your custom schema.
//  *
//  * (the reason is that this is not used in the examples, is that we use multiple BlockNote instances in the website / example project with different shemas.
//  * This method only works if you use one custom schema in your app)
//  */
// import '@blocknote/core';
// import type { schema } from '@/components/editor/schema/CustomSchema';

// declare module '@blocknote/core' {
//     // Override the default schema types
//     type DefaultStyleSchema = typeof schema.styleSchema;
//     type DefaultBlockSchema = typeof schema.blockSchema;
//     type DefaultInlineContentSchema = typeof schema.inlineContentSchema;
// }

// import { CustomInlineContentFromConfig } from '@blocknote/core';
// import { createPageInlineContent } from '@/components/editor/inline-content-specs/PageInlineContent';
// import { MyStyleSchema } from '@/components/editor/schema/CustomSchema';

// // Extract the exact type of your custom inline content item
// type PageInlineContent = CustomInlineContentFromConfig<
//     typeof createPageInlineContent.config,
//     MyStyleSchema
// >;
