import { cn } from '@/lib/utils';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldDescription, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import * as AuthActions from '@/actions/AuthActions';
import Link from 'next/link';

/*
className → customize the styling

...props → allow normal HTML props

ComponentProps<'div'> → TypeScript knows which props are valid

cn() → combine/resolve Tailwind classes

*/
export function LoginForm({ className, ...props }: React.ComponentProps<'div'>) {
    return (
        <div className={cn('flex flex-col gap-6', className)} {...props}>
            <Card>
                {/* <CardHeader>
                    <CardTitle>Login to your account</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account
                    </CardDescription>
                </CardHeader> */}
                <CardContent>
                    <form action={AuthActions.signIn}>
                        <FieldGroup>
                            <Field>
                                {/* <FieldLabel htmlFor="email">Email</FieldLabel> */}
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="Email"
                                    name="email"
                                    required
                                />
                            </Field>
                            <Field>
                                <div className="flex items-center">
                                    {/* <FieldLabel htmlFor="password">Password</FieldLabel> */}
                                    {/* <a
                                        href="#"
                                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline">
                                        Forgot your password?
                                    </a> */}
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    required
                                />
                            </Field>
                            <Field>
                                <Button type="submit">Login</Button>

                                <Link
                                    href="/signup"
                                    // use the buttonVariants helper to make a link look like a button. variant is the type of the button shadcn
                                    className={buttonVariants({ variant: 'default' })}>
                                    Create new account
                                </Link>

                                {/* <FieldDescription className="text-center">
                                    Don&apos;t have an account? <a href="#">Sign up</a>
                                </FieldDescription> */}
                            </Field>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
