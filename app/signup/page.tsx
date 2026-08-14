import { SignupForm } from '@/components/SignupForm';

export default function SignUpPage() {
    return (
        <div className="flex min-h-svh w-full items-center justify-center bg-[#393939] p-6 md:p-10">
            <div className="w-full max-w-sm">
                <SignupForm />
            </div>
        </div>
    );
}
