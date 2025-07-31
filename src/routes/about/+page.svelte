<script lang="ts">

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

<div class="min-h-screen bg-[#ffb86a] flex flex-col justify-center items-center browser" >
        <h1 class=" text-7xl stylish font-bold text-center py-10"> What i used to 
        <button onclick={() => randomSvgAppears(100)} class="cursor-pointer stylish text-[#ca3500] underline underline-offset-10">
            Create
        </button> it ?</h1>
        <div class="text-md text-gray-600" >
            maybe by clicking somewhere you can know about it
        </div>
</div>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');    
    .stylish {
        font-family: "Pacifico", cursive;
    }
</style>