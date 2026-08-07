import { auth } from "@/lib/auth"; // the auth client we made
import { toNextJsHandler } from "better-auth/next-js";

export const { GET, POST } = toNextJsHandler(auth); // export get and post