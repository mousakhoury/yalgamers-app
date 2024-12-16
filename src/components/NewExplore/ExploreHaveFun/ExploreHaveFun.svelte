<script>
	import { t, locale } from '$lib/stores/i18n';
	import Maze from '$lib/assets/have-fun-maze3.png';
	import MazeImageLight from '$lib/assets/maze-light.svg';

	import MazeMobile from '$lib/assets/have-fun-maze-mobile.png';

	import MazeLight from '$lib/assets/have-fun-maze-light.svg';
</script>

<div
	class="flex flex-col lg:flex-row items-center justify-between w-full relative bg-[#2C1334] rounded-[16px] overflow-hidden z-10 {$locale ===
	'ar'
		? 'pt-[24px] lg:pt-0 lg:pr-[48px]'
		: 'pt-[24px] lg:pt-0 lg:pl-[48px]'}"
>
	<img
		src={MazeLight}
		alt=""
		class=" absolute top-0 z-[-1] {$locale === 'ar' ? 'right-0 maze-light' : 'left-0'}"
	/>
	<div
		class="flex flex-col items-start gap-[24px] lg:gap-[32px] w-full max-w-[295px] lg:max-w-[387px]"
	>
		<div class="flex flex-col items-start gap-[10px] lg:gap-[12px]">
			<div class="flex flex-col items-start gap-[10px]">
				<p class="text-[#FDEB56] text-[12px] lg:text-[14px] font-Gilroy-Medium">
					{$t(`havefun`)}!
				</p>
				<h6 class="text-[#FFFFFFE5] text-[20px] lg:text-[36px] font-Gilroy-SemiBold">
					{$t('HaveFunTitle')}
				</h6>
			</div>
			<p
				class="text-[#FFFFFF99] text-[12px] lg:text-[14px] font-Gilroy-Medium {$locale === 'ar'
					? 'max-w-[298px]'
					: 'max-w-[200px]'}"
			>
				{$t('HaveFunSubtitle')}
			</p>
		</div>
		<a
			href="have-fun"
			class="px-[18px] lg:px-[24px] py-[8px] lg:pt-[14px] lg:pb-[13px] rounded-[4px] lg:rounded-[6px] bg-gradient"
		>
			<p class="text-[#1F100B] text-[16px] font-Gilroy-SemiBold">{$t('Check Them')}!</p>
		</a>
	</div>
	<div
		class="hidden lg:block relative pt-[68px] {$locale === 'ar'
			? 'pl-[42px] pr-[119px]'
			: 'pr-[42px] pl-[119px]'}"
	>
		<img src={Maze} alt="" class="" />
		<img
			src={MazeImageLight}
			alt=""
			class=" absolute w-[110%] h-full top-0 {$locale === 'ar'
				? 'left-0 rotate-180'
				: 'right-0'} z-[-1]"
		/>
	</div>
	<img src={MazeMobile} alt="" class="lg:hidden" />
</div>

<style>
	.bg-gradient {
		background: var(--Button, linear-gradient(90deg, #f71756 0%, #fdeb56 100%));
	}

	.bg-gradient:hover {
		background: linear-gradient(0deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.2) 100%),
			linear-gradient(90deg, #f71756 0%, #fdeb56 100%);
	}

	.maze-light {
		transform: rotateY(180deg);
	}
</style>
