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

const svgHtml = (left:number,top:number) => {
    return `
    <div class="logo z-20" style="position:fixed; left:${left}px; top:${top}px; " >
        <img src="/favicon.svg" class="h-64 p-5" alt="">
    </div>`
}

function randomSvgAppears (n:number) {
    const screenSize  = {
        width: window.innerWidth,
        height: window.innerHeight
    }

    const screen = document.querySelector('.browser')
    screen?.querySelectorAll('.logo').forEach( (logo) => logo.remove() )
    for (let i = 0 ; i < n ; i++){
        setTimeout(() => {
            const left = Math.floor(Math.random() * (screenSize.width - 100))
            const top = Math.floor(Math.random() * (screenSize.height - 100))
            const element = svgHtml(left,top)
            const myDiv = document.createElement('div')
            myDiv.innerHTML = element
            screen?.appendChild(myDiv)
        },100 * i)
        
    }

    setTimeout(() => {
        document.querySelectorAll('.logo').forEach( (logo) => logo.remove() )
        // console.log('logo removedd ')
    }, 100 * n + 10)
}

</script>

<div class=" bg-[#ffb86a]">
  {#if showGreenLine}
    <div class="fixed left-6 top-0 h-full w-0.5 bg-[#9ae600]"></div>
  {/if}
  <div class="py-10 px-4 flex flex-col items-center leading-16 gap-3">
    <div>
      <h1 class="text-6xl lg:text-7xl stylish font-bold text-center pt-10">
        Just a
        <span class="text-[#ca3500] stylish underline underline-offset-8 md:underline-offset-10">
          Todolist
        </span>
      </h1>
    </div>
    <div class="flex text-base md:text-lg p-1 rounded-xl w-fit justify-center items-center text-center">
      a simple Todolist for all your tasks
    </div>
  </div>
  <div class="flex justify-center items-center">
    <button 
      onclick={goTodos} 
      class="bg-[#ffd6a7] hover:bg-[#fef3c6] p-2 md:p-3 rounded-lg hover:scale-105 transition-all duration-200 cursor-pointer text-base md:text-lg font-medium"
    >
      Create Your First Todo
    </button>
  </div>
  <div class="flex py-6 md:py-10 rounded-2xl justify-center items-center px-4 sm:px-8 md:px-16 w-full">
    <img 
      src={Image} 
      class="rounded-2xl border-2 shadow-2xl w-full max-w-xs sm:max-w-md md:max-w-3xl lg:max-w-5xl object-contain"
      alt=""
      srcset=""
    >
  </div>
</div>
<div class="py-24 bg-[#ffb86a] flex flex-col px-12 justify-center items-center browser" >
        <h1 class="text-6xl lg:text-7xl leading-17 text-pretty stylish font-bold text-center py-10"> What i used to 
        <button onclick={() => randomSvgAppears(100)} class="cursor-pointer stylish text-[#ca3500] underline underline-offset-10">
            Create
        </button> it ?</h1>
        <div class="text-md text-gray-600 text-pretty " >
            maybe by clicking somewhere you can know about it
        </div>
</div>


<style>
    @import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');    
    .stylish {
        font-family: "Pacifico", cursive;
    }
</style>    