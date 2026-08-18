import {
    BlockColorsItem,
    DragHandleMenu,
    RemoveBlockItem,
    SideMenu,
    SideMenuProps,
} from '@blocknote/react';
import { MoveToItem } from './MoveToItem';
import { DeleteItem } from './DeleteItem';

export const CustomSideMenu = (props: SideMenuProps) => (
    <SideMenu {...props} dragHandleMenu={CustomDragHandleMenu} />
);

// To avoid rendering issues, it's good practice to define your custom drag
// handle menu in a separate component, instead of inline within the `sideMenu`
// prop of `SideMenuController`.
const CustomDragHandleMenu = () => (
    <DragHandleMenu>
        <BlockColorsItem>Color</BlockColorsItem>
        <MoveToItem>Move To</MoveToItem> {/* Custom Item */}
        <DeleteItem>Delete</DeleteItem> {/* Custom Item */}
        {/* <RemoveBlockItem>Delete</RemoveBlockItem> */}
    </DragHandleMenu>
);
