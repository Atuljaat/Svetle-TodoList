import { auth } from "$lib/auth/auth"; // path to your auth file
import { svelteKitHandler } from "better-auth/svelte-kit";
import { building } from '$app/environment'
import type { Handle } from '@sveltejs/kit';
import { redirect } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
    const session = await auth.api.getSession({
        headers : event.request.headers
    })
    
    
    const protectedRoutes = ['/todos']
    const loginRoutes = ['/login','/signup']
    const path = event.url.pathname
    // console.log(path)
    
    if (session) {
        event.locals.session = session
        event.locals.userId = session.user.id
     }

    if ( session?.user ) {
        if (loginRoutes.includes(path)){
            throw redirect(307,'/')
        }
    }

    if (!session?.user) {
        if (protectedRoutes.includes(path)){
            throw redirect(307,'/login')
        }
    }

    // if (session?.user) {
    //     console.log('user is loginned')
    // } 

    // if (!session?.user) {
    //     console.log('user is not loginned')
    // }



    return svelteKitHandler({ event, resolve, auth, building });
};

