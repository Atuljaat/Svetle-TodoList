<script lang="ts">
import { Menu } from 'lucide-svelte';
import { authClient } from '$lib/auth/auth-client';
import { goto } from '$app/navigation';

const NavItems = $state.raw([
	{
		name : 'Todo',
		slug : '/todos'
	},
	{
		name : 'About',
		slug : '/about'
	}
])

let isOpen = $state(false)

const handleSignOut = async () => {
	const response = await authClient.signOut()
	console.log(response)
	goto('/login')
	return response
}


</script>

<nav class="sticky mt-0 py-2.5 h-[20%] ">
	<div class="flex items-center justify-around font-semibold text-xl">
		<h1>
			<a href="/">
				TodoList
			</a>
		</h1>
		<ul class="md:flex hidden gap-2 items-center " >
			{#each NavItems as {name,slug} }
				<li>
					<a href={slug}>
						{name}
					</a>
				</li>
			{/each}
			<button onclick={handleSignOut}  class="p-2 bg-blue-500 rounded hover:scale-110 hover:bg-blue-400 cursor-pointer">
				Logout
			</button>
		</ul>
		<div class="flex md:hidden" >
			<Menu/>
		</div>
	</div>
</nav>