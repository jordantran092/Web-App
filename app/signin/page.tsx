import * as AuthActions from '@/actions/AuthActions';
import { LoginForm } from '@/components/LoginForm';

export default function SignInPage() {
    return (
        <>
            <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
                <div className="w-full max-w-sm">
                    <LoginForm />
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
