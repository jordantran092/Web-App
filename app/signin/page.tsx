import { LoginForm } from '@/components/LoginForm';
import Image from 'next/image';

export default function SignInPage() {
    return (
        <>
            {/* grid-rows-2 */}
            <div className="grid min-h-svh bg-[#393939] lg:grid-cols-2">
                <div className="flex flex-col gap-4 p-6 md:p-10">
                    <div className="flex justify-center gap-2 md:justify-start">
                        <a href="/" className="flex items-center gap-2 font-medium">
                            X
                        </a>
                    </div>
                    <div className="flex flex-1 flex-col justify-center sm:pl-30 xl:pl-20">
                        <p className="mb-10 text-5xl">
                            The space
                            <br /> for enhanced
                            <br /> productivity
                        </p>

                        <p className="mb-20 text-xl md:mb-35 lg:mb-20">
                            Your workspace productivity app for notes and documents
                        </p>

                        <div className="w-full max-w-xs">
                            <LoginForm />
                        </div>
                    </div>
                </div>
                <div className="relative hidden lg:block">
                    <Image
                        src="/a.jpg"
                        alt="Sign in image"
                        fill={true}
                        className="absolute inset-0 h-full w-full mask-[linear-gradient(to_left,black_40%,transparent_100%)] object-cover"
                        // "absolute inset-0 h-full w-full mask-[linear-gradient(to_left,black_40%,transparent_100%)] object-cover"
                        // For gardient, fading starts right and travels left. 0-40% of image has 'black' meaning visible, and then the rest goes towards fully transparent max 100%
                    />
                </div>
            </div>
        </>
    );
}
