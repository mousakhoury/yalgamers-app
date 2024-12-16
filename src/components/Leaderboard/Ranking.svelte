<script>
	import { t, locale } from '$lib/stores/i18n';
	import search from '$lib/assets/ranking-search.svg';
	import RankItem from './RankItem.svelte';

	export let ranking;
	export let user;

	let searchText = '';

	$: _ranking = ranking.filter((r) => !searchText || r.username.includes(searchText));
</script>

<div class="ranking">
	<h1>{$t('Ranking')}</h1>
	{#if user}
		<RankItem newClass="my-rank" rank={user.rank} name="Me" xp={user.xp} />
	{/if}

	<div class="rank-search">
		<button><img src={search} alt="" /></button>
		<input
			bind:value={searchText}
			type="text"
			name=""
			id=""
			placeholder={$t('Search by username')}
		/>
	</div>

	<div class="rank-list">
		{#each _ranking as item, index}
			<RankItem rank={item.rank} name={item.username} xp={item.xp} />
		{/each}
	</div>
</div>

<style>
	.ranking {
		flex: 1 1 36.31%;
		padding: 20px;
		display: flex;
		flex-direction: column;
		gap: 20px;
		align-items: flex-start;
		border-radius: 6px;
		background: #29152f;
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
		width: 100%;
		align-items: center;
		gap: 14px;
		border-radius: 4px;
		background: var(--Accent-2, #200b26);
	}

	.rank-search input {
		background: var(--Accent-2, #200b26);
		width: 100%;
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
		overflow-y: scroll;
	}

	.rank-list:lang(ar) {
		height: 431.4px;
	}
</style>
