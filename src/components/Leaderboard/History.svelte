<script>
	import { t, locale } from '$lib/stores/i18n';
	import { getImageUrl } from '$lib/utils';
	import Ranking from './Ranking.svelte';
	import Button from '$components/Button.svelte';
	import supremeRank from '$lib/assets/supreme-rank.svg';
	import Lead from './Lead.svelte';

	export let seasons = [];

	let showLeaderboard = false;
	let leaderboard = [];
</script>

<div class="history">
	<h1>{$t('History')}</h1>

	<table class="mnw-[75%]">
		<thead>
			<th>{$t('Season')}</th>
			<th>{$t('Total Prize')}</th>
			<th>{$t('Top Player')}</th>
			<th>{$t('Sponsors')}</th>
			<th />
		</thead>
		{#each seasons as season}
			<tr>
				<td>{season.title_en}</td>
				<td>{season.prize} {$t('usd')}</td>
				<td>
					{#if season.leaderboard?.[0]?.username}
						<div class="flex items-center flow-row gap-2">
							<div class="rank-image">
								<img src={supremeRank} alt="" />
								<div class="rank-number">{1}</div>
							</div>
							{season.leaderboard?.[0]?.username}
						</div>
					{/if}
				</td>
				<td>
					<div class="history-images">
						{#each season.expand.diamond_sponsors as sponsor}
							<img src={getImageUrl(sponsor.collectionId, sponsor.id, sponsor.logo)} alt="" />
						{/each}
						{#each season.expand.participating_sponsors as sponsor}
							<img src={getImageUrl(sponsor.collectionId, sponsor.id, sponsor.logo)} alt="" />
						{/each}
					</div>
				</td>
				<td
					class="p-4"
					on:click={() => {
						showLeaderboard = true;
						leaderboard = season.leaderboard;
					}}
				>
					<Button type="gradient" disabled={season.leaderboard.length === 0} class="w-fit"
						>{$t('leaderboard')}</Button
					>
				</td>
			</tr>
		{/each}
	</table>
</div>

{#if showLeaderboard}
	<div
		class="fixed top-0 left-0 z-[60] w-full h-full"
		style=" background: var(--Accent, #140718d9);"
	>
		<div
			class="bg-accent-2 w-[600px] aspect-[600/468] rounded-[16px] border-[1px] border-solid border-[#533E59] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] p-[20px] scale-50 sm:scale-100"
		>
			<div class="flex justify-end w-full my-2 bg-gray-700">
				<button
					class="text-red"
					on:click={() => {
						showLeaderboard = false;
					}}
				>
					<svg
						class="w-4 h-4 text-indigo-500"
						width="21"
						height="21"
						viewBox="0 0 21 21"
						stroke-width="1"
						stroke="yellow"
						fill="none"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<path stroke="none" d="M0 0h24v24H0z" /> <line x1="18" y1="6" x2="6" y2="18" />
						<line x1="6" y1="6" x2="18" y2="18" /></svg
					>
				</button>
			</div>
			<Ranking ranking={leaderboard} user={null} />
		</div>
	</div>
{/if}

<style>
	.rank-image {
		position: relative;
		width: 57px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.rank-number {
		color: var(--White, #fff);
		font-family: Gilroy-Bold;
		font-size: 16px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.history {
		border-radius: 12px;
		background: var(--Accent-2, #200b26);
		width: 100%;
		margin-top: 60px;
	}

	.history h1 {
		color: var(--white-90, #e9e6ea);
		font-family: Gilroy-Bold;
		font-size: 24px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
		padding: 20px;
	}

	table {
		width: 100%;
		text-align: left;
	}

	table:lang(ar) {
		text-align: right;
	}

	thead {
		border-top: 2px solid var(--white-10, #3d2644);
		border-bottom: 2px solid var(--white-10, #3d2644);
		background: #29152f;
		height: 60px;
	}

	thead th {
		color: var(--white-40, #7e6e83);
		font-family: Gilroy-Medium;
		font-size: 18px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
		padding-left: 20px;
	}

	thead th:lang(ar) {
		/* padding-left: 0; */
		padding-right: 20px;
	}

	tr {
		border-bottom: 1px solid var(--white-10, #3d2644);
		height: 50px;
	}

	tr td {
		color: var(--white-90, #e9e6ea);
		font-family: Gilroy-SemiBold;
		font-size: 18px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
		padding-left: 20px;
		width: 25%;
	}

	tr td:lang(ar) {
		/* padding-left: 0; */
		padding-right: 20px;
	}

	.history-images {
		display: inline-flex;
		align-items: flex-start;
		gap: 12px;
	}

	.history-images img {
		width: 40.674px;
	}

	@media (max-width: 1200px) {
		.history {
			overflow-x: scroll;
		}
		table {
			min-width: 1150px;
		}
	}
</style>
