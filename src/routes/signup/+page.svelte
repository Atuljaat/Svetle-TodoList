<script lang="ts">
    import { authClient } from "$lib/auth/auth-client";
    import { redirect } from "@sveltejs/kit";
    import { goto } from "$app/navigation";
    let name = $state('')
    let email = $state('')
    let password = $state('')
    let errorMessage = $state('')
    import type { SignUpEmailParams } from "$lib/Types";
    // const signup = async () => {
    //     try {

    //         const data = {
    //             name : name,
    //             email : email,
    //             password:password
    //         }

    //         email = ''
    //         password = ''

    //         const response = await fetch('/signup',{
    //             method:"POST",
    //             headers:{
    //                 "content-type": "application/json"
    //             },
    //             body : JSON.stringify(data)
    //         })

    //         if (response.ok){
    //             const jsonFormat = await response.json()
    //             console.log(jsonFormat)
    //             return jsonFormat
    //         }

    //     } catch (error){
    //         console.log(`Error in signup : ` , signup)
    //     }
    // }

    const signup = async () => {
        errorMessage = ''
        const userData:SignUpEmailParams = {
            name : name,
            email : email,
            password : password,
        }
        const {data,error} = await authClient.signUp.email(userData)
        if (error && error.message){
            errorMessage = error.message
            return
        }
        goto('/todo')
    }

</script>

<form onsubmit={signup}  class="bg-red-100 min-h-screen flex items-center justify-center flex-col gap-3 text-xl">
        {#if errorMessage != ''}
            <div class="text-red-500 text-lg">
                {errorMessage}
            </div>
        {/if}
        <div  >
            <label for=""> Name : </label>
            <input autocomplete="off" bind:value={name} type="text"  class="bg-red-200 text-gray-700">
        </div>
        <div  >
            <label for=""> Email : </label>
            <input autocomplete="off" bind:value={email} type="text"  class="bg-red-200 text-gray-700">
        </div>
        <div  >
            <label for=""> Password : </label>
            <input autocomplete="off" bind:value={password} type="text" class="bg-red-200 text-gray-700">
        </div>
        <button class="bg-red-300 p-2 my-2 rounded cursor-pointer hover:scale-110" >
            Sign Up 
        </button>
        <div class="my-10" >
            <a href="/login">
                Already have a account ? Login
            </a>
        </div>
</form>