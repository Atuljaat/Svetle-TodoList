import { createAuthClient } from "better-auth/svelte"
const url = 'http://localhost:3000'

export const authClient = createAuthClient({
    /** The base URL of the server (optional if you're using the same domain) */
    baseURL: url
})

export const { signIn, signUp, useSession } = createAuthClient()