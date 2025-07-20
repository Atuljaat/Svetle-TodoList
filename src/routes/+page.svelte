<script lang="ts">
	import TodoComponent from '$lib/components/Todo.svelte';
	import type { sort, Todo } from '$lib/Types';
	import { v4 as uuidv4 } from 'uuid';
	import { browser } from '$app/environment';
	
	let todos: Todo[] = $state([]);
    let sortPriority : sort = $state('Time') 
	let filterOptions = ["All","Completed","Pending"]
	let filteredTodos: Todo[] = $state([])
	let filter = $state("All")

	$effect(() => {
		if (browser) {
			let localTodos = JSON.parse(localStorage.getItem('todos') ?? '[]');
			todos = localTodos;
		}
	});


	let inputText: string = $state('');

	function addTodo() {	
		if (inputText) {
			todos.push({
				id: uuidv4(),
				text: inputText.trim(),
				isDone: false,
				time: new Date().toLocaleString(),
				deadline: '',
				priority: 'Normal'
			});
			inputText = '';
			localStorage.setItem('todos', JSON.stringify(todos));
		}
	}

	function deleteTodo(id: string): void {
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

			todos = newArray;
			localStorage.setItem('todos', JSON.stringify(todos));
		}
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
		todos = newArray;
		localStorage.setItem('todos', JSON.stringify(todos));
	}

    let sortOptions = ["Time","Priority"]

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

	$effect(() => {
		if (todos) {
			if (filter == "Completed") {
				filteredTodos = todos.filter((todo) => todo.isDone == true)
			} else if ( filter == "Pending" ) {
				filteredTodos = todos.filter( (todo) => todo.isDone == false  )
			} else {
				filteredTodos = [...todos]
			}
		}
	})

</script>

<div class="flex min-h-screen flex-col bg-green-300 py-24 px-5">
	<div class="flex w-full flex-col items-center justify-center gap-5">
		<div class="text-2xl">Enter Todo</div>
		<form onsubmit={addTodo} class="flex w-full justify-center gap-4">
			<input
				bind:value={inputText}
				placeholder="add a new Todo"
				class="h-8 w-1/3 rounded border-2 bg-gray-200 pl-2"
				type="text"
				autocomplete="off"
			/>
			<button class="cursor-pointer border p-1"> Add </button>
		</form>
	</div>
    <div class="flex justify-center my-3 gap-24" >
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
		<div>
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
		</div>
    </div>
	<div class="flex items-center justify-center">
		<ul>
			{#each filteredTodos as todo (todo.id)}
				<TodoComponent {...todo} ondelete={deleteTodo} {changePriority} {toggleCheck} {editTodo} {editDeadline} />
			{/each}
		</ul>
	</div>
</div>
