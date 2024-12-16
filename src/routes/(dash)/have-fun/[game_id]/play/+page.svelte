<script>
	// @ts-nocheck

	import { page } from '$app/stores';
	import { onDestroy, onMount } from 'svelte';
	export let data;
	import { browser } from '$app/environment';

	let iframe = null;

	onMount(() => {
		if (browser) {
			localStorage.setItem('currentuser', data.profile.id);
			setTimeout(() => {
				iframe.focus();
				iframe.contentWindow.focus();
				iframe.contentWindow.body.focus();
			});
		}
	});

	onDestroy(() => {
		if (browser) {
			localStorage.removeItem('currentuser');
		}
	});
</script>

<div class="w-full flex-grow flex items-center justify-center mt-[50px] relative">
	<iframe
		bind:this={iframe}
		height="780"
		width="1280"
		title={$page.params.game_id}
		src={`/mini-games/${data.game.bucket_path}/index.html`}
	/>
</div>
