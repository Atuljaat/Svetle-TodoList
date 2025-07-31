<script lang="ts">
	import TodoComponent from '$lib/components/Todo.svelte';
	import type { filterTodo, sort, Todo } from '$lib/Types';
	import { v4 as uuidv4 } from 'uuid';
	// import { browser } from '$app/environment';
	let {data} = $props();
	// console.log('mydata :  ' ,data.dbTodos)
	let todos: Todo[] = $state(data.dbTodos);
    let sortPriority : sort = $state('Time') 
	let filterOptions = ["All","Completed","Pending"]
	let filteredTodos: Todo[] = $state([])
	let filter:filterTodo = $state("All")

	// $effect(() => {
	// 	if (browser) {
	// 		let localTodos = JSON.parse(localStorage.getItem('todos') ?? '[]');
	// 		todos = localTodos;
	// 	}
	// });

	function addPadding (num:number) : string {
		return num.toString().padStart(2, '0');
	}

	function convertDateInto24Hours () : string {
		// 7/30/2025, 11:05:02 PM
		// 2025-07-30 17:29:49
		const givenDate = new Date();
		const year = givenDate.getFullYear();
		const month = addPadding(givenDate.getMonth() + 1); 
		const day = addPadding(givenDate.getDate());
		const hours = addPadding(givenDate.getHours());
		const minutes = addPadding(givenDate.getMinutes());
		const seconds = addPadding(givenDate.getSeconds());
		return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
	}



	let inputText: string = $state('');

	function addTodo() {
		let unqiueId = uuidv4()	
		if (inputText) {
			todos.push({
				id: unqiueId,
				text: inputText.trim(),
				isDone: false,
				time: convertDateInto24Hours(),
				deadline: '',
				priority: 'Normal'
			});
			// addTodoInDB(unqiueId,inputText.trim())
			const data = {
				id : unqiueId,
				todo : inputText.trim()
			}
			dbInteraction(data,'add')
			inputText = '';
			localStorage.setItem('todos', JSON.stringify(todos));
		}
	}

	// const addTodoInDB = async (id:string,text:string) => {
	// 	const data = {
	// 		id : id,
	// 		todo : text,
	// 		type : 'add'
	// 	}
	// 	try {
	// 		const response = await fetch('/todos',{
	// 			method:"POST",
	// 			headers:{
	// 				"content-type":"applications/json"
	// 			},
	// 			body : JSON.stringify(data)
	// 		})
	// 		if (response.ok){
	// 			const jsonData = await response.json()
	// 			console.log(jsonData)
	// 			return jsonData
	// 		}
	// 	} catch (e) {
	// 		console.log('error : ',e)
	// 	}
	// }

	


	function deleteTodo(id: string): void {
		const data = {
			id : id 
		}
		dbInteraction(data,'delete')
		let newArray = todos.filter((todo) => todo.id != id);
		todos = newArray;
		localStorage.setItem('todos', JSON.stringify(todos));
	}

	function toggleCheck(id: string): void {
		let newArray = todos.map((todo) => {
			if (todo.id === id) {
				todo.isDone = !todo.isDone;
				return todo;
			}
			return todo;
		});
		const data = {
			id : id,
		}
		dbInteraction(data,'toggleDone')
		todos = newArray;
		localStorage.setItem('todos', JSON.stringify(todos));
	}

	function editTodo(id: string): void {
		let newText: string | null = prompt('enter the new todo : ');
		if (newText) {
			let newArray = todos.map((todo) => {
				if (todo.id === id) {
					todo.text = newText.trim();
					return todo;
				}
				return todo;
			});
			const data = {
				id : id ,
				todo : newText.trim()
			}
			dbInteraction(data,'editTodo')
			todos = newArray;
			localStorage.setItem('todos', JSON.stringify(todos));
		}
	}

	function convertToSQLDate(date: string): string {
		const givenDate = new Date(date);
		const year = givenDate.getFullYear();
		const month = givenDate.getMonth() + 1;
		const day = givenDate.getDate()
		const hours = givenDate.getHours();
		const minutes = givenDate.getMinutes();
		const seconds = givenDate.getSeconds();
		return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
	}


	function editDeadline(id: string, e: Event): void {
		let target = e.target as HTMLInputElement;
		let newArray = todos.map((todo) => {
			if (todo.id == id) {
				todo.deadline = target.value;
				return todo;
			}
			return todo;
		});
		const data = {
			id : id,
			deadline : convertToSQLDate(target.value)
		}
		dbInteraction(data,'setDeadline')
		todos = newArray;
		localStorage.setItem('todos', JSON.stringify(todos));
	}

	function changePriority(id: string, e: Event) : void {
		let target = e.target as HTMLInputElement;
		let newArray = todos.map((todo) => {
			if (todo.id == id) {
				if (target.value === 'Normal' || 'High' || 'Low') {
					todo.priority = target.value as 'Normal' | 'High' | 'Low';
				}
			}
			return todo;
		});
		const data = {
			id : id,
			priority : target.value
		}
		dbInteraction(data,'setPriority')
		todos = newArray;
		localStorage.setItem('todos', JSON.stringify(todos));
	}

    let sortOptions = ["Time","Priority"]
	// let filterOptions = ["All","Completed","Pending"]

	// async function sortTodos (sortType: sort , filter: filterTodo ) {
	// 	const userData = {
	// 		sortBy: sortType,
	// 		filterTodo: filter
	// 	}
	// 	const data = {
	// 		...userData,
	// 		type : 'sort'
	// 	}
	// 	try {
	// 		const response = await fetch('/todos',{
	// 			method:"POST",
	// 			headers:{
	// 				"content-type":"applications/json"
	// 			},
	// 			body : JSON.stringify(data)
	// 		})
	// 		if (response.ok){
	// 			const jsonData = await response.json()
	// 			todos = jsonData.todos;
	// 			// console.log(jsonData)
	// 			// return jsonData
	// 		}
	// 	} catch (e) {
	// 		console.log('error : ',e)
	// 	}
	// }

	// $effect( () => {
	// 		// sortTodos(sortPriority, filter)
	// 		if (sortPriority && filter){
	// 			sortTodos(sortPriority, filter)
	// 			console.log('useeffect called for sorting todos')
	// 		}
	// })

    function sortTodos (priority:sort) : void {
        if (priority === "Time") {
			let newArray = todos
			newArray.sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime())
            todos = newArray
        } else if (priority === "Priority"){
			let priorityOrder = ["High","Normal","Low"]
			let newArray = todos
			newArray.sort((a,b) =>{
				let indexA = priorityOrder.indexOf(a.priority)
				let indexB = priorityOrder.indexOf(b.priority)
				if (indexA != indexB){
					return indexA - indexB
				}
				return 0
			}
			)
		} 
		else {
            todos.sort(() => Math.random() - 0.5)
        }
    }

    $effect( () => {
        sortTodos(sortPriority)
    })


	const dbInteraction = async (userData:any,type:string) => {
		const data = {
			...userData,
			type : type
		}
		try {
			const response = await fetch('/todos',{
				method:"POST",
				headers:{
					"content-type":"applications/json"
				},
				body : JSON.stringify(data)
			})
			if (response.ok){
				const jsonData = await response.json()
				// console.log(jsonData)
				return jsonData
			}
		} catch (e) {
			// console.log('error : ',e)
		}
	}


</script>

<div class="flex min-h-screen flex-col bg-linear-to-r bg-[#ffb86a] py-24 px-5" >
	<div class="flex w-full flex-col items-center justify-center gap-5">
		<div class="text-6xl stylish my-5"> Write Something you want do </div>
		<form onsubmit={addTodo} class="flex w-full justify-center gap-4">
			<input
				bind:value={inputText}
				placeholder="add a new Todo"
				class="h-8 w-1/3 rounded border-2 bg-gray-200 pl-2"
				type="text"
				autocomplete="off"
			/>
			<button class="cursor-pointer border p-2 rounded hover:scale-105 transition-all duration-150 bg-[#ffd6a7] hover:bg-[#fef3c6]"> Add </button>
		</form>
	</div>
    <div class="flex justify-center my-3 gap-24 mx-12" >
		<div>
			<label for="">Sort : </label>
			<select bind:value={sortPriority}>
				{#each sortOptions as sortOpt (sortOpt) }
					<option value={sortOpt} >
						{sortOpt}
					</option>
				{/each}
			</select>
		</div>
		<!-- <div>
			<label for="">
				Filter : 
			</label>
			<select bind:value={filter}>
				{#each filterOptions as filter }
					<option value={filter}>
						{filter}
					</option>
				{/each}
			</select>
		</div> -->
    </div>
	<div class="flex items-center justify-center">
		<!-- <ul>
			{#each filteredTodos as todo (todo.id)}
				<TodoComponent {...todo} ondelete={deleteTodo} {changePriority} {toggleCheck} {editTodo} {editDeadline} />
			{/each}
		</ul> -->
		<ul>
			{#each todos as todo (todo.id)}
				<TodoComponent {...todo} ondelete={deleteTodo} {changePriority} {toggleCheck} {editTodo} {editDeadline} />
			{/each}
		</ul>
	</div>
</div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Pacifico&family=Reenie+Beanie&display=swap');
	.stylish {
		font-family: "Pacifico", cursive;
	}
</style>