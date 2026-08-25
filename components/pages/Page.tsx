'use client'; // because need stateful variable

import { Block } from '@blocknote/core/blocks';
import { useEffect, useState, createContext, useRef, RefObject } from 'react';

import { Editor } from '@/components/editor/DynamicEditor';
import { useRouter } from 'next/navigation';
import SearchCommand from './SearchCommand';
import { MyBlockNoteEditor, MyDefaultBlockSchema } from '../editor/schema/CustomSchema';
// import { MenuBar } from './pages/MenuBar';
// import BreadcrumbCommand from './pages/BreadcrumbCommand';
import { MenuBar } from './MenuBar';
import BreadcrumbCommand from './BreadcrumbCommand';

type SearchMenuOpenContextType = {
    isSearchMenuOpen: boolean;
    setisSearchMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
    selectedBlockRef: RefObject<Block<MyDefaultBlockSchema, any, any> | null>;
    editorRef: RefObject<MyBlockNoteEditor | null>;
    id: string;
};
export const SearchMenuOpenContext = createContext<SearchMenuOpenContextType | undefined>(
    undefined
); // to be able to handle undefined if not using it under correct provider

type PageProps = {
    id: string;
    initialContent: Block[];
    title: string;
    favorite: boolean;
};
// Need Page component to share isSaving stateful variable with navbar and editor
export default function Page({ id, initialContent, title, favorite }: PageProps) {
    // need state variable here in this parent component so that it can be shared between navbar and editor to handle saving indicator
    const [isSaving, setIsSaving] = useState(false);
    const [isSavingTimerOn, setIsSavingTimerOn] = useState(false);
    const [isSearchMenuOpen, setisSearchMenuOpen] = useState(false);
    const [isBreadcrumbMenuOpen, setisBreadcrumbMenuOpen] = useState(false);
    const selectedBlockRef = useRef<Block<MyDefaultBlockSchema, any, any>>(null);
    const editorRef = useRef<MyBlockNoteEditor>(null);
    const router = useRouter(); // access to next.js navigation controls

    // Refresh page on mount (e.g. when come back to page) so that new data is loaded, otherwise it will reload the old page data
    useEffect(() => {
        router.refresh();
    }, []);

    return (
        <>
            <MenuBar
                id={id}
                title={title}
                favorite={favorite}
                isSaving={isSaving}
                isSavingTimerOn={isSavingTimerOn}
                setIsSavingTimerOn={setIsSavingTimerOn}
                setisBreadcrumbMenuOpen={setisBreadcrumbMenuOpen}
            />

            {/* Use context hook to share setter method so that when `move to` is clicked, will display the search dialog */}
            <SearchMenuOpenContext.Provider
                value={{ isSearchMenuOpen, setisSearchMenuOpen, selectedBlockRef, editorRef, id }}>
                {/* 
                
                since Page has `use client`, then Editor will be made sure it's client side, thus don't need to put `use client` in Editor or else nextjs will think setIsSaving will be assigned to some server side value from a server component, thus needing it to be serializable. but that's not our case 
                
                */}

                <Editor
                    id={id}

                    // if initialContent is non empty, will return as an object with initialContent: initialContent , otherwise will return as empty object. the spread operator will spread the object into a prop because in the context of props, if non empty
                    {...(initialContent.length > 0 ? { initialContent } : {})}

                    setIsSaving={setIsSaving}

                    isSaving={isSaving}

                    isSavingTimerOn={isSavingTimerOn}

                    setIsSavingTimerOn={setIsSavingTimerOn}
                />
                {/* Do not need to handle visiblity based on state here, meant to be handled inside via CommandDialog props */}
                <SearchCommand id={id} />
            </SearchMenuOpenContext.Provider>

            <BreadcrumbCommand
                isBreadcrumbMenuOpen={isBreadcrumbMenuOpen}
                setisBreadcrumbMenuOpen={setisBreadcrumbMenuOpen}
                id={id}
            />
        </>
    );
}
