"use client";


type NavBarProps = {
    isSaving: boolean;
}

export default function NavBar({isSaving} : NavBarProps) {
    

    /* debugging */
    if(isSaving) console.log("Saving")

    return (
        <>
            {isSaving && <p>Saving...</p>}

    

        </>
    );
}