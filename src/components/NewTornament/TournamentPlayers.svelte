<script>
	import PlayerContainer from './PlayerContainer.svelte';
	export let teams;
	export let tournament;
</script>

<div class="w-full teams-container">
	{#each teams as team, index}
		<PlayerContainer {team} index={index + 1} />
	{/each}
	{#if tournament.registered_teams < tournament.teams_can_register}
		<PlayerContainer type="notRegistered" index={tournament.registered_teams + 1} />
	{/if}
</div>

<style>
	.teams-container {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(303px, 1fr));
		gap: 30px;
	}
</style>
