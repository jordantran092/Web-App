import { SignupForm } from '@/components/SignupForm';

export const dynamic = 'force-dynamic'; // forces Next.js/Vercel to never cache this page
export const revalidate = 0; // tells the Vercel CDN that the age is immediately stale

export default function SignUpPage() {
    return (
        // Flex for centering inner div, min-h-svh to stretch it vertically fully & avoid mobile viewport address bar weirdness scrolling, want full width, horizontal and vertically centered
        <div className="flex min-h-svh w-full items-center justify-center bg-[#393939] p-6 md:p-10">
            {/* Full width but no bigger than sm width of tailwind so it doesn't stretch too wide on bigger screens  */}
            <div className="w-full max-w-sm">
                <SignupForm />
            </div>
        </div>
    );
}
