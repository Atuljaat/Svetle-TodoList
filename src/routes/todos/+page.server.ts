import { protectRoute } from '$lib/auth/auth-helper.js'
import type Todo from '$lib/components/Todo.svelte'
import { getTodos } from '$lib/database/dbQueries.js'
import type { PageServerLoad } from './$types.js'
import type { dbTodo } from '$lib/Types.js'

export const load:PageServerLoad = async (event) => {
    protectRoute(event.locals.session)
    const userId = event.locals.userId
    console.log('userID' ,userId)
    const todos: dbTodo[] = getTodos(userId) as dbTodo[]
    let filteredTodos : Todo[] = []
    if (todos.length > 0){
        filteredTodos = todos.map((todo) => {
        return {
            id: todo.id,
            text: todo.todo,
            isDone: ( todo.isDone ? true : false),
            time: todo.created_at,
            deadline: todo.deadline,
            priority: todo.priority
        }
    })}
    return {    
        dbTodos : filteredTodos
    }
}


// THis is the data i get from getTodo : 

// mydata :   [
//   {
//     id: 'ec7ea727-5c1b-4ad4-8df1-bb204b8e7848', 
//     user_id: 'ZUxKsY4fjOwsfyNXHo3HjRPE7VKQCBGX',
//     todo: 'hello',
//     isDone: 0,
//     created_at: '2025-07-29 18:26:11',
//     deadline: null,
//     priority: 'Normal'
//   }
// ]

// this is the type of data i want inside fil