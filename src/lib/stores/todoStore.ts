import { writable } from "svelte/store";
import type { Todo } from "$lib/Types";

export const todos = writable<Todo[]>([])
export const filteredTodos = writable<Todo[]>([])