<script>
	import { page } from '$app/stores';
	import TournamentMyTeamMember from './TournamentMyTeamMember.svelte';
	import TournamentMyTeamPlayerRequests from './TournamentMyTeamPlayerRequests.svelte';
	export let team;
	let left_members = team ? team.members.filter((f) => f.isEmpty) : [];
	let left_spots = left_members.length;
</script>

{#if team}
	<div class="grid grid-cols-4 gap-[30px] justify-items-center w-full">
		{#each team.members as member}
			<TournamentMyTeamMember leader_id={team.leader} {member} />
		{/each}
	</div>
	{#if team.leader == $page.data.profile.id && team.reqs.length > 0 && left_spots > 0}
		<div class="w-full">
			<p class="text-[#E9E6EA] text-3xl font-Gilroy-SemiBold">
				Pople who requested to join onn your team
			</p>
			<p class="text-[#948798] font-Gilroy-SemiBold my-3">
				Only {left_spots} spot{left_spots > 1 ? 's' : ''} left
			</p>
			<TournamentMyTeamPlayerRequests reqs={team.reqs} empty_player_id={left_members[0].id} />
		</div>
	{/if}
{/if}
