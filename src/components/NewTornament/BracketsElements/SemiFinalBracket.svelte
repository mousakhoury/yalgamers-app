<script>
	import BracketItem from './BracketItem.svelte';
	import semiFinalBg from '$lib/assets/semi-final-bg.svg';

	export let semiFinal;
	export let parentExist;
	export let type;
</script>

{#if type === 'left'}
	<div
		class="w-[242px] md:w-[16.155vw] 2xl:w-[242px] relative line-item-left z-[1] flex items-center justify-start"
	>
		{#each semiFinal as match}
			<div class="semifinal-container">
				<BracketItem
					title={`Semi Final ${match.round_match}`}
					team1={match.team_1 == ''
						? `${parentExist ? 'QFW' : 'on way'}`
						: match.expand.team_1.name}
					team2={match.team_2 == ''
						? `${parentExist ? 'QFW' : 'on way'}`
						: match.expand.team_2.name}
				/>
			</div>
		{/each}
	</div>
{:else}
	<div
		class="w-[242px] md:w-[16.155vw] 2xl:w-[242px] relative line-item-right z-[1] flex items-center justify-end"
	>
		{#each semiFinal as match}
			<div class="semifinal-container">
				<BracketItem
					title={`Semi Final ${match.round_match}`}
					team1={match.team_1 == ''
						? `${parentExist ? 'QFW' : 'on way'}`
						: match.expand.team_1.name}
					team2={match.team_2 == ''
						? `${parentExist ? 'QFW' : 'on way'}`
						: match.expand.team_2.name}
				/>
			</div>
		{/each}
	</div>
{/if}

<style>
	.line-item-left::before,
	.line-item-right::before {
		content: '';
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		width: 100%;
		height: 0.067vw; /* Equivalent of 1px */
		background: linear-gradient(to right, #fdeb56, #f71756);
		z-index: -1;
	}

	.line-item-left::before {
		left: 2.27vw; /* Equivalent of 34px = (34 / 1498) * 100 */
	}

	.line-item-right::before {
		right: 2.27vw; /* Equivalent of 34px = (34 / 1498) * 100 */
	}

	.semifinal-container {
		background: url('$lib/assets/semi-final-bg.svg');
		background-size: cover;
		background-position: center;
		padding: 2.404vw; /* Equivalent of 36px = (36 / 1498) * 100 */
	}

	@media (max-width: 768px) {
		.line-item-left::before {
			content: '';
			position: absolute;
			top: 50%;
			left: 34px;
			transform: translateY(-50%);
			width: 100%;
			height: 1px;
			background: linear-gradient(to right, #fdeb56, #f71756);
			z-index: -1;
		}

		.line-item-right::before {
			content: '';
			position: absolute;
			top: 50%;
			right: 34px;
			transform: translateY(-50%);
			width: 100%;
			height: 1px;
			background: linear-gradient(to right, #fdeb56, #f71756);
			z-index: -1;
		}

		.semifinal-container {
			background: url('$lib/assets/semi-final-bg.svg');
			background-size: cover;
			background-position: center;
			padding: 36px;
		}
	}

	@media (min-width: 1536px) {
		.line-item-left::before {
			content: '';
			position: absolute;
			top: 50%;
			left: 34px;
			transform: translateY(-50%);
			width: 100%;
			height: 1px;
			background: linear-gradient(to right, #fdeb56, #f71756);
			z-index: -1;
		}

		.line-item-right::before {
			content: '';
			position: absolute;
			top: 50%;
			right: 34px;
			transform: translateY(-50%);
			width: 100%;
			height: 1px;
			background: linear-gradient(to right, #fdeb56, #f71756);
			z-index: -1;
		}

		.semifinal-container {
			background: url('$lib/assets/semi-final-bg.svg');
			background-size: cover;
			background-position: center;
			padding: 36px;
		}
	}
</style>
