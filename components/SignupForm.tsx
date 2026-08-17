import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldDescription, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import * as AuthActions from '@/actions/AuthActions';
import Link from 'next/link';

export function SignupForm() {
    return (
        <>
            <Link
                href="/signin"
                // use the buttonVariants helper to make a link look like a button. variant is the type of the button shadcn
                //className={buttonVariants({ variant: 'default' })}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="mb-20 size-10 rounded-full p-2 transition duration-50 hover:bg-[#bdbdbd38]">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 19.5 8.25 12l7.5-7.5"
                    />
                </svg>
            </Link>
            <p className="mb-20 text-3xl">Get started on Z</p>
            <form action={AuthActions.signUp}>
                <FieldGroup>
                    <Field>
                        <FieldLabel htmlFor="name">Full Name</FieldLabel>
                        <Input
                            id="name"
                            type="text"
                            name="name"
                            // placeholder="John Doe"
                            required
                            className="bg-white! text-black"
                        />
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="email">Email</FieldLabel>
                        <Input
                            id="email"
                            type="email"
                            name="email"
                            // placeholder="john@example.com"
                            required
                            className="bg-white! text-black"
                        />
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="password">Password</FieldLabel>
                        <Input
                            id="password"
                            type="password"
                            name="password"
                            // placeholder="Password"
                            required
                            className="mb-5 bg-white! text-black"
                        />
                        {/* <FieldDescription>Must be at least 8 characters long.</FieldDescription> */}
                    </Field>
                    {/* <Field>
                        <FieldLabel htmlFor="confirm-password">Confirm Password</FieldLabel>
                        <Input id="confirm-password" type="password" required />
                        <FieldDescription>Please confirm your password.</FieldDescription>
                    </Field> */}
                    <FieldGroup>
                        <Field>
                            <Button
                                type="submit"
                                className="bg-neutral-800 text-white hover:bg-neutral-800/80">
                                Submit
                            </Button>

                            <FieldDescription className="px-6 text-center text-white">
                                Already have an account? <Link href="/signin">Sign in</Link>
                                {/* <a href="#">Sign in</a> */}
                            </FieldDescription>
                        </Field>
                    </FieldGroup>
                </FieldGroup>
            </form>
        </>
    );
}
