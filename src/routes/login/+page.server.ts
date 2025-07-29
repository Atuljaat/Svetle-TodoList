import { protectLogin } from '$lib/auth/auth-helper.js'

export const load = async (event) => {
    protectLogin(event.locals.session)
}