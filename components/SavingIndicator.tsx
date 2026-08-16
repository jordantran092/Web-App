'use client';

import { useEffect } from 'react';
import LoadingSpinner from './LoadingSpinner';

type SavingIndicatorProps = {
    setIsSavingTimerOn: (value: boolean) => void;
};

export default function SavingIndicator({ setIsSavingTimerOn }: SavingIndicatorProps) {
    useEffect(() => {
        // Set a timer for 1 second
        const timer = setTimeout(() => {
            setIsSavingTimerOn(false);
        }, 500);

        // Cleanup function to clear the timer if component unmounts
        // clearTimeout is a closure on timer, so timer will still live on until cleanup function finishes
        return () => clearTimeout(timer);
    }, []); // Empty array ensures this runs only once on mount

    return (
        <>
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
