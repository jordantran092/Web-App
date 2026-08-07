"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function signUp(formData : FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const name = formData.get("name") as string;

    await auth.api.signUpEmail({
        body: {
            email,
            password,
            name,
        }
    });

    redirect("/");


}

export async function signIn(formData : FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    await auth.api.signInEmail({
        body: {
            email,
            password,
        }
    });

    redirect("/");


}

export async function signOut() {
    auth.api.signOut({
        headers: await headers(), // to provide header data which will be used to help server know which user to invalidate their session, from the incoming HTTP request for this server action, provided by nextjs function
    });

    redirect("/");
}