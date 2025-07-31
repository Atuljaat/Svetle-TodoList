import type { filterTodo } from "$lib/Types";
import db from "./db";

// export const getTodos =  () => {
//     return db.prepare(`SELECT * FROM todos`)
// }

export const addTodos = async (id:string,userId:string,todo:string) => {
    try {
        const query = db.prepare(`INSERT INTO todos (id,user_id , todo) VALUES (@id,@userId,@todo)`)
        console.log('query is executed')
        return query.run({id,userId,todo})
    } catch (e) {
        console.log('Error in adding todos : ' , e)
    }
}

export const deleteTodo = async (id:string,userId:string) => {
    try {
        const query = db.prepare('DELETE FROM todos WHERE user_id = @userId AND id = @id')
        return query.run({userId,id})
    } catch (e) {
        console.log('Error in deleting Todo : ' , e)
    }
}

export const toggleDoneTodo = async (id:string,userId:string) => {
    try {
        const query = db.prepare('UPDATE todos SET isDone = NOT isDone WHERE user_id = @userId AND id = @id')
        return query.run({userId,id})
    } catch (e) {
        console.log('Error in toggling Todo : ', e)
    }
}

export const setDeadline = async (id:string,userId:string,deadline:string) => {
    try {
        const query = db.prepare('UPDATE todos SET deadline = @deadline WHERE user_id = @userId AND id = @id')
        return query.run({userId,id,deadline})
    } catch (e) {
        console.log('Error in setting deadline : ', e)
    }
}

export const setPriority = async (id:string,userId:string,priority:string) => {
    try {
        const query = db.prepare('UPDATE todos SET priority = @priority WHERE user_id = @userId AND id = @id')
        return query.run({userId,id,priority})
    } 
    catch (e) {
        console.log('Error in setting priority : ', e)
    }
}

export const sortTodos = (userId:string, sortBy: "Time" | "Priority" , filterTodo : filterTodo) => {
    try {
        const filters = {
            All: '',
            Completed: 'AND isDone = 1',
            Pending: 'AND isDone = 0'
        }

    const timeQuery = `SELECT * FROM todos WHERE user_id = @userId ${filters[filterTodo]} ORDER BY created_at DESC`
    const priorityQuery = `SELECT * FROM todos WHERE user_id = @userId ${filters[filterTodo]} ORDER BY CASE priority WHEN "High" THEN 1 WHEN "Normal" THEN 2 WHEN "Low" THEN 3 END `

    if (sortBy === "Time") {
        const query = db.prepare(timeQuery)
        return query.all({userId})
    } 
    if (sortBy === "Priority") {
        const query = db.prepare(priorityQuery)
        return query.all({userId})
    }
    console.log('Error in sort type:', sortBy);
    throw new Error('Invalid sort type');
    } catch (e) {
        console.log('Error in sorting todos : ', e)
    }
}

export const editTodo = async (id:string,userId:string,todo:string) => {
    try {
        const query = db.prepare('UPDATE todos SET todo = @todo WHERE user_id = @userId AND id = @id')
        return query.run({userId,id,todo})
    } catch (e) {
        console.log('Error in editing todo : ', e)
    }
}

export const getTodos = (userId:string) => {
    const query = db.prepare('SELECT * FROM todos WHERE user_id = @userId')
    return query.all({userId})
}
