import { redirect } from "@sveltejs/kit";
import type { Session } from "$lib/Types";

export const protectRoute = (session:Session) => {
    if (!session){
        throw redirect(302,'/login')
    }
}

export const protectLogin = (session:Session) => {
    if (session) {
        throw redirect(302,'/')
    }
}