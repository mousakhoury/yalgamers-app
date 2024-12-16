<script>
	// @ts-nocheck
	import { t, locale } from '$lib/stores/i18n';

	import ProjectQuestCard from '$components/QuestPage/ProjectQuestCard.svelte';
	import Swiper from '$components/Swiper/Swiper.svelte';
	import DoubleArrow from '$lib/assets/duble-right-yellow.svg';
	import { SplideSlide } from '@splidejs/svelte-splide';

	export let projects = [];
</script>

<div class="flex flex-col items-start gap-[20px] w-full">
	<div
		class="flex flex-col lg:flex-row gap-[8px] items-start lg:items-center justify-between w-full"
	>
		{#if $locale === 'ar'}
			<h6
				class="text-[#FFFFFFE5] text-[20px] lg:text-[32px] font-Gilroy-SemiBold max-w-[190px] lg:max-w-[360px]"
			>
				<span class="text-[#BC5AD7]">المهام</span> الجديدة<br /> متاحة الآن
			</h6>
		{:else}
			<h6
				class="text-[#FFFFFFE5] text-[20px] lg:text-[32px] font-Gilroy-SemiBold max-w-[190px] lg:max-w-[360px]"
			>
				New <span class="text-[#BC5AD7]">missions</span> are now available
			</h6>
		{/if}

		<div class="flex flex-col items-start gap-[10px] lg:gap-[12px] max-w-[466px]">
			<p class="text-[#FFFFFFB2] text-[11px] lg:text-[16px] font-Gilroy">
				{$t('ProjectSubtitle')}
			</p>
			<a href="/quests" class="flex items-center gap-[4px] hover:gap-[8px] duration-300 group">
				<p
					class="text-[#FDEB56] group-hover:text-[#CABC45] text-[12px] lg:text-[16px] font-Gilroy-Medium duration-300"
				>
					{$t('View All')}
				</p>
				<img src={DoubleArrow} alt="" class="w-[16px] {$locale === 'ar' ? 'rotate-180' : ''}" />
			</a>
		</div>
	</div>
	<div class="w-full explorSider">
		<Swiper gap="30px">
			{#each projects as project}
				<SplideSlide>
					<div class="w-[269px] lg:w-auto">
						<ProjectQuestCard isSlider={true} {project} />
					</div>
				</SplideSlide>
			{/each}
		</Swiper>
	</div>
</div>
