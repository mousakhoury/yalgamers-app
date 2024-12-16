<script>
	import { t, locale } from '$lib/stores/i18n';

	export let star = 0;
	export let type = 'everything';
	export let opposite = false;
	import starSvg from '$lib/assets/star.svg';
	import starFill from '$lib/assets/star-fill.svg';
	let hoveredStar = 0;
	let lockedStar = false;
	function fillColor(index) {
		if (!lockedStar) {
			hoveredStar = index;
		} else {
			star = index;
		}
	}
	$: reviewComments = [
		`${$t('Worse')}`,
		`${$t('Average')}`,
		`${$t('Good')}`,
		`${$t('Very Good')}`,
		`${$t('Excellent')}`
	];
</script>

{#if type == 'rate'}
	<div
		class="flex items-center justify-between sm:justify-start pt-5 gap-5 sm:gap-10"
		on:mouseleave={() => {
			lockedStar ? null : (hoveredStar = 0);
		}}
	>
		{#each [1, 2, 3, 4, 5] as item (item)}
			{#if item <= hoveredStar}
				<div class="flex flex-col items-center justify-center w-fit">
					<img
						class="cursor-pointer"
						width="36px"
						height="36px"
						alt="star icon"
						src={starFill}
						on:mouseleave={() => fillColor(item - 1)}
						on:click={() => {
							lockedStar = true;
						}}
					/>
					<p
						dir={$locale == 'ar' ? 'rtl' : 'ltr'}
						class="text-accent-yellow pt-2 text-center font-Gilroy-Medium font-normal not-italic, text-sm"
					>
						{reviewComments[item - 1]}
					</p>
				</div>
			{:else}
				<div class="flex flex-col items-center justify-center w-fit">
					<img
						class="cursor-pointer"
						width="36px"
						height="36px"
						alt="star icon"
						src={starSvg}
						on:mouseenter={() => fillColor(item)}
					/>
					<p
						dir={$locale == 'ar' ? 'rtl' : 'ltr'}
						class="text-white-30 text-center pt-2 font-Gilroy-Medium font-normal not-italic, text-sm"
					>
						{reviewComments[item - 1]}
					</p>
				</div>
			{/if}
		{/each}
	</div>
{:else}
	<div class="flex justify-start items-center gap-[10px]" class:flex-row-reverse={opposite}>
		{#if type == 'everything'}
			<p
				dir={$locale == 'ar' ? 'rtl' : 'ltr'}
				class="text-xl not-italic font-normal text-center font-Gilroy-Medium text-accent-yellow"
			>
				{star.toFixed(1)}
			</p>
		{/if}
		<div class="flex justify-start items-center w-fit gap-[5px]">
			{#each [1, 2, 3, 4, 5] as item}
				{#if item <= star}
					<img src={starFill} width="18px" height="18px" alt="star" />
				{:else}
					<img src={starSvg} width="18px" height="18px" alt="filled star" />
				{/if}
			{/each}
		</div>
	</div>
{/if}
