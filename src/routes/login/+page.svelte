<script lang="ts">
    import type { SignInEmailParams } from "$lib/Types";
    import { authClient } from "$lib/auth/auth-client";
    let email = $state('')
    let password = $state('')
    let errorMessage:string = $state('')

    // const login = async () => {
    //     if (!email) return
    //     if (!password || password.length < 3) return
    //     try {
    //         const response = await fetch('/login',{
    //             method:'POST',
    //             headers : {
    //                 'content-type' : 'application/json'
    //             } ,
    //             body : JSON.stringify({
    //                 "email" : email,
    //                 "password" : password
    //             })
    //         })
            
    //         if (response.ok) {
    //             const jsonFormat = await response.json()
    //             console.log(jsonFormat)
    //             return jsonFormat
    //         }
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    const login = async () => {
        errorMessage = ''
        const userData:SignInEmailParams = {
            email : email,
            password : password,
            callbackURL : "/todos"
        }
        const { data , error } = await authClient.signIn.email(userData)
        if (error && error.message){
            errorMessage = error.message
        }
    }

</script>

    <form onsubmit={login}  class="bg-red-100 min-h-screen flex items-center justify-center flex-col gap-3 text-xl">
        {#if errorMessage != ''}
            <div class="text-red-500 text-lg">
                {errorMessage}
            </div>
        {/if}
        <div  >
            <label for=""> Email : </label>
            <input autocomplete="off" bind:value={email} type="text"  class="bg-red-200 text-gray-700">
        </div>
        <div  >
            <label for=""> Password : </label>
            <input autocomplete="off" bind:value={password} type="text" class="bg-red-200 text-gray-700">
        </div>
        <button class="bg-red-300 p-2 my-2 rounded cursor-pointer" >
            Submit 
        </button>
        <div class="my-10" >
            <a href="/signup">
                Didnt have a account ? Signup
            </a>
        </div>
    </form>
