import {
    Menubar,
    MenubarCheckboxItem,
    MenubarContent,
    MenubarGroup,
    MenubarItem,
    MenubarMenu,
    MenubarRadioGroup,
    MenubarRadioItem,
    MenubarSeparator,
    MenubarShortcut,
    MenubarSub,
    MenubarSubContent,
    MenubarSubTrigger,
    MenubarTrigger,
} from '@/components/ui/menubar';

import {
    HiOutlineMenu,
    HiOutlineChevronDown,
    HiOutlineStar,
    HiDotsHorizontal,
} from 'react-icons/hi';
import { Input } from './ui/input';
import { useState } from 'react';
import { PageUpdateInput } from '@/types/Page';
import * as PageActions from '@/actions/PageActions';

type MenuBarProps = {
    id: string;
    title: string;
};

export function MenuBar({ id, title }: MenuBarProps) {
    const [currentTitle, setTitle] = useState(title);

    function updatePage() {
        if (title != currentTitle) {
            // Update current page
            const pageEntity: PageUpdateInput = {
                id,
                title: currentTitle,
            };

            PageActions.updatePage(pageEntity);

            PageActions.renameTitleForParentOfThisPage(id, currentTitle);
        }
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            updatePage();
            event.currentTarget.blur();
        } else if (event.key === 'Escape') {
            if (title != currentTitle) {
                setTitle(title);
            }
            event.currentTarget.blur();
        }
    };

    return (
        <Menubar modal={false} className="border-none">
            <HiOutlineMenu size={23} />

            <Input
                value={currentTitle}
                onChange={(e) => setTitle(e.target.value)}
                // focus-visible:border-0 for the ring when click on input
                // Border is transparent, but when hover it will turn gray so that border remains even if user moves mouse off of input when focus is on
                // Need w-auto so that w-full doesn't take over from default classes, allow width to not be forced so field-sizing-content can work. This makes input component re-size based on content
                className="hover: mt-2 field-sizing-content w-auto border-transparent hover:border-gray-500 focus-visible:border-white focus-visible:ring-0"
                onKeyDown={handleKeyDown}
            />

            <HiOutlineChevronDown size={23} />

            <HiOutlineStar size={18} />

            <MenubarMenu>
                <MenubarTrigger>
                    <HiDotsHorizontal size={18} />
                </MenubarTrigger>
                <MenubarContent>
                    <MenubarGroup>
                        <MenubarItem>
                            Undo <MenubarShortcut>⌘Z</MenubarShortcut>
                        </MenubarItem>
                        <MenubarItem>
                            Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
                        </MenubarItem>
                    </MenubarGroup>
                    <MenubarSeparator />
                    <MenubarGroup>
                        <MenubarSub>
                            <MenubarSubTrigger>Find</MenubarSubTrigger>
                            <MenubarSubContent>
                                <MenubarGroup>
                                    <MenubarItem>Search the web</MenubarItem>
                                </MenubarGroup>
                                <MenubarSeparator />
                                <MenubarGroup>
                                    <MenubarItem>Find...</MenubarItem>
                                    <MenubarItem>Find Next</MenubarItem>
                                    <MenubarItem>Find Previous</MenubarItem>
                                </MenubarGroup>
                            </MenubarSubContent>
                        </MenubarSub>
                    </MenubarGroup>
                    <MenubarSeparator />
                    <MenubarGroup>
                        <MenubarItem>Cut</MenubarItem>
                        <MenubarItem>Copy</MenubarItem>
                        <MenubarItem>Paste</MenubarItem>
                    </MenubarGroup>
                </MenubarContent>
            </MenubarMenu>
        </Menubar>
    );
}
