import * as AuthActions from '@/actions/AuthActions';
import { Button } from '@/components/ui/button';

export default function SignInPage() {
    return (
        <>
            <form action={AuthActions.signIn}>
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
            </form>
        </>
    );
}
