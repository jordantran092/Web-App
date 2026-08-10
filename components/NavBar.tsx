'use client';

import LoadingSpinner from './LoadingSpinner';

type NavBarProps = {
    isSaving: boolean;
};

export default function NavBar({ isSaving }: NavBarProps) {
    /* debugging */
    if (isSaving) console.log('Saving');

    return (
        <>
            {/* put back when finished */}
            {/* {isSaving && <p>Saving...</p>} */}

            {/* flex to align items inline, and gap to give some space between the 2 items */}
            <div className="flex gap-2">
                <div className="mt-1">
                    <LoadingSpinner />
                </div>
                <div className="mt-1">
                    <p className="text-sm">Saving...</p>
                </div>
            </div>
        </>
    );
}
