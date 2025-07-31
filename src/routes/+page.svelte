<script lang="ts">
// import Image from '$lib/main.png'
import Image from '$lib/img.png'
import { goto } from '$app/navigation';

let showGreenLine = $state(false)

function greenLineProbability () {
    const randomNumber = Math.random()
    if (randomNumber < 0.5) {
        showGreenLine = true
    }
}

function goTodos () {
    goto('/todos')
}

greenLineProbability()

</script>

<div class=" min-h-screen bg-[#ffb86a]">
    {#if showGreenLine}
    <div class="fixed left-25 top-0 h-full w-0.5 bg-[#9ae600]"></div>
    {/if}
    <div class="py-10 flex items-center flex-col gap-3" >
        <div>
            <h1 class="text-7xl stylish font-bold text-center pt-10">
                Just a 
                <span class="text-[#ca3500] stylish underline underline-offset-10">
                    Todolist
                </span>
            </h1>
        </div>
        <div class="flex text-lg p-1 rounded-xl w-fit justify-center items-center">
            a simple Todolist for all your tasks
        </div>
    </div>
    <div class="flex justify-center items-center " >
        <button onclick={goTodos} class="bg-[#ffd6a7] hover:bg-[#fef3c6] p-3 rounded-lg hover:scale-105 transition-all duration-200  cursor-pointer text-lg font-medium">
            Create Your First Todo
        </button>
    </div>
    <div class="flex py-10 rounded-2xl justify-center items-center"> 
        <img src={Image} class="rounded-2xl border-2 shadow-2xl w-full max-w-md h-auto sm:max-w-4xl lg:max-w-5xl" alt="" srcset="">
    </div>
</div>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');    
    .stylish {
        font-family: "Pacifico", cursive;
    }
</style>    