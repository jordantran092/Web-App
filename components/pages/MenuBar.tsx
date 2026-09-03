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
    HiStar,
} from 'react-icons/hi';
import { Input } from '../ui/input';
import { RefObject, useEffect, useRef, useState } from 'react';
import { PageUpdateInput } from '@/types/Page';
import * as PageActions from '@/actions/PageActions';
import SavingIndicator from './SavingIndicator';
import { SidebarTrigger } from '../ui/sidebar';

type MenuBarProps = {
    id: string;
    title: string;
    favorite: boolean;
    isSaving: boolean;
    isSavingTimerOn: boolean;
    setIsSavingTimerOn: (value: boolean) => void;
    setisBreadcrumbMenuOpen: (value: boolean) => void;
    unsavedChangesRef: RefObject<boolean>;
};

/*

NOTE: Escape, click off input, and enter are ways to interact with the title input

*/

export function MenuBar({
    id,
    title,
    favorite,
    isSaving,
    isSavingTimerOn,
    setIsSavingTimerOn,
    setisBreadcrumbMenuOpen,
    unsavedChangesRef,
}: MenuBarProps) {
    const [tempTitle, setTempTitle] = useState(title); // initial state will be retrieved from server via props
    const titlesRef = useRef({ title: title, tempTitle: tempTitle }); // most up to date state of titles
    const recentlyBlurRef = useRef(false);

    const [isFavorite, setIsFavorite] = useState(favorite); // initial state will be retrieved from server via props
    const isFavoriteRef = useRef(favorite);

    useEffect(() => {
        document.addEventListener('click', handleClick);

        return () => {
            document.removeEventListener('click', handleClick);
        };
    }, []);

    // Keep current user visible title in sync with its latest ref value
    useEffect(() => {
        titlesRef.current.tempTitle = tempTitle;

        if (titlesRef.current.title != titlesRef.current.tempTitle) {
            unsavedChangesRef.current = true;
        }
    }, [tempTitle]);

    // Keep isFavoriteRef in sync with useState
    useEffect(() => {
        isFavoriteRef.current = isFavorite;
    }, [isFavorite]);

    // To handle when user changed title and clicked outside of input element, and then save
    function handleClick(event: MouseEvent) {
        if (recentlyBlurRef.current) {
            const target = event.target as HTMLElement;

            // To be safe, check if clicked item was not input element, but may not be entirely necessary because blur usually is when clicked on another ele
            if (target.id !== 'menu-bar-input') {
                recentlyBlurRef.current = false; // reset to avoid state conflicts

                updatePage();
            }
        }
    }

    // When only input element is blurred
    function handleBlur() {
        recentlyBlurRef.current = true;
    }

    function updatePage() {
        // With function closure, these vars capture the lookup expression, not the result of the lookup expression, so it will retrieve latest values of the ref each time func runs
        let title = titlesRef.current.title;
        let tempTitle = titlesRef.current.tempTitle;

        // Only update if there's a change in title on client side, otherwise no point
        if (title != tempTitle) {
            // Not related to autosave
            // Update current page
            const pageEntity: PageUpdateInput = {
                id,
                title: tempTitle,
            };

            PageActions.updatePage(pageEntity);

            PageActions.renameTitleForParentOfThisPage(id, tempTitle);

            // Make sure local variable title is in sync, not just the DB
            titlesRef.current.title = tempTitle;

            unsavedChangesRef.current = false;

            // console.log(`title: ${titlesRef.current.title}\n

            //     tempTitle: ${titlesRef.current.tempTitle}`);
        }
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            updatePage();
            event.currentTarget.blur();
        } else if (event.key === 'Escape') {
            // If there any changes to title at all, to avoid re-render
            if (titlesRef.current.title != titlesRef.current.tempTitle) {
                // Sets back to original title a.k.a discarded changes
                setTempTitle(titlesRef.current.title);

                // console.log(`title: ${titlesRef.current.title}\n

                //     tempTitle: ${titlesRef.current.tempTitle}`);
            }
            event.currentTarget.blur();

            unsavedChangesRef.current = false;
        }
    };

    return (
        /* 
        
        Sticky to allow menubar to still stay within normal layout unlike fixed
         
        top-2 to keep the margins the same when menubar is stuck to top 

        z-50 to give menubar higher priority to stay on top of everything

        min-w-0 to allow menubar to shrink smaller than children width in case constrained space

        */

        <Menubar
            className="sticky top-2 z-50 mt-2 flex w-full min-w-0 gap-2 border-none"
            modal={false}>
            {/* sidebar menu */}
            {/* Margins are not the same with every page with sidebar, must be custom */}
            <SidebarTrigger className="m-2 mt-4 ml-2.25" />

            <Input
                value={tempTitle}
                onChange={(e) => setTempTitle(e.target.value)}
                // focus-visible:border-0 for the ring when click on input
                // Border is transparent, but when hover it will turn gray so that border remains even if user moves mouse off of input when focus is on
                // Need w-auto so that w-full doesn't take over from default classes, allow width to not be forced so field-sizing-content can work. This makes input component re-size based on content
                className="mt-2 field-sizing-content w-auto border-transparent hover:border-gray-500 focus-visible:border-white focus-visible:ring-0"
                onKeyDown={handleKeyDown}
                onBlur={handleBlur} // removing event listeners handled by React
                id="menu-bar-input" // for saving on blur + click
            />

            {/* Bread crumb button */}
            <button
                onClick={() => {
                    setisBreadcrumbMenuOpen(true);
                }}>
                <HiOutlineChevronDown
                    size={23}
                    className="mt-1.5 rounded-sm p-1 transition duration-50 hover:bg-[#bdbdbd38]"
                />
            </button>

            {/* Saving indicator  */}
            {(isSaving || isSavingTimerOn) && (
                <span className="mt-2 ml-5">
                    <SavingIndicator setIsSavingTimerOn={setIsSavingTimerOn} />
                </span>
            )}

            {/* Favorite button */}
            {/* Shrink-0 to avoid shrinking if menu bar shrinks */}
            <button
                className="ml-auto shrink-0"

                onClick={() => {
                    // Update current page
                    const pageEntity: PageUpdateInput = {
                        id,
                        favorite: !isFavorite,
                    };

                    PageActions.updatePage(pageEntity);

                    setIsFavorite(!isFavorite);
                }}>
                {/* 
                
                Conditionally render star or unstarred based on favorited or not 
                
                */}
                {isFavorite ? (
                    <HiStar
                        size={28}
                        className="rounded-sm p-1 transition duration-50 hover:bg-[#bdbdbd38]"
                    />
                ) : (
                    <HiOutlineStar
                        size={28}
                        className="rounded-sm p-1 transition duration-50 hover:bg-[#bdbdbd38]"
                    />
                )}
            </button>

            <MenubarMenu>
                {/* Shrink-0 to avoid dot menu from shrinking if menu bar shrinks */}
                <MenubarTrigger className="mr-2 shrink-0 hover:bg-[#bdbdbd38]">
                    <HiDotsHorizontal size={18} />
                </MenubarTrigger>
                <MenubarContent>
                    <MenubarGroup>
                        <MenubarItem>
                            Undo <MenubarShortcut>⌘Z</MenubarShortcut>
                        </MenubarItem>
                        {/* <MenubarItem>
                            Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
                        </MenubarItem> */}
                    </MenubarGroup>
                    {/* <MenubarSeparator />
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
                    </MenubarGroup> */}
                </MenubarContent>
            </MenubarMenu>
        </Menubar>
    );
}
