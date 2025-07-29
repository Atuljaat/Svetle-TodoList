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

// export const toggleDoneTodo = async (id:string,userId:string) => {

// }

export const getTodos = (userId:string) => {
    const query = db.prepare('SELECT * FROM todos WHERE user_id = @userId')
    return query.all({userId})
}
