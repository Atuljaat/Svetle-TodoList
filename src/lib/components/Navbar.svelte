<script lang="ts">
import { Menu } from 'lucide-svelte';
const NavItems = $state.raw([
	{
		name : 'About',
		slug : '/about'
	}
])

let isOpen = $state(false)

</script>

<nav class="sticky mt-0 py-2.5 h-[20%] ">
	<div class="flex items-center justify-around font-semibold text-xl">
		<h1>
			<a href="/">
				TodoList
			</a>
		</h1>
		<ul class="md:flex hidden gap-2 " >
			{#each NavItems as {name,slug} }
				<li>
					<a href={slug}>
						{name}
					</a>
				</li>
			{/each}
		</ul>
		<div class="flex md:hidden" >
			<Menu/>
		</div>
	</div>
</nav>