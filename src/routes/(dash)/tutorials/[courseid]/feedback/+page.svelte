<script>
	// @ts-nocheck

	import { t, locale } from '$lib/stores/i18n';

	import Button from '$components/Button.svelte';
	import courseImg from '$lib/assets/course1.png';
	import star from '$lib/assets/star.svg';
	import starFilled from '$lib/assets/star-fill.svg';
	let hoveredStar = 0;
	let lockedStar = false;
	function fillColor(index) {
		if (!lockedStar) {
			hoveredStar = index;
		} else {
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

<div class="pt-8 grid grid-flow-row grid-cols-3 gap-11">
	<div class="p-5 rounded-2xl col-span-1 bg-accent">
		<p
			dir={$locale == 'ar' ? 'rtl' : 'ltr'}
			class="text-white text-[28px] font-normal not-italic font-Gilroy-SemiBold pb-[15px]"
		>
			Course Details
		</p>
		<div>
			<!-- svelte-ignore a11y-img-redundant-alt -->
			<img src={courseImg} class="object-contain w-full h-full rounded-lg" alt="course image" />
		</div>
		<p
			dir={$locale == 'ar' ? 'rtl' : 'ltr'}
			class="pt-5 text-base not-italic font-normal gradient font-Gilroy-SemiBold"
		>
			Earn Money
		</p>
		<p
			dir={$locale == 'ar' ? 'rtl' : 'ltr'}
			class="text-white-90 font-Gilroy-Bold text-2xl font-normal not-italic pb-[15px] pt-[10px]"
		>
			How to earn money by playing games on Yal Gamers.
		</p>
		<p
			dir={$locale == 'ar' ? 'rtl' : 'ltr'}
			class="text-sm not-italic font-normal text-white-60 font-Gilroy-Medium"
		>
			Unlock Your Gaming Potential: A Guide to Earning Money through Yal Gamers' Game-Playing
			Opportunities
		</p>
	</div>
	<div class="p-5 col-span-2 rounded-xl bg-accent-2">
		<form>
			<div class="relative flex flex-col items-start justify-center">
				<p
					dir={$locale == 'ar' ? 'rtl' : 'ltr'}
					class="text-2xl not-italic font-normal text-white font-Gilroy-SemiBold"
				>
					Rate This Course
				</p>
				<div
					role="group"
					class="flex items-center justify-start pt-5 gap-10"
					on:mouseleave={() => {
						lockedStar ? null : (hoveredStar = 0);
					}}
				>
					{#each [1, 2, 3, 4, 5] as item (item)}
						{#if item <= hoveredStar}
							<!-- svelte-ignore a11y-click-events-have-key-events -->
							<div class="flex flex-col items-center justify-center">
								<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
								<img
									class="cursor-pointer"
									width="36px"
									height="36px"
									alt="star icon"
									src={starFilled}
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
							<div class="flex flex-col items-center justify-center">
								<img
									class="cursor-pointer"
									width="36px"
									height="36px"
									alt="star icon"
									src={star}
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
			</div>
			<div class="pt-9">
				<p
					dir={$locale == 'ar' ? 'rtl' : 'ltr'}
					class="text-2xl not-italic font-normal text-white font-Gilroy-SemiBold"
				>
					Give a Feedback
				</p>
				<textarea
					contenteditable="true"
					class=" p-4 w-full h-[200px] overflow-y-auto bg-white-10 text-white-70 rounded-lg mt-[25px] resize-none outline-none focus:border-accent-yellow focus:border border-solid"
					placeholder="Start Writing...."
				/>
			</div>
			<Button type="gradient" class="mt-[30px] px-8 py-2">{$t('submit')}</Button>
		</form>
	</div>
</div>

<style lang="postcss">
	.gradient {
		background: linear-gradient(135deg, #f71756 0%, #fdeb56 100%);
		-webkit-text-fill-color: transparent;
		-webkit-background-clip: text;
	}
</style>
