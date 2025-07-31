import { writable } from "svelte/store";
import type { Todo } from "$lib/Types";

export const todos = writable<Todo[]>([])
export const filteredTodos = writable<Todo[]>([])
export const session = writable<null | string>(null);