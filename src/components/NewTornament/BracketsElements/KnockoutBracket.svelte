<script>
	import BracketItem from './BracketItem.svelte';

	export let parentExist;
	export let knockout;
	export let type;
</script>

{#if type === 'left'}
	<div
		class="h-[635px] md:h-[42.39vw] 2xl:h-[635px] flex flex-col justify-between items-start absolute top-[50%] translate-y-[-50%] left-[209px] md:left-[13.952vw] 2xl:left-[209px] main-line-left"
	>
		{#each knockout as match}
			<div class="item-line-left relative">
				<BracketItem
					title={`Knockout ${match.round_match}`}
					team1={match.team_1 == '' ? 'RW' : match.expand.team_1.name}
					team2={match.team_2 == '' ? 'RW' : match.expand.team_2.name}
				/>
			</div>
		{/each}
	</div>
{:else}
	<div
		class="h-[635px] md:h-[42.39vw] 2xl:h-[635px] flex flex-col justify-between items-end absolute top-[50%] translate-y-[-50%] right-[209px] md:right-[13.952vw] 2xl:right-[209px] main-line-right"
	>
		{#each knockout as match}
			<div class="item-line-right relative">
				<BracketItem
					title={`Knockout ${match.round_match}`}
					team1={match.team_1 == '' ? 'RW' : match.expand.team_1.name}
					team2={match.team_2 == '' ? 'RW' : match.expand.team_2.name}
				/>
			</div>
		{/each}
	</div>
{/if}

<style>
	.item-line-left:nth-child(odd)::before {
		content: '';
		position: absolute;
		top: 100%;
		left: 2vw;
		width: 0.067vw;
		height: 4.406vw;
		background: #fdeb56;
		z-index: -1;
	}

	.item-line-left:nth-child(odd)::after {
		content: '';
		position: absolute;
		left: 2vw;
		top: 8.411vw; /* 126px / 1498px * 100 */
		width: 3.338vw; /* 50px / 1498px * 100 */
		height: 0.067vw;
		background: #fdeb56;
		z-index: -1;
	}

	.item-line-left:nth-child(even)::before {
		content: '';
		position: absolute;
		top: -100%;
		left: 2vw;
		width: 0.067vw;
		height: 4.406vw;
		background: #fdeb56;
		z-index: -1;
	}

	.item-line-right:nth-child(odd)::before {
		content: '';
		position: absolute;
		top: 100%;
		right: 2vw;
		width: 0.067vw;
		height: 4.073vw;
		background: #fdeb56;
		z-index: -1;
	}

	.item-line-right:nth-child(odd)::after {
		content: '';
		position: absolute;
		right: 2vw;
		top: 8.411vw; /* 126px / 1498px * 100 */
		width: 3.338vw; /* 50px / 1498px * 100 */
		height: 0.067vw;
		background: #fdeb56;
		z-index: -1;
	}

	.item-line-right:nth-child(even)::before {
		content: '';
		position: absolute;
		top: -97%;
		right: 2vw;
		width: 0.067vw;
		height: 4.406vw;
		background: #fdeb56;
		z-index: -1;
	}

	@media (max-width: 768px) {
		.item-line-left:nth-child(odd)::before,
		.item-line-left:nth-child(even)::before,
		.item-line-right:nth-child(odd)::before,
		.item-line-right:nth-child(even)::before {
			position: absolute;
			width: 1px; /* 1px / 1498px * 100 */
			background: #fdeb56;
			z-index: -1;
		}

		.item-line-left:nth-child(odd)::before {
			top: 100%;
			left: 30px; /* 30px / 1498px * 100 */
			height: 66px; /* 66px / 1498px * 100 */
		}

		.item-line-left:nth-child(odd)::after,
		.item-line-right:nth-child(odd)::after {
			position: absolute;
			top: 126px; /* 126px / 1498px * 100 */
			width: 50px; /* 50px / 1498px * 100 */
			height: 1px; /* 1px / 1498px * 100 */
			background: #fdeb56;
			z-index: -1;
		}

		.item-line-left:nth-child(odd)::after {
			left: 30px; /* 30px / 1498px * 100 */
		}

		.item-line-left:nth-child(even)::before {
			top: -100%;
			left: 30px; /* 30px / 1498px * 100 */
			height: 66px; /* 66px / 1498px * 100 */
		}

		.item-line-right:nth-child(odd)::before {
			top: 100%;
			right: 30px; /* 30px / 1498px * 100 */
			height: 61px; /* 61px / 1498px * 100 */
		}

		.item-line-right:nth-child(odd)::after {
			right: 30px; /* 30px / 1498px * 100 */
		}

		.item-line-right:nth-child(even)::before {
			top: -97%; /* -97% of the height of the element */
			right: 30px; /* 30px / 1498px * 100 */
			height: 66px; /* 66px / 1498px * 100 */
		}
	}

	@media (min-width: 1536px) {
		.item-line-left:nth-child(odd)::before,
		.item-line-left:nth-child(even)::before,
		.item-line-right:nth-child(odd)::before,
		.item-line-right:nth-child(even)::before {
			position: absolute;
			width: 1px; /* 1px / 1498px * 100 */
			background: #fdeb56;
			z-index: -1;
		}

		.item-line-left:nth-child(odd)::before {
			top: 100%;
			left: 30px; /* 30px / 1498px * 100 */
			height: 66px; /* 66px / 1498px * 100 */
		}

		.item-line-left:nth-child(odd)::after,
		.item-line-right:nth-child(odd)::after {
			position: absolute;
			top: 126px; /* 126px / 1498px * 100 */
			width: 50px; /* 50px / 1498px * 100 */
			height: 1px; /* 1px / 1498px * 100 */
			background: #fdeb56;
			z-index: -1;
		}

		.item-line-left:nth-child(odd)::after {
			left: 30px; /* 30px / 1498px * 100 */
		}

		.item-line-left:nth-child(even)::before {
			top: -100%;
			left: 30px; /* 30px / 1498px * 100 */
			height: 66px; /* 66px / 1498px * 100 */
		}

		.item-line-right:nth-child(odd)::before {
			top: 100%;
			right: 30px; /* 30px / 1498px * 100 */
			height: 61px; /* 61px / 1498px * 100 */
		}

		.item-line-right:nth-child(odd)::after {
			right: 30px; /* 30px / 1498px * 100 */
		}

		.item-line-right:nth-child(even)::before {
			top: -97%; /* -97% of the height of the element */
			right: 30px; /* 30px / 1498px * 100 */
			height: 66px; /* 66px / 1498px * 100 */
		}
	}
</style>
