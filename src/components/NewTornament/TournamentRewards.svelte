<script>
	import Winner1st from '$lib/assets/tournament-winner1.svg';
	import Winner2nd from '$lib/assets/tournament-winner2.svg';
	import Winner3rd from '$lib/assets/tournament-winner3.svg';
	import TournamentItem from './TournamentItem.svelte';
	import TournamentWinner from './TournamentWinner.svelte';
	export let tournament;
</script>

<div class="flex flex-col items-center gap-[30px] w-full">
	<div class="flex items-center gap-[30px] w-full flex-wrap lg:flex-nowrap">
		<TournamentWinner
			image={Winner1st}
			title={tournament.mode == 'squad' ? 'Winner Team' : 'Winner'}
			price={tournament.winner_team_prize_dollars}
			xp={tournament.winner_team_prize_tokens}
			ticket={tournament.winner_team_prize_boxes}
		/>
		<TournamentWinner
			image={Winner2nd}
			title={tournament.mode == 'squad' ? 'Runners-Up Team' : 'Runners-Up'}
			price={tournament.runners_team_prize_tokens}
			xp={tournament.runners_team_prize_dollars}
			ticket={tournament.runners_team_prize_boxes}
		/>
		<TournamentWinner
			image={Winner3rd}
			title={tournament.mode == 'squad' ? '3rd Team' : '3rd'}
			price={tournament.third_team_prize_dollars}
			xp={tournament.third_team_prize_tokens}
			ticket={tournament.third_team_prize_boxes}
		/>
	</div>
	<div
		class="flex flex-col py-[40px] justify-center items-center rounded-[8px] bg-[#2B1731] border-[1px] border-solid border-[#3d2544] gap-[20px] w-full"
	>
		<p class="text-[#FFF] text-[24px] font-Gilroy-SemiBold">
			Other Participating {tournament.mode == 'squad' ? 'Teams' : 'Players'}
		</p>
		<TournamentItem type="xpEach" text={tournament.tokens_for_left_teams} />
	</div>
</div>
