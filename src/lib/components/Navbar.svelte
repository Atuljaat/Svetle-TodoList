<script lang="ts">
import { Menu, X } from 'lucide-svelte';
import { authClient } from '$lib/auth/auth-client';
import { goto } from '$app/navigation';

const { isLoggedIn } = $props();

const NavItems = $state.raw([
	{
		name: 'Todo',
		slug: '/todos',
		hidden: !isLoggedIn
	}
]);

let isOpen = $state(false);

const handleSignOut = async () => {
	try {
		const response = await authClient.signOut();
		window.location.reload();
	} catch (error) {
		console.error('Sign out failed:', error);
	}
};

const notLogin = [
	{
		name: 'Login',
		slug: '/login'
	},
	{
		name: 'SignUp',
		slug: '/signup'
	}
];

// Close mobile menu when clicking on a link
const handleLinkClick = () => {
	isOpen = false;
};
</script>

<nav class="bg-[#ffb86a] z-10 sticky top-0 mt-0 pt-2.5 pb-2 h-auto">
	<div class="flex flex-row items-center justify-between font-medium text-lg md:text-xl mx-2 md:mx-8">
		<h1 class="font-bold mb-2 md:mb-0">
			<a href="/" onclick={handleLinkClick}>
				TodoList
			</a>
		</h1>
		
		<button 
			class="md:hidden bg-[#ffd6a7] p-2 rounded hover:bg-[#fef3c6] transition-all duration-200" 
			onclick={() => isOpen = !isOpen}
			aria-label="Toggle menu"
		>
			{#if isOpen}
				<X />
			{:else}
				<Menu />
			{/if}
		</button>
		
		<!-- Desktop Menu -->
		<ul class="hidden md:flex gap-2 md:gap-4 items-center w-full md:w-auto">
			{#each NavItems as {name, slug, hidden} (name)}
				{#if !hidden}
					<li>
						<a 
							href={slug} 
							class="px-2 py-1 hover:bg-[#ffd6a7] rounded transition-all duration-200"
						>
							{name}
						</a>
					</li>
				{/if}
			{/each}
			
			<div class="flex items-center gap-2 md:ml-4">
				{#if isLoggedIn}
					<button 
						onclick={handleSignOut} 
						class="bg-[#ffd6a7] hover:bg-[#fef3c6] cursor-pointer px-4 py-2 rounded hover:scale-110 transition-all duration-200 w-full md:w-auto text-center"
					>
						Logout
					</button>
				{:else}
					{#each notLogin as {name, slug} (name)}
						<a 
							href={slug}
							class="bg-[#ffd6a7] px-4 py-2 m-0.5 hover:bg-[#fef3c6] rounded hover:scale-110 transition-all duration-200 w-full md:w-auto text-center"
						>
							{name}
						</a>
					{/each}
				{/if}
			</div>
		</ul>
	</div>
	
	<!-- Mobile Menu -->
	{#if isOpen}
		<ul class="md:hidden flex flex-col gap-2 items-center mt-2 pb-2">
			{#each NavItems as {name, slug, hidden} (name)}
				{#if !hidden}
					<li>
						<a 
							href={slug} 
							class="px-2 py-1 hover:bg-[#ffd6a7] rounded transition-all duration-200"
							onclick={handleLinkClick}
						>
							{name}
						</a>
					</li>
				{/if}
			{/each}
			
			<div class="flex flex-col items-center gap-2 mt-2">
				{#if isLoggedIn}
					<button 
						onclick={handleSignOut} 
						class="bg-[#ffd6a7] hover:bg-[#fef3c6] cursor-pointer px-4 py-2 rounded hover:scale-110 transition-all duration-200 w-full text-center"
					>
						Logout
					</button>
				{:else}
					{#each notLogin as {name, slug} (name)}
						<a 
							href={slug}
							class="bg-[#ffd6a7] px-4 py-2 m-0.5 hover:bg-[#fef3c6] rounded hover:scale-110 transition-all duration-200 w-full text-center"
							onclick={handleLinkClick}
						>
							{name}
						</a>
					{/each}
				{/if}
			</div>
		</ul>
	{/if}
</nav>