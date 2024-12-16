<script>
	import { t } from '$lib/stores/i18n';
	import search from '$lib/assets/ranking-search.svg';
	import GameRankItem from './GameRankItem.svelte';
	import { browser } from '$app/environment';
	import { onMount, onDestroy } from 'svelte';
	export let leaderboard;
	export let me;

	let myRecord = leaderboard.find((r) => r.user === me.id);
	// onMount(() => {
	// 	myRecord = ;
	// });
	// console.log(myRecord);

	let searchText = '';
	let isExpanded = false;

	// Filtered leaderboard based on searchText but keeping original ranks
	$: filteredLeaderboard = leaderboard.map((item, index) => {
		const username = item.expand?.user?.username || '';
		const matches = username.toLowerCase().includes(searchText.toLowerCase());
		return { ...item, rank: index + 1, matches };
	});

	function toggleSearch() {
		isExpanded = !isExpanded;
	}

	// Close search when clicking outside
	function handleClickOutside(event) {
		if (!browser) return;
		const searchContainer = document.querySelector('.rank-search');
		if (searchContainer && !searchContainer.contains(event.target)) {
			isExpanded = false;
		}
	}

	onMount(() => {
		if (!browser) return;
		document.addEventListener('click', handleClickOutside);
	});

	onDestroy(() => {
		if (!browser) return;
		document.removeEventListener('click', handleClickOutside);
	});
</script>

<div class="ranking">
	<div class="flex items-center justify-between w-full">
		<h1>{$t('Ranking')}</h1>
		<div class="rank-search" class:expanded={isExpanded}>
			<button on:click={toggleSearch}><img src={search} alt="" /></button>
			<input
				type="text"
				name=""
				id=""
				placeholder={$t('Search by username')}
				bind:value={searchText}
				on:click={() => (isExpanded = true)}
			/>
		</div>
	</div>

	<div class="flex flex-col items-start gap-[20px] w-full overflow-x-scroll">
		<div class="w-full min-[550px]:w-full">
			{#if myRecord}
				<GameRankItem rank={myRecord.my_rank} name="Me" xp={myRecord.score} />
			{/if}
		</div>

		<div class="w-full">
			<div class="flex flex-col items-start gap-[20px] w-full min-[550px]:w-full">
				<div class="rank-list-head">
					<div class="con gap-[13px] lg:gap-[35px]">
						<p>{$t('Rank')}</p>
						<p>{$t('Player Name')}</p>
					</div>
					<div class="con flex items-center gap-[8px] lg:gap-[12px]">
						<p class="w-[60px] lg:w-[90px] text-end">{$t('Score')}</p>
						<p class="w-[60px] lg:w-[90px] text-end">{$t('tickets')}</p>
						<p class="w-[60px] lg:w-[90px] text-end">{$t('Rewards')}</p>
					</div>
				</div>
				<div class="rank-list">
					{#each filteredLeaderboard as item}
						{#if item.matches}
							<GameRankItem
								rank={item.rank}
								name={item.expand?.user?.username || 'Unknown'}
								xp={item.score}
							/>
						{/if}
					{/each}
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.ranking {
		flex: 1 1 36.31%;
		display: flex;
		flex-direction: column;
		gap: 20px;
		align-items: flex-start;
		padding-bottom: 6px;
		width: 100%;
	}

	.ranking h1 {
		color: var(--white-90, #e9e6ea);
		font-family: Gilroy-Bold;
		font-size: 24px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
	}

	.rank-search {
		display: inline-flex;
		padding: 11px;
		width: auto;
		align-items: center;
		gap: 14px;
		border-radius: 4px;
		background: var(--Accent-2, #200b26);
		transition: width 0.3s ease, opacity 0.3s ease;
	}

	.rank-search input {
		background: var(--Accent-2, #200b26);
		width: 0;
		opacity: 0;
		transition: width 0.3s ease, opacity 0.3s ease;
	}

	.rank-search.expanded input {
		width: 100%;
		opacity: 1;
	}

	.rank-search input:focus-visible {
		outline: 0;
	}

	.rank-list {
		display: inline-flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 12px;
		flex-shrink: 0;
		width: 100%;
		height: 404.4px;
		/* overflow-y: scroll; */
	}

	.rank-list-head {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 12px 10px;
		width: 100%;
		border-top: 1px solid var(--white-10, #3d2644);
		border-bottom: 1px solid var(--white-10, #3d2644);
	}

	.rank-list-head .con {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.rank-list-head .con p {
		color: var(--white-60, #a99fac);
		font-family: Gilroy-Medium;
		font-size: 14px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
	}

	.overflow-x-scroll::-webkit-scrollbar {
		height: 0px;
	}

	@media (max-width: 1024px) {
		.rank-list-head {
			padding: 10px;
		}

		.rank-list-head .con p {
			font-size: 12px;
		}
	}
</style>
