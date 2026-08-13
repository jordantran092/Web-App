import * as AuthActions from '@/actions/AuthActions';
import { LoginForm } from '@/components/LoginForm';
import { GalleryVerticalEnd } from 'lucide-react';

export default function SignInPage() {
    return (
        <>
            <div className="grid min-h-svh bg-[#393939] lg:grid-cols-2">
                <div className="flex flex-col gap-4 p-6 md:p-10">
                    <div className="flex justify-center gap-2 md:justify-start">
                        <a href="/" className="flex items-center gap-2 font-medium">
                            <div className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
                                <GalleryVerticalEnd className="size-4" />
                            </div>
                            Web App
                        </a>
                    </div>
                    <div className="flex flex-1 flex-col justify-center pl-20">
                        <p className="mb-10 text-5xl">
                            The space
                            <br /> for enhanced
                            <br /> productivity
                        </p>

                        <p className="mb-20 text-xl">
                            Your workspace productivity app for notes and documents
                        </p>

                        <div className="w-full max-w-xs">
                            <LoginForm />
                        </div>
                    </div>
                </div>
                <div className="relative hidden lg:block">
                    <img
                        src="/window.svg"
                        alt="Image"
                        className="absolute inset-0 h-full w-full object-cover"
                    />
                </div>
            </div>

            {/* <form action={AuthActions.signIn}>
                <label>
                    Enter your email:
                    <input type="text" name="email" required />
                </label>
                <br />
                <label>
                    Enter your password:
                    <input type="password" name="password" required />
                </label>
                <br />
                <br />
                <button>Submit</button>
            </form> */}
        </>
    );
}

// import { LoginForm } from "@/components/login-form"

// export default function Page() {
//   return (
//     <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
//       <div className="w-full max-w-sm">
//
//       </div>
//     </div>
//   )
// }
