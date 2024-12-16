<script>
	import { t, locale } from '$lib/stores/i18n';

	import Tier from '$components/Leaderboard/Tier.svelte';
	import Ranking from '$components/Leaderboard/Ranking.svelte';
	import Season from '$components/Leaderboard/Season.svelte';
	import History from '$components/Leaderboard/History.svelte';
	import sponsor from '$lib/assets/sponsor-logo.svg';

	export let data;
</script>

<div class="leaderboard-container">
	<div class="leaderboard">
		{#if data.season}
			{#if data.ranking && data.user}
				<Ranking ranking={data.ranking} user={data.user} />
			{/if}
			{#if data.season && data.season.prize}
				<Tier prize={data.season.prize || 'XXXX'} />
			{/if}
			{#if data.seasons && data.season}
				<Season seasons={data?.seasons} season={data.season} />
			{/if}
		{:else}
			<div class="season-name-time my-32 w-full">
				<h6 class="mx-auto">
					{$t('Season')}
					{data.next_season}
					{$t('is coming soon')}
				</h6>
			</div>
		{/if}
	</div>
	{#if data.seasons}
		<History seasons={data?.seasons} />
	{/if}
</div>

<style>
	.leaderboard-container {
		padding: 30px;
	}

	.leaderboard {
		display: flex;
		padding: 20px;
		flex-wrap: wrap;
		justify-content: center;
		align-items: flex-start;
		gap: 20px;
		flex-shrink: 0;
		border-radius: 12px;
		background: var(--Accent-2, #200b26);
	}

	.season-name-time {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 6px;
	}

	.season-name-time h6 {
		font-family: Gilroy-SemiBold;
		font-size: 32px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
		background: var(--Button, linear-gradient(95deg, #f71756 0%, #fdeb56 100%));
		background-clip: text;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	@media (max-width: 1200px) {
		.leaderboard {
			flex-direction: column;
		}
	}
</style>
