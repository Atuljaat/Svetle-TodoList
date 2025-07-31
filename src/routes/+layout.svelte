<script lang="ts">
	import '../app.css';
	import Navbar from '$lib/components/Navbar.svelte';
	// import Footer from '$lib/components/Footer.svelte';
	import { redirect } from '@sveltejs/kit';
	import { authClient } from '$lib/auth/auth-client';
	let { data = { isLoggedIn : false } , children  } = $props();

</script>

<Navbar isLoggedIn={data.isLoggedIn} />
{@render children()}
<!-- <Footer/> -->