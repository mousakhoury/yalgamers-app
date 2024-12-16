<script>
	// @ts-nocheck

	import TeamContainer from './TeamContainer.svelte';

	export let teams;
	export let tournament;
</script>

<div class="w-full teams-container">
	{#each teams as team, index}
		<TeamContainer {team} index={index + 1} />
	{/each}
	{#if tournament.registered_teams < tournament.teams_can_register}
		<TeamContainer type="notRegistered" index={tournament.registered_teams + 1} />
	{/if}
</div>

<style>
	.teams-container {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(303px, 1fr));
		gap: 30px;
	}
</style>
