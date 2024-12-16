<script>
	import { t, locale } from '$lib/stores/i18n';
	import Rewards from '$lib/assets/explore-rewards.png';
	import MazeMobile from '$lib/assets/have-fun-maze-mobile.png';

	import RewardsRightLight from '$lib/assets/explore-rewards-right-light.svg';
	import RewardsLeftLight from '$lib/assets/explore-rewards-left-light.svg';
</script>

<div
	class="flex flex-col lg:flex-row gap-[40px] items-center justify-between w-full relative p-[24px] pb-[15px] lg:py-[48px] bg-[#2C1334] rounded-[16px] overflow-hidden z-10 {$locale ===
	'ar'
		? 'lg:pr-[48px] lg:pl-[100px]'
		: 'lg:pl-[48px] lg:pr-[100px]'}"
>
	<img src={RewardsRightLight} alt="" class=" absolute top-0 left-0 z-[-1]" />
	<img src={RewardsLeftLight} alt="" class=" absolute bottom-0 right-0 z-[-1]" />

	<div class="flex flex-col items-start gap-[24px] lg:gap-[32px] w-full lg:max-w-[499px]">
		<div class="flex flex-col items-start gap-[10px] lg:gap-[12px]">
			<div class="flex flex-col items-start gap-[10px]">
				<p class="text-[#FDEB56] text-[12px] lg:text-[14px] font-Gilroy-Medium">{$t('rewards')}!</p>
				<h6 class="text-[#FFFFFFE5] text-[20px] lg:text-[36px] font-Gilroy-SemiBold">
					{$t('RewardsTitle')}
				</h6>
			</div>
			<p class="text-[#FFFFFF99] text-[12px] lg:text-[14px] font-Gilroy-Medium max-w-[200px]">
				{$t('RewardsSubtitle')}
			</p>
		</div>
		<a
			href="/rewards"
			class="px-[18px] lg:px-[24px] py-[8px] lg:pt-[14px] lg:pb-[13px] rounded-[4px] lg:rounded-[6px] bg-gradient"
		>
			<p class="text-[#1F100B] text-[16px] font-Gilroy-SemiBold">{$t('Check Them')}!</p>
		</a>
	</div>
	<img src={Rewards} alt="" />
</div>

<style>
	.bg-gradient {
		background: var(--Button, linear-gradient(90deg, #f71756 0%, #fdeb56 100%));
	}

	.bg-gradient:hover {
		background: linear-gradient(0deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.2) 100%),
			linear-gradient(90deg, #f71756 0%, #fdeb56 100%);
	}
</style>
