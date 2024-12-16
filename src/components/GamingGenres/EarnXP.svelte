<script>
	// @ts-nocheck

	import { t, locale } from '$lib/stores/i18n';

	import Button from '$components/Button.svelte';

	import combat from '$lib/assets/combat-img.png';
	import mainImage from '$lib/assets/genres-image.svg';
	import strategy from '$lib/assets/strategy-img.png';
	import multiplayer from '$lib/assets/multiplayer-img.png';
	import controller from '$lib/assets/genres-controller.svg';
	import bottom from '$lib/assets/genres-bottom-line.svg';
	import top from '$lib/assets/genres-top-line.svg';
	import circle from '$lib/assets/genres-light-circle.svg';
	import ArrowYellow from '$lib/assets/duble-right-arrow-yellow.svg';
	import ArrowBlack from '$lib/assets/duble-right-arrow-black.svg';
</script>

<div
	class="flex flex-col items-center justify-center gap-[32px] genres-container py-[36px] lg:py-[60px] rounded-[10px] lg:rounded-[16px] w-full"
>
	<div
		class="flex flex-col items-center justify-center gap-[12px] lg:gap-[24px] max-w-[280px] lg:max-w-[623px]"
	>
		{#if $locale === 'ar'}
			<h6 class="text-[#FFFFFFE5] text-[22px] lg:text-[36px] text-center font-Gilroy-Bold">
				احصل على <span class="text-[#FDEB56]">50 نقطة</span> عن كل صديق جديد تدعوه!
			</h6>
		{:else}
			<h6 class="text-[#FFFFFFE5] text-[22px] lg:text-[36px] text-center font-Gilroy-Bold">
				Earn <span class="text-[#FDEB56]">50 XP</span> for every new friend you invite!
			</h6>
		{/if}
		<p class="text-[#FFFFFFB2] text-[16px] font-Gilroy text-center">
			{$t('EarnXpSubtitle')}
		</p>
	</div>
	<a href="/profile">
		<div
			class="flex items-center gap-[4px] px-[12px] py-[8px] rounded-[4px] bg-[#FDEB56] hover:bg-[#CABC45] group"
		>
			<p class="text-[#201E0A] text-[16px] font-Gilroy-Medium">{$t('Refer Now')}</p>
		</div>
	</a>
</div>

<style>
	.genres-container {
		background-image: url('$lib/assets/geners-bg.svg');
		background-position: center;
		background-size: cover;
	}

	@media (max-width: 1024px) {
		.genres-container {
			background-image: url('$lib/assets/geners-bg-mobile.svg');
		}
	}
</style>
