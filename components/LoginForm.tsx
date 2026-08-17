import { cn } from '@/lib/utils';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldDescription, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import * as AuthActions from '@/actions/AuthActions';
import Link from 'next/link';

export function LoginForm({ className, ...props }: React.ComponentProps<'div'>) {
    // Props come from parent component div and only accepts div attributes, also pulling the className
    return (
        // Merge these hardcoded classes with the prop tailwind classes from args, and transfer over the parent's props
        <div className={cn('flex flex-col gap-6', className)} {...props}>
            <form action={AuthActions.signIn}>
                <FieldGroup>
                    <Field>
                        <Input
                            id="email"
                            type="email"
                            placeholder="Email"
                            name="email"
                            required
                            className="bg-white! text-black!"
                        />
                    </Field>
                    <Field>
                        <Input
                            id="password"
                            type="password"
                            name="password"
                            placeholder="Password"
                            required
                            className="bg-white! text-black!"
                        />
                    </Field>
                    <Field className="mt-10">
                        <Button
                            type="submit"
                            className="bg-neutral-800 text-white hover:bg-neutral-800/80">
                            Log in
                        </Button>
                    </Field>
                    <Field>
                        <Link
                            href="/signup"
                            // use the buttonVariants helper to make a link look like a button. variant is the type of the button shadcn
                            className={cn(
                                buttonVariants({ variant: 'default' }),
                                'bg-neutral-800! text-white! hover:bg-neutral-800/80!'
                            )}>
                            Create new account
                        </Link>
                    </Field>
                </FieldGroup>
            </form>
        </div>
    );
}
