'use client';

export default function LoadingSpinner() {
    return (
        /*
        div because it's a good blank canvas to work with unlike other elements

        rounded-full to make it circular
        
        border-t-transparent to make only the top portion of the borders to be transparent to have that gap effect in the circle 
        */
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-gray-300"></div>
    );
}
