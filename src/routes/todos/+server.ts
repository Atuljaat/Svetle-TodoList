import { json } from "@sveltejs/kit";
import { addTodos , deleteTodo } from "$lib/database/dbQueries";

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
            console.log('add requst working')
            const { id , todo } = data
            addTodos(id,userId,todo)
            console.log('is it reaching here')
            return successReponse
        } catch (e) {
            return errorResponse(e)
        }
    } 

    if (type == 'delete'){
        try {
            const { id } = data
            deleteTodo(id,userId)
            console.log('todo is deleted')
            return successReponse
        } catch (e) {
            return errorResponse(e)
        }
    }

    
    console.log(data)
    return data
}