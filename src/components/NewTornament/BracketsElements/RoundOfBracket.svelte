<script>
	import BracketItem from './BracketItem.svelte';

	export let roundOf32;
	export let type;
</script>

{#if type === 'left'}
	<div
		class="h-[730px] md:h-[48.732vw] 2xl:h-[730px] flex flex-col justify-between items-start absolute top-[50%] translate-y-[-50%] left-0 main-line-left"
	>
		{#each roundOf32 as match}
			<div class="item-line-left relative">
				<BracketItem
					title={`Round of ${match.round_match}`}
					team1={match.team_1 == '' ? 'coming' : match.expand.team_1.name}
					team2={match.team_2 == '' ? 'coming' : match.expand.team_2.name}
				/>
			</div>
		{/each}
	</div>
{:else}
	<div
		class="h-[730px] md:h-[48.732vw] 2xl:h-[730px] flex flex-col justify-between items-end absolute top-[50%] translate-y-[-50%] right-0 main-line-right"
	>
		{#each roundOf32 as match}
			<div class="item-line-right relative">
				<BracketItem
					title={`Round of ${match.round_match}`}
					team1={match.team_1 == '' ? 'coming' : match.expand.team_1.name}
					team2={match.team_2 == '' ? 'coming' : match.expand.team_2.name}
				/>
			</div>
		{/each}
	</div>
{/if}

<style>
	.item-line-left:nth-child(odd)::after {
		content: '';
		position: absolute;
		top: 50%;
		right: -1.667vw; /* -25px / 1498px * 100 */
		width: 0.067vw; /* 1px / 1498px * 100, assuming the line is 1px wide */
		height: 6.342vw; /* 95px / 1498px * 100 */
		background: #fdeb56;
		z-index: -1;
		/* transform: translateY(-50%); */
	}

	.item-line-right:nth-child(odd)::after {
		content: '';
		position: absolute;
		top: 50%;
		left: -1.667vw; /* -25px / 1498px * 100 */
		width: 0.067vw; /* 1px / 1498px * 100, assuming the line is 1px wide */
		height: 6.342vw; /* 95px / 1498px * 100 */
		background: #fdeb56;
		z-index: -1;
		/* transform: translateY(-50%); */
	}

	.item-line-right:nth-child(even)::after {
		content: '';
		position: absolute;
		top: -1vw; /* -15px / 1498px * 100 */
		left: -3.605vw; /* -54px / 1498px * 100 */
		width: 1.935vw; /* 29px / 1498px * 100 */
		height: 0.067vw; /* 1px / 1498px * 100 */
		background: #fdeb56;
		z-index: -1;
	}

	.item-line-left:nth-child(even)::after {
		content: '';
		position: absolute;
		top: -1vw; /* -15px / 1498px * 100 */
		right: -3.605vw; /* -54px / 1498px * 100 */
		width: 1.935vw; /* 29px / 1498px * 100 */
		height: 0.067vw; /* 1px / 1498px * 100 */
		background: #fdeb56;
		z-index: -1;
	}

	.item-line-left::before {
		content: '';
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		right: -1.667vw; /* -25px / 1498px * 100 */
		width: 1.668vw; /* 25px / 1498px * 100 */
		height: 0.067vw; /* 1px / 1498px * 100 */
		background: #fdeb56;
		z-index: -1;
	}

	.item-line-right::before {
		content: '';
		position: absolute;
		top: 50%;
		/* transform: translateY(-50%); */
		left: -1.667vw; /* -25px / 1498px * 100 */
		width: 1.668vw; /* 25px / 1498px * 100 */
		height: 0.067vw; /* 1px / 1498px * 100 */
		background: #fdeb56;
		z-index: -1;
	}
	@media (max-width: 768px) {
		.item-line-left:nth-child(odd)::after {
			content: '';
			position: absolute;
			top: 50%;
			right: -25px;
			width: 1px;
			height: 95px;
			background: #fdeb56;
			z-index: -1;
			transform: unset;
		}

		.item-line-left:nth-child(even)::after {
			content: '';
			position: absolute;
			top: -15px;
			right: -54px;
			width: 29px;
			height: 1px;
			background: #fdeb56;
			z-index: -1;
		}

		.item-line-left::before {
			content: '';
			position: absolute;
			top: 50%;
			transform: translateY(-50%);
			right: -25px;
			width: 25px;
			height: 1px;
			background: #fdeb56;
			z-index: -1;
		}

		.item-line-right:nth-child(odd)::after {
			content: '';
			position: absolute;
			top: 50%;
			left: -25px;
			right: unset;
			width: 1px;
			height: 95px;
			background: #fdeb56;
			z-index: -1;
			transform: unset;
		}

		.item-line-right:nth-child(even)::after {
			content: '';
			position: absolute;
			top: -15px;
			left: -54px;
			width: 29px;
			height: 1px;
			background: #fdeb56;
			z-index: -1;
		}

		.item-line-right::before {
			content: '';
			position: absolute;
			top: 50%;
			transform: translateY(-50%);
			left: -25px;
			width: 25px;
			height: 1px;
			background: #fdeb56;
			z-index: -1;
		}
	}

	@media (min-width: 1536px) {
		.item-line-left:nth-child(odd)::after {
			content: '';
			position: absolute;
			top: 50%;
			right: -25px;
			width: 1px;
			height: 95px;
			background: #fdeb56;
			z-index: -1;
			transform: unset;
		}

		.item-line-left:nth-child(even)::after {
			content: '';
			position: absolute;
			top: -15px;
			right: -54px;
			width: 29px;
			height: 1px;
			background: #fdeb56;
			z-index: -1;
		}

		.item-line-left::before {
			content: '';
			position: absolute;
			top: 50%;
			transform: translateY(-50%);
			right: -25px;
			width: 25px;
			height: 1px;
			background: #fdeb56;
			z-index: -1;
		}

		.item-line-right:nth-child(odd)::after {
			content: '';
			position: absolute;
			top: 50%;
			left: -25px;
			right: unset;
			width: 1px;
			height: 95px;
			background: #fdeb56;
			z-index: -1;
			transform: unset;
		}

		.item-line-right:nth-child(even)::after {
			content: '';
			position: absolute;
			top: -15px;
			left: -54px;
			width: 29px;
			height: 1px;
			background: #fdeb56;
			z-index: -1;
		}

		.item-line-right::before {
			content: '';
			position: absolute;
			top: 50%;
			transform: translateY(-50%);
			left: -25px;
			width: 25px;
			height: 1px;
			background: #fdeb56;
			z-index: -1;
		}
	}
</style>
