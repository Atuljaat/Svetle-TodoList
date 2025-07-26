import { authClient } from "./auth/auth-client";

export type Todo =  {
    readonly id : string;
    text : string;
    isDone : boolean;
    time : string;
    deadline : string;
    priority : "High" | "Normal" | "Low"
}

export type sort = "Time" | "Priority" | "Deadline"

export type SignInEmailParams = Parameters<typeof authClient.signIn.email>[0];
export type SignUpEmailParams = Parameters<typeof authClient.signUp.email>[0];