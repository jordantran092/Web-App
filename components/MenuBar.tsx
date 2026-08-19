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

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            console.log('Enter key pressed!');

            const pageEntity: PageUpdateInput = {
                id,
                title: currentTitle,
            };

            PageActions.updatePage(pageEntity);
        }
    };

    return (
        <Menubar modal={false} className="border-none">
            <HiOutlineMenu size={23} />

            <Input
                value={currentTitle}
                onChange={(e) => setTitle(e.target.value)}
                className="border-none"
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
