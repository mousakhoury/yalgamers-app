<script>
	import XpContainer from '$components/XpContainer.svelte';
	import lowerRank from '$lib/assets/lower-rank-icon.svg';
	import topRank from '$lib/assets/top-rank-icon.svg';

	import leaders from '$lib/assets/leaders-icon.svg';
	import navigators from '$lib/assets/nagivators-icon.svg';
	import crossers from '$lib/assets/crossers-icon.svg';

	import supremeRank from '$lib/assets/supreme-rank.svg';
	import grandRank from '$lib/assets/grand-rank.svg';
	import eliteRank from '$lib/assets/elite-rank.svg';
	import legendaryRank from '$lib/assets/legendary-rank.svg';
	import masterRank from '$lib/assets/master-rank.svg';
	import veteranRank from '$lib/assets/veteran-rank.svg';

	export let name;
	export let xp;
	export let rank;
	export let newClass = '';

	function rankClass(rank) {
		if (rank === 1) {
			return 'top-rank'; // Class for the top rank
		} else if (rank === 2) {
			return 'second-rank'; // Class for ranks 2 to 5
		} else if (rank === 3) {
			return 'third-rank'; // Class for ranks 2 to 5
		} else if (rank <= 10) {
			return 'high-rank'; // Class for ranks 2 to 5
		} else {
			return ''; // No additional class for ranks above 5
		}
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

	<XpContainer xp={xp ?? 0} />
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

	.top-rank::before {
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
	}

	.top-rank {
		border: 1px solid #ffba02;
		background: #321e37;
	}

	.second-rank {
		border: 1px solid #4cb6f5;
		background: #321e37;
	}

	.third-rank {
		border: 1px solid #f26be1;
		background: #321e37;
	}

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
</style>
