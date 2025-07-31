import { json } from "@sveltejs/kit";
import { addTodos , deleteTodo, editTodo, setDeadline, setPriority, sortTodos, toggleDoneTodo } from "$lib/database/dbQueries";

export async function POST ({request,locals}) {
    const user = locals.session?.user
    if (!user) return new Response('Unauthorized',{ status : 401} )

    const userId =  locals.userId
    const data = await request.json()
    const { type } =  data

    const successReponse = json({status:200})
    const errorResponse = (e) => json({status:404 , error : e })

    if (type == 'add'){
        try {
            // console.log('add requst working')
            const { id , todo } = data
            addTodos(id,userId,todo)
            // console.log('is it reaching here')
            return successReponse
        } catch (e) {
            return errorResponse(e)
        }
    } 

    if (type == 'delete'){
        try {
            const { id } = data
            deleteTodo(id,userId)
            // console.log('todo is deleted')
            return successReponse
        } catch (e) {
            return errorResponse(e)
        }
    }

    if (type == 'toggleDone') {
        try {
            const { id } = data
            toggleDoneTodo(id,userId)
            // console.log('todo is toggled successfully')
            return successReponse
        } catch (e) {
            return errorResponse(e)
        }
    }

    if ( type == 'setDeadline' ){
        try {
            const { id , deadline } = data
            setDeadline(id,userId,deadline)
            // console.log('Successfully set the deadline')
            return successReponse
        } catch (e) {
            return errorResponse(e)
        }
    }

    if (type == 'editTodo') {
        try {
            const { id , todo } = data
            editTodo(id,userId,todo)
            // console.log('Successfully edited the todo')
            return successReponse
        } catch (e) {
            return errorResponse(e)
        }
    }


    if (type == 'setPriority') {
        try {
            const { id , priority } = data
            setPriority(id,userId,priority)
            // console.log('Sucessfully setted the priority')
            return successReponse
        } catch (e){
            return errorResponse(e)
        }
    }

    if ( type == 'sort' ) {
        try {
            const { sortBy , filter } = data
            // console.log('Sorted the todos successfully')
            const sortedTodos = sortTodos(userId , sortBy , filter)
            return json({todos : sortedTodos , status : 200})
        } catch (e) {
            errorResponse(e)
        }
    }

    console.log(data)
    return data
}