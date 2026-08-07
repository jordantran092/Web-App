import { signUp } from "@/actions/AuthActions";

// change to authactions.signup


export default function SignUpPage() {
    


    return (
        <form action={signUp}>
            <label>Enter your email:
                <input type="text" name="email" required />
            </label>
            <label>Enter your password:
                <input type="text" name="password" required />
            </label>
            <label>Enter your name:
                <input type="text" name="name" required />
            </label>
        </form>
    );
}