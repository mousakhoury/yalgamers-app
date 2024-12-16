<script>
	import BracketItem from './BracketItem.svelte';

	export let parentExist;
	export let quarterFinal;
	export let type;
</script>

{#if type === 'left'}
	<div
		class="h-[445px] md:h-[29.706vw] 2xl:h-[445px] min-w-[186px] md:min-w-[12.417vw] 2xl:min-w-[186px] flex flex-col justify-between items-start absolute top-[50%] translate-y-[-50%] left-[287px] md:left-[19.159vw] 2xl:left-[287px] main-line-left"
	>
		{#each quarterFinal as match}
			<div class="item-line-left relative">
				<BracketItem
					title={`Qurarter Final ${match.round_match}`}
					team1={match.team_1 == '' ? 'KW' : match.expand.team_1.name}
					team2={match.team_2 == '' ? 'KW' : match.expand.team_2.name}
				/>
			</div>
		{/each}
	</div>
{:else}
	<div
		class="h-[445px] md:h-[29.706vw] 2xl:h-[445px] min-w-[186px] md:min-w-[12.417vw] 2xl:min-w-[186px] flex flex-col justify-between items-end absolute top-[50%] translate-y-[-50%] right-[287px] md:right-[19.159vw] 2xl:right-[287px] main-line-right"
	>
		{#each quarterFinal as match}
			<div class="item-line-right relative">
				<BracketItem
					title={`Qurarter Final ${match.round_match}`}
					team1={match.team_1 == '' ? 'KW' : match.expand.team_1.name}
					team2={match.team_2 == '' ? 'KW' : match.expand.team_2.name}
				/>
			</div>
		{/each}
	</div>
{/if}

<style>
	.item-line-left:before {
		content: '';
		position: absolute;
		top: 50%;
		left: 2vw; /* 30px / 1498px * 100 */
		transform: translateY(-50%);
		width: 100%;
		height: 0.067vw; /* 1px / 1498px * 100, assuming the line is 1px high */
		background: #fdeb56;
		z-index: -1;
	}

	.item-line-right:before {
		content: '';
		position: absolute;
		top: 50%;
		right: 2vw; /* 30px / 1498px * 100 */
		transform: translateY(-50%);
		width: 100%;
		height: 0.067vw; /* 1px / 1498px * 100, assuming the line is 1px high */
		background: #fdeb56;
		z-index: -1;
	}

	.main-line-left::before {
		content: '';
		position: absolute;
		top: 50%;
		right: 0;
		transform: translateY(-50%);
		width: 0.067vw; /* 1px / 1498px * 100, assuming the line is 1px wide */
		height: 25.367vw; /* 380px / 1498px * 100 */
		background: #fdeb56;
		z-index: -1;
	}

	.main-line-right::before {
		content: '';
		position: absolute;
		top: 50%;
		left: 0;
		transform: translateY(-50%);
		width: 0.067vw; /* 1px / 1498px * 100, assuming the line is 1px wide */
		height: 25.367vw; /* 380px / 1498px * 100 */
		background: #fdeb56;
		z-index: -1;
	}

	@media (max-width: 768px) {
		.item-line-left:before {
			content: '';
			position: absolute;
			top: 50%;
			left: 30px;
			transform: translateY(-50%);
			width: 100%;
			height: 1px;
			background: #fdeb56;
			z-index: -1;
		}

		.item-line-right:before {
			content: '';
			position: absolute;
			top: 50%;
			right: 30px;
			transform: translateY(-50%);
			width: 100%;
			height: 1px;
			background: #fdeb56;
			z-index: -1;
		}

		.main-line-left::before {
			content: '';
			position: absolute;
			top: 50%;
			right: 0;
			transform: translateY(-50%);
			width: 1px;
			height: 380px;
			background: #fdeb56;
			z-index: -1;
		}

		.main-line-right::before {
			content: '';
			position: absolute;
			top: 50%;
			left: 0;
			transform: translateY(-50%);
			width: 1px;
			height: 380px;
			background: #fdeb56;
			z-index: -1;
		}
	}

	@media (min-width: 1536px) {
		.item-line-left:before {
			content: '';
			position: absolute;
			top: 50%;
			left: 30px;
			transform: translateY(-50%);
			width: 100%;
			height: 1px;
			background: #fdeb56;
			z-index: -1;
		}

		.item-line-right:before {
			content: '';
			position: absolute;
			top: 50%;
			right: 30px;
			transform: translateY(-50%);
			width: 100%;
			height: 1px;
			background: #fdeb56;
			z-index: -1;
		}

		.main-line-left::before {
			content: '';
			position: absolute;
			top: 50%;
			right: 0;
			transform: translateY(-50%);
			width: 1px;
			height: 380px;
			background: #fdeb56;
			z-index: -1;
		}

		.main-line-right::before {
			content: '';
			position: absolute;
			top: 50%;
			left: 0;
			transform: translateY(-50%);
			width: 1px;
			height: 380px;
			background: #fdeb56;
			z-index: -1;
		}
	}
</style>
