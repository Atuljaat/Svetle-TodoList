<script lang="ts">
import { Menu } from 'lucide-svelte';
import { authClient } from '$lib/auth/auth-client';
import { goto } from '$app/navigation';
const { isLoggedIn } = $props();
// console.log('isLoggedIn in Navbar : ', isLoggedIn)

const NavItems = $state.raw([
	{
		name : 'Todo',
		slug : '/todos',
		hidden : !isLoggedIn
	},
	{
		name : 'About',
		slug : '/about',
		hidden : false
	}
])

let isOpen = $state(false)

const handleSignOut = async () => {
	const response = await authClient.signOut()
	// console.log(response)
	window.location.reload()
	// goto('/login')
	// return response
}

const notLogin = 
	[
		{
			name : 'Login',
			slug : '/login'
		},
		{
			name : 'SignUp',
			slug : '/signup'
		}
	] 

const login = [
		{
			name : 'LogOut',
			slug : '/login'
		}
	]

</script>

<nav class="bg-[#ffb86a] z-10 sticky mt-0 pt-2.5 h-[20%] ">
	<div class="flex items-center justify-around font-medium text-xl">
		<h1 class="text-bold">
			<a href="/" >
				TodoList
				<!-- {#if isLoggedIn}
					User is Logged In
				{:else}
					User is Not Logged In
				{/if} -->
			</a>
		</h1>
		<ul class="flex gap-4 items-center " >
			{#each NavItems as {name,slug,hidden} (name) }
				<li>
					<a href={slug} class={`${ hidden ? 'invisible' : '' } `}>
						{name}
					</a>
				</li>
			{/each}
			<div class="flex items-center gap-2">
				{#if isLoggedIn}
					<button onclick={handleSignOut} class="bg-[#ffd6a7] hover:bg-[#fef3c6] cursor-pointer p-2 rounded hover:scale-110 transition-all duration-200">
						Logout
					</button>
				{:else}
					{#each notLogin as {name,slug} (name)}
						<a href={slug} class="bg-[#ffd6a7] p-2 hover:bg-[#fef3c6] rounded hover:scale-110 transition-all duration-200">
							{name}
						</a>
					{/each}
				{/if}
			</div>
		</ul>
	</div>
</nav>