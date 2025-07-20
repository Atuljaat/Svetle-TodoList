<script lang="ts">
	import { Trash } from 'lucide-svelte';
	import { CircleCheck } from 'lucide-svelte';
	import { Circle } from 'lucide-svelte';
	import { Pencil } from 'lucide-svelte';
    let { id , text , isDone , ondelete , toggleCheck , editTodo , time , editDeadline , deadline , priority , changePriority} =  $props()

	let priorityOptions = ["Low","Normal","High"]

	const minimumDate = () => {
		const now = new Date(time)
		const year = now.getFullYear()
		const month = (now.getMonth() + 1).toString().padStart(2, '0');
		const day = now.getDate().toString().padStart(2, '0');
		const hours = now.getHours().toString().padStart(2, '0');
		const minutes = now.getMinutes().toString().padStart(2, '0');
		let minDate =  `${year}-${month}-${day}T${hours}:${minutes}`;
		return minDate
	} 

	let minDate = minimumDate()

</script>	

<li class="m-5 rounded border p-3 text-xl max-w-lg">
	<div class="grid grid-cols-12 place-items-center">
		<div class="col-span-1">
			<button onclick={() => toggleCheck(id)} >
				{#if isDone}
					<CircleCheck />
				{:else}
					<Circle/>
				{/if}
			</button>
		</div>
		<div class="col-span-8 col-start-3 text-wrap">
			<!-- {text} -->
			<input type="text" value={text} disabled />
		</div>
		<div class="col-span-2 ">
			<button onclick={ () => ondelete(id)} >
				<Trash />
			</button>
			<button>
				<Pencil onclick={() => editTodo(id)} />
			</button>
		</div>
	</div>
	<div class="flex text-sm flex-col items-end justify-center w-full py-1.5" >
		<div>
			time : {time}
		</div>
		<div>
			<label for="">
				deadline : 
			</label>
			<input
			min={minDate} 
			type="datetime-local"
			oninput={((e) => editDeadline(id,e))} 
			value={deadline}
			>
		</div> 
		<div>
			<label for="">
				priority : 
			</label>
			<select name="" id="" value={priority} onchange={(e) => changePriority(id,e)}>
				{#each priorityOptions as priority (priority)}
					<option value={priority} >
						{priority}
					</option>
				{/each}
			</select>
		</div>
	</div>
</li>
