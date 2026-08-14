import { SignupForm } from '@/components/SignupForm';

export default function SignUpPage() {
    return (
        // <form action={AuthActions.signUp}>
        //     <label>Enter your email:
        //         <input type="text" name="email" required />
        //     </label>
        //     <br/>
        //     <label>Enter your password:
        //         <input type="password" name="password" required />
        //     </label>
        //     <br/>
        //     <label>Enter your name:
        //         <input type="text" name="name" required />
        //     </label>
        //     <br/>
        //     <button>Submit</button>
        // </form>

        <div className="flex min-h-svh w-full items-center justify-center bg-[#393939] p-6 md:p-10">
            <div className="w-full max-w-sm">
                <SignupForm />
            </div>
        </div>
    );
}
