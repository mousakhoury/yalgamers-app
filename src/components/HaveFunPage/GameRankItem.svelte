<script>
	import XpContainer from '$components/XpContainer.svelte';
	import lowerRank from '$lib/assets/lower-rank-icon.svg';
	import topRank from '$lib/assets/top-rank-icon.svg';

	import leaders from '$lib/assets/leaders-icon.svg';
	import navigators from '$lib/assets/nagivators-icon.svg';
	import crossers from '$lib/assets/crossers-icon.svg';
	import score from '$lib/assets/score-icon2.svg';
	import XP from '$lib/assets/xp-have-fun-icon.svg';
	import Tickets from '$lib/assets/tickets-icon2.svg';

	import supremeRank from '$lib/assets/supreme-rank.svg';
	import grandRank from '$lib/assets/grand-rank.svg';
	import eliteRank from '$lib/assets/elite-rank.svg';
	import legendaryRank from '$lib/assets/legendary-rank.svg';
	import masterRank from '$lib/assets/master-rank.svg';
	import veteranRank from '$lib/assets/veteran-rank.svg';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	export let name;
	export let xp;
	export let rank;
	export let newClass = '';

	function rankClass(rank) {
		if (name === 'Me') {
			return 'my-rank';
		} else if (rank === 1) {
			return 'top-rank'; // Class for the top rank
		} else if (rank === 2) {
			return 'second-rank'; // Class for ranks 2 to 5
		} else if (rank === 3) {
			return 'third-rank'; // Class for ranks 2 to 5
		} else if (rank === 4) {
			return 'fourth-rank'; // Class for ranks 2 to 5
		} else if (rank <= 10) {
			return 'high-rank'; // Class for ranks 2 to 5
		} else {
			return ''; // No additional class for ranks above 5
		}
	}

	function mini_game_ticket_rewards(number) {
		for (const obj of $page.data.ranks) {
			if (number >= obj.start && number <= obj.end) {
				return obj.reward;
			}
		}
		return 0;
	}
</script>

<div class={`rank ${newClass} ${rankClass(rank)}`}>
	<div class="rank-name">
		<div class="rank-image">
			{#if rank === 1}
				<img src={supremeRank} alt="" />
			{:else if rank === 2}
				<img src={grandRank} alt="" />
			{:else if rank === 3}
				<img src={eliteRank} alt="" />
			{:else if rank <= 10}
				<img src={legendaryRank} alt="" />
			{:else if rank <= 100}
				<img src={masterRank} alt="" />
			{:else if rank <= 500}
				<img src={veteranRank} alt="" />
			{:else}
				<img src={lowerRank} alt="" />
			{/if}

			<div class="rank-number">{rank}</div>
		</div>
		<p>{name}</p>
	</div>

	<div class="flex items-center gap-[6px] lg:gap-[12px]">
		<span class="score-container">
			<img src={score} alt="" />
			<p>{xp}</p>
		</span>
		<span class="score-container">
			<img src={Tickets} alt="" />
			<p>{mini_game_ticket_rewards(rank)}</p>
		</span>

		{#if rank === 1}
			<span class="score-container">
				<img src={XP} alt="" />
				<p>500</p>
			</span>
		{:else if rank === 2}
			<span class="score-container">
				<img src={XP} alt="" />
				<p>400</p>
			</span>
		{:else if rank === 3}
			<span class="score-container">
				<img src={XP} alt="" />
				<p>300</p>
			</span>
		{:else if rank <= 10}
			<span class="score-container">
				<img src={XP} alt="" />
				<p>250</p>
			</span>
		{:else if rank <= 25}
			<span class="score-container">
				<img src={XP} alt="" />
				<p>200</p>
			</span>
		{:else if rank <= 50}
			<span class="score-container">
				<img src={XP} alt="" />
				<p>150</p>
			</span>
		{:else if rank <= 100}
			<span class="score-container">
				<img src={XP} alt="" />
				<p>100</p>
			</span>
		{:else if rank <= 1000}
			<span class="score-container">
				<img src={XP} alt="" />
				<p>50</p>
			</span>
		{:else}
			<span class="score-container">
				<img src={XP} alt="" />
				<p>0</p>
			</span>
		{/if}
	</div>
</div>

<style>
	.rank {
		display: flex;
		width: 100%;
		padding: 8px 10px;
		justify-content: space-between;
		align-items: center;
		border-radius: 4px;
		background: #321e37;
		height: 56px;
		position: relative;
	}

	.my-rank {
		background: #382432;
	}

	/* .top-rank::before {
		content: '';
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background: linear-gradient(to left, #9c27b0, #f71756, #ffd700);
		z-index: -1;
		border-radius: 22px;
		width: 100%;
		height: 100%;
	} */

	.top-rank {
		border: 0.2px solid var(--Accent, #fdeb5647);
		background: #382432;
	}

	.second-rank {
		border: 1px solid #bc5ad74d;
		background: #301339;
	}

	.third-rank {
		border: 1px solid rgba(142, 201, 237, 0.3);
		background: #2c1f3b;
	}

	.fourth-rank {
		border: 1px solid rgba(31, 208, 49, 0.3);
		background: #201f27;
	}

	.my-rank {
		border: 0.2px solid #8ec9ed61;
		background: #312844;
	}

	.rank-image {
		position: relative;
		width: 51.034px;
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

	.rank-name {
		display: flex;
		align-items: center;
		gap: 16px;
	}

	.rank-name p {
		color: var(--white-80, #d4cfd6);
		font-family: Gilroy-SemiBold;
		font-size: 18px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
	}

	.score-container {
		display: flex;
		padding: 6px 16px 6px 6px;
		align-items: center;
		justify-content: space-between;
		border-radius: 6px;
		background: #200b26;
		direction: ltr;
		width: 88px;
	}

	.score-container p {
		color: var(--Accent, #fdeb56);
		font-family: Gilroy-SemiBold;
		font-size: 14px;
		line-height: 17px;
	}

	@media (max-width: 1024px) {
		.rank-image {
			width: 30.621px;
		}

		.rank-name {
			gap: 10px;
		}

		.rank-name p {
			font-size: 14px;
		}

		.rank-number {
			font-size: 9.6px;
		}

		.score-container {
			padding: 4px 8px 4px 4px;
			gap: 8px;
			border-radius: 4px;
			width: 59px;
		}

		.score-container img {
			width: 18px;
		}

		.score-container p {
			font-size: 12px;
			line-height: 15px;
		}
	}
</style>
