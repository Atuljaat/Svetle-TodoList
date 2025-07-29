import type { auth } from "./auth/auth";
import { authClient } from "./auth/auth-client";

export type Todo =  {
    id : string;
    text : string;
    isDone : boolean;
    time : string;
    deadline ?: string;
    priority : "High" | "Normal" | "Low"
}

export type dbTodo = {
  id: string;
  user_id: string;
  todo: string;
    isDone: boolean;
  created_at: string; 
  deadline: string | null; 
  priority: 'Normal' | string;
} ;


export type sort = "Time" | "Priority" | "Deadline"

export type SignInEmailParams = Parameters<typeof authClient.signIn.email>[0];
export type SignUpEmailParams = Parameters<typeof authClient.signUp.email>[0];
export type Session = Awaited<ReturnType<typeof auth.api.getSession>>
