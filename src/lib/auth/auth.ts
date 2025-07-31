import { betterAuth } from "better-auth";
import Database from "better-sqlite3";
import {BETTER_AUTH_SECRET} from '$env/static/private'
import { sveltekitCookies } from "better-auth/svelte-kit";
import { getRequestEvent } from "$app/server";

export const auth = betterAuth({
  database : new Database('./myAuth.db'),
  emailAndPassword : {
    enabled : true
  },
  trustedOrigins:['http://localhost:3000'],
  secret : BETTER_AUTH_SECRET,
  plugins: [sveltekitCookies(async () => getRequestEvent())],

});
