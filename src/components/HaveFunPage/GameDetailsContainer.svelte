<script>
	import { t, locale } from '$lib/stores/i18n';
	import Details from './Details.svelte';
	import GameRanking from './GameRanking.svelte';
	import CumulativePlayScore from '$lib/assets/cumulative-play-score.svg';

	let activeComponent = 'GameRanking';

	function showDetails() {
		activeComponent = 'Details';
	}

	function showGameRanking() {
		activeComponent = 'GameRanking';
	}

	export let game;
	export let leaderboard;
	export let me;
	export let comulative_score;
</script>

<div class="pframe-div">
	<div class="pframe-parent1">
		<div
			class="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-[10px] p-[16px] w-full border-b border-[#ffffff0d] bg-[#24102A]"
		>
			<!-- Toggle buttons -->
			<div class="flex gap-[12px] rounded-[10px]">
				<button
					class="px-[18px] py-[8px] text-[#FFFFFFB2] text-[16px] font-Gilroy-Medium rounded-[6px] leading-[19px]"
					class:active={activeComponent === 'GameRanking'}
					on:click={showGameRanking}
				>
					{$t('Weekly Leaderboard')}
				</button>
				<button
					class="px-[18px] py-[8px] text-[#FFFFFFB2] text-[16px] font-Gilroy-Medium rounded-[6px] leading-[19px]"
					class:active={activeComponent === 'Details'}
					on:click={showDetails}
				>
					{$t('Details')}
				</button>
			</div>
			<hr class="w-full border-[#ffffff0a] lg:hidden" />
			<div
				class="flex items-center p-[4px] pr-[12px] gap-[10px] rounded-[8px] bg-[#ffffff0d] w-full lg:w-fit"
			>
				<img src={CumulativePlayScore} alt="" class="w-[36px]" />
				<div class="flex flex-col items-start gap-[2px]">
					<p class="text-[#FFFFFF99] text-[14px] font-Gilroy leading-[17px]">
						{$t('Cumulative play score')}
					</p>
					<p class="text-[#FDEB56] text-[16px] font-Gilroy-SemiBold leading-[20px]">
						{comulative_score}
					</p>
				</div>
			</div>
		</div>
		<div class="w-full px-[10px] lg:px-[16px]">
			{#if activeComponent === 'Details'}
				<Details details={game} />
			{/if}
			{#if activeComponent === 'GameRanking'}
				<GameRanking {leaderboard} {me} />
			{/if}
		</div>
	</div>
</div>

<style>
	.active {
		/* Add your active button styling here */
		background: rgba(142, 201, 237, 0.15);
		color: #8ec9ed;
	}
	/* button.active {
		color: #e9e6ea;
		background: #ffffff33;
	} */
</style>
