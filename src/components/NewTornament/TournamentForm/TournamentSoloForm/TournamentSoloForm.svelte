<script>
	import TournamentFormTerms from '../TournamentFormTerms.svelte';
	import TournamentFromSuccess from '../TournamentFromSuccess.svelte';
	import { page } from '$app/stores';
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	export let tournament;
	export let closeRegistrationHandler;

	let acceptedTerms = false;

	let showTerms = true;
	let showSuccess = false;
	let success = true;
	let msg = '';

	const formSubmitHandler = async () => {
		const res = await fetch(`/api/tournaments/${$page.params.tournamentid}/register_team`);
		invalidateAll();

		if (!res.ok) {
			msg = (await res.json()).message;
			success = false;
		}
		showSuccess = true;
		showTerms = false;
		setTimeout(() => {
			closeRegistrationHandler();
		}, 5000);
	};
</script>

<form class="w-[552px]" on:submit={formSubmitHandler}>
	{#if showTerms}
		<TournamentFormTerms bind:acceptedTerms />
	{:else if showSuccess}
		<TournamentFromSuccess bind:success bind:msg />
	{/if}
</form>
