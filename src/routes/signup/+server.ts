// import { json } from "@sveltejs/kit";
// // import { authClient } from "$lib/auth/auth-client.js";
// import { auth } from '$lib/auth/auth.js'

// export async function POST ({request}) {
//     const data = await request.json()
//     const mydata = await auth.api.signUpEmail({
//         body : {
//             name : data.name,
//             email : data.email,
//             password : data.password
//         }
//     })
//     return json({message:'Hello from POST ',yourReq : mydata})
// }